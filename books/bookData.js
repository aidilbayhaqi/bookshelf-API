const { nanoid } = require("nanoid");

const books = [];

const postBook = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage } =
    request.payload;

  if (!name) {
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku, mohon isi nama buku",
      })
      .code(400);
  }
  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku, readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }

  const id = nanoid();
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const reading = pageCount > readPage;
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
      data: newBook,
    })
    .code(201);
};

const getAllBook = (request, h) => {
  const { name, reading, finished } = request.query;

  let filteredBook = books;

  if (name) {
    filteredBook = filteredBook.filter((books) =>
      books.name.toLoweCase().includes(name.toLoweCase())
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

  const response = {
    status: "success",
    data: {
      books: books.map(({ id, name, publisher, reading, finished }) => ({
        id,
        name,
        publisher,
        reading,
        finished,
      })),
    },
  };
  return h.response(response).code(200);
};

const getBookById = (request, h) => {
  const { id } = request.params;
  const book = books.find((b) => b.id === id);

  if (!book) {
    return h
      .response({
        status: "fail",
        message: "Buku tidak ditemukan",
      })
      .code(400);
  }

  return h
    .response({
      status: "success",
      data: book,
    })
    .code(200);
};

const updateBook = (request, h) => {
  const { id } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    return h
      .response({
        status: "fail",
        message: "Gagal mengubah buku, mohon isi nama buku",
      })
      .code(400);
  }
  if (readPage > pageCount) {
    return h.response({
      status: "fail",
      message:
        "Gagal mengubah buku, readPage tidak boleh lebih besar dari pageCount",
    });
  }

  const index = books.findIndex((book) => book.id === id);
  if (index === -1) {
    return h
      .response({
        status: "fail",
        message: "Buku tidak ditemukan",
      })
      .code(400);
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
    reading: pageCount > readPage,
    finished: pageCount === readPage,
    updatedAt: updateAt,
  };

  return h
    .response({
      status: "success",
      message: "Buku berhasil diubah",
      data: books[index],
    })
    .code(200);
};

const deleteBook = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);

  if (index === -1) {
    return h
      .response({
        status: "fail",
        message: "Buku tidak ditemukan",
      })
      .code(400);
  }

  books.splice(index, 1);

  return h
    .response({
      status: "success",
      message: "Buku berhasil dihapus",
    })
    .code(204);
};

module.exports = {
  postBook,
  getAllBook,
  getBookById,
  updateBook,
  deleteBook,
};
