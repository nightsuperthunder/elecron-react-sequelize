import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<p>Hello world!</p>} />
      </Routes>
    </Router>
  );
}
