"use strict";

const musicContainer = document.querySelector(".music-container");
const musicImg = document.querySelector(".music-img");
const musicTitle = document.querySelector(".track-title");
const musicArtist = document.querySelector(".track-artist");
const musicAudio = document.querySelector(".music-audio");
const progress = document.querySelector(".progress");
const prevBtn = document.querySelector("#prev");
const playPauseBtn = document.querySelector("#play-pause");
const nextBtn = document.querySelector("#next");

//music array

const musics = [
  { title: "brown munde", artist: "AP DHILLON" },
  { title: "lalisa", artist: "LISA" },
];

let songIndex = 1;

function play(music) {
  musicTitle.textContent = music.title.toUpperCase();
  musicArtist.textContent = music.artist.toUpperCase();
  musicImg.src = `./img/${music.title}.jpg`;
  musicAudio.src = `./songs/${music.title}.mp3`;
}

playPauseBtn.addEventListener("click", function () {
  musicContainer.classList.toggle("play");
  console.log(playPauseBtn);
  if (musicContainer.classList.contains("play")) {
    playPauseBtn.innerHTML = "<i class='fas fa-pause'></i>";
    musicAudio.play();
  } else {
    playPauseBtn.innerHTML = "<i class='fas fa-play'></i>";
    musicAudio.pause();
  }
});

//next music
nextBtn.addEventListener("click", function () {
  songIndex = (songIndex + 1) % musics.length;
  play(musics[songIndex]);
});

//previous music
prevBtn.addEventListener("click", function () {
  songIndex = songIndex ? songIndex - 1 : musics.length - 1;
  play(musics[songIndex]);
});
