import React from 'react';
import firebase from 'firebase/app';
import { Link } from 'react-router-dom';

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
    const allActivitiesLink = '/allactivities';
    const makeUserActivityCards = this.state.userActivities.map(userActivity => (
      <UserActivityCard
        key={userActivity.id}
        userActivity={userActivity}
        />
    ));
    return (
      <div className="user-activities-page">
        <h2>My Activities</h2>
        <Link className="btn btn-primary all-activities-btn" to={allActivitiesLink}>Add New Activity</Link>
        <div>
          { makeUserActivityCards }
        </div>
      </div>
    );
  }
}

export default MyActivities;
