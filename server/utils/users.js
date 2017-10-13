// [{
//   id: '/#7523543534',
//   name: 'Lance',
//   room:
// }]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

// class Person {

//   constructor (name, room) {
//     this.name = name;
//     this.room = room;
//   }

//   getUserDescription() {
//     return `${this.name} is in the room ${this.room}`;
//   }

// }

// var me = new Person('lance', 'geek');
// console.log(me.getUserDescription());

class Users {

  constructor () {
    this.users = [];
  }

  addUser(id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser(id) {
  
  }

  getUser(id) {

  }

  getUserList(room) {

  }

}

module.exports = {Users};