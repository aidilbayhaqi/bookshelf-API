const { nanoid } = require("nanoid");

const books = [];

const postBook = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } =
    request.payload;

  if (!name) {
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400);
  }
  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }

  const id = nanoid();
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const finished = pageCount === readPage;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  return h
    .response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: { bookId: id },
    })
    .code(201);
};

const getAllBook = (request, h) => {
  const { name, reading, finished } = request.query;

  let filteredBook = books;

  if (name) {
    filteredBook = filteredBook.filter((books) =>
      books.name.toLowerCase().includes(name.toLoweCase())
    );
  }

  if (reading) {
    const isReading = reading === "1";
    filteredBook = filteredBook.filter((books) => books.reading === isReading);
  }

  if (finished) {
    const isFinished = finished === "1";
    filteredBook = filteredBook.filter(
      (books) => books.finished === isFinished
    );
  }

   const responseBooks = filteredBook.slice(0, 2);

  const response = {
    status: "success",
    data: {
      books: responseBooks.map(({ id, name, publisher }) => ({
        id,
        name,
        publisher,
      })),
    },
  };
  return h.response(response).code(200);
};

const getBookById = (request, h) => {
  const { bookId } = request.params;
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return h
      .response({
        status: "fail",
        message: "Buku tidak ditemukan",
      })
      .code(404);
  }

  return h
    .response({
      status: "success",
      data: {book},
    })
    .code(200);
};

const updateBook = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload;

  if (!name) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku",
      })
      .code(400);
  }
  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }

  const index = books.findIndex((book) => book.id === bookId);
  if (index === -1) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
      })
      .code(404);
  }

  const updateAt = new Date().toISOString();
  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished: pageCount === readPage,
    updatedAt: updateAt,
  };

  return h
    .response({
      status: "success",
      message: "Buku berhasil diperbarui",
      data: books[index],
    })
    .code(200);
};

const deleteBook = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  if (index === -1) {
    return h
      .response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
      })
      .code(404);
  }

  books.splice(index, 1);

  return h
    .response({
      status: "success",
      message: "Buku berhasil dihapus",
    })
    .code(200);
};

module.exports = {
  postBook,
  getAllBook,
  getBookById,
  updateBook,
  deleteBook,
};
