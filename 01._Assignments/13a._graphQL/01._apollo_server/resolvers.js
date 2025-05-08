import {books, authors} from './data.js';
import {PubSub} from 'graphql-subscriptions';


const pubsub = new PubSub();
const BOOK_ADDED = 'BOOK_ADDED';

module.exports = {
    Query: {
        books: () => books,
        book: (_, {id}) => books.find(book => book.id === id),
        authors: () => authors,
        author: (_, {id}) => authors.find(author => author.id === id),

    },
    Mutation: {
        addBook: (_, {title, releaseYear, authorId}) => {
            const newBook = {id: `${books.length + 1}`, title, releaseYear, authorId};
            books.push(newBook);
            pubsub.publish(BOOK_ADDED, {bookAdded: newBook});
            return newBook;
        },
        addAuthor: (_, {name}) => {
            const newAuthor = {id: `${authors.length + 1}`, name};
            authors.push(newAuthor);
            return newAuthor;
        },
    },
    Book: {
        author: (book) => authors.find(a => a.id === book.authorId),
      },
    
      Author: {
        books: (author) => books.filter(b => b.authorId === author.id),
      },
}