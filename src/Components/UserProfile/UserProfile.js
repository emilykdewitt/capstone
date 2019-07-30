import React from 'react';
// import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import userShape from '../../helpers/userShape';
import usersData from '../../helpers/data/usersData';

import './UserProfile.scss';

const defaultState = {
  name: '',
  location: '',
  image: '',
};

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      newItem: defaultState,
      user: {
        image: '',
        location: '',
        name: '',
      },
    };
    this.toggle = this.toggle.bind(this);
  }

  static propTypes = {
    user: userShape.userProfileShape,
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  addNewUserForm = (name, e) => {
    const tempItem = { ...this.state.newItem };
    tempItem[name] = e.target.value;
    this.setState({ newItem: tempItem });
  };

  nameChange = e => this.addNewUserForm('usernameInput', e);

  locationChange = e => this.addNewUserForm('locationInput', e);

  imageChange = e => this.addNewUserForm('imageInput');

  formSubmit = (e) => {
    e.preventDefault();
    const userToSave = { ...this.state.newItem };
    const userId = firebase.auth().currentUser.uid;
    usersData.editUsersInfo(userId, userToSave)
      .then(() => {
        this.toggle();
      }).catch(err => console.error('no new user saved', err));
  }

  render() {
    const { user } = this.props;
    return (
      <div className="userProfile">
        <img className="user-profile-image" src={user.image} alt="face"></img>
        <h2 className="user-profile-name">{user.name}</h2>
        <button className="btn btn-danger" onClick={this.toggle}>Edit Profile</button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Update Profile</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="usernameInput">Name</Label>
              <Input
                type="text"
                name="text"
                id="usernameInput"
                className="form-control"
                aria-describedby="username"
                placeholder="Full name"
                defaultValue={user.name}
                onChange={this.nameChange}
                />
            </FormGroup>
            <FormGroup>
              <Label for="locationInput">Location</Label>
              <Input
                type="text"
                name="text"
                id="locationInput"
                className="form-control"
                aria-describedby="user location"
                placeholder="Location"
                defaultValue={user.location}
                onChange={this.locationChange}
                />
            </FormGroup>
            <FormGroup>
              <Label for="imageInput">Image URL</Label>
              <Input
                type="text"
                name="text"
                id="imageInput"
                className="form-control"
                aria-describedby="user image URL"
                placeholder="https://www.google.com/bird.png"
                defaultValue={user.image}
                onChange={this.imageChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.formSubmit}>Save Changes</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default UserProfile;
