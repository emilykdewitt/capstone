import React from 'react';
// import PropTypes from 'prop-types';
import userShape from '../../helpers/userShape';

class UserProfile extends React.Component {
  static propTypes = {
    user: userShape.userProfileShape,
  }

  render() {
    const { user } = this.props;
    return (
      <div className="userProfile">
        <img src={user.image} alt="face"></img>
        <h2 className="user-profile-name">{user.name}</h2>
      </div>
    );
  }
}

export default UserProfile;
