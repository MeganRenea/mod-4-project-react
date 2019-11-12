import React from "react"
import SearchResults from "./SeachResults"

export default class Home extends React.Component {

    player;
    YTPlayer = require('yt-player')

    playSong = (videoID) => {
        this.player.load(`${videoID}`)
        this.player.play()
      }

    componentDidMount(){
        if (this.props.user){
        this.player = new this.YTPlayer('#player')
        }
    }

    componentDidUpdate(prevProps){
        if (prevProps.videoID !== this.props.videoID){
        this.playSong(this.props.videoID)}
    }
     
   


    render(){
        return (this.props.user && !this.props.resultsView?  <><form className="search" onSubmit={(event) => this.props.searchSong(event, this.props.search)}><input onChange={this.props.inputChange} type="search"  name="search" placeholder="Search Song" value={this.props.search} /><button type="submit">Submit</button></form><div id="player" ></div></> : this.props.user && this.props.resultsView ? <SearchResults handleSongRequest={this.props.handleSongRequest} searchResults={this.props.searchResults} /> : <h1> You have to be logged in to see that!</h1>)
            
            
            
           
            
        
    }
    

}