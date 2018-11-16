import React, { Component } from 'react';

export class Home extends Component {
    displayName = Home.name

    render() {
        return (
            <div>
                <h1>Stock App</h1>
                <p>This app will show you the latest top, bottom and active stocks</p>
            </div>
        );
    }
}
