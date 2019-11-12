import React from 'react';
import './App.css';
import Home from './Home'
import About from './About'
import LoginSignUp from './LoginSignUp'
import Navbar from './Navbar'
import { BrowserRouter as Router, Route } from "react-router-dom"

class App extends React.Component {

  state = {
    user: null,
    search: "",
    username_login: "",
    username_signUp: "",
    password_login: "",
    password_signUp: "",
    password_confirmation:"",
    queue: [],
    searchResults:[],
    videoInfo: {},
    resultsView: false,

  }

  

  searchSong = (event, query) => {
    event.preventDefault()
    fetch(`http://localhost:3000/spotifysearch?q=${query}`).then(resp => resp.json()).then(json => this.setState({searchResults: json, resultsView: true}))
  }

  handleSongRequest = (name, artist, uri) => {
    fetch(`http://localhost:3000/handlesearchrequest?q=${name} ${artist}&uri=${uri}`).then(resp => resp.json()).then(json=> this.setState({queue: json.recommended_songs, videoInfo: json.video_info}))
  }

  

  login = (event, user) => {
    event.preventDefault()
    if(event.target.password_confirmation && event.target.password_confirmation.value === event.target.password_signUp.value && event.target.password_signUp.value !=="") {
    this.setState({user: user})
    } else if (!event.target.password_confirmation){
      this.setState({user: user})
    }
    console.log(this.state)
  }

  logout = () =>{
    this.setState({user: null})
  }

  inputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
  return (
    <Router>
   <>
      <Navbar {...this.state} logout={this.logout}/>
      <Route exact path="/home" render={(routerProps)=><Home inputChange={this.inputChange}{...routerProps} searchSong={this.searchSong}user={this.state.user} resultsView={this.state.resultsView} search={this.state.search} videoID={this.state.videoInfo.videoId} handleSongRequest={this.handleSongRequest}/>} />
      <Route exact path="/about" component={About} />
      <Route exact path="/" render={(routerProps)=> <LoginSignUp inputChange={this.inputChange} {...routerProps} {...this.state} login={this.login}/>}/>
   </>
   </Router>
  );
  }
}

export default App;
