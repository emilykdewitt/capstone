import React from 'react';

import usersData from '../../helpers/data/usersData';
import activitiesData from '../../helpers/data/activitiesData';
import userActivitiesData from '../../helpers/data/userActivitiesData';

import AllUserActivities from '../AllUserActivities/AllUserActivities';

class Scoreboard extends React.Component {
  state = {
    userActivities: '',
    activities: '',
    users: '',
  }

  getUsers= () => {
    usersData.getUsers()
      .then(users => this.setState({ users }))
      .catch(err => console.error('no users for you', err));
  }

  getActivities = () => {
    activitiesData.getActivities()
      .then(activities => this.setState({ activities }))
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

  render() {
    const {
      users,
      activities,
      userActivities,
    } = this.state;
    return (
      <div className="Scoreboard">
        <h2>Scoreboard!</h2>
        <AllUserActivities
          users={users}
          activities={activities}
          userActivities={userActivities}
        />
      </div>
    );
  }
}

export default Scoreboard;
