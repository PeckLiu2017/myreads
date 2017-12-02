import React, { Component } from 'react'
import BookShelf from './BookShelf'

class ListBooks extends Component {
  classifyBooks = (shelf) => {
    return this.props.books.filter((book) => book.shelf === shelf)
  }

  render() {
    const { changeBookShelf } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
               name="Currently Reading"
               books={this.classifyBooks('currentlyReading')}
               changeBookShelf={changeBookShelf}
            />
            <BookShelf
               name="Want to Read"
               books={this.classifyBooks('wantToRead')}
               changeBookShelf={changeBookShelf}
            />
            <BookShelf
               name="Read"
               books={this.classifyBooks('read')}
               changeBookShelf={changeBookShelf}
            />
          </div>
        </div>
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    )
  }
}

export default ListBooks
