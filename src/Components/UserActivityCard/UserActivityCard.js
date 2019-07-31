import React from 'react';
import Moment from 'react-moment';
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
import firebase from 'firebase/app';
import 'firebase/auth';
import PropTypes from 'prop-types';
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

  dateChange = e => this.addNewUserForm('dateInput', e);

  noteChange = e => this.addNewUserForm('noteInput', e);

  formSubmit = (e) => {
    e.preventDefault();
    const userToSave = { ...this.state.newItem };
    const userId = firebase.auth().currentUser.uid;
    usersData.editUsersInfo(userId, userToSave)
      .then(() => {
        this.toggle();
      }).catch(err => console.error('no new user saved', err));
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
    return (
      <div className="user-activity-card">
        <div className="card user-activity-card">
          <div className="card-body">
            <h5 className="card-title">{activity.name}</h5>
            <h5 className="card-title">Date:
              <Moment format="M/D/YYYY">{dateToFormat}</Moment>
            </h5>
            <h5 className="card-title">Notes: {userActivity.notes}</h5>
            <button className="btn btn-info">Edit</button>
            <button className="btn btn-danger" onClick={this.deleteMe}>Delete</button>
          </div>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Update Activity</ModalHeader>
        <ModalBody>
          {activity.name}
          {activity.points} points
          <FormGroup>
            <Label for="dateInput">Date</Label>
            <Input
              type="date"
              name="date"
              id="dateInput"
              placeholder="date placeholder"
            />
          </FormGroup>
          <FormGroup>
            <Label for="notesInput">Activity Notes</Label>
            <Input type="textarea" name="text" id="notesInput" />
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

export default UserActivityCard;
