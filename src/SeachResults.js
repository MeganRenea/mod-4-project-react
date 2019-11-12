import React from "react"

export default class About extends React.Component {

    renderSearchResults = () => {
        this.props.searchResults.map(song => <li onClick={() => this.props.handleSongRequest(song.name, song.artist, song.uri)}>{song.name}</li>)
    }
    render(){
        return (
           <ul>{this.renderSearchResults()}</ul>
        )
    }
    

}