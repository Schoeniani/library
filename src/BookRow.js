import React, { Component } from 'react'
import { normalize } from './utils'

class BookRow extends Component {
    render() {
        let book = this.props.book

        return (
            <tr>
                <td>{normalize(book.title)}</td>
                <td>{book.author}</td>
                <td>{book.language}</td>
                <td>{book.pages}</td>
                <td>{book.year}</td>
                <td>
                    <a className="modal-trigger black-text" onClick={this.props.edit} href="#bookModal">
                        <i className="material-icons">create</i>
                    </a>
                    <span className="pointer-cursor" onClick={this.props.delete}>
                        <i className="material-icons">delete</i>
                    </span>
                </td>
            </tr>
        )
    }
}

export default BookRow