import React from 'react';

import usersData from '../../helpers/data/usersData';
import activitiesData from '../../helpers/data/activitiesData';
import userActivitiesData from '../../helpers/data/userActivitiesData';
import ScoreboardActivityCard from '../UserActivityCard/UserActivityCard';

import './AllUserActivities.scss';

class AllUserActivities extends React.Component {
  state = {
    userActivities: [],
    activities: [],
    users: [],
  }

  getUsers= () => {
    usersData.getUsers()
      .then(users => this.setState({ users }))
      .catch(err => console.error('no users for you', err));
  }

  getActivities = () => {
    activitiesData.getActivities()
      .then(userActivities => this.setState({ userActivities }))
      .catch(err => console.error('no userActivities for you', err));
  }

  getUserActivities = () => {
    userActivitiesData.getAllUserActivities()
      .then(userActivities => this.setState({ userActivities }))
      .catch(err => console.error('no userActivities for you', err));
  }

  componentDidMount() {
    this.getActivities();
    this.getUsers();
    this.getUserActivities();
  }

  // blahblah = (userActivityObject) => {
  //   const tempUAO = userActivityObject;
  //   const matchingActivity = this.state.activities.find(activity => activity.id === userActivityObject.activityId);
  //   const matchingUser = this.state.users.find(user => user.uid === userActivityObject.uid);
  // };

  // singleUser = this.state.users.find(user => user.uid === userActivi)

  render() {
    const makeScoreboardActivityCards = this.state.userActivities.map(userActivity => (
      <ScoreboardActivityCard
        key={userActivity.id}
        // user={singleUser}
        // activity={singleActivity}
        userActivity={userActivity}
      />
    ));
    return (
      <div className="all-activities-page">
        <h2>All User Activities</h2>
        <div className="activity-cards-container d-flex">
          { makeScoreboardActivityCards }
        </div>
      </div>
    );
  }
}

export default AllUserActivities;
