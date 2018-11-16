import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { TopStocks } from './components/TopStocks';
import { BottomStocks } from './components/BottomStocks';
import { MostActive } from './components/MostActive';
import { StockSymbol } from './components/StockSymbol';
import { StockNews } from './components/StockNews';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/mostactive' component={MostActive} />
            <Route path='/bottomstocks' component={BottomStocks} />
            <Route path='/topstocks' component={TopStocks} />
            <Route path="/stocksymbol/:stockId" component={StockSymbol} />
            <Route path="/stocknews/:stockId" component={StockNews} />
      </Layout>
    );
  }
}
