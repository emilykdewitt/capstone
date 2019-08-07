import React from 'react';

import userActivitiesData from '../../helpers/data/userActivitiesData';

import ScoreboardActivityCard from '../ScoreboardActivityCard/ScoreboardActivityCard';

import './AllUserActivities.scss';

class AllUserActivities extends React.Component {
  state = {
    userActivities: [],
  }

  getUserActivities = () => {
    userActivitiesData.getAllUserActivities()
      .then(userActivities => this.setState({ userActivities }))
      .catch(err => console.error('no activities for you', err));
  }

  componentDidMount() {
    this.getUserActivities();
  }

  render() {
    const makeUserActivityCards = this.state.userActivities.map(userActivity => (
      <ScoreboardActivityCard
        key={userActivity.id}
        userActivity={userActivity}
      />
    ));
    return (
      <div className="all-activities-page">
        { makeUserActivityCards }
      </div>
    );
  }
}

export default AllUserActivities;
