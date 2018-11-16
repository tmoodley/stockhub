import React, { Component } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
export class StockSymbol extends Component {
    displayName = StockSymbol.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true, updated: Date() };

    }

    static loadData(_this) {
        fetch('https://api.iextrading.com/1.0/stock/aapl/chart/1m')
            .then(response => response.json())
            .then(data => {
                _this.setState({ forecasts: data, loading: false, updated: Date() });
            });
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({ ticker: params.stockId });
        axios.get(`https://api.iextrading.com/1.0/stock/${params.stockId}/chart/1m`)
            .then(({ data: charts }) => {
                this.setState({ forecasts: charts, loading: false, updated: Date() });
            });
    }


    static renderForecastsTable(forecasts) {


        return (
            <LineChart width={1200} height={800} data={forecasts}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="label" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="open" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="close" stroke="#82ca9d" />
                <Line type="monotone" dataKey="change" stroke="#ff0000" />
            </LineChart>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : StockSymbol.renderForecastsTable(this.state.forecasts);

        return (
            <div>
                <h1>{this.state.ticker} - 30 days History</h1>
                <p>These are the Past 30 days History for {this.state.ticker} from yesterday provided from iextrading.com. [last update: {this.state.updated}]</p>
                {contents}
            </div>

        );
    }

}
