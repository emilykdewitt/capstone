import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
}
  from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import Home from '../Components/Home/Home';
import Auth from '../Components/Auth/Auth';
import MyNavbar from '../Components/MyNavbar/MyNavbar';
import MyActivities from '../Components/MyActivities/MyActivities';
import AllActivities from '../Components/AllActivities/AllActivities';
import Scoreboard from '../Components/Scoreboard/Scoreboard';
import EditUserActivityCard from '../Components/EditUserActivityCard/EditUserActivityCard';
import AddNewUserActivity from '../Components/AddNewUserActivity/AddNewUserActivity';
import NewUser from '../Components/NewUser/NewUser';

import usersData from '../helpers/data/usersData';

import './App.scss';

import firebaseConnect from '../helpers/data/firebaseConnect';

firebaseConnect();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } } }/>)
  );
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } } }/>)
  );
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
    userObj: {
      name: '',
    },
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  getUser = () => {
    if (this.state.authed) {
      const firebaseId = firebase.auth().currentUser.uid;
      usersData.getUserInfoByUserId(firebaseId)
        .then(userObj => this.setState({ userObj }))
        .catch(err => console.error('trouble fetching user data', err));
    }
  }

  createUser = (saveMe) => {
    usersData.addUserToDatabase(saveMe)
      .then(() => {
        this.getUser();
      })
      .catch();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed} />
            <div className="container">
              <Switch>
                <PublicRoute path='/auth' component={Auth} authed={authed} />
                <Route path='/new-user' component={NewUser} authed={authed} createUser={ this.createUser }/>
                <PrivateRoute path='/home' component={Home} authed={authed} />
                <PrivateRoute path='/myactivities' component={MyActivities} authed={authed} />
                <PrivateRoute path='/allactivities' component={AllActivities} authed={authed} />
                <PrivateRoute path='/scoreboard' component={Scoreboard} authed={authed} />
                <PrivateRoute path='/edit/:id' component={EditUserActivityCard} authed={authed} />
                <PrivateRoute path='/add/:id' component={AddNewUserActivity} authed={authed} />
                <Redirect from="*" to="/auth" />
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
