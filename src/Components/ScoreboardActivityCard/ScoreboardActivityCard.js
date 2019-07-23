import React from 'react';
import userActivityShape from '../../helpers/data/userActivityShape';

class ScoreboardActivityCard extends React.Component {
  static propTypes = {
    userActivity: userActivityShape.scoreboardActivityCardShape,
  }

  render() {
    return (
      <div className="card">
        <h2>BLAH</h2>
      </div>
    );
  }
}

export default ScoreboardActivityCard;
