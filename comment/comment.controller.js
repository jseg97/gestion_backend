const express = require('express');
const router = express.Router();
const commentService = require('./comment.service');
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');

// routes
// router.post('/authenticate', authenticate);     // public route
router.get('/',  getAll); // admin only
router.put('/',  updateComment);
router.post('/', createComment);
router.delete('/',  inactiveComment);
// router.get('/:id', authorize(), getById);       // all authenticated users
module.exports = router;


function getAll(req, res, next) {
    commentService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function updateComment(req, res, next) {
    let query = req.query;
    let body = req.body;
    console.log(body);
    let headers = req.headers;
    commentService.updateComment(body)
    .then((b) => {
        console.log("CONTROLLER");
        console.log(JSON.stringify(b));
        res.json(b);
    }).catch(err => next(err));
    
}

function createComment(req, res, next) {
    let query = req.query;
    let body = req.body;
    console.log("CONTROLLER");
    console.log(body);
    let headers = req.headers;
    commentService.createComment(body)
    .then((b) => {
        console.log("CONTROLLER");
        console.log(JSON.stringify(b));
        res.json(b);
    }).catch(err => next(err));
    
}

function inactiveComment(req, res, next) {
    let query = req.query;
    let body = req.body;
    console.log(body);
    let headers = req.headers;
    commentService.inactiveComment(body)
    .then((b) => {
        console.log("CONTROLLER");
        console.log(JSON.stringify(b));
        res.json({'success': b});
        
    }).catch(err => next(err));
    
}
