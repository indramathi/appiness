import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  /**
   * Get User Data
   * - Will return requested user details.
   * @param id 
   */
  getUserData(id) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find(obj => obj.id === Number(id));
  }

  /**
   * Set User
   * - Will set the user to local storage with email address validation.
   * @param user 
   */
  setUser(user) {
    return new Promise((resolve, reject) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      try {
        const checkEmail = users.find(obj => obj.email === user.email);
        if(checkEmail) {
          reject('Email address already exist.');
        } else {
          let id = 1;
          if (users[0]) {
            const user = users[0];
            id = user.id + 1;
          }
          user.id = id;
          users.unshift(user);
          localStorage.setItem('users', JSON.stringify(users));
        }
        resolve(users);
      } catch (error) {
        reject('Technical error.');
      }
    });
  }

  /**
   * Do Authentication
   * - Will use for login authentication and will return promise.
   * @param data 
   */
  doAuthentication(data) {
    return new Promise((resolve, reject) => {
      try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const findUser = users.find(obj => obj.email === data.email && obj.password === data.password);
        if (findUser) {
          resolve({
            data: findUser,
            message: 'Welcome, ' + findUser.name
          });
        } else {
          reject('Unauthorised user.');
        }
      } catch (error) {
        reject('Technical error.');
      }
    })
  }
}
