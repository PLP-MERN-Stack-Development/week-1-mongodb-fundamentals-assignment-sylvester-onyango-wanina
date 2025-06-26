/***TASK 2: BASIC CRUD OPERATIONS***/
// Insert Books data into my collection and database.
db.books.insertMany([
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: 'J. B. Lippincott & Co.'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: 'Charles Scribner\'s Sons'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian',
    published_year: 1932,
    price: 11.50,
    in_stock: false,
    pages: 311,
    publisher: 'Chatto & Windus'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: 'George Allen & Unwin'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: 'Little, Brown and Company'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: 'T. Egerton, Whitehall'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: 'Allen & Unwin'
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    genre: 'Political Satire',
    published_year: 1945,
    price: 8.50,
    in_stock: false,
    pages: 112,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: 'HarperOne'
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    published_year: 1851,
    price: 12.50,
    in_stock: false,
    pages: 635,
    publisher: 'Harper & Brothers'
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    genre: 'Gothic Fiction',
    published_year: 1847,
    price: 9.99,
    in_stock: true,
    pages: 342,
    publisher: 'Thomas Cautley Newby'
  }
]);

// Query to Find all books in a specific genre
db.books.find({
    genre: 'Fiction'
});

// Query to Find books published after a certain year
db.books.find({
    published_year: { $gt: 1900}
});

// Query to Find books by a specific author
db.books.find({
    author: 'George Orwell'
});

// Query to Update the price of a specific book
db.books.updateOne(
    {title: 'Animal Farm'},
    { $set: { price: 30.00}}
);

// Query to Delete a book by its title
db.books.deleteOne({
    title: 'Animal Farm'
});


/***TASK 3: ADVANCED QUERIES***/
// Write a query to find books that are both in stock and published after 2010
db.books.aggregate([
    { $match: { in_stock: true, published_year: { $gt: 2010}}}
]); 

// Use projection to return only the title, author, and price fields in your queries
db.books.find(
    {},
    { title: 1, author: 1, price: 1, _id: 0 }
);

// Use sorting to return books sorted by price in descending order
db.books.find().sort({ price: 1 });         // Ascending

db.books.find().sort({ price: -1 });        // Descending 


// Use the limit and skip methods to implement pagination (5 books per page)
db.books.find().skip(0).limit(5)    // page 1

db.books.find().skip(5).limit(5)    // page 2



/***TASK 4: AGGREGATION PIPELINES***/
// Create an aggregation pipeline to calculate the average price of books by genre
db.books.aggregate([
    { $group: { _id: '$genre', avgPrice: { $avg: '$price'}}}
]);

db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

db.books.aggregate([
  {
    $project: {
      decade: { $concat: [{ $substr: ["$published_year", 0, 3] }, "0s"] }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  }
])



/***TASK 5: Indexing***/
db.books.createIndex({ title: 1 });

db.books.createIndex({ author: 1, published_year: 1 });

db.books.find({ title: "Book A" }).explain("executionStats");























