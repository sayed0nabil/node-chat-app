

const { Users } = require('./users');


describe('Users', () => {
    it('Should Add New User', () => {
        const users = new Users();
        const user = {
            id: 1,
            name: 'Sayed',
            room: 'A'
        }
        const returnUser = users.addUser(user);
        const getUser = users.getUser(1);
        if(user.name === returnUser.name && user.id === returnUser.id && user.room === returnUser.room)
            return 'Success';
        else
            throw new Error('Not Equal');

    })
    it('Should Remove User', () => {
        const users = new Users();
        users.addUser({
            id: 1,
            name: 'Sayed',
            room: 'A'
        });
        users.addUser({
            id: 2,
            name: 'Mo',
            room: 'B'
        });
        users.addUser({
            id: 3,
            name: 'Islam',
            room: 'A'
        });
        // const removedUser = users.removeUser(2);
        const roomUsers = users.getUserList('A');
        console.log(roomUsers);
    })
});