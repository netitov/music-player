import '../assets/styles/index.css';
import Player from './player';
import SeekSlider from './seekSlider';
import { songData } from '../assets/utils/songData';

const musicPlayer = new Player(songData);
const seekSlider = new SeekSlider({ getCurrentAudio: () => musicPlayer.getCurrentAudio() });

musicPlayer.setEventListeners();
seekSlider.setEventListeners();


