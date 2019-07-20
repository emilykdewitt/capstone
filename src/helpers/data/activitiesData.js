import axios from 'axios';

import firebaseConfig from './apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getActivities = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/activities.json`)
    .then((res) => {
      const activities = [];
      Object.keys(res.data).forEach((fbKey) => {
        res.data[fbKey].id = fbKey;
        activities.push(res.data[fbKey]);
      });
      resolve(activities);
    })
    .catch(err => reject(err));
});

const getSingleActivity = activityId => axios.get(`${baseUrl}/activities/${activityId}.json`);

export default {
  getActivities,
  getSingleActivity,
};
