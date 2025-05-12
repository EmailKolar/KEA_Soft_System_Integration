import { books, authors } from './data.js';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
const BOOK_ADDED = 'BOOK_ADDED';

const resolvers = {
    Query: {
        books: () => books,
        book: (_, { id }) => books.find(book => book.id === id),
        authors: () => authors,
        author: (_, { id }) => authors.find(author => author.id === id),
    },
    Mutation: {
        addBook: (_, { title, releaseYear, authorId }) => {
            const newBook = { id: `${books.length + 1}`, title, releaseYear, authorId };
            books.push(newBook);
            pubsub.publish(BOOK_ADDED, { bookAdded: newBook });
            return newBook;
        },
        
        updateBook: (_, { id, title, releaseYear, authorId }) => {
            const bookIndex = books.findIndex(book => book.id === id);
            if (bookIndex === -1) {
                throw new Error('Book not found');
            }
            const updatedBook = { ...books[bookIndex], title, releaseYear, authorId };
            books[bookIndex] = updatedBook;
            return updatedBook;
        }
        ,
        deleteBook: (_, { id }) => {
            const bookIndex = books.findIndex(book => book.id === id);
            if (bookIndex === -1) {
                throw new Error('Book not found');
            }
            const deletedBook = books[bookIndex];
            books.splice(bookIndex, 1);
            return deletedBook;
        },
    },
    Book: {
        author: (book) => authors.find(a => a.id === book.authorId),
    },
    Author: {
        books: (author) => books.filter(b => b.authorId === author.id),
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator([BOOK_ADDED]),
        },
    },
};

export default resolvers;