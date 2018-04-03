import React, { Component } from 'react'
import { normalize } from './utils'

class ModalInput extends Component {
    render() {
        return (
            <div className="input-field">
                <input name={this.props.name} type="text" value={this.props.value} onChange={this.props.onChange} />
                <label>{normalize(this.props.name)}</label>
            </div>
        )
    }
}

export default ModalInput