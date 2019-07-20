import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import usersData from '../../helpers/data/usersData';
import UserProfile from '../UserProfile/UserProfile';

class Home extends React.Component {
  state = {
    user: {
      image: '',
      name: '',
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
    return (
      <div className="Home">
        <UserProfile user={user}/>
      </div>
    );
  }
}

export default Home;
