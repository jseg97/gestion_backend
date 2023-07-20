const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('_helpers/role');

// users hardcoded for simplicity, store in a db for production applications
const users = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', email: 'gerencia@gthca.com', role: Role.Admin },
    { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', email: 'user@hotmail.com', role: Role.User },
    { id: 3, username: 'blogger', password: 'blogger2023', firstName: 'Blogger', lastName: 'Blogger', email: 'caviles@gthca.com', role: Role.BlogAdmin },
];

module.exports = {
    authenticate,
    getAll,
    getById,
    createUser,
    updateUser
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        const { password, ...userWithoutPassword } = user;
        console.log("autenticado");
        return {
            
            ...userWithoutPassword,
            token
        };
    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

async function getById(id) {
    const user = users.find(u => u.id === parseInt(id));
    if (!user) return;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

async function updateUser(userData) {
    console.log("Update");
    let user;

    user = users.filter(function(b) { 
        return b.id === userData.id;
    })[0];

    console.log(user);
    
    user.id = user.id;
    user.username = userData.username;
    user.password = userData.password;
    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    user.email = userData.email;
    user.role = userData.role;

    console.log("SERVICE");
    console.log(user);

    return user;
}

async function createUser(userData) {
    console.log("Create");
    console.log(userData);
    let user = {};

    user["id"] = userData.id;
    user["username"] = userData.username;
    user["password"] = userData.password;
    user["firstName"] = userData.firstName;
    user["lastName"] = userData.lastName;
    user["email"] = userData.email;
    user["role"] = userData.role;

    console.log("Paso");
    users.push(user)
    console.log(user);

    console.log("SERVICE");
    console.log(JSON.stringify(user));

    return users;
}