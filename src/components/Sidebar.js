import React from "react";
import SearchIcon from "../assets/images/Vector.png";
import "../App.css";

const Sidebar = ({
  selectedTab,
  handleTabChange,
  handleSearchBarChange,
  selectedSongsList,
  handleSongSelect,
  currentSong
}) => {
  return (
    <div className="sidebar">
      <div className="tabs">
        <button
          className={selectedTab === "For You" ? "active" : ""}
          onClick={() => handleTabChange("FOR_YOU")}
        >
          <span>For You</span>
        </button>
        <button
          className={selectedTab === "Top Tracks" ? "active" : ""}
          onClick={() => handleTabChange("TOP_TRACKS")}
        >
          <span>Top Tracks</span>
        </button>
      </div>
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search Song, Artist"
          onChange={handleSearchBarChange}
        />
        <img src={SearchIcon} alt="Search Icon" className="search-icon" />
      </div>
      <div className="audio-list">
        <ul>
          {selectedSongsList.map((song) => (
            <div
              className="listComponent"
              key={song?.id}
              style={{
                backgroundColor:
                  song?.id === currentSong?.id ? "#FFFFFF14" : ""
              }}
              onClick={() => handleSongSelect(song)}
            >
              <div className="listItemDiv">
                <div>
                  <img
                    className="listItemDivImage"
                    src={`https://cms.samespace.com/assets/${song.cover}`}
                    alt={song?.name}
                  />
                </div>
                <div className="listItemContentDiv">
                  <div className="songName">{song?.name}</div>
                  <div className="songArtistname">{song?.artist}</div>
                </div>
              </div>
              {/* Time not provided in the response data so hardcoded added */}
              <div className="songDuration">04:16</div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
