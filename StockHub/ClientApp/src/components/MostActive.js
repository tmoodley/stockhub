import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 

export class MostActive extends Component {
    displayName = MostActive.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true, updated: Date() };
          
        MostActive.loadData(this);
    }

    static loadData(_this) {
        fetch('https://api.iextrading.com/1.0/stock/market/list/mostactive')
            .then(response => response.json())
            .then(data => {
                _this.setState({ forecasts: data, loading: false, updated: Date() });
            });
    }
     
    static renderForecastsTable(forecasts) { 
        return (
            <table className='table striped bordered condensed hover'>
                <thead>
                    <tr>
                        <th>Forecast</th>
                        <th>News</th>
                        <th>Company Name</th>
                        <th>Sector</th>
                        <th>Primary Exchange</th>
                        <th>Change</th>
                        <th>Latest Price</th>
                        <th>Open</th>
                        <th>Close</th>
                        <th>Week 52 High</th>
                        <th>Week 52 Low</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(forecast =>
                        <tr key={forecast.symbol}>
                            <td><Link to={`/stocksymbol/${forecast.symbol}`}>{forecast.symbol}</Link></td>
                            <td><Link to={`/stocknews/${forecast.symbol}`}>News</Link></td>
                            <td>{forecast.companyName}</td>
                            <td>{forecast.sector}</td>
                            <td>{forecast.primaryExchange}</td>
                            <td className={forecast.change > 0 ? 'green' : 'red'}><i className={forecast.change > 0 ? 'glyphicon glyphicon-arrow-up' : 'glyphicon glyphicon-arrow-down'}>{forecast.change}</i> </td>
                            <td>{forecast.latestPrice}</td>
                            <td>{forecast.open}</td>
                            <td>{forecast.close}</td>
                            <td>{forecast.week52High}</td>
                            <td>{forecast.week52Low}</td>
                        </tr>
                    )}
                </tbody>
            </table>

        );
    }

    render() {  
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : MostActive.renderForecastsTable(this.state.forecasts);

        return (
            <div>
                <h1>Most Active Stocks</h1>
                <p>These are the Bottom 10 trades stocks from yesterday provided from iextrading.com. [last update: {this.state.updated}]</p> 
                {contents}
            </div>

        );
    }
    componentDidMount() {
        this.interval = setInterval(() => MostActive.loadData(this), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
}
