import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../App.css"; 

const Player = ({ currentSong, handleClickSongHandle }) => {
  return (
    <div className="player">
      <div className="song-info">
        {currentSong ? (
          <>
            <h3>{currentSong?.name}</h3>
            <p className="songArtistname">{currentSong?.artist}</p>
          </>
        ) : (
          <h3>Select a song to play</h3>
        )}
      </div>
      {currentSong?.cover && (
        <div className="songImgDiv">
          <img
            className="audio-image"
            src={`https://cms.samespace.com/assets/${currentSong?.cover}`}
            alt={currentSong?.title}
          />
        </div>
      )}
      <div className="audio-controls">
        <AudioPlayer
          style={{
            borderRadius: "0px",
            backgroundColor: currentSong?.accent
              ? `${currentSong?.accent}`
              : "#151515"
          }}
          autoPlay={false}
          src={currentSong?.url}
          showSkipControls={true}
          showJumpControls={false}
          onClickPrevious={() => handleClickSongHandle("Prev")}
          onClickNext={() => handleClickSongHandle("Next")}
          onEnded={() => handleClickSongHandle("Next")}
        />
      </div>
    </div>
  );
};

export default Player;
