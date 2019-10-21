import React, { Component } from "react";
import axios from "axios";
import "./searchBar.css";

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            searchResluts: [],
            inputBlur: true
        };
        this.getSearchResults = this.getSearchResults.bind(this);
    }


    // handles changes to the search query
    changeHandler = event => {
        const searchQuery = event.target.value;
        this.setState({
            query: searchQuery
        });
        if (searchQuery.length > 0){
        this.getSearchResults(searchQuery);
        }
    }


    // Fetches results from flickrs search api
    getSearchResults = (searchQuery) => {
        axios.get('https://www.flickr.com/services/rest/?method=flickr.groups.search&api_key=1fed68af2e8f0c60b63340ba6eb96172&text=' + searchQuery + '&per_page=5&format=json&nojsoncallback=1')
            .then((response) => {
                this.setState({
                    searchResluts: response.data.groups.group
                });
            })
            .catch((error) => {
                this.setState({
                    searchResluts: []
                });
            })

    }

    //displays the autocomplete section
    inputFocus = () => {
        this.setState({
            inputBlur: false
        })
    }

     //hides the autocomplete section
    inputBlur = () => {
        this.setState({
            inputBlur: true
        })
    }

    //Handles search result/autocomplete clicks.
    handleSelectSearchResult = event => {
        this.props.onSelectSearchResult(event.target.dataset.value);
    }


    //creates the search result/autocomplete list.
    renderSearchResults = () => {
        var resultList;
        try {
            resultList = this.state.searchResluts.map((item, i) => {
                return <li key={i} data-value={item.name} className="search-result-item" onMouseDown={this.handleSelectSearchResult}>
                    {item.name}
                </li>
            });

        }
        catch (error) {
            return resultList = <div>No Results Found</div>

        }
        return resultList;
    }

    render() {
        return (
            <div className="search-bar">
                <form className="search-form">
                    <input className="search-input" type="search" pattern="[A-Za-z0-9]" autocomplete="off" placeholder="Search for flickr stuff" name="searchQuery" value={this.state.query} onFocus={this.inputFocus} onBlur={this.inputBlur} onChange={this.changeHandler} />
                </form>
                {!this.state.inputBlur && this.state.searchResluts.length !== 0
                    ?
                    <ul className="search-results">

                        {this.renderSearchResults()}
                    </ul>
                    :
                    <div></div>
                }
            </div>
        )
    }

}
