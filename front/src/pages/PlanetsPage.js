import { useState, useEffect } from 'react'
import { getPlanets } from '../services/planetsServices'

import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { LinearProgress, Alert } from '@mui/material'

// const DEFAULT_CONFIG_PAGINATION = {
//     currentPage: 1,
//     totalPage: 1
//   }

const PlanetsPage = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [planets, setPlanets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  // GET PLANETS
  async function fetchPlanets(page = 1) {
    try {
      setIsLoading(true)
      const { data } = await getPlanets(page)
      const { results, current_page, total_page } = data
      setCurrentPage(current_page)
      setTotalPage(total_page)
      setPlanets(results)
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPlanets()
  }, [])

  function handlePaginationChange(event, value) {
    setCurrentPage(value)
    fetchPlanets(value)
  }

  return (
    <div>
      <h1>Planets List</h1>
      {isLoading ? (<LinearProgress />) :
        planets.length ?
          (<ul>
            {
              planets.map((planet, index) => (
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

export default PlanetsPage