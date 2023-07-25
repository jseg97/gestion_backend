const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('_helpers/role');
const { Pool } = require('pg');
const fs = require('fs');

// users hardcoded for simplicity, store in a db for production applications
// const users = [
//     { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', email: 'gerencia@gthca.com', role: Role.Admin },
//     { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', email: 'user@hotmail.com', role: Role.User },
//     { id: 3, username: 'blogger', password: 'blogger2023', firstName: 'Blogger', lastName: 'Blogger', email: 'caviles@gthca.com', role: Role.BlogAdmin },
// ];

let users = [];
const pool = new Pool({
    user: 'doadmin',
    host: 'db-postgresql-nyc3-55749-do-user-14409895-0.b.db.ondigitalocean.com', // Replace this with your PostgreSQL host
    database: 'postgres',
    password: 'AVNS_u6LrVShOfxUpCg4WnGL',
    port: 25060, // Default PostgreSQL port is 5432
    max: 20,
    ssl: {
        ca: fs.readFileSync('./ca-certificate.crt'),
    }
});

module.exports = {
    authenticate,
    getAll,
    getById,
    createUser,
    updateUser,
    createUserAsUser,
    userExists,
    updateStatus
};

async function authenticate({ username, password }) {
    console.log({ username, password });
    await getAll();
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
    pool.query("SELECT * FROM USERS", (err, res) => {
        // console.log("LLEGO" + res.rowCount);
        // console.log(res.rows);
        // pool.end();
        if(res !== undefined)
            users = res.rows;
    });
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

async function userExists(userData){
    let exists=false;

    const username = await users.find(u => u.username === userData.username);
    const mail = await users.find(u => u.email === userData.email);

    if(username){
        return true;
    }

    if(mail){
        return true;
    }

    return false;
}

async function updateUser(userData) {
    // getAll();
    //console.log(users);
    let user;
    user = users.filter(function (b) {
        return b.id === userData.id;
    });
    user = user[0];
    //console.log(user);
    user.id = user.id;
    user.username = userData.username;
    user.password = userData.password;
    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    user.email = userData.email;
    user.role = userData.role;
    user.is_active = userData.is_active;

    pool.query(`UPDATE users SET username=$1, password=$2, "firstName"=$3, "lastName"=$4, email=$5, role=$6 WHERE id=$7`, [user.username, user.password, user.firstName, user.lastName, user.email, user.role, user.id], (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        return res.rows ? res.rows : users;
    });
    //console.log("SERVICE");
    //console.log(user);

    return user;
}

async function updateStatus(userData) {
    // getAll();
    //console.log(users);
    let user;
    user = users.find(function (b) {
        return b.id === userData.id;
    });
    //console.log(user);
    
    user.is_active = userData.is_active;

    pool.query(`UPDATE users SET is_active=$1 WHERE id=$2`, [user.is_active, user.id], (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        return res.rows ? res.rows : users;
    });

    return user;
}


async function createUser(userData) {
    let user = {};
    console.log("CREANDO");
    console.log(userData);
    user["username"] = userData.username;
    user["password"] = userData.password;
    user["firstName"] = userData.firstName;
    user["lastName"] = userData.lastName;
    user["email"] = userData.email;
    user["role"] = userData.role;

    console.log("CREANDO");
    console.log(user);

    pool.query(`INSERT INTO users (username, password, "firstName", "lastName", email, role) VALUES ($1, $2, $3, $4, $5, $6)`, [user.username, user.password, user.firstName, user.lastName, user.email, user.role], (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        return res.rows ? res.rows : users;
    });

    return user;
}

async function createUserAsUser(userData) {
    let user = {};
    user["username"] = userData.username;
    user["password"] = userData.password;
    user["firstName"] = userData.firstName;
    user["lastName"] = userData.lastName;
    user["email"] = userData.email;
    user["role"] = Role.User;

    pool.query(`INSERT INTO users (username, password, "firstName", "lastName", email, role) VALUES ($1, $2, $3, $4, $5, $6)`, [user.username, user.password, user.firstName, user.lastName, user.email, user.role], (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        return res.rows ? res.rows : users;
    });

    return user;
}

getAll();