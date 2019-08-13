import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';

import userActivitiesData from '../../helpers/data/userActivitiesData';
import activitiesData from '../../helpers/data/activitiesData';

import './AddNewUserActivity.scss';

const defaultUserActivity = {
  uid: '',
  activityId: '',
  dateTime: '',
  notes: '',
};

const defaultActivity = {
  id: '',
  name: '',
  category: '',
  points: '',
};

class AddNewUserActivity extends React.Component {
  state = {
    newUserActivity: defaultUserActivity,
    newActivity: defaultActivity,
  }

  componentDidMount() {
    const activityId = this.props.match.params.id;
    activitiesData.getSingleActivity(activityId)
      .then((activityPromise) => {
        this.setState({ newActivity: activityPromise.data });
      })
      .catch(err => console.error('unable to get single activity', err));
  }

  formFieldStringState = (name, e) => {
    const tempUserActivity = { ...this.state.newUserActivity };
    tempUserActivity[name] = e.target.value;
    this.setState({ newUserActivity: tempUserActivity });
  }

  dateChange = e => this.formFieldStringState('dateTime', e);

  notesChange = e => this.formFieldStringState('notes', e);

  formSubmit = (e) => {
    e.preventDefault();
    const saveMe = { ...this.state.newUserActivity };
    saveMe.uid = firebase.auth().currentUser.uid;
    saveMe.activityId = this.props.match.params.id;
    userActivitiesData.postUserActivity(saveMe)
      .then(() => this.props.history.push('/myactivities'))
      .catch(err => console.error('unable to save', err));
  }

  render() {
    const { newUserActivity, newActivity } = this.state;
    const allActivitiesLink = '/allactivities';
    return (
      <div className="NewUserActivity">
        <h1 className="add-activity-page-title">Add New Activity</h1>
        <h4>Activity: {newActivity.name}</h4>
        <h4>Points: {newActivity.points}</h4>
        <form className="new-activity-form" onSubmit={this.formSubmit}>
          <div className="form-group">
            <label htmlFor="dateTime">Date activity was completed:</label>
            <input
              type="date"
              className="form-control"
              id="dateTime"
              placeholder="11/13/2018"
              value={newUserActivity.dateTime}
              onChange={this.dateChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <input
              type="text"
              className="form-control"
              id="color"
              placeholder="Planted butterfly bushes in my yard"
              value={newUserActivity.notes}
              onChange={this.notesChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Save New Activity</button>
          <Link className="btn btn-danger" to={allActivitiesLink}>Cancel</Link>

        </form>
      </div>
    );
  }
}

export default AddNewUserActivity;
