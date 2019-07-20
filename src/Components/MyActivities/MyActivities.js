import React from 'react';
import firebase from 'firebase/app';

import userActivitiesData from '../../helpers/data/userActivitiesData';
import UserActivityCard from '../UserActivityCard/UserActivityCard';

class MyActivities extends React.Component {
  state = {
    userActivities: [],
  }

  getUserActivities = () => {
    const { uid } = firebase.auth().currentUser;
    userActivitiesData.getUserActivities(uid)
      .then(userActivities => this.setState({ userActivities }))
      .catch(err => console.error('no activities for you dude', err));
  }

  componentDidMount() {
    this.getUserActivities();
  }

  render() {
    const makeUserActivityCards = this.state.userActivities.map(userActivity => (
      <UserActivityCard
        key={userActivity.id}
        userActivity={userActivity}
        />
    ));
    return (
      <div className="user-activities-page">
        <h2>My Activities</h2>
        <div>
          { makeUserActivityCards }
        </div>
      </div>
    );
  }
}

export default MyActivities;
