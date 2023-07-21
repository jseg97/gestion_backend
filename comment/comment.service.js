// const comments = [
//     { id: 1, userId: 1, content: 'b1Esto es un comentario creado por user 1', blogId: 1, created_at: new Date().toISOString().slice(0, 10), updated_at: new Date().toISOString().slice(0,10)},
//     { id: 2, userId: 2, content: 'b3Esto es un comentario creado por user 2', blogId: 3, created_at: new Date().toISOString().slice(0, 10), updated_at: new Date().toISOString().slice(0,10)},
//     { id: 3, userId: 3, content: 'b2Esto es un comentario creado por user 3', blogId: 2, created_at: new Date().toISOString().slice(0, 10), updated_at: new Date().toISOString().slice(0,10)},    
//     { id: 4, userId: 3, content: 'b2Esto es un comentario creado por user 3', blogId: 2, created_at: new Date().toISOString().slice(0, 10), updated_at: new Date().toISOString().slice(0,10)}    
// ];

const { Pool } = require('pg');

let comments=[];
module.exports = {
    getAll,
    updateComment,
    createComment,
    inactiveComment
};

const pool = new Pool({
    user: 'postgres',
    host: 'localhost', // Replace this with your PostgreSQL host
    database: 'postgres',
    password: 'postgres',
    port: 5432, // Default PostgreSQL port is 5432
    max: 20
});

async function getAll() {
    const res = await pool.query(`SELECT c.*, u."firstName" first_name FROM comments c INNER JOIN users u ON c.user_create = u.id`);
    comments = res.rows;
    return comments;
}

async function updateComment(commentData) {
    
    const res = await pool.query(`UPDATE comments c SET content=$1, updated=$2, user_update=$3 WHERE c.id=$4`,[commentData.content, new Date().toISOString().slice(0, 10), commentData.userId, commentData.id]);

    return true;
}

async function createComment(commentData) {
    console.log("Create");
    console.log(commentData);
    let comment = {};

    comment["userId"] = commentData.userId;
    comment["content"] = commentData.content;
    comment["blogId"] = commentData.blogId;
    comment["created_at"] = new Date().toISOString().slice(0, 10);


    try {
        const res  = await pool.query(`INSERT INTO comments (content, created, user_create, blog_id) VALUES ($1,$2,$3,$4)`,[comment.content, comment.created_at, comment.userId, comment.blogId] )
        comments.push(comment);
    }catch(e) {    
        return {"success": false, "message":e.message}
    };

    return { "success": true, "message":"created successfully", "data": comments};;
}

async function inactiveComment(commentData) {
   
    const res = await pool.query(`UPDATE blog SET is_active=$1, updated=$2, user_update=$3 WHERE id=$4`, ['N', new Date().toISOString().slice(0, 10), commentData.user_update, comment.id]);
    return true;
}

