import React, { Component } from 'react'
import * as BooksAPI from '../utils/BooksAPI'


class Book extends Component {
  state = {
    shelf: '',
    currentBook: {},
  }

  ChangeShelf(value) {
    this.setState({shelf: value});
    BooksAPI.get(this.props.id).then((book) => {
      this.setState({ currentBook: book});
      console.log(book);
      console.log(this.state.shelf);
      BooksAPI.update(book,this.state.shelf)
    })
  }

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
            <select value={shelf} onChange={(event) => this.ChangeShelf(event.target.value)}>
              <option value="none" disabled>Move to...</option>
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
