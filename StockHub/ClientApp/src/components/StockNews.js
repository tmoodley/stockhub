import React, { Component } from 'react';  
import axios from 'axios'; 
export class StockNews extends Component {
    displayName = StockNews.name;
     
    constructor(props) {
        super(props);
        this.state = { news: [], loading: true, updated: Date() };
         
    }
      
    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({ ticker: params.stockId});
        axios.get(`https://api.iextrading.com/1.0/stock/${params.stockId}/news`)
            .then(({ data: newsData }) => {   
                this.setState({ news: newsData, loading: false, updated: Date() }); 
            }); 
    }
     
    static renderNewsTable(news) {
         
        return (
            <table className='table striped bordered condensed hover'>
                <thead> 
                    <tr> 
                        <th width="15%">Headline</th>
                        <th width="15%">source</th>
                        <th width="15%">Summary</th> 
                        <th width="15%">Related</th> 
                    </tr>
                </thead>
                <tbody>
                    {news.map((forecast, index) =>
                        <tr key={index}>
                            <td width="15%"><a target="_blank" href={forecast.url}>{forecast.headline}</a></td>
                            <td width="15%">{forecast.source}</td>
                            <td width="15%">{forecast.summary}</td> 
                            <td width="15%">{forecast.related}</td> 
                        </tr>
                    )}
                </tbody>
            </table>

        );
    }

    render() {  
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : StockNews.renderNewsTable(this.state.news);

        return (
            <div>
                <h1>{this.state.ticker} - Latest news</h1>
                <p>These are the Latest News Articles for {this.state.ticker} from yesterday provided from iextrading.com. [last update: {this.state.updated}]</p> 
                {contents} 
            </div>

        ); 
    }
     
}
