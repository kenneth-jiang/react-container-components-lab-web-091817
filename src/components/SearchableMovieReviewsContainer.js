import React, { Component } from 'react';
import MovieReviews from './MovieReviews';
import 'isomorphic-fetch';

const NYT_API_KEY = 'f98593a095b44546bf4073744b540da0';
const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'
            + `api-key=${NYT_API_KEY}&query=`;

class SearchableMovieReviewsContainer extends Component {
  constructor() {
    super();

    this.state = {
      reviews: [],
      searchTerm: '',
    };
  }

  handleSearchInputChange = (event) => (
    this.setState({
      searchTerm: event.target.value,
    })
  );

  handleSubmit = (event) => {
    event.preventDefault();

    fetch(URL.concat(this.state.searchTerm))
      .then(resp => resp.json())
      .then(resp => this.setState({ reviews: resp.results }))
      .then(() => console.log(this.state.reviews))
  }

  render() {
    return (
      <div className="searchable-movie-reviews">
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleSearchInputChange} />
          <button type="submit">Search</button>
        </form>

        <MovieReviews reviews={this.state.reviews} />
      </div>
    );
  }
}


export default SearchableMovieReviewsContainer;
