import React from 'react';
import Moment from 'react-moment';
import userActivityShape from '../../helpers/data/userActivityShape';

import activitiesData from '../../helpers/data/activitiesData';
import usersData from '../../helpers/data/usersData';

class UserActivityCard extends React.Component {
  state = {
    activity: {
      name: '',
    },
    user: {
      name: '',
    },
  }

  static propTypes = {
    userActivity: userActivityShape.userActivityCardShape,
  }

  componentDidMount() {
    const matchingActivityId = this.props.userActivity.activityId;
    const matchingUserId = this.props.userActivity.uid;
    activitiesData.getSingleActivity(matchingActivityId)
      .then(activity => this.setState({ activity: activity.data }))
      .catch(err => console.error('no matching activity', err));
    usersData.getUserInfoByUserId(matchingUserId)
      .then(user => this.setState({ user }))
      .catch(err => console.error('no matching user', err));
  }

  render() {
    const { userActivity } = this.props;
    const { activity, user } = this.state;
    const dateToFormat = this.props.userActivity.dateTime;
    return (
      <div className="card user-activity-card">
        <div className="card-body">
          <h5 className="card-title">User: {user.name}</h5>
          <h5 className="card-title">Activity: {activity.name}</h5>
          <h5 className="card-title">Date:
            <Moment format="M/D/YYYY">{dateToFormat}</Moment>
          </h5>
          <h5 className="card-title">Notes: {userActivity.notes}</h5>
          <button className="btn btn-info">Edit</button>
          <button className="btn btn-danger">Delete</button>
        </div>
      </div>
    );
  }
}

export default UserActivityCard;
