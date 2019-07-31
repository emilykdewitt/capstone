import React from 'react';
import { Link } from 'react-router-dom';

import userActivitiesData from '../../helpers/data/userActivitiesData';
import activitiesData from '../../helpers/data/activitiesData';

import './EditUserActivityCard.scss';

const defaultUserActivity = {
  activityId: '',
  uid: '',
  dateTime: '',
  notes: '',
};

const defaultActivity = {
  id: '',
  name: '',
  category: '',
  points: '',
};

class EditUserActivityCard extends React.Component {
  state = {
    newUserActivity: defaultUserActivity,
    newActivity: defaultActivity,
  }

  componentDidMount() {
    const userActivityId = this.props.match.params.id;
    userActivitiesData.getSingleUserActivity(userActivityId)
      .then((userActivityPromise) => {
        const targetActivityId = userActivityPromise.data.activityId;
        this.setState({ newUserActivity: userActivityPromise.data });
        activitiesData.getSingleActivity(targetActivityId)
          .then((activityPromise) => {
            this.setState({ newActivity: activityPromise.data });
          })
          .catch(err => console.error('boo hiss', err));
      })
      .catch(err => console.error('failed to get userActivity', err));
  }

  formSubmit = (e) => {
    e.preventDefault();
    const saveMe = { ...this.state.newUserActivity };
    const userActivityId = this.props.match.params.id;
    userActivitiesData.putUserActivity(saveMe, userActivityId)
      .then(() => this.props.history.push('/myactivities'))
      .catch(err => console.error('unable to save', err));
  }

  formFieldStringState = (name, e) => {
    const tempUserActivity = { ...this.state.newUserActivity };
    tempUserActivity[name] = e.target.value;
    this.setState({ newUserActivity: tempUserActivity });
  }

  dateChange = e => this.formFieldStringState('dateTime', e);

  notesChange = e => this.formFieldStringState('notes', e);

  render() {
    const { newUserActivity } = this.state;
    const { newActivity } = this.state;
    const myActivitiesLink = '/myactivities';

    return (
      <div className="EditCardContainer">
        <h2>Edit User Activity</h2>
        <div className="card EditUserActivityCard">
          <h5>Activity: {newActivity.name}</h5>
          <h5>Category: {newActivity.category}</h5>
          <h5>Points: {newActivity.points}</h5>
          <form onSubmit={this.formSubmit}>
            <div className="form-group">
              <label htmlFor="activity-date">Date</label>
              <input
                type="date"
                id="activity-date"
                value={newActivity.date}
                onChange={this.dateChange}
              >
              </input>
            </div>
            <div className="form-group">
              <label htmlFor="activity-notes">Notes</label>
              <input
                type="text"
                className="form-control"
                id="activity-notes"
                value={newUserActivity.notes}
                onChange={this.notesChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Save Updated User Activity</button>
            <Link className="btn btn-danger" to={myActivitiesLink}>Cancel</Link>
          </form>
        </div>
      </div>
    );
  }
}

export default EditUserActivityCard;
