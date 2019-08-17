import React from 'react';

import userActivitiesData from '../../helpers/data/userActivitiesData';
// import activitiesData from '../../helpers/data/activitiesData';

import './MyScores.scss';

class MyScores extends React.Component {
  state = {
    userActivities: [],
  }

  getUserActivities = () => {
    const userId = this.props.user.id;
    userActivitiesData.getUserActivities(userId)
      .then(userActivities => this.setState({ userActivities }))
      .catch(err => console.error('no activities for you', err));
  }

  addPointValues = () => {
    this.state.userActivities.forEach((userActivity) => {
      const matchingActivityId = userActivity.activityId;
      console.error(matchingActivityId);
    });
  }

  componentDidMount() {
    this.getUserActivities();
    this.addPointValues();
  }

  // for each userActivity, use the activityId to go through the activities array
  // and get the points value for that activity
  // add the points value of that activity to an array
  // add all values in that array together to get your total score

  render() {
    return (
      <div className="my-scores">
        <h6>Points this week: 27</h6>
        <h6>Points last week: 23</h6>
        <h6>Total points: 128</h6>
      </div>
    );
  }
}

export default MyScores;
