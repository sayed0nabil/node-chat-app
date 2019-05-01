

class Users{
    constructor(){
        this.users = [];
    }
    addUser({id, name, room}){
        const user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
        const index = this.users.findIndex(user => user.id === id);
        if(index === -1){
            console.log('Not Found');
        }else{
            const user = {
                id: this.users[index].id,
                name: this.users[index].name,
                room: this.users[index].room
            };
            this.users.splice(index, 1);
            return user;
        }
    }
    getUser(id){
        const user = this.users.find((user) => user.id === id);
        return user;
    }
    getUserList(room){
        return this.users.filter(user => user.room === room);
    }
}
module.exports = { Users };