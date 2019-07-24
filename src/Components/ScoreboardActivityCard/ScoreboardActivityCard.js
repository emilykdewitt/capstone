import React from 'react';
// import userActivityShape from '../../helpers/data/userActivityShape';

import activitiesData from '../../helpers/data/activitiesData';
import usersData from '../../helpers/data/usersData';

class ScoreboardActivityCard extends React.Component {
  _isMounted = false;

  state = {
    activity: {
      name: '',
    },
    user: {
      name: '',
    },
  }

  componentDidMount() {
    // eslint-disable-next-line no-underscore-dangle
    this._isMounted = true;
    const matchingActivityId = this.props.userActivity.activityId;
    const matchingUserId = this.props.userActivity.uid;
    activitiesData.getSingleActivity(matchingActivityId)
      .then((activity) => {
        // eslint-disable-next-line no-underscore-dangle
        if (this._isMounted === true) {
          this.setState({ activity: activity.data });
        }
      })
      .catch(err => console.error('no matching activity', err));
    usersData.getUserInfoByUserId(matchingUserId)
      .then(user => this.setState({ user }))
      .catch(err => console.error('no matching user', err));
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-underscore-dangle
    this._isMounted = false;
  }

  render() {
    const { userActivity } = this.props;
    const { activity, user } = this.state;
    return (
      <div className="card user-activity-card">
        <div className="card-body">
          <h5 className="card-title">User: {user.name}</h5>
          <h5 className="card-title">Activity: {activity.name}</h5>
          <h5 className="card-title">Date: {userActivity.dateTime}</h5>
          <h5 className="card-title">Points: {activity.points}</h5>
        </div>
      </div>
    );
  }
}

export default ScoreboardActivityCard;
