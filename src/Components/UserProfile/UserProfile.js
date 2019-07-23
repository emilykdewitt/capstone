import React from 'react';
// import PropTypes from 'prop-types';
import userShape from '../../helpers/userShape';

import './UserProfile.scss';

class UserProfile extends React.Component {
  static propTypes = {
    user: userShape.userProfileShape,
  }

  render() {
    const { user } = this.props;
    return (
      <div className="userProfile">
        <img className="user-profile-image" src={user.image} alt="face"></img>
        <h2 className="user-profile-name">{user.name}</h2>
        <p>{user.uid}</p>
      </div>
    );
  }
}

export default UserProfile;
