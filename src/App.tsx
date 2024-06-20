import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainRouter from './router/MainRouter';
import AuthRouter from './router/AuthRouter';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainRouter />} />
        <Route path="/login/*" element={<AuthRouter />} />
        <Route path="/register/*" element={<AuthRouter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
