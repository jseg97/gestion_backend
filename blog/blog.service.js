const fs = require('fs');
const pool = require('../config/db');

let blogs = [];

module.exports = {
    getAll,
    getById,
    updateBlog,
    createBlog,
    inactiveBlog
};

async function getAll() {
    console.log("List");
    const res = await pool.query(`SELECT b.*, u."firstName", u.id user_id FROM blog b INNER JOIN users u ON b.user_created = u.id`);
    blogs = res.rows
    console.log("Afuera: ");

    return blogs;
}

async function getById(id) {
    const res = await pool.query(`SELECT * FROM blog b where b.id = $1`,[id]);
    console.log(res.rows);
    return res.rows[0];
}

async function updateBlog(blogData) {
    console.log("Update");
    let blog = await this.getById(blogData.id);
    if(!blogData.is_active){
        blogData["is_active"]=blog.is_active;
    }

    blogData["updated"] = new Date().toISOString().slice(0, 10);
    console.log("List");
    const res = await pool.query(`UPDATE blog SET title=$1, description=$2, content=$3, updated=$4, user_updated=$5, is_active=$6 WHERE id=$7`, [blogData.title, blogData.description, blogData.content, blogData.updated, blogData.user_updated, blogData.is_active, blogData.id]);


    return true;
}

async function createBlog(blogData) {
    console.log("Create");
    console.log(blogData);
    let blog = {};

    // blog["id"] = blogData.id;
    blog["title"] = blogData.title;
    blog["content"] = blogData.content;
    blog["description"] = blogData.description;
    blog["created"] = new Date().toISOString().slice(0, 10);
    blog["user_created"] = blogData.user_created;

    try {
        const res = await pool.query(`INSERT INTO blog (title, description, content, created, user_created) VALUES ($1, $2, $3, $4, $5)`, [blog.title, blog.description, blog.content, blog.created, blog.user_created]);
        blogs.push(blog);
    } catch (e) {
        return { "success": false, "message": e.message };
    }
    return { "success": true, "message":"created successfully", "data": blogs};
}

async function inactiveBlog(blogData) {
    let blog;
    const res = await pool.query(`UPDATE blog SET is_active=$1, updated=$2, user_updated=$3 WHERE id=$4`, ['N', new Date().toISOString().slice(0, 10), blogData.user_update, blogData.id]);


    return true;
}

