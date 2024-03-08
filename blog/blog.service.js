const { Pool } = require('pg');
const fs = require('fs');
const config = require('../config.js');
// const blogs = [
//     { id: 1, title: 'Este es un titulo de" blog plena', description: 'Descripcion de este blog', content: 'texto 11111111111111111bla bla bla bla', created_at: new Date().toISOString().slice(0, 10), updated_at: new Date().toISOString().slice(0,10)},
//     { id: 2, title: 'Este es un titulo de blog 2 oss', description: 'Descripcion de este blog', content: 'texto 22222222222222222bla bla bla bla' , created_at: new Date().toISOString().slice(0, 10), updated_at: new Date().toISOString().slice(0,10)},
//     { id: 3, title: 'Este es un titulo de blog 3 meen', description: 'Descripcion de este blog', content: 'texto 333333333333333bla bla bla bla' , created_at: new Date().toISOString().slice(0, 10), updated_at: new Date().toISOString().slice(0,10)},
//     { id: 4, title: 'Este es un titulo de" blog plena', description: 'Descripcion de este blog', content: 'texto 11111111111111111bla bla bla bla', created_at: new Date().toISOString().slice(0, 10), updated_at: new Date().toISOString().slice(0,10)},
//     { id: 5, title: 'Este es un titulo de blog 2 oss', description: 'Descripcion de este blog', content: 'texto 22222222222222222bla bla bla bla' , created_at: new Date().toISOString().slice(0, 10), updated_at: new Date().toISOString().slice(0,10)},
//     { id: 6, title: 'Este es un titulo de blog 3 meen', description: 'Descripcion de este blog', content: 'texto 333333333333333bla bla bla bla' , created_at: new Date().toISOString().slice(0, 10), updated_at: new Date().toISOString().slice(0,10)} ,
//     { id: 7, title: 'Este es un titulo de" blog plena', description: 'Descripcion de este blog', content: 'texto 11111111111111111bla bla bla bla', created_at: new Date().toISOString().slice(0, 10), updated_at: new Date().toISOString().slice(0,10)},
//     { id: 8, title: 'Este es un titulo de blog 2 oss', description: 'Descripcion de este blog', content: 'texto 22222222222222222bla bla bla bla' , created_at: new Date().toISOString().slice(0, 10), updated_at: new Date().toISOString().slice(0,10)},
//     { id: 9, title: 'Este es un titulo de blog 3 meen', description: 'Descripcion de este blog', content: 'texto 333333333333333bla bla bla bla' , created_at: new Date().toISOString().slice(0, 10), updated_at: new Date().toISOString().slice(0,10)}     
// ];

let blogs = [];

module.exports = {
    getAll,
    getById,
    updateBlog,
    createBlog,
    inactiveBlog
};

const pool = new Pool({
    user: 'postgres',
    host: '172.17.0.2', // Replace this with your PostgreSQL host
    database: 'postgres',
    password: 'postgres',
    port: 5432, // Default PostgreSQL port is 5432
    max: 20
});

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

