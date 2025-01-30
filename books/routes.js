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
        path: '/books/{bookId}',
        handler: getBookById
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBook
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBook
    }
]

module.exports = bookRoutes