const {postBook, getAllBook, getBookById, updateBook, deleteBook}= require('./bookData')

const bookRoutes = [
    {
        method: 'POST',
        path: '/books',
        handler: postBook   
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBook
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookById
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: updateBook
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBook
    }
]

module.exports = bookRoutes