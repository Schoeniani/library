import React, { Component } from 'react'
import Spinner from './spinner'
const $ = window.$

function normalize(str) {
    return str.replace(/[^\w\s]/gi, '').toLowerCase().replace(/\b[a-z]/g, letter => letter.toUpperCase())
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = { books: [], loading: true, formBook: {}, editIndex: null }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async componentDidMount(){
        $(document).ready(function(){ $('.modal').modal() })
        let books = await fetch('books.json')
        this.setState({ loading: false, books: await books.json() })
    }

    addBook() {
        this.setState({ formBook: {}, editIndex: null }, window.M.updateTextFields)
    }

    editBook(index) {
        this.setState({ formBook: this.state.books[index], editIndex: index }, window.M.updateTextFields)
    }

    deleteBook(index){ 
        if(window.confirm('Are you sure?')){
            this.setState({ books: this.state.books.filter((book, i) => index !== i) })
        }
    }

    handleChange(event) {
        this.setState({ formBook: { ...this.state.formBook, [event.target.name]: event.target.value }})
    }

    handleSubmit(event) {
        event.preventDefault()
        let formBook = this.state.formBook

        if(!formBook.title) 
            return window.M.toast({html: 'Invalid Title', displayLength: 1000})
        if(!formBook.author) 
            return window.M.toast({html: 'Invalid Author', displayLength: 1000})
        if(!formBook.language) 
            return window.M.toast({html: 'Invalid Language', displayLength: 1000})
        if(!formBook.pages || isNaN(formBook.pages) || formBook.pages <= 0) 
            return window.M.toast({html: 'Invalid Pages', displayLength: 1000})
        if(!formBook.year || isNaN(formBook.year) || formBook.year <= 0 || formBook.year > 2018) 
            return window.M.toast({html: 'Invalid Year', displayLength: 1000})
        if(this.state.books.filter((book, index) => index !== this.state.editIndex).find(book => 
            book.title === formBook.title || normalize(book.title) === normalize(formBook.title)))
            return window.M.toast({html: 'Title Exists', displayLength: 1000})

        if(this.state.editIndex == null) 
            this.setState({ books: this.state.books.concat([formBook]) })
        else 
            this.setState({ books: this.state.books.map((book, index) => {
                return index === this.state.editIndex ? formBook : book
            })})

        $('.modal').modal('close')
    }

    renderBooks(){
        return this.state.books.map((book, index) => {
            return (
                <tr key={index}>
                    <td>{normalize(book.title)}</td>
                    <td>{book.author}</td>
                    <td>{book.language}</td>
                    <td>{book.pages}</td>
                    <td>{book.year}</td>
                    <td>
                        <a className="pointer-cursor modal-trigger black-text" 
                            onClick={this.editBook.bind(this, index)} href="#bookModal">
                            <i className="material-icons">create</i>
                        </a>
                        <span className="pointer-cursor" onClick={this.deleteBook.bind(this, index)}>
                            <i className="material-icons">delete</i>
                        </span>
                    </td>
                </tr>
            )
        })
    }

    render() {
        let formBook = this.state.formBook
        return (
            <div className="App">
                { this.state.loading && <div><br /><Spinner /></div>}
                <div className={'container' + (this.state.loading ? ' hidden' : '')}>
                    <h3>Library</h3>
                    <div>
                        <a className="waves-effect waves-light btn-small red lighten-2 modal-trigger" 
                            onClick={this.addBook.bind(this)} href="#bookModal">
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
                            {this.renderBooks()}
                        </tbody>
                    </table>
                    <div id="bookModal" className="modal modal-fixed-footer">
                        <form onSubmit={this.handleSubmit} autoComplete="off">
                            <div className="modal-content">
                                <h5>{this.state.editIndex != null ? 'Edit' : 'Add'} Book</h5>
                                <div className="input-field">
                                    <input name="title" type="text" value={formBook.title || ''} onChange={this.handleChange} />
                                    <label>Title</label>
                                </div>
                                <div className="input-field">
                                    <input name="author" type="text" value={formBook.author || ''} onChange={this.handleChange} />
                                    <label>Author</label>
                                </div>
                                <div className="input-field">
                                    <input name="language" type="text" value={formBook.language || ''} onChange={this.handleChange} />
                                    <label>Language</label>
                                </div>
                                <div className="input-field">
                                    <input name="pages" type="text" value={formBook.pages || ''} onChange={this.handleChange} />
                                    <label>Pages</label>
                                </div>
                                 <div className="input-field">
                                    <input name="year" type="text" value={formBook.year || ''} onChange={this.handleChange} />
                                    <label>Year</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="modal-action modal-close waves-effect waves-red btn-flat" type="button">Cancel</button>
                                <button className="modal-action waves-effect waves-green btn-flat" type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default App