import React from "react";
import SearchResults from "./SearchResults";
import Lyrics from "./Lyrics.js";

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

  logout = () => {
    this.props.logout(this.props.history);
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
          <div className="controls">
            <button onClick={this.props.handleNextSong}>
              <i className="fa fa-step-forward"></i>
            </button>
            <button onClick={this.handlePlayPause}>
              {this.props.play ? (
                <i className="fa fa-pause"></i>
              ) : (
                <i className="fa fa-play"></i>
              )}
            </button>
          </div>
        ) : null}

        <SearchResults
          handleSongRequest={this.props.handleSongRequest}
          searchResults={this.props.searchResults}
        />
        <Lyrics lyrics={this.props.lyrics} />
        <button className="logoutButton" onClick={this.logout}>
          Logout
        </button>
      </div>
    ) : (
      <div>{this.props.history.push("/")}</div>
      //   <h1 className="login-warning"> You have to be logged in to see that!</h1>
    );
  }
}
