import React, { Component } from 'react'

/**
 * @description
 * @method updateBookShelf Change shelves for current book
 * This is a Component that render books in Component BookShelf
 */
class Book extends Component {
  state = {
    shelf: ''
  }

  /**
   * @description
   * @param {string} value The shelf to be moved into
   * @method changeBookShelf Get from <Book/> tag in BooksShelf.js
   */
  updateBookShelf(value){
    this.props.changeBookShelf(this.props, value);
    this.setState({ shelf: value });
  }

  /* Set shelf for book once Book Component has been mounted */ 
  componentDidMount() {
    const { shelf } = this.props;
    this.setState({ shelf });
  };


  render() {
    const { title, authors, imageLinks } = this.props;
    const { shelf } = this.state;
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={shelf} onChange={(event) => this.updateBookShelf(event.target.value)}>
              <option value="" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{ title }</div>
        <div className="book-authors">{ authors }</div>
      </div>
    )
  }
}

export default Book
