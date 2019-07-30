import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';

import usersData from '../../helpers/data/usersData';
import UserProfile from '../UserProfile/UserProfile';

import './Home.scss';

class Home extends React.Component {
  state = {
    user: {
      image: '',
      name: '',
      uid: '',
      location: '',
    },
  }

  getUserInfoByUserId = () => {
    const { uid } = firebase.auth().currentUser;
    usersData.getUserInfoByUserId(uid)
      .then(userPromise => this.setState({ user: userPromise }))
      .catch(err => console.error('cannot get user info', err));
  }

  componentDidMount() {
    this.getUserInfoByUserId();
  }

  render() {
    const { user } = this.state;
    const myActivitiesLink = '/myactivities';
    const allActivitiesLink = '/allactivities';
    const scoreboardLink = '/scoreboard';

    return (
      <div className="Home">
        <UserProfile key={user.uid} user={user}/>
        <Link className="btn btn-info my-activities-btn" to={myActivitiesLink}>My Activities</Link>
        <Link className="btn btn-primary all-activities-btn" to={allActivitiesLink}>All Activities</Link>
        <Link className="btn btn-warning scoreboard-btn" to={scoreboardLink}>Scoreboard</Link>
      </div>
    );
  }
}

export default Home;
