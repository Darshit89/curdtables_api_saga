
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Addpassenger from './components/Addpassenger';
import Home from './components/Home';
import UpdatePassenger from './components/UpdatePassenger';



function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/addpassenger" element={<Addpassenger/>}/>
    <Route path="/updatepassenger/:id" element={<UpdatePassenger/>}/>


    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
