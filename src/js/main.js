import '../assets/styles/index.css';
import Player from './player';
import { songData } from '../assets/utils/songData';


const musicPlayer = new Player(songData);

musicPlayer.setEventListeners();

let slider = document.querySelector('.player__seek-slider-value');

function calcValue() {
  let valuePercentage = (slider.value / slider.max) * 100;
  slider.style.background = `linear-gradient(to right, #b8630f ${valuePercentage}%, #77777754 ${valuePercentage}%)`;
}

// Update the current slider value (each time you drag the slider handle)
slider.addEventListener('input', function(){
  calcValue();
})

calcValue();
