import axios from 'axios';
import apiKeys from './apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getUsers = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/users.json`)
    .then((resp) => {
      const userResults = resp.data;
      const users = [];
      Object.keys(userResults).forEach((uid) => {
        users.push(userResults[uid]);
      });
      resolve(users);
    })
    .catch(err => reject(err));
});

const getUserInfoByUserId = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then((resp) => {
      const user = resp.data;
      if (Object.keys(user).length > 0) {
        Object.keys(user).forEach((usersId) => {
          user[usersId].id = usersId;
          resolve(user[usersId]);
        });
      }
    })
    .catch(err => reject(err));
});

const addUserToDatabase = userObj => axios.post(`${firebaseUrl}/users.json`, userObj);

const deleteUserFromDatabase = userId => axios.delete(`${firebaseUrl}/users/${userId}.json`);

const editUsersInfo = (userId, userObj) => axios.put(`${firebaseUrl}/users/${userId}.json`, userObj);

export default {
  addUserToDatabase,
  getUsers,
  getUserInfoByUserId,
  deleteUserFromDatabase,
  editUsersInfo,
};
