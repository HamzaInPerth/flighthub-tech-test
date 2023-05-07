import React, { useState, useEffect } from 'react'
import { getPeople, searchPerson } from '../services/peopleServices'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { LinearProgress, TextField } from '@mui/material'

const DEFAULT_CONFIG_PAGINATION = {
  currentPage: 1,
  totalPage: 1
}

function UserPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [people, setPeople] = useState([]);
  const [pagination, setPagination] = useState(DEFAULT_CONFIG_PAGINATION)
  const [searchInput, setSearchInput] = useState('')

  // GET PEOPLE
  async function fetchPeople(page = 1) {
    try {
      setIsLoading(true)
      const { data } = await getPeople(page)
      const { results, current_page, total_page } = data
      setPagination({
        currentPage: current_page,
        totalPage: total_page,
      })
      setPeople(results)
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  // SEARCH BY NAME
  async function searchByName(name, page = 1) {
    try {
      setIsLoading(true)
      const { data } = await searchPerson(name, page)
      const { results, current_page, total_page } = data
      setPagination({
        currentPage: current_page,
        totalPage: total_page
      })
      setPeople(results)
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  // searchInput listener
  useEffect(() => {
    if(searchInput) {
      const delayDebounceFn = setTimeout(() => {
        searchByName(searchInput)
      }, 500)
      return () => clearTimeout(delayDebounceFn)
    } else {
      fetchPeople()
    }
  }, [searchInput]);

  // Input handler
  function handleInputChange(event) {
    setSearchInput(event.target.value)
  };

  // Pagination handler
  function handlePaginationChange(event, value) {
    setPagination({
      currentPage: value
    })
    if(searchInput) {
      searchByName(searchInput, value)
    } else {
      fetchPeople(value)
    }
  }

  const { currentPage, totalPage} = pagination

  return (
    <div>
      <h1>People List</h1>
      <TextField id="filled-basic" label="Search" variant="filled" value={searchInput} onChange={handleInputChange} />
      {isLoading ? (<LinearProgress />) :
        people.length ?
        (<div>
          <ul>
            {
              people.map((person, index) => (
                <li key={index}>{person.name}</li>
              ))
            }
          </ul>
          <Stack spacing={2}>
            <Pagination count={totalPage} page={currentPage}  onChange={handlePaginationChange} />
          </Stack>
        </div>): <p>No result....</p>
      }
    </div>);
}

export default UserPage
