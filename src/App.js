import logo from './logo.svg';
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import React, { Component } from 'react';
const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

class App extends React.Component {
  state = {
    items: [],
    count: 20,
    start: -19,
    msg: ''
  };
  componentDidMount() {
    this.fetchMoreData();

  }
  fetchMoreData = () => {
    console.log('in')
    const items = this.state.items;
    this.setState({ start: this.state.start + this.state.count }, () => {
      fetch(`https://jsonplaceholder.typicode.com/todos?_start=${this.state.start}&_limit=${this.state.count}`)
        .then(response => response.json())
        .then(json => {
          json.map((data) => {
            items.push(data)
          })

          this.setState(items)
        })
    })

  };

  render() {
    return (
      <div>
        <h1>Scroll pagination app</h1>
        <hr />
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.items !== 0}
          loader={<h4>Loading...</h4>}
        >
          {this.state.items?.map((i, index) => (
            <div style={style} key={index}>
              {i.title}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default App;
