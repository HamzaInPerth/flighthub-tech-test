import { useState, useEffect } from 'react'
import { getStarships } from '../services/starshipsServices'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { LinearProgress, Alert } from '@mui/material'

const StarshipsPage = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [starships, setStarships] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  // GET PLANETS
  async function fetchStarships(page = 1) {
    try {
      setIsLoading(true)
      const { data } = await getStarships(page)
      const { results, current_page, total_page } = data
      setCurrentPage(current_page)
      setTotalPage(total_page)
      setStarships(results)
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStarships()
  }, [])

  function handlePaginationChange(event, value) {
    setCurrentPage(value)
    fetchStarships(value)
  }

  return (
    <div>
      <h1>Starships List</h1>
      {isLoading ? (<LinearProgress />) :
        starships.length ?
          (<ul>
            {
              starships.map((planet, index) => (
                <li key={index}>{planet.name}</li>
              ))
            }
          </ul>) : <Alert severity="info">No result.</Alert>
      }
      <Stack spacing={2} direction="row" useFlexGap flexWrap="wrap">
        <Pagination style={{ margin: '10px auto' }} count={totalPage} page={currentPage} disabled={isLoading} onChange={handlePaginationChange} />
      </Stack>
    </div>);
}

export default StarshipsPage