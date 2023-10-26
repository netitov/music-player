import '../assets/styles/index.css';
import Player from './player';
import SeekSlider from './seekSlider';
import Playlist from './playlist';
import { songData } from '../assets/utils/songData';
import { formatTime } from '../assets/utils/TimeFormater';
import WaveSurfer from 'wavesurfer.js'

const playlistBtn = document.querySelector('.page__playlist-btn');

const initializePlayer = (playList) => {
  const musicPlayer = new Player(playList, WaveSurfer);
  const seekSlider = new SeekSlider({
    getCurrentAudio: () => musicPlayer.getCurrentAudio(),
    formatTime
  });
  const musicPlaylist = new Playlist({
    getCurrentAudio: () => musicPlayer.getCurrentAudio(),
    formatTime,
    selectSong: musicPlayer.setSong
  }, playList);

  musicPlayer.setEventListeners();
  seekSlider.setEventListeners();
  musicPlaylist.setEventListeners();

  playlistBtn.addEventListener('click', () => musicPlaylist.openPlaylist() );
};

//check playlist in local storage: add if doesn't exist
const setSongList = () => {
  let playList = [];
  const savedSongs = JSON.parse(localStorage.getItem('playlist'));
  if (savedSongs) {
    playList = savedSongs;
  } else {
    localStorage.setItem('playlist', JSON.stringify(songData));
    playList = songData;
  }
  initializePlayer(playList);
};

setSongList();

