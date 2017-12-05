import React, { Component } from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom';

/**
 * @description
 * This is a Component that render main page
 * @method getAllShelf
 * @method changeBookShelf Get from the <ListBooks/> tag in App.js
 */
class ListBooks extends Component {
  /**
   * @description
   * Filter books to create different shelves
   * @param {array} books local books array form App.js
   */
  getAllShelf = () => {
    const { books } = this.props;
    return [
      {
        id: 'currentlyReading',
        title: 'Currently Reading',
        books: books.filter(book => book.shelf === 'currentlyReading')
      },
      {
        id: 'wantToRead',
        title: 'Want to Read',
        books: books.filter(book => book.shelf === 'wantToRead')
      },
      {
        id: 'read',
        title: 'Read',
        books: books.filter(book => book.shelf === 'read')
      },
    ]
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
            {
              this.getAllShelf().map(shelf => (
                <BookShelf key={shelf.id}
                  title={shelf.title}
                  books={shelf.books}
                  changeBookShelf={changeBookShelf}/>
              ))
            }
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
