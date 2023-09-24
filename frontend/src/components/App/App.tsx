import './App.scss';
import { Routes, Route } from 'react-router-dom';
import LoginPatient from '../LoginPatient/LoginPatient';
import FormRegisterPatient from '../FormRegisterPatient/FormRegisterPatient';
import LoginStaff from '../LoginStaff/LoginStaff';
import FormRegisterStaff from '../FormRegisterStaff/FormRegisterStaff';
import { updatedFormDataForPatient, updatedFormDataForStaff, selectOptionsPatientProps, selectOptionsStaffProps} from '../../utils/constant';
function App() {

  return (
    <div className='app'>
      <header className='app-header'></header>
      <Routes>
        <Route path='/patient/signin' element={<LoginPatient />}></Route>
        <Route path='/patient/register' element={<FormRegisterPatient 
          selectOptionsProps={selectOptionsPatientProps}  
          data={updatedFormDataForPatient}/>}></Route>
        <Route path='/staff/signin' element={<LoginStaff />}></Route>
        <Route path='/staff/register' element={<FormRegisterStaff 
          selectOptionsProps={selectOptionsStaffProps}
          data={updatedFormDataForStaff}
        />}></Route>
      </Routes>
    </div>
  );
}

export default App;
