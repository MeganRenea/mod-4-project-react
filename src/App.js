import React from "react";
import "./App.css";
import Home from "./Home";
import About from "./About";
import LoginSignUp from "./LoginSignUp";
import { BrowserRouter as Router, Route } from "react-router-dom";

const HEROKU_URL = "https://obscure-retreat-80319.herokuapp.com/";

class App extends React.Component {
  state = {
    user: localStorage.getItem("user"),
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
    play: false,
    lyrics: []
  };

  getLyrics = (name, artist) => {
    fetch(
      `https://obscure-retreat-80319.herokuapp.com/geniusrequest?q=${this.normalizeString(
        name
      )} ${this.normalizeString(artist)}`
    )
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          lyrics: json
        });
      });
  };

  normalizeString = str => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  searchSong = query => {
    if (query === "") {
      return false;
    }
    fetch(
      `https://obscure-retreat-80319.herokuapp.com/spotifysearch?q=${query}`
    )
      .then(resp => resp.json())
      .then(json => this.setState({ searchResults: json }));
  };

  handleSongRequest = (name, artist, uri) => {
    fetch(
      `https://obscure-retreat-80319.herokuapp.com/handlesongrequest?q=${this.normalizeString(
        name
      )} ${this.normalizeString(artist)}&uri=${uri}`
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
    this.getLyrics(name, artist);
  };

  handleNextSong = () => {
    let queue = [...this.state.queue];
    let nextSong = queue.shift();
    if (queue.length === 0) {
      this.handleSongRequest(nextSong.name, nextSong.artist, nextSong.uri);
    } else {
      fetch(
        `https://obscure-retreat-80319.herokuapp.com/youtubesearch?q=${nextSong.name} ${nextSong.artist}`
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
      this.getLyrics(nextSong.name, nextSong.artist);
    }
  };

  // login = (event, user, history) => {
  //   event.preventDefault();
  //   if (
  //     event.target.password_confirmation &&
  //     event.target.password_confirmation.value ===
  //       event.target.password_signUp.value &&
  //     event.target.password_signUp.value !== ""
  //   ) {
  //     this.setState({ user: user });
  //   } else if (!event.target.password_confirmation) {
  //     this.setState({ user: user });
  //   }
  //   localStorage.setItem("user", user);
  //   history.push("/home");
  // };

  handleLogin = event => {
    event.preventDefault();
    fetch("https://obscure-retreat-80319.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        username: this.state.username_login,
        password: this.state.password_login
      })
    })
      .then(resp => resp.json())
      .then(json => {
        if (json.error) {
          alert(json.error);
        } else {
          localStorage.setItem("user", json.username);
          this.setState({ user: localStorage.getItem("user") });
        }
      });
  };

  handleSignup = event => {
    event.preventDefault();
    if (this.state.password_signUp === this.state.password_confirmation) {
      fetch("https://obscure-retreat-80319.herokuapp.com/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          username: this.state.username_signUp,
          password: this.state.password_signUp
        })
      })
        .then(resp => resp.json())
        .then(json => {
          if (json.error) {
            alert(json.error);
          } else {
            localStorage.setItem("user", json.username);
            this.setState({ user: localStorage.getItem("user") });
          }
        });
    } else alert("Passwords must match.");
  };

  logout = () => {
    localStorage.clear();
    window.location.reload();
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
                redirectToLogin={this.redirectToLogin}
                logout={this.logout}
                lyrics={this.state.lyrics}
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
                handleLogin={this.handleLogin}
                handleSignup={this.handleSignup}
              />
            )}
          />
        </>
      </Router>
    );
  }
}

export default App;
