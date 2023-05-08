import React, { useState, useEffect, useRef } from 'react'
import { getPeople, searchPerson } from '../services/peopleServices'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { LinearProgress, TextField, Alert } from '@mui/material'
import axios from 'axios'

function UserPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [people, setPeople] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const cancelTokenSourceRef = useRef(null);

  // GET PEOPLE
  async function fetchPeople(page = 1) {
    try {
      setIsLoading(true)
      const { data } = await getPeople(page)
      const { results, current_page, total_page } = data
      setCurrentPage(current_page)
      setTotalPage(total_page)
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
      setIsLoading(true);
      const newCancelTokenSource = axios.CancelToken.source();
      cancelTokenSourceRef.current = newCancelTokenSource;
      const { data } = await searchPerson(name, newCancelTokenSource, page)
      const { results, current_page, total_page } = data
      setCurrentPage(current_page)
      setTotalPage(total_page)
      setPeople(results)
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  // searchInput listener
  useEffect(() => {
    if (searchInput) {
      if (cancelTokenSourceRef.current) cancelTokenSourceRef.current.cancel();
      const delayDebounceFn = setTimeout(() => {
        searchByName(searchInput)
      }, 500)
      return () => {
        clearTimeout(delayDebounceFn);
      };
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
    setCurrentPage(value)
    if (searchInput) {
      searchByName(searchInput, value)
    } else {
      fetchPeople(value)
    }
  }

  return (
    <div>
      <h1>People List</h1>
      <TextField id="filled-basic" style={{ width: '100%' }} label="Search people..." variant="filled" value={searchInput} onChange={handleInputChange} />
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
          </div>) : <Alert severity="info">No result.</Alert>
      }
      <Stack spacing={2}>
        <Pagination style={{ margin: '10px auto' }} count={totalPage} page={currentPage} disabled={isLoading} onChange={handlePaginationChange} />
      </Stack>
    </div>);
}

export default UserPage
