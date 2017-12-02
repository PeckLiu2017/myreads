import React, { Component } from 'react';
import SearchBooks from './components/SearchBooks'
import ListBooks from './components/ListBooks'
import './App.css'
import * as BooksAPI from './utils/BooksAPI'

class App extends Component {
  constructor () {
    super();
    this.state = {
      showSearchPage: false,
      books: []
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  changeBookShelf = (currentHandleBook, value) => {
    const { books } = this.state;

    const currentLocalBookIndex = books.findIndex((book) =>{
      return book.id === currentHandleBook.id
    })

    books[currentLocalBookIndex].shelf = value;
    this.setState({ books: books });

    BooksAPI.update(currentHandleBook.id, value)
  }

  render() {
    return (
      <div className="app">
      {this.state.showSearchPage ? <SearchBooks changeBookShelf={this.changeBookShelf}/> : <ListBooks books={this.state.books} changeBookShelf={this.changeBookShelf}/>}
      </div>
    )
  }
}

export default App;
