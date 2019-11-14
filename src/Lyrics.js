import React from "react";

export default class Lyrics extends React.Component {
  makeLyrics = () => {
    return this.props.lyrics.map(lyric => {
      return lyric.includes("[") ? (
        <p style={{ color: "rgb(9, 236, 244)" }}>{lyric}</p>
      ) : (
        <p>{lyric}</p>
      );
    });
  };
  render() {
    return (
      <div className="lyrics">
        {this.props.lyrics.length > 0 ? (
          <>
            <h1>LYRICS</h1> {this.makeLyrics()}
          </>
        ) : null}
      </div>
    );
  }
}
