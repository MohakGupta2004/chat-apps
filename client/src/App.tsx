import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Chat from './Chat';
function App() {
  return <>
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path="/chat/:id" element={<Chat/>}></Route>
      </Routes>
    </BrowserRouter>
  </>
}

export default App;

