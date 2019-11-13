import React from "react";

export default class SearchResults extends React.Component {
  renderSearchResults = () => {
    if (this.props.searchResults.length === 0) {
      return false;
    }
    return this.props.searchResults.map(song => {
      return (
        <div>
          <li
            onClick={() =>
              this.props.handleSongRequest(song.name, song.artist, song.uri)
            }
          >
            {song.name} - {song.artist}
          </li>
          <br></br>
        </div>
      );
    });
  };
  render() {
    return <ul className="searchResults">{this.renderSearchResults()}</ul>;
  }
}
