import React, { Component } from 'react'
import './protected.scss'

export default class Protected extends Component {
    render() {
        return (
            <div className="protected">
                <h1> PAGE IS PROTECTED</h1>
                <p className='paragraph'>this page is protected</p>
            </div>
        )
    }
}
