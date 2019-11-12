import React from "react";
import SearchResults from "./SearchResults";

export default class Home extends React.Component {
  player;
  YTPlayer = require("yt-player");

  playSong = videoID => {
    this.player.load(`${videoID}`);
    this.player.play();
    this.player.on("ended", () => this.handleNextSong());
  };

  handleNextSong = () => {
    this.props.handleNextSong();
  };

  handlePlayPause = () => {
    if (this.props.play) {
      this.player.pause();
    } else {
      this.player.play();
    }
    this.props.handlePlayPause();
  };

  componentDidMount() {
    if (this.props.user) {
      this.player = new this.YTPlayer("#player");
      this.nameInput.focus();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.videoID !== this.props.videoID) {
      this.playSong(this.props.videoID);
    }
  }

  render() {
    return this.props.user ? (
      <div>
        <input
          ref={input => {
            this.nameInput = input;
          }}
          onChange={event => this.props.inputChange(event)}
          type="search"
          name="search"
          placeholder="search for a song"
          value={this.props.search}
          autoComplete="off"
        />
        <br></br>
        <button type="submit"></button>
        <div id="player"></div>
        {this.props.songLoaded ? (
          <div>
            <button onClick={this.props.handleNextSong} className="next">
              Next Song
            </button>
            <button onClick={this.handlePlayPause}>
              {" "}
              {this.props.play ? "PAUSE" : "PLAY"}
            </button>
          </div>
        ) : null}

        <SearchResults
          handleSongRequest={this.props.handleSongRequest}
          searchResults={this.props.searchResults}
        />
      </div>
    ) : (
      <h1 className="login-warning"> You have to be logged in to see that!</h1>
    );
  }
}
