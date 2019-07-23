import React from 'react';
import userActivityShape from '../../helpers/data/userActivityShape';

class UserActivityCard extends React.Component {
  static propTypes = {
    userActivity: userActivityShape.userActivityCardShape,
  }

  render() {
    const { userActivity } = this.props;
    return (
      <div className="card user-activity-card">
        <div className="card-body">
          <h5 className="card-title">UID: {userActivity.uid}</h5>
          <h5 className="card-title">ActivityId: {userActivity.activityId}</h5>
          <h5 className="card-title">Date: {userActivity.dateTime}</h5>
          <h5 className="card-title">Notes: {userActivity.notes}</h5>
          <button className="btn btn-info">Edit</button>
          <button className="btn btn-danger">Delete</button>
        </div>
      </div>
    );
  }
}

export default UserActivityCard;
