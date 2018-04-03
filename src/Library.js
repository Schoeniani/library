import React, { Component } from 'react'
import { normalize, toast } from './utils'
import BookRow from './BookRow'
import ModalInput from './ModalInput'
const $ = window.$
const M = window.M

class Library extends Component {
    constructor(props) {
        super(props)
        this.state = { formBook: {}, editIndex: null }
    }

    componentDidMount() { $('.modal').modal() }

    add = () => { this.setState({ formBook: {}, editIndex: null }, M.updateTextFields) }
    edit = (index) => { this.setState({ formBook: this.props.books[index], editIndex: index }, M.updateTextFields) }
    delete = (index) => { if(window.confirm('Are you sure?')) this.props.deleteBook(index) }
    handleChange = (e) => { this.setState({ formBook: { ...this.state.formBook, [e.target.name]: e.target.value }}) }

    handleSubmit = (e) => {
        e.preventDefault()
        let formBook = this.state.formBook

        if(!formBook.title) return toast('Invalid Title')
        if(!formBook.author) return toast('Invalid Author')
        if(!formBook.language) return toast('Invalid Language')
        if(!formBook.pages || isNaN(formBook.pages) || formBook.pages <= 0) return toast('Invalid Pages')
        if(!formBook.year || isNaN(formBook.year) || formBook.year <= 0 || formBook.year > 2018) return toast('Invalid Year')

        if(this.props.books.filter((book, index) => index !== this.state.editIndex).find(book =>
            normalize(book.title) === normalize(formBook.title)))
            return toast('Title Exists')

        if(this.state.editIndex == null) this.props.addBook(formBook)
        else this.props.editBook(formBook, this.state.editIndex)

        $('.modal').modal('close')
    }

    render() {
        let formBook = this.state.formBook

        return (
            <div className="container">
                <h3>Library</h3>
                <div>
                    <a className="waves-effect waves-light btn-small red lighten-2 modal-trigger"
                        onClick={this.add} href="#bookModal">
                        <i className="material-icons left">add</i>Add Book
                    </a>
                </div>
                <br />
                <table className="highlight responsive-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Language</th>
                            <th>Pages</th>
                            <th>Year</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.books.map((book, index) => <BookRow key={index} book={book}
                            delete={this.delete.bind(this, index)} edit={this.edit.bind(this, index) } />) }
                    </tbody>
                </table>
                <div id="bookModal" className="modal modal-fixed-footer">
                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <div className="modal-content">
                            <ModalInput name='title' value={formBook.title} onChange={this.handleChange} />
                            <ModalInput name='author' value={formBook.author} onChange={this.handleChange} />
                            <ModalInput name='language' value={formBook.language} onChange={this.handleChange} />
                            <ModalInput name='pages' value={formBook.pages} onChange={this.handleChange} />
                            <ModalInput name='year' value={formBook.year} onChange={this.handleChange} />
                        </div>
                        <div className="modal-footer">
                            <button className="modal-action modal-close waves-effect waves-red btn-flat" type="button">
                                Cancel
                            </button>
                            <button className="modal-action waves-effect waves-green btn-flat" type="submit">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Library