import { Routes, Route, BrowserRouter } from 'react-router-dom';

import HomePage from './pages/HomePage'
import PeoplePage from './pages/PeoplePage'
import PlanetsPage from './pages/PlanetsPage'
import StarshipsPage from './pages/StarshipsPage'
import Container from '@mui/material/Container';
import MenuComponent from './components/common/menu'
import './assets/styles/main.css'

function App() {
  return (
    <BrowserRouter >
      <Container className="container">
       <MenuComponent />
        <div>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/planets" element={<PlanetsPage />} />
            <Route path="/starships" element={<StarshipsPage />} />
            <Route path="*" element={<>404 page</>} />
          </Routes>
        </div>
      </Container>
    </BrowserRouter>
  );
}

export default App;
