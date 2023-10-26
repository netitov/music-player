export default class Playlist {
  constructor ({ getCurrentAudio, formatTime, selectSong }, songList) {
    this._slider = document.querySelector('.player__seek-slider-value');
    this._getCurrentAudio = getCurrentAudio;
    this._playlistModal = document.querySelector('.playlist-modal');
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._songList = songList;
    this._playlistBody = document.querySelector('.playlist__table-body');
    this._formatTime = formatTime;
    this._selectSong = selectSong;
  }

  openPlaylist() {
    this._playlistModal.classList.add('playlist-modal_active');
    this._setPlayingSong();
    document.addEventListener('mousedown', this._handleOverlayClose);
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePlaylist() {
    this._playlistModal.classList.remove('playlist-modal_active');
    document.removeEventListener('mousedown', this._handleOverlayClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.closePlaylist();
    }
  }

  _handleOverlayClose(e) {
    if (e.target.classList.contains('playlist-modal_active')) {
      this.closePlaylist();
    }
  }

  _generateTrack(element) {
    const elementTemplate = document.querySelector('#track-template').content.cloneNode(true);

    const imgElement = elementTemplate.querySelector('.playlist__img');
    const titleElement = elementTemplate.querySelector('.playlist__title');
    const artistElement = elementTemplate.querySelector('.playlist__artist');
    const durationElement = elementTemplate.querySelector('.playlist__duration');

    imgElement.src = element.cover;
    titleElement.textContent = element.songName;
    artistElement.textContent = element.artist;
    let track = new Audio();
    track.src = element.song;
    elementTemplate.querySelector('.playlist__table-row').setAttribute('data-id', element.song);


    //get duration after track is loaded
    track.onloadedmetadata = () => {
      durationElement.textContent = this._formatTime(track.duration);
    };

    return elementTemplate
  }

  renderItems() {
    this._songList.forEach((i) => {
      const generatedItem = this._generateTrack(i);
      this._playlistBody.append(generatedItem);
    });
  }

  //set styles for playng song
  _setPlayingSong() {

    //clear active song data
    const playIcons = document.querySelectorAll('.playlist__play-btn');
    playIcons.forEach((i) => {
      i.classList.remove('playlist__play-btn_active', 'playlist__play-btn_paused')
    })

    const currentSong = this._getCurrentAudio();
    const songElement = document.querySelector(`[data-id="${currentSong.songData.song}"]`);
    const playIcon = songElement.querySelector('.playlist__play-btn');

    //add active border to btn
    playIcon.classList.add('playlist__play-btn_active');

    //tofggle icon play/pause
    if (currentSong.isPlaying) {
      playIcon.classList.add('playlist__play-btn_paused');
    } else {
      playIcon.classList.remove('playlist__play-btn_paused');

    }
  }

  setEventListeners() {

    //initial playlist render
    if (this._songList.length > 0) {
      this.renderItems();
    }

    //handle event song click: play/pause selected song
    this._playlistBody.addEventListener('click', (e) => {
      const closestRow = e.target.closest('.playlist__table-row');

      if (closestRow) {
        const songId = closestRow.getAttribute('data-id');
        const songData = this._songList.find(i => i.song === songId);

        const currentSong = this._getCurrentAudio();

        //pause selected song
        if (currentSong.isPlaying && currentSong.songData.song === songData.song) {
          this._selectSong(songData, false);
        } else {
          //play selected song
          this._selectSong(songData, true);

        }
        //set styles for selected song
        this._setPlayingSong();
      }
    })

  }

}
