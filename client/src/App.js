import {BrowserRouter,Route,Switch, useHistory,Redirect} from 'react-router-dom'
import 'antd/dist/antd.css';
import './App.css';
import NavBar from "./comp/navbar"
import Dashboard from './comp/dashboard'
import Stats from './comp/stats'
import StatsStudents from './comp/statsstudent'
import College from './comp/college'
import Students from './comp/students'
const Routing=()=>{
  return (
<Switch>
<Route path='/dashboard'>
      <Dashboard />
    </Route>
<Route path='/collegestats/:userid'>
      <Stats />
    </Route>
    <Route path='/studentstats/:userid'>
      <StatsStudents />
    </Route>
    <Route path='/college/:userid'>
      <College />
    </Route>
    <Route path='/students/:userid'>
      <Students />
    </Route>
    <Route exact path="/" render={() => {
                    return (
                      <Redirect to="/dashboard" />
                    )
                }}
              />
    </Switch>
    
  )
}


function App() {
  
  const history=useHistory()
  return (
    <div className="App">
       <BrowserRouter>
    <NavBar/>
    <Routing />
    </BrowserRouter>
    </div>
  );
}

export default App;
