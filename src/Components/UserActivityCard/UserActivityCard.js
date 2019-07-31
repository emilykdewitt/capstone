import React from 'react';
import Moment from 'react-moment';
import 'firebase/auth';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import userActivityShape from '../../helpers/data/userActivityShape';

import activitiesData from '../../helpers/data/activitiesData';
import usersData from '../../helpers/data/usersData';

class UserActivityCard extends React.Component {
  state = {
    activity: {
      name: '',
    },
  }

  static propTypes = {
    userActivity: userActivityShape.userActivityCardShape,
    deleteUserActivity: PropTypes.func.isRequired,
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

  deleteMe = (e) => {
    e.preventDefault();
    const { userActivity, deleteUserActivity } = this.props;
    deleteUserActivity(userActivity.id);
  };

  render() {
    const { userActivity } = this.props;
    const { activity } = this.state;
    const dateToFormat = this.props.userActivity.dateTime;
    const editLink = `/edit/${userActivity.id}`;
    return (
      <div className="user-activity-card">
        <div className="card user-activity-card">
          <div className="card-body">
            <h5 className="card-title">{activity.name}</h5>
            <h5 className="card-title">Date:
              <Moment format="M/D/YYYY">{dateToFormat}</Moment>
            </h5>
            <h5 className="card-title">Notes: {userActivity.notes}</h5>
            <Link className="btn btn-info" to={editLink}>Edit</Link>
            <button className="btn btn-danger" onClick={this.deleteMe}>Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserActivityCard;
