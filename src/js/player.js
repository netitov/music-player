
export default class Player {
  constructor (songs) {
    this._playBtn = document.querySelector('.player__btn-play');
    this._nextSongBtn = document.querySelector('.player__btn-next');
    this._prevSongBtn = document.querySelector('.player__btn-prev');
    this.isPlaying = false;
    this._allSongs = songs;
    this.audio = new Audio();
    this._playerImage = document.querySelector('.player__image');
    this._songName = document.querySelector('.player__song-name');
    this._artist = document.querySelector('.player__artist');
    this._activeSong;
    this._volume = document.querySelector('.player__volume-input');
    this._volumeValue = document.querySelector('.player__volume-value');
    this._volumeBtn = document.querySelector('.player__btn-volume');
  }

  _setSong(songData, play) {
    this._playerImage.src = songData.cover;
    this._songName.textContent = songData.songName;
    this._artist.textContent = songData.artist;
    this.audio.src = songData.song;
    this._activeSong = songData;

    if (play) {
      this._playSong();
    }
  }

  _playNextSong() {
    const currentSongIndex = this._allSongs.findIndex(i => i.song === this._activeSong.song);
    let nextSong;

    if ((currentSongIndex + 1) >= this._allSongs.length) {
      nextSong = this._allSongs[0];
    } else {
      nextSong = this._allSongs[currentSongIndex + 1];
    }

    this._setSong(nextSong, true);
  }

  _playPreviousSong() {
    const currentSongIndex = this._allSongs.findIndex(i => i.song === this._activeSong.song);
    let previousSong;

    if (currentSongIndex === 0) {
      previousSong = this._allSongs[this._allSongs.length - 1];
    } else {
      previousSong = this._allSongs[currentSongIndex - 1];
    }

    this._setSong(previousSong, true);
  }

  _playSong() {
    this.audio.play();
    this.isPlaying = true;
    this._playBtn.classList.add('player__btn-play_inactive');
  }

  _pauseSong() {
    this.audio.pause();
    this.isPlaying = false;
    this._playBtn.classList.remove('player__btn-play_inactive');
  }

  _togglePlay() {
    //if play is not active - play song
    if (!this.isPlaying) {
      this._playSong();
      //else - pause song
    } else {
      this._pauseSong();
    }
  }

  getCurrentAudio() {
    console.log('getCurrent')
    return { audio: this.audio, isPlaying: this.isPlaying };
  }

  _handleVolume() {
    this.audio.volume = Number(this._volume.value) / 100;
    this._volumeValue.textContent = this._volume.value + '%';

    if (this._volume.value === '0') {
      this._volumeBtn.classList.add("player__btn-volume_mute");
    } else {
      this._volumeBtn.classList.remove("player__btn-volume_mute");
    }
  }


  setEventListeners() {

    //set default song
    this._setSong(this._allSongs[0]);

    this._playBtn.addEventListener('click', () => this._togglePlay());
    this._nextSongBtn.addEventListener('click', () => this._playNextSong());
    this._prevSongBtn.addEventListener('click', () => this._playPreviousSong());
    this._volume.addEventListener('input', () => this._handleVolume());
  }

}
