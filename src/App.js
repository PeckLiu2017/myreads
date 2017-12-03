import React, { Component } from 'react';
import SearchBooks from './components/SearchBooks'
import ListBooks from './components/ListBooks'
import './App.css'
import * as BooksAPI from './utils/BooksAPI'
import { Route } from 'react-router-dom';

class App extends Component {
  constructor () {
    super();
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  /* 改变书籍所属书架
   * this.setState 更新本地状态
   */
  changeBookShelf = (currentHandleBook, value) => {
    const { books } = this.state;

    let currentLocalBookIndex = books.findIndex((book) =>{
      return book.id === currentHandleBook.id
    })

    /* 如果 currentLocalBookIndex < 0 说明本地没有这本书 */
    if (currentLocalBookIndex < 0) {
      books.push(currentHandleBook);
      this.setState({ books: books });
      currentLocalBookIndex = books.length - 1;
    } else {
      books[currentLocalBookIndex].shelf = value;
      this.setState({ books: books });
    }

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
