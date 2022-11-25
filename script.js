"use strict";

const musicContainer = document.querySelector(".music-container");
const musicImg = document.querySelector(".music-img");
const musicTitle = document.querySelector(".track-title");
const musicArtist = document.querySelector(".track-artist");
const musicAudio = document.querySelector(".music-audio");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-bar");
const prevBtn = document.querySelector("#prev");
const playPauseBtn = document.querySelector("#play-pause");
const nextBtn = document.querySelector("#next");
const shuffleBtn = document.querySelector("#shuffle");
const repeatBtn = document.querySelector("#repeat");
//music array
const musics = [
  { title: "brown munde", artist: "AP DHILLON" },
  { title: "lalisa", artist: "LISA" },
  { title: "lisa money", artist: "LISA" },
  { title: "escort", artist: "bhalu" },
];

let songIndex;
let isPlaying;
let repeat = false;
let shuffle = false;

//generate random index
function generateRandomIndex() {
  const index = Math.floor(Math.random() * musics.length);
  return index;
}

//to change music
function musicChange(music) {
  musicTitle.textContent = music.title.toUpperCase();
  musicArtist.textContent = music.artist.toUpperCase();
  musicImg.src = `./img/${music.title}.jpg`;
  musicAudio.src = `./songs/${music.title}.mp3`;
  progressUpdate();
}

function progressUpdate() {
  musicAudio.ontimeupdate = (e) => {
    let perc = (musicAudio.currentTime / musicAudio.duration) * 100;

    progress.style.width = `${perc}%`;
  };
}

function progressReset() {
  progress.style.width = "0%";
}

function repeatCheck() {
  if (repeat) {
    musicAudio.onended = () => {
      musicAudio.play();
    };
  } else {
    musicAudio.onended = () => {
      nextBtn.click();
      console.log("ended without repeat");
    };
  }
}

//when pausing play or pause
playPauseBtn.addEventListener("click", function () {
  musicContainer.classList.toggle("play");
  isPlaying = musicContainer.classList.contains("play");
  //when its playing
  repeatCheck();
  if (isPlaying) {
    playPauseBtn.innerHTML = "<i class='fas fa-pause'></i>";
    musicAudio.play();
  } else {
    //when its not playing
    playPauseBtn.innerHTML = "<i class='fas fa-play'></i>";
    musicAudio.pause();
  }
});

//next music
nextBtn.addEventListener("click", function () {
  if (!shuffle) songIndex = (songIndex + 1) % musics.length;
  else {
    let randIndex = generateRandomIndex();
    while (songIndex == randIndex) {
      randIndex = generateRandomIndex();
    }
    songIndex = randIndex;
  }

  //changing music
  musicChange(musics[songIndex]);
  if (isPlaying) musicAudio.play();
  else {
    progressReset();
  }
});

//previous music
prevBtn.addEventListener("click", function () {
  if (!shuffle) songIndex = songIndex ? songIndex - 1 : musics.length - 1;
  else songIndex = generateRandomIndex();
  musicChange(musics[songIndex]);
  if (isPlaying) musicAudio.play();
  else {
    progressReset();
  }
});

//shuffle
shuffleBtn.addEventListener("click", function (e) {
  if (!shuffle) {
    shuffle = true;
    shuffleBtn.style.color = "#352e73";
  } else {
    shuffle = false;
    shuffleBtn.style.color = "#7a70dc";
  }

  //   console.log(shuffle);
});

repeatBtn.addEventListener("click", function () {
  if (repeat) {
    repeatBtn.style.color = "#7a70dc";
    repeat = false;
  } else {
    repeatBtn.style.color = "#352e73";
    repeat = true;
  }
});

function init() {
  songIndex = 0;
  musicChange(musics[songIndex]);
}
init();
