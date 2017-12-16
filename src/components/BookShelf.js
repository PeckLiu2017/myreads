import React, { Component } from 'react'
import Book from './Book'
import Waiting from './Waiting'

/**
 * @description
 * This is a Component that render shelf in Component ListBooks
 * @method changeBookShelf Get from the <BookShelf/> tag in ListBooks.js
 */
class BookShelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          {/* Shelf Loader */}
          <div className="shelf-loader-box">
            <Waiting loading={this.props.requestState} size={70} message="LOADING..."/>
          </div>
          <ol className="books-grid">
            {
              this.props.books.map((book) => (
                <li key={ book.id }>
                  <Book
                    id={ book.id }
                    authors={ book.authors }
                    title={ book.title }
                    imageLinks={ book.imageLinks }
                    shelf={ book.shelf }
                    changeBookShelf={this.props.changeBookShelf}
                  />
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
