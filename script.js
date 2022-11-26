"use strict";

const musicContainer = document.querySelector(".music-container");
const musicImg = document.querySelector(".music-img");
const musicTitle = document.querySelector(".track-title");
const musicArtist = document.querySelector(".track-artist");
const musicAudio = document.querySelector(".music-audio");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-bar");
const volume = document.querySelector(".volume");
const volumeBar = document.querySelector(".volume-bar");
const curTime = document.querySelector(".cur-time");
const duration = document.querySelector(".duration-time");
const prevBtn = document.querySelector("#prev");
const playPauseBtn = document.querySelector("#play-pause");
const nextBtn = document.querySelector("#next");
const shuffleBtn = document.querySelector("#shuffle");
const repeatBtn = document.querySelector("#repeat");
const volumeBtn = document.querySelector("#volume");

//music array
const musics = [
  { title: "brown munde", artist: "AP DHILLON" },
  { title: "lalisa", artist: "LISA" },
  { title: "lisa money", artist: "LISA" },
  { title: "Zehn kleine Jägermeister", artist: "Die Toten Hosen" },
];

let songIndex;
let isPlaying;
let repeat = false;
let shuffle = false;
let currentTime = {};
let durationTime = {};
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

  //for duration
  setTimeout(() => {
    durationTime.min = Math.floor(musicAudio.duration / 60);
    durationTime.sec = Math.floor(musicAudio.duration % 60);
    durationTime.sec =
      durationTime.sec > 9 ? durationTime.sec : "0" + durationTime.sec;
    duration.textContent = `${durationTime.min}:${durationTime.sec}`;
  }, 1000);
}

musicAudio.ontimeupdate = (e) => {
  let perc = (musicAudio.currentTime / musicAudio.duration) * 100;
  progress.style.width = `${perc}%`;

  //for current time
  currentTime.min = Math.floor(musicAudio.currentTime / 60);
  currentTime.sec = Math.floor(musicAudio.currentTime % 60);
  currentTime.sec =
    currentTime.sec > 9 ? currentTime.sec : "0" + currentTime.sec;
  curTime.textContent = `${currentTime.min}:${currentTime.sec}`;
};

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

progressBar.addEventListener("click", function (e) {
  // console.log(e.offsetX);
  let perc = (e.offsetX / 380) * 100;
  // console.log(perc);
  let curTime = (perc / 100) * musicAudio.duration;
  musicAudio.currentTime = curTime;
  // console.log(curTime);
});

volumeBtn.addEventListener("click", function () {
  let ico = Array.from(document.querySelectorAll(".vol-ico"));
  ico.forEach((el) => el.classList.toggle("hide"));
  let icoVolume = ico[0]; //the icon with volume on
  if (icoVolume.classList.contains("hide")) {
    musicAudio.muted = true;
  } else {
    musicAudio.muted = false;
  }
  // console.log(icoVolume);
});

//volume bar
volumeBar.addEventListener("click", function (e) {
  let x = e.offsetX;
  let volBarWidth = volumeBar.clientWidth;
  let perc = (x / volBarWidth) * 100;
  let vol = Math.floor(perc) / 100;
  musicAudio.volume = vol;
  console.log(Math.floor(perc) / 100);
  volume.style.width = `${perc}%`;
});

function init() {
  songIndex = 0;
  musicChange(musics[songIndex]);
}

init();
