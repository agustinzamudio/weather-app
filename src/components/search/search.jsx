import { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import PropTypes from 'prop-types'
import { GEO_API_URL, geoApiOptions } from '../../api'

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null)

  const loadOptions = async inputValue => {
    const url = `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`

    return fetch(url, geoApiOptions)
      .then(response => response.json())
      .then(response => {
        return {
          options: response.data.map(city => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            }
          }),
        }
      })
  }

  const handleOnChange = searchData => {
    setSearch(searchData)
    onSearchChange(searchData)
  }

  return (
    <AsyncPaginate
      placeholder='Search for city'
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  )
}

Search.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
}

export default Search
