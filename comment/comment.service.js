const comments = [
    { id: 1, userId: 1, content: 'b1Esto es un comentario creado por user 1', blogId: 1, created_at: new Date().toISOString().slice(0, 10), updated_at: new Date().toISOString().slice(0,10)},
    { id: 2, userId: 2, content: 'b3Esto es un comentario creado por user 2', blogId: 3, created_at: new Date().toISOString().slice(0, 10), updated_at: new Date().toISOString().slice(0,10)},
    { id: 3, userId: 3, content: 'b2Esto es un comentario creado por user 3', blogId: 2, created_at: new Date().toISOString().slice(0, 10), updated_at: new Date().toISOString().slice(0,10)},    
    { id: 4, userId: 3, content: 'b2Esto es un comentario creado por user 3', blogId: 2, created_at: new Date().toISOString().slice(0, 10), updated_at: new Date().toISOString().slice(0,10)}    
];

module.exports = {
    getAll,
    updateComment,
    createComment
};



async function getAll() {
    console.log("List");
    return comments;
}

async function updateComment(commentData) {
    console.log("Update");
    let comment;

    comment = comments.filter(function(b) { 
        return b.id === commentData.id;
    })[0];

    console.log(comment);
    comment.id = commentData.id;
    comment.userId = commentData.userId;
    comment.content = commentData.content;
    comment.blogId = commentData.blogId;
    comment.updated_at = new Date().getFullYear();

    console.log("SERVICE");
    console.log(JSON.stringify(comment));

    return comment;
}

async function createComment(commentData) {
    console.log("Create");
    console.log(commentData);
    let comment = {};

    comment["id"] = commentData.id;
    comment["userId"] = commentData.userId;
    comment["content"] = commentData.content;
    comment["blogId"] = commentData.blogId;
    comment["updated_at"] = new Date().toISOString().slice(0, 10);
    comment["created_at"] = new Date().toISOString().slice(0, 10);

    console.log("Paso");
    comments.push(comment)
    console.log(comments);

    console.log("SERVICE");
    console.log(JSON.stringify(comment));

    return comment;
}

