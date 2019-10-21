import React, { Component } from "react";
import axios from "axios";
import "./searchHistory.css"

export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchHistory: []

        };
    }


    //handles delete search history item clicks
    handleDeleteHistoryItem = (event) => {
        this.props.onDeleteSearchHistoryItem(event.target.dataset.value);
    }

    //handles cleear search history clicks
    handleClearHistory = () => {
        this.props.onClearSearchHistory();
    }


    //creates the search history list items from SearchPage State
    renderSearchHistory = () => {
        var searchHistory = this.props.searchHistory;
        console.log(this.props.searchHistory);
        var searchHistoryList;
        try {
            searchHistoryList = searchHistory.map((item, i) => {
                ;
                return <li key={i} data-value={item.id} className="search-history-item">
                    <div>{item.result}</div>
                    <div className="search-history-item-bottom">
                        <div className="search-history-item-date">{item.time}</div>
                        <button className="search-history-item-delete" data-value={item.id} onClick={this.handleDeleteHistoryItem}>Delete</button>
                    </div>
                </li>
            });

        }
        catch (error) {
            console.log(error);
        }
        return searchHistoryList;

    }


    render() {
        return (
            <section className="search-history">
                <header className="search-history-header">
                    <span>Search history</span>
                    <button className="clear-history-button" onClick={this.handleClearHistory}>Clear search history</button>
                </header>
                <ul className="search-history-list">
                    {this.renderSearchHistory()}
                </ul>
            </section>
        )

    }

}