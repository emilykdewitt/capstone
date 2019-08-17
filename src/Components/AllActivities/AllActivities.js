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
    const { activities } = this.state;
    this.setState({ filteredActivities: activities });
    const filteredResults = this.state.filteredActivities.filter(activity => activity.name.match(regex));
    if (regex !== '') {
      this.setState({ filteredActivities: filteredResults });
    } else if (regex === '/(?:)/gi') {
      this.setState({ filteredActivities: activities });
    }
  }

  filterByCategory = (e) => {
    e.preventDefault();
    const buttonCategory = e.target.id;
    const regex = new RegExp(buttonCategory, 'gi');
    const { activities } = this.state;
    this.setState({ filteredActivities: activities });
    const filteredResults = this.state.filteredActivities.filter(activity => activity.category.match(regex));
    this.setState({ filteredActivities: filteredResults });
  }

  showAll = (e) => {
    document.getElementById('search-activity-input').value = '';
    activitiesData.getActivities()
      .then(activities => this.setState({ activities, filteredActivities: activities }))
      .catch(err => console.error('unable to reset state', err));
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
        <h2 className="pageTitle">All Activities</h2>
        <label className="searchBoxLabel" htmlFor="search-activity-input">Search for Activity</label>
        <input id="search-activity-input" placeholder="litter" onChange={this.filterActivities}></input>
        <div className="activity-buttons">
          <h5 className="filterByCategoryLabel">Filter by Category:</h5>
          <button id="Household" className="btn btn-info categoryBtn" onClick={this.filterByCategory}>Household</button>
          <button id="Community" className="btn btn-info categoryBtn" onClick={this.filterByCategory}>Community</button>
          <button id="Transportation" className="btn btn-info categoryBtn" onClick={this.filterByCategory}>Transportation</button>
          <button id="Food and Drink" className="btn btn-info categoryBtn" onClick={this.filterByCategory}>Food and Drink</button>
          <button id="Shopping" className="btn btn-info categoryBtn" onClick={this.filterByCategory}>Shopping</button>
          <button className="btn btn-info categoryBtn showAllBtn" onClick={this.showAll}>Show All</button>
        </div>
        <div className="activity-cards-container d-flex align-items-stretch">
          { makeActivityCards }
        </div>
      </div>
    );
  }
}

export default AllActivities;
