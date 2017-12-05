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
   *  1. For local machine, get current book's index, change it in or add it into books array to rerender UI
   *  2. For remote server, synchronize local updates to server by using use BooksAPI.update()
   *  @param {Book} currentHandleBook This is a Book instance stand for the current book to be moved
   *  @param {string} value The shelf books to be moved into
   *  @param {array} books local Initial books data get form remote server
   *  @param {array} tempBooksArray The array is about to overwrite origin local books finally
   *  @param {object} localBookCopy Create a temporary object to change shelf value many times
   *  while avoiding 'Cannot assign to read only property' error
   *  @param {object} searchedBook Create a temporary object to change shelf value many times in search page
   */
  changeBookShelf = (currentHandleBook, targetShelf) => {
    const { books } = this.state;

    /* get index of the currentHandleBook in local machine */
    let currentHandleBookIndex = books.findIndex((book) => {
      return book.id === currentHandleBook.id
    });

    let tempBooksArray = Object.assign([], books);

    /*
     * if currentLocalBookIndex > 0 , currentHandleBook is a local book, copy its value to localBookCopy which will
     * update into tempBooksArray
     * otherwise, it's a searched book to be added in shelves that doesn't exsit in local machine, just copy its
     * value to searchedBook which will pushed into tempBooksArray
     */
    if (currentHandleBookIndex > 0) {
      let localBookCopy = Object.assign({}, currentHandleBook);
      localBookCopy.shelf = targetShelf;
      tempBooksArray[currentHandleBookIndex] = localBookCopy;
    } else {
      let searchedBook = Object.assign({}, currentHandleBook);
      searchedBook.shelf = targetShelf;
      tempBooksArray.push(searchedBook);
    }

    /* synchronize data to server and rerender main page */
    BooksAPI.update(currentHandleBook, targetShelf).then(
      this.setState({ books: tempBooksArray })
    );
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
          books={ this.state.books }
          changeBookShelf={ this.changeBookShelf }
        />
      ) } />
      </div>
    )
  }
}

export default App;
