const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');

// routes
router.post('/authenticate', authenticate);     // public route
router.get('/', authorize([Role.Admin, Role.BlogAdmin]), getAll); // admin only
// router.get('/validate', userExists); // admin only
// router.get('/ga', getAll); // admin only
router.get('/:id', authorize(), getById);       // all authenticated users
router.put('/', authorize(), update);       // all authenticated users
router.put('/status', authorize(), updateStatus);       // all authenticated users
router.post('/', authorize(), create);       // all authenticated users
// router.post('/', createPublicly);       // all authenticated users

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    console.log(req.body);
    userService.updateUser(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function updateStatus(req, res, next) {
    console.log("LLEGO");
    console.log(req.body);
    userService.updateStatus(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Not updated' }))
        .catch(err => next(err));
}

async function create(req, res, next) {
    console.log(req.body);
    let ex = await userService.userExists(req.body);

    // if(ex){
    //     res.json({ message: 'Username or mail already exists' })
    // }else{
    //     userService.createUser(req.body)
    //     .then(user => user ? res.json(user) : res.status(400).json({ message: 'User not created' }))
    //     .catch(err => next(err));
    // }
    userService.createUser(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'User not created' }))
        .catch(err => next(err));    
}

function createPublicly(req, res, next) {
    console.log(req.body);
    userService.createUserAsUser(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}