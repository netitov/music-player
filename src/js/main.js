import '../assets/styles/index.css';
import Player from './player';
import SeekSlider from './seekSlider';
import Playlist from './playlist';
import { songData } from '../assets/utils/songData';
import { formatTime } from '../assets/utils/TimeFormater';
import WaveSurfer from 'wavesurfer.js'

const playlistBtn = document.querySelector('.page__playlist-btn');

const musicPlayer = new Player(songData, WaveSurfer);

const seekSlider = new SeekSlider({
  getCurrentAudio: () => musicPlayer.getCurrentAudio(),
  formatTime
});

const musicPlaylist = new Playlist({
  getCurrentAudio: () => musicPlayer.getCurrentAudio(),
  formatTime,
  selectSong: musicPlayer.setSong
}, songData);

playlistBtn.addEventListener('click', () => musicPlaylist.openPlaylist() );

musicPlayer.setEventListeners();
seekSlider.setEventListeners();
musicPlaylist.setEventListeners();



