const fs = require('fs');
const pool = require('../config/db');

let comments=[];
module.exports = {
    getAll,
    updateComment,
    createComment,
    inactiveComment,
    getFromBlogId,
    getCommentById
};

async function getAll() {
    try{
        const res = await pool.query(`SELECT c.*, u."firstName" first_name FROM comments c INNER JOIN users u ON c.user_create = u.id`);
        comments = res.rows;
        return comments;
    }catch(e){
        console.error('Error fetching comments:', err);
        throw err;
    }    
}

// const res = await pool.query(`SELECT b.*, u."firstName", u.id user_id FROM blog b INNER JOIN users u ON b.user_created = u.id`);
async function getFromBlogId(id){
    const res = await pool.query(`SELECT c.*, b.id blogId, u."firstName" first_name
                                    FROM comments c
                                    INNER JOIN blog b ON b.id = c.blog_id
                                    INNER JOIN users u ON u.id = c.user_create
                                    WHERE b.id = $1 `,[id]);
                                    // and c.is_active='Y'
    console.log(res.rows);
    return res.rows;
}

async function getCommentById(id){
    const res = await pool.query(`SELECT c.*, b.id blogId, u."firstName" first_name
                                    FROM comments c
                                    INNER JOIN blog b ON b.id = c.blog_id
                                    INNER JOIN users u ON u.id = c.user_create
                                    WHERE c.id = $1 `,[id]);
                                    // and c.is_active='Y'
    console.log(res.rows);
    return res.rows[0];
}

async function updateComment(commentData) {

    const res = await pool.query(`UPDATE comments c SET content=$1, updated=$2, user_update=$3, is_active=$4 WHERE c.id=$5`,[commentData.content, new Date().toISOString().slice(0, 10), commentData.userId, commentData.is_active, commentData.id]);

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

