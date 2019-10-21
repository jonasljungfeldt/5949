import React, { Component } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar.js";
import SearchHistory from "../components/SearchHistory.js"

export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchHistory: []

        };
    }

    // Converts current date time to AM/PM style
    convertDateTime = () => {
        {
            var date = new Date();
            var formatedDate = date.toISOString().substr(0, 10)
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var strTime = formatedDate + ", " + hours + ':' + minutes + ' ' + ampm;
            return strTime;
        }
    }

    // Adds a search history item to state
    handleAddSearchHistory = (newSearchResult) => {
        const uuidv4 = require('uuid/v4');
        let newSearchObject = {
            id: uuidv4(),
            result: newSearchResult,
            time: this.convertDateTime()
        };
        const newSearchHistory = this.state.searchHistory.concat(newSearchObject);
        this.setState({ searchHistory: newSearchHistory });
    }

    // clears search history state
    handleClearSearchHistory = () => {
        this.setState({ searchHistory: [] })
    }

    // delets a specific item from search history state
    handleDeleteSearchHistoryItem = (itemId) => {
        let newSearchHistory = this.state.searchHistory;

        for (var i = 0; i < newSearchHistory.length; i++) {
            if (newSearchHistory[i].id === itemId) {
                newSearchHistory.splice(i, 1);
            }
        }
        this.setState({searchHistory: newSearchHistory})
    }

    render() {
        return (
            <div className="search-page">
                <SearchBar onSelectSearchResult={this.handleAddSearchHistory} />
                <SearchHistory searchHistory={this.state.searchHistory} onClearSearchHistory={this.handleClearSearchHistory} onDeleteSearchHistoryItem={this.handleDeleteSearchHistoryItem} />
            </div>
        )

    }

}
