import React, { useEffect, useState } from "react";
import axios from "axios";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import "./App.css";

function App() {
  
  // @author- Vishal Bibe

  const [selectedTab, setSelectedTab] = useState("For You");
  const [allSongsList, setAllSongsList] = useState([]);
  const [selectedSongsList, setSelectedSongsList] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  /**
   * Dynamic tab change function and based on that state updation
   * @param {*} tab
   */
  const handleTabChange = (tab) => {
    if (tab === "TOP_TRACKS") {
      setSelectedTab("Top Tracks");
      setSelectedSongsList(allSongsList?.filter((song) => song?.top_track));
    } else {
      setSelectedTab("For You");
      setSelectedSongsList(allSongsList);
    }
  };

  /**
   * based on the selected song change the application bg color
   * @param {*} color
   */
  const handleColorChange = (color) => {
    document.documentElement.style.setProperty("--background-color", color);
  };

  /**
   * When user trying to search the any song by songName || artistName then filter the data
   * @param {*} e
   */
  const handleSearchBarChange = (e) => {
    const value = e.target.value?.toLowerCase();
    let list = selectedTab === "Top Tracks" ? allSongsList?.filter((ob)=> ob?.top_track) : allSongsList
    if (value) {
      const filterList = list?.filter(
        (obj) =>
          obj?.name?.toLowerCase().includes(value) ||
          obj?.artist?.toLowerCase().includes(value)
      );
      setSelectedSongsList(filterList);
    } else {
      setSelectedSongsList(list);
    }
  };

  /**
   * when user change the song then update the selected song
   * @param {*} song
   */
  const handleSongSelect = (song) => {
    setCurrentSong(song);
  };

  /**
   * when user click on the prev |  next icon of the song then based  on that playing & update the selected song
   * @param {*} action
   */
  const handleClickSongHandle = (action) => {
    if (currentSong) {
      let _nextSong;

      const _maxLen = selectedSongsList?.length - 1;
      const _currSongInd = selectedSongsList?.indexOf(currentSong);

      if (action === "Next") {
        _currSongInd === _maxLen
          ? (_nextSong = 0)
          : (_nextSong = _currSongInd + 1);
      } else {
        _currSongInd === 0
          ? (_nextSong = _maxLen)
          : (_nextSong = _currSongInd - 1);
      }

      setCurrentSong(selectedSongsList[_nextSong]);
    }
  };

  /**
   * Get the all songs list at initial moment
   */
  const getAllSongsList = () => {
    axios
      .get(`https://cms.samespace.com/items/songs`)
      .then((res) => {
        if (res?.data?.data) {
          setAllSongsList(res?.data?.data);
          setSelectedSongsList(res?.data?.data);
          setCurrentSong(res?.data?.data[0]);
        }
      })
      .catch((er) => console.log(er));
  };

  /**
   * fetch the all songs list
   */
  useEffect(() => {
    getAllSongsList();
  }, []);

  /**
   * change the bg color as per the selection of the song
   */
  useEffect(() => {
    if (currentSong?.accent) {
      handleColorChange(currentSong?.accent);
    }
  }, [currentSong]);

  return (
    <div className="app-container">
      <Profile />
      <Sidebar
        selectedTab={selectedTab}
        handleTabChange={handleTabChange}
        handleSearchBarChange={handleSearchBarChange}
        selectedSongsList={selectedSongsList}
        handleSongSelect={handleSongSelect}
        currentSong={currentSong}
      />
      <Player
        currentSong={currentSong}
        handleClickSongHandle={handleClickSongHandle}
      />
    </div>
  );
}

export default App;
