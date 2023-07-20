const blogs = [
    { id: 1, title: 'Este es un titulo de" blog plena', description: 'Descripcion de este blog', content: 'texto 11111111111111111bla bla bla bla', created_at: new Date().toISOString().slice(0, 10), updated_at: new Date().toISOString().slice(0,10)},
    { id: 2, title: 'Este es un titulo de blog 2 oss', description: 'Descripcion de este blog', content: 'texto 22222222222222222bla bla bla bla' , created_at: new Date().toISOString().slice(0, 10), updated_at: new Date().toISOString().slice(0,10)},
    { id: 3, title: 'Este es un titulo de blog 3 meen', description: 'Descripcion de este blog', content: 'texto 333333333333333bla bla bla bla' , created_at: new Date().toISOString().slice(0, 10), updated_at: new Date().toISOString().slice(0,10)},
    { id: 4, title: 'Este es un titulo de" blog plena', description: 'Descripcion de este blog', content: 'texto 11111111111111111bla bla bla bla', created_at: new Date().toISOString().slice(0, 10), updated_at: new Date().toISOString().slice(0,10)},
    { id: 5, title: 'Este es un titulo de blog 2 oss', description: 'Descripcion de este blog', content: 'texto 22222222222222222bla bla bla bla' , created_at: new Date().toISOString().slice(0, 10), updated_at: new Date().toISOString().slice(0,10)},
    { id: 6, title: 'Este es un titulo de blog 3 meen', description: 'Descripcion de este blog', content: 'texto 333333333333333bla bla bla bla' , created_at: new Date().toISOString().slice(0, 10), updated_at: new Date().toISOString().slice(0,10)} ,
    { id: 7, title: 'Este es un titulo de" blog plena', description: 'Descripcion de este blog', content: 'texto 11111111111111111bla bla bla bla', created_at: new Date().toISOString().slice(0, 10), updated_at: new Date().toISOString().slice(0,10)},
    { id: 8, title: 'Este es un titulo de blog 2 oss', description: 'Descripcion de este blog', content: 'texto 22222222222222222bla bla bla bla' , created_at: new Date().toISOString().slice(0, 10), updated_at: new Date().toISOString().slice(0,10)},
    { id: 9, title: 'Este es un titulo de blog 3 meen', description: 'Descripcion de este blog', content: 'texto 333333333333333bla bla bla bla' , created_at: new Date().toISOString().slice(0, 10), updated_at: new Date().toISOString().slice(0,10)}     
];

module.exports = {
    getAll,
    getById,
    updateBlog,
    createBlog
};



async function getAll() {
    console.log("List");
    return blogs;
}

async function getById(id) {
    const blog = blogs.find(b => b.id === parseInt(id));
    console.log(blog);
    return blog ?  blog : null;
}

async function updateBlog(blogData) {
    console.log("Update");
    let blog;

    blog = blogs.filter(function(b) { 
        return b.id === blogData.id;
    })[0];

    console.log(blog);
    blog.title = blogData.title;
    blog.content = blogData.content;
    blog.updated_at = new Date().getFullYear();

    console.log("SERVICE");
    console.log(JSON.stringify(blog));

    return blog;
}

async function createBlog(blogData) {
    console.log("Create");
    console.log(blogData);
    let blog = {};

    blog["id"] = blogData.id;
    blog["title"] = blogData.title;
    blog["content"] = blogData.content;
    blog["updated_at"] = new Date().toISOString().slice(0, 10);
    blog["created_at"] = new Date().toISOString().slice(0, 10);

    console.log("Paso");
    blogs.push(blog)
    console.log(blogs);

    console.log("SERVICE");
    console.log(JSON.stringify(blog));

    return blog;
}

