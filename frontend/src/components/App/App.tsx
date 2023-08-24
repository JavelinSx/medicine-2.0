import './App.scss';
import { Routes, Route } from 'react-router-dom';
import LoginPatient from '../LoginPatient/LoginPatient';
import Register from '../Register/Register';
function App() {
  return (
    <div className='app'>
      <header className='app-header'></header>
      <Routes>
        <Route path='/patient/signin' element={<LoginPatient />}></Route>
        <Route path='/patient/register' element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
