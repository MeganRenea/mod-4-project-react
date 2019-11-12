import React from "react";
import "./App.css";
import Home from "./Home";
import About from "./About";
import LoginSignUp from "./LoginSignUp";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
  state = {
    user: null,
    search: "",
    username_login: "",
    username_signUp: "",
    password_login: "",
    password_signUp: "",
    password_confirmation: "",
    queue: [],
    searchResults: [],
    videoInfo: {},
    typing: false,
    typingTimeout: 0,
    songLoaded: false,
    play: false
  };

  searchSong = query => {
    if (query === "") {
      return false;
    }
    fetch(`http://localhost:3000/spotifysearch?q=${query}`)
      .then(resp => resp.json())
      .then(json => this.setState({ searchResults: json }));
  };

  handleSongRequest = (name, artist, uri) => {
    fetch(
      `http://localhost:3000/handlesongrequest?q=${name} ${artist}&uri=${uri}`
    )
      .then(resp => resp.json())
      .then(json =>
        this.setState({
          queue: json.recommended_songs,
          videoInfo: json.video_info,
          play: true,
          songLoaded: true,
          searchResults: [],
          search: `${name} - ${artist}`
        })
      );
  };

  handleNextSong = () => {
    let queue = [...this.state.queue];
    let nextSong = queue.shift();
    if (queue.length === 0) {
      this.handleSongRequest(nextSong.name, nextSong.artist, nextSong.uri);
    } else {
      fetch(
        `http://localhost:3000/youtubesearch?q=${nextSong.name} ${nextSong.artist}`
      )
        .then(response => response.json())
        .then(json => {
          this.setState({
            queue: queue,
            videoInfo: json,
            search: `${nextSong.name} - ${nextSong.artist}`,
            play: true
          });
        });
    }
  };

  login = (event, user, history) => {
    event.preventDefault();
    if (
      event.target.password_confirmation &&
      event.target.password_confirmation.value ===
        event.target.password_signUp.value &&
      event.target.password_signUp.value !== ""
    ) {
      this.setState({ user: user });
    } else if (!event.target.password_confirmation) {
      this.setState({ user: user });
    }
    history.push("/home");
  };

  logout = () => {
    this.setState({ user: null });
  };

  inputChange = event => {
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
    let query = event.target.value;
    this.setState({
      [event.target.name]: event.target.value,
      typing: false,
      typingTimeout: setTimeout(() => {
        this.searchSong(query);
      }, 500)
    });
    //this.searchSong(this.state.search);
  };

  inputChangeLoginSignup = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handlePlayPause = () => {
    this.setState(prevState => {
      return {
        play: !prevState.play
      };
    });
  };

  render() {
    return (
      <Router>
        <>
          {/* <Navbar {...this.state} logout={this.logout} /> */}
          <Route
            exact
            path="/home"
            render={routerProps => (
              <Home
                inputChange={this.inputChange}
                {...routerProps}
                searchSong={this.searchSong}
                user={this.state.user}
                resultsView={this.state.resultsView}
                search={this.state.search}
                videoID={this.state.videoInfo.videoId}
                handleSongRequest={this.handleSongRequest}
                searchResults={this.state.searchResults}
                handleNextSong={this.handleNextSong}
                songLoaded={this.state.songLoaded}
                play={this.state.play}
                handlePlayPause={this.handlePlayPause}
              />
            )}
          />
          <Route exact path="/about" component={About} />
          <Route
            exact
            path="/"
            render={routerProps => (
              <LoginSignUp
                inputChange={this.inputChangeLoginSignup}
                {...routerProps}
                {...this.state}
                login={this.login}
              />
            )}
          />
        </>
      </Router>
    );
  }
}

export default App;
