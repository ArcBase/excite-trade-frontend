import React, { Component } from 'react'


export default class Chat extends Component {
    tawkToPropertyId = '5ccd362fd07d7e0c6391e169'

    componentDidMount(){
        tawkTo(tawkToPropertyId)
    }
    render() {
        return (
            <div>
                {this.tawkTo()}
            </div>
        )
    }
}
