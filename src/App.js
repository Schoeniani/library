import React, { Component } from 'react'
import Library from './Library'
import Spinner from './Spinner'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = { books: null }
    }

    async componentDidMount() { this.setState({ books: await (await fetch('books.json')).json() }) }
    add = (book) => { this.setState({ books: this.state.books.concat([book]) }) }
    edit = (book, index) => { this.setState({ books: this.state.books.map((b, i) => i === index ? book : b) }) }
    delete = (index) => { this.setState({ books: this.state.books.filter((_, i) => index !== i) }) }

    render() {
        return (
            <div className="App">
                { !this.state.books && <div><br /><Spinner /></div> }
                { this.state.books && <Library books={this.state.books} addBook={this.add}
                    editBook={this.edit} deleteBook={this.delete} /> }
            </div>
        )
    }
}

export default App