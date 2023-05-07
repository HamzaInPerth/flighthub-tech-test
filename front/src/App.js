import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';

import HomePage from './pages/HomePage'
import PeoplePage from './pages/PeoplePage'
import PlanetsPage from './pages/PlanetsPage'
import StarshipsPage from './pages/StarshipsPage'

function App() {
  return (
    <>
        <div className="container">
          {/* <Link>Back</Link> */}
        </div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/planets" element={<PlanetsPage />} />
          <Route path="/starships" element={<StarshipsPage />} />
          <Route path="*" element={<>404 page</>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
