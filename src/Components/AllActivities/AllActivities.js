import React from 'react';

import activitiesData from '../../helpers/data/activitiesData';
import ActivityCard from '../ActivityCard/ActivityCard';

import './AllActivities.scss';

class AllActivities extends React.Component {
  state = {
    activities: [],
  }

  getActivities = () => {
    activitiesData.getActivities()
      .then(activities => this.setState({ activities }))
      .catch(err => console.error('no activities for you', err));
  }

  componentDidMount() {
    this.getActivities();
  }

  render() {
    const makeActivityCards = this.state.activities.map(activity => (
      <ActivityCard
        key={activity.id}
        activity={activity}
      />
    ));
    return (
      <div className="all-activities-page">
        <h2>All Activities</h2>
        <div className="activity-cards-container d-flex">
          { makeActivityCards }
        </div>
      </div>
    );
  }
}

export default AllActivities;
