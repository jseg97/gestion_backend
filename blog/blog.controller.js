﻿const express = require('express');
const router = express.Router();
const blogService = require('./blog.service');
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');

// routes
// router.post('/authenticate', authenticate);     // public route
router.get('/', getAll); // admin only
router.get('/:id', getById); // admin only
router.put('/', authorize([Role.BlogAdmin, Role.Admin]), updateBlog);
router.post('/', authorize([Role.BlogAdmin, Role.Admin]), createBlog);
router.delete('/', authorize([Role.BlogAdmin, Role.Admin]), inactiveBlog);
// router.get('/:id', authorize(), getById);       // all authenticated users
module.exports = router;


function getAll(req, res, next) {
    blogService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    const id = parseInt(req.params.id);
    console.log(id);
    blogService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));

}

function updateBlog(req, res, next) {
    let query = req.query;
    let body = req.body;
    console.log(body);
    let headers = req.headers;
    blogService.updateBlog(body)
    .then((b) => {
        console.log("CONTROLLER");
        console.log(JSON.stringify(b));
        res.json({'success': b});
        
    }).catch(err => next(err));
    
}

function createBlog(req, res, next) {
    let query = req.query;
    let body = req.body;
    console.log("CONTROLLER");
    console.log(body);
    let headers = req.headers;
    blogService.createBlog(body)
    .then((b) => {
        console.log("CONTROLLER");
        console.log(JSON.stringify(b));
        res.json(b);
    }).catch(err => next(err));
    
}

function inactiveBlog(req, res, next) {
    let query = req.query;
    let body = req.body;
    console.log(body);
    let headers = req.headers;
    blogService.inactiveBlog(body)
    .then((b) => {
        console.log("CONTROLLER");
        console.log(JSON.stringify(b));
        res.json({'success': b});
        
    }).catch(err => next(err));
    
}

