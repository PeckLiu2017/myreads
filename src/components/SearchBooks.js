import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import Book from '../components/Book';

/**
 * @description
 * @method updateQuery
 * @method changeBookShelf Get from the <SearchBooks/> tag in App.js
 * This is a Component that render search page
 */
class SearchBooks extends Component {
  constructor () {
    super();
    this.state = {
        searchedBooksResult: []
    };
  }

  /**
   * @description
   * @param {string} query The query string from input field
   * If query string exsit and isn't equal to '', search it from server
   * When input field has been clear, set searched results in this page to null
   */
  updateQuery = (query) => {
    if (query && query.length > 0) {
      this.searchedBooksFromServer(query.trim().toLowerCase());
    } else {
      this.setState({ searchedBooksResult: [] });
    }
  }

  /**
   * @description
   * @param {string} query The query string from input field
   * If response exsit and its length greater than 0 , filter books with id, imageLinks, authors, title in it
   * and set shelf to be '' for each searched book in order to make select control's default value is 'Move to...'
   * finally, show searched results in this page by this.setState()
   */
  searchedBooksFromServer = (query) => {
    BooksAPI.search(query, 20).then((response) => {
      if (response && response.length > 0) {
        let showingBooks;
        showingBooks = response.filter((book) =>
          book.id && book.imageLinks && book.authors && book.title
        );
        showingBooks.forEach(function(book) {
          book.shelf = '';
        });
        this.setState({ searchedBooksResult: showingBooks });
     }
    });
  };

  render() {
    const { changeBookShelf } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
            onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {
            this.state.searchedBooksResult.map((book) => (
              <li key={ book.id }>
                <Book
                  id={ book.id }
                  shelf={ book.shelf }
                  authors={ book.authors }
                  title={ book.title }
                  imageLinks={ book.imageLinks }
                  changeBookShelf={changeBookShelf}
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

export default SearchBooks
