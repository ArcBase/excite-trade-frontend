import React, { Component } from 'react'
import axios from 'axios'


export default class Voice extends Component {

    handleVoice = () => {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token bGlzYWwyNDE2NEBmYXhhcGRmLmNvbTo2azN6MWE2cg`,
        };
        axios.post('https://api.xcall.com.ng/v3/call')
        .then(
            console.log('rez')
        )
    }

    componentDidMount(){
        this.handleVoice()
    }

    render() {

        return (
            <div>
                Hello
            </div>
        )
    }
}
