import React,{useState} from 'react';
import './App.css';
import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom';

//pages
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import PageNotFound from './pages/PageNotFound/PageNotFound';

function App() {

  //authentication
  const [authentication,setAuthentication] = useState<boolean>(false);

  //authentication user data
  const [userEmail,setUserEmail] = useState<string>('');

  //authentication user data handler
  const userDataHandlerTrue = (email:string):void =>{
    setUserEmail(email);
  }

  const userDataHandlerFalse = () =>{
    setUserEmail('');
  }

  //authentication handler
  const authenticationTrueHandler = () => {
    setAuthentication(true)
  }

  const authenticationFalseHandler = () => {
    setAuthentication(false)
  }

  return (
    <div className="App">
      <Router>
        <Switch>

        <Route path="/login" exact
         render={() => 
          <LoginPage 
            userDataHandlerFalse={userDataHandlerFalse}
            userDataHandlerTrue={userDataHandlerTrue}
            authenticationTrueHandler={authenticationTrueHandler}
            authenticationFalseHandler={authenticationFalseHandler} 
          />
          } 
        />


          <Route 
            path="/" 
            exact
            render={() => <HomePage 
              authentication={authentication}
              user={userEmail} 
              authenticationFalseHandler={authenticationFalseHandler} 
              userDataHandlerFalse={userDataHandlerFalse} 
              />
            } 
          />
        <Route path={"*"} render={() => <PageNotFound />} />

        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
