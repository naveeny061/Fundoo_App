import './App.css';
import Registration from './components/registration/registrationPage'
import SignIn from './components/signIn/signIn'
import {BrowserRouter, Route , Switch} from 'react-router-dom'
import ForgetPassword from './components/forgetPassword/forgetPassword';
import ResetPassword from "./components/resetPassword/resetPassword";
import Dashboard from "./components/Dashboard/dashboard";

function App() {
  return (
    <div className='mainContainer'>
      <BrowserRouter>
      <Switch>
         <Route exact path="/registration" component={Registration} />
         <Route exact path="/signIn" component={SignIn} />
         <Route exact path="/forgetPassword" component={ForgetPassword} />
         <Route exact path="/resetPassword/:token" component={ResetPassword} />
         <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
