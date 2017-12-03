import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import Book from '../components/Book';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';


class SearchBooks extends Component {
  constructor () {
    super();
    this.state = {
        query: '',
        searchedBooksResult: []
    };
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
    this.searchedBooksFromServer(query);
  }

  searchedBooksFromServer = (query) => {
    BooksAPI.search(query, 20).then((response) => {
      if (response && response.length > 0) {

        this.setState({ searchedBooksResult: response });
     }
      console.log(response);
    });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
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
                  changeBookShelf={book.changeBookShelf}
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
