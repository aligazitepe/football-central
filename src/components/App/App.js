import React, {useState} from 'react';
import './App.css';

// Routing 
import { BrowserRouter, Route, Switch } from 'react-router-dom'
//auth
import auth from '../../utils/auth';

// Components 
import NavbarV2 from '../NavbarV2/NavbarV2';
import Main from '../Main/Main';
import Fixture from '../Fixture/Fixture';
import League from '../League/League';
import Team from '../Team/Team';
import Discussion from "../Discussion/home"
import Newpost from "../Discussion/addFeed"
import DiscussionDetails  from "../Discussion/feedComments";
import Login from '../Login/Login';
import Register from '../Register/Register';
import Logout from '../Logout/Logout';
import Userbar from '../Userbar/Userbar';
import Quiz from '../Quiz/Quiz'
import Profile from '../Profile/profile'

function App() {
  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);

  return (
   
    <BrowserRouter>
    
      <div className="App">
     
     
        <NavbarV2 />
        <Userbar isAuthenticated={isAuthenticated} />

        <Switch>
          <Route exact path='/' component={Main} />
          <Route path='/league/:leagueID/:leagueName' component={League} /> 
          <Route path='/fixture/:fixtureID' component={Fixture} />
          <Route path='/team/:teamID/:leagueID/:teamName/:leagueName' component={Team} />
          <Route exact path='/Discussion'component={Discussion}/>
          <Route path='/Discussion/:id'component={DiscussionDetails}/>
          <Route path='/NewPost' component={Newpost}/>
          <Route path='/Quiz' component={Quiz}/>
          <Route path='/Profile' component={Profile}/>
          <Route
            path="/login"
            render={(props) => (
              <Login {...props} setIsAuthenticated={setIsAuthenticated} />
            )}
          />{" "}
          <Route
            path="/register"
            render={(props) => (
              <Register {...props} setIsAuthenticated={setIsAuthenticated} />
            )}
          />
          <Route
            path="/logout"
            render={(props) => (
              <Logout {...props} setIsAuthenticated={setIsAuthenticated} />
            )}
          />
        </Switch>
      
      </div>
      
    </BrowserRouter>
   
  );
}

export default App;
