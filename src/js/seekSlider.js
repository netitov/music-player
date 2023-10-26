
export default class SeekSlider {
  constructor ({ getCurrentAudio, formatTime }) {
    this._slider = document.querySelector('.player__seek-slider-value');
    this._getCurrentAudio = getCurrentAudio;
    this._audioData = this._getCurrentAudio();
    this._currentSongTime = document.querySelector('.player__current-time');
    this._totalSongTime = document.querySelector('.player__total-time');
    this._songDuration = 0;
    this._formatTime = formatTime;
  }

  //update slider value while song playng
  _updateSliderValue() {
    if (this._songDuration > 0) {
      const valuePercentage = (this._audioData.audio.currentTime / this._songDuration) * 100;
      this._slider.style.background = `linear-gradient(to right, #b8630f ${valuePercentage}%, #77777754 ${valuePercentage}%)`;
      this._slider.value = Math.round(valuePercentage);
    }
  }

  //update slider value by user
  _handleSeeking() {
    if (this._songDuration > 0) {
      const valuePercentage = (this._slider.value / this._slider.max) * 100;
      this._slider.style.background = `linear-gradient(to right, #b8630f ${valuePercentage}%, #77777754 ${valuePercentage}%)`;
      this._audioData.audio.currentTime = (this._slider.value / this._slider.max) * this._songDuration;
    }
  }

  _setDuration(duration) {
    this._totalSongTime.textContent = this._formatTime(duration);
    this._songDuration = duration;
  }

  _updateTime() {
    const currentTime = this._audioData.audio.currentTime;
    this._currentSongTime.textContent = this._formatTime(currentTime);
  }

  setEventListeners() {

    this._updateSliderValue();

    this._slider.addEventListener('input', () => this._handleSeeking());

    if (this._audioData) {
      //update song time
      this._audioData.audio.addEventListener('timeupdate', () => {
        this._updateTime();
        this._updateSliderValue()
      });
      //update duration when song is loaded
      this._audioData.audio.addEventListener('loadeddata', () => this._setDuration(this._audioData.audio.duration))
    }
  }

}
