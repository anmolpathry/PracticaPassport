const {getJSON, saveJSON} = require('../utils/fileHelpers');

class User {
  constructor() {
    this.saveData = saveJSON;
    this.fetchData = getJSON;
  }

  async find(id) {
    console.log(id);
    return new Promise(function (resolve, reject){ 
       // fetch the users
       const data = getJSON();
       // found the users
       const foundUser = data.users.find((response) => response.id === id);
       //console.log(data.users);
       console.log("found" + foundUser);
       //   if found return the user
       if (foundUser) return resolve(foundUser);
       else return reject(new Error(`User with id ${id} not found`));
    });
  
  }

  async create(user) {
    //console.log(user);
    // fetch the users
      const data = getJSON();
  
      data.users.push(user);
      // save the users
      this.saveData(data);
      console.log("new user added");
      // return the saved user
      return user;
  }
}

module.exports = new User();