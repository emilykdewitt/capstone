import React from 'react';
import activityShape from '../../helpers/data/activityShape';

class ActivityCard extends React.Component {
  static propTypes = {
    activity: activityShape.activityCardShape,
  }

  render() {
    const { activity } = this.props;
    return (
      <div className="scatCard col-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{activity.name}</h5>
            <h5 className="card-title">Category: {activity.category}</h5>
            <h5 className="card-title">Points: {activity.points}</h5>
            <button className="btn btn-info">Select</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ActivityCard;
