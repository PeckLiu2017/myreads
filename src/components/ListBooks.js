import React, { Component } from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom';

/**
 * @description
 * @method classifyBooks
 * @method changeBookShelf Get from the <ListBooks/> tag in App.js
 * This is a Component that render main page
 */
class ListBooks extends Component {
  /**
   * @description
   * @param {string} shelf shelf name
   * Filter books for different shelf
   */
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
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
