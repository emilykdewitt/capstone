import axios from 'axios';

import firebaseConfig from './apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getUserActivities = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/userActivities.json?orderBy="uid"&equalTo="${uid}"`)
    .then((res) => {
      const userActivities = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((fbKey) => {
          res.data[fbKey].id = fbKey;
          userActivities.push(res.data[fbKey]);
        });
      }
      resolve(userActivities);
    })
    .catch(err => reject(err));
});

const deleteUserActivity = userActivityId => axios.delete(`${baseUrl}/userActivities/${userActivityId}.json`);

const getSingleUserActivity = userActivityId => axios.get(`${baseUrl}/userActivities/${userActivityId}.json`);

const postUserActivity = newUserActivity => axios.post(`${baseUrl}/userActivities.json`, newUserActivity);

const putUserActivity = (newUserActivity, userActivityId) => axios.put(`${baseUrl}/userActivities/${userActivityId}.json`, newUserActivity);

export default {
  getUserActivities,
  deleteUserActivity,
  getSingleUserActivity,
  postUserActivity,
  putUserActivity,
};
