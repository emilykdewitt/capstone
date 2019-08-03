import React from 'react';

import activitiesData from '../../helpers/data/activitiesData';
import ActivityCard from '../ActivityCard/ActivityCard';

import './AllActivities.scss';

class AllActivities extends React.Component {
  state = {
    activities: [],
    filteredActivities: [],
  }

  getActivities = () => {
    activitiesData.getActivities()
      .then(activities => this.setState({ activities, filteredActivities: activities }))
      .catch(err => console.error('no activities for you', err));
  }

  filterActivities = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value;
    const regex = new RegExp(searchTerm, 'gi');
    const filteredResults = this.state.filteredActivities.filter(activity => activity.name.match(regex));
    this.setState({ filteredActivities: filteredResults });
  }

  componentDidMount() {
    this.getActivities();
  }

  render() {
    const makeActivityCards = this.state.filteredActivities.map(activity => (
      <ActivityCard
        key={activity.id}
        activity={activity}
      />
    ));
    return (
      <div className="all-activities-page">
        <h2>All Activities</h2>
        <h5>Search for Activity</h5>
        <input placeholder="litter" onChange={this.filterActivities}></input>
        <div className="activity-cards-container d-flex">
          { makeActivityCards }
        </div>
      </div>
    );
  }
}

export default AllActivities;
