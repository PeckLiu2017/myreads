import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import Book from '../components/Book';


class SearchBooks extends Component {
  constructor () {
    super();
    this.state = {
        searchedBooksResult: []
    };
  }

  /* it show s wrong when i type upper case letter */
  updateQuery = (query) => {
    if (query.length > 0) {
      this.searchedBooksFromServer(query.trim().toLowerCase());
    } else {
      this.setState({ searchedBooksResult: [] });
    }
  }

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
