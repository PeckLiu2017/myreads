import React, { Component } from 'react';
import SearchBooks from './components/SearchBooks'
import ListBooks from './components/ListBooks'
import './App.css'
import * as BooksAPI from './utils/BooksAPI'
import { Route } from 'react-router-dom';

/**
 *  @description
 *  @method constructor constructor method
 *  @method componentDidMount Call getAll() of BooksAPI to load initial books data form remote server
 *  @method changeBookShelf Move books between different shelves & add searched books to shelves
 */
class App extends Component {
  constructor () {
    super();
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    })
  }

  /**
   *  @description
   *  @param {Book} currentHandleBook This is a Book instance stand for the current book to be moved
   *  @param {string} value The shelf books to be moved into
   *  @param {array} books local Initial books data get form remote server
   *  1. For local machine, get current book's index, get, change it in or add it into books array, then update local books array
   *  2. For remote server, synchronize local updates to server by using use BooksAPI.update()
   */
  changeBookShelf = (currentHandleBook, value) => {
    const { books } = this.state;

    /* get index of the book in local machine */
    let currentLocalBookIndex = books.findIndex((book) =>{
      return book.id === currentHandleBook.id
    })

    /*
     * if currentLocalBookIndex < 0 ,it's a searched book to be added in shelves that doesn't exsit in local machine
     * just push it into local books array and update this books array
     * otherwise, direct change its shelf and update the local books array
     */
    if (currentLocalBookIndex < 0) {
      books.push(currentHandleBook);
      this.setState({ books: books });
      currentLocalBookIndex = books.length - 1;
    } else {
      books[currentLocalBookIndex].shelf = value;
      this.setState({ books: books });
    }

    /* synchronize data to server */
    BooksAPI.update(books[currentLocalBookIndex], value)
  }

  render() {
    return (
      <div className="app">
      <Route exact path="/" render={ () => (
        <ListBooks
          books={ this.state.books }
          changeBookShelf={ this.changeBookShelf }
        />
      ) } />
      <Route path="/search" render={ () => (
        <SearchBooks
          changeBookShelf={ this.changeBookShelf }
        />
      ) } />
      </div>
    )
  }
}

export default App;
