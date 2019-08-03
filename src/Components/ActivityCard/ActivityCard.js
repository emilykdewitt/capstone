import React from 'react';
import { Link } from 'react-router-dom';

import activityShape from '../../helpers/data/activityShape';

class ActivityCard extends React.Component {
  static propTypes = {
    activity: activityShape.activityCardShape,
  }

  render() {
    const { activity } = this.props;
    const addLink = `/add/${activity.id}`;
    return (
      <div className="activityCard col-lg-4 col-md-6 col-sm-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{activity.name}</h5>
            <h5 className="card-title">Category: {activity.category}</h5>
            <h5 className="card-title">Points: {activity.points}</h5>
            <Link className="btn btn-info" to={addLink}>Add Activity</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ActivityCard;
