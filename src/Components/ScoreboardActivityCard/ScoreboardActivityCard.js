import React from 'react';
import Moment from 'react-moment';
// import userActivityShape from '../../helpers/data/userActivityShape';

import activitiesData from '../../helpers/data/activitiesData';
import usersData from '../../helpers/data/usersData';

import './ScoreboardActivityCard.scss';

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
    // const { userActivity } = this.props;
    const { activity, user } = this.state;
    const dateToFormat = this.props.userActivity.dateTime;
    return (
      <div className="card user-activity-card">
        <div className="scoreboard-card-body">
          <div className="image-and-name-container">
            <img className="scoreboard-user-image" src={user.image} alt={user.name} />
            <h5 className="card-title">{user.name}</h5>
          </div>
          <div className="activity-and-date-container">
            <h5 className="card-title scoreboard-activity-name">{activity.name}</h5>
            <h5 className="card-title">Date:
              <Moment format="M/D/YYYY">{dateToFormat}</Moment>
            </h5>
          </div>
          <div className="points-and-label-container">
            <h5 className="scoreboard-activity-points-value">{activity.points}</h5>
            <h5 className="card-title scoreboard-activity-points-label">points</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default ScoreboardActivityCard;
