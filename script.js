const musics=[
    {   nameImage:"haramgeceler",
        nameMusic:"haramgeceler",
        title:"Haram Geceler",
        creator:"Pilli Bebek"
    },
    {
        nameImage:"ezhelnefret",
        nameMusic:"ezhelnefret",
        title:"Nefret",
        creator:"Ezhel"
    },
    {
        nameImage:"adamlar",
        nameMusic:"bendenBana",
        title:"Benden Bana",
        creator:"Adamlar"
    },
    {
        nameImage:"maneskin",
        nameMusic:"theLoneliest",
        title:"The Loneliest",
        creator:"Maneskin"
    },
    {
        nameImage:"barısmanco",
        nameMusic:"aynalıkemer",
        title:"Aynalı Kemer",
        creator:"Barış Manço"
    },

]



const prevButton = document.getElementById("prev")
const playButton = document.getElementById("playButton")
const nextButton = document.getElementById("next")
const audio = document.getElementById("audio")

const imageMusic = document.getElementById("imageMusic")
const nameMusic = document.getElementById("nameMusic")
const creatorMusic = document.getElementById("creatorMusic")
const progressBlack = document.getElementById("progressBlack")
const firstTimeSpan = document.getElementById("firstTimeSpan")
const lastTimeSpan = document.getElementById("lastTimeSpan")
const progress = document.getElementById("progress")



////  Başlangıçta değeri yazdırma

let x = audio.currentTime;
let xMinute = Math.floor(x/60);
let xSecond = Math.floor(x%60);
if(xSecond<10){
    firstTimeSpan.textContent = `${xMinute}:0${xSecond}`
}
else{
    firstTimeSpan.textContent = `${xMinute}:${xSecond}`
}

let y = audio.duration;
let yMinute = Math.floor(y/60);
let ySecond = Math.floor(y%60);
if(ySecond){
    if(ySecond<10){
        lastTimeSpan.textContent = `${yMinute}:0${ySecond}`
    }
    else{
        lastTimeSpan.textContent = `${yMinute}:${ySecond}`
    }
}



////
let number = 0; 
let isplaying = false;

prevButton.addEventListener("click",prevSong)
function prevSong(){
    number--;
    if(number<0){
        number= musics.length-1;
    }
    audio.src = `musics/${musics[number].nameMusic}.mp3`
    imageMusic.src = `images/${musics[number].nameImage}.jpg`
    nameMusic.textContent = `${musics[number].title}`
    creatorMusic.textContent = `${musics[number].creator}`
    playButton.classList.remove("fa-play")
    playButton.classList.add("fa-pause")
    audio.play();
    isplaying = true;
}

nextButton.addEventListener("click",nextSong)

function nextSong(){
    number++;
    if(number>musics.length-1){
        number=0;
    }
    audio.src = `musics/${musics[number].nameMusic}.mp3`
    imageMusic.src = `images/${musics[number].nameImage}.jpg`
    nameMusic.textContent = `${musics[number].title}`
    creatorMusic.textContent = `${musics[number].creator}`
    playButton.classList.remove("fa-play")
    playButton.classList.add("fa-pause")
    audio.play();
    isplaying = true
}



playButton.addEventListener("click",playMusic)

function playMusic(){
    if(playButton.classList.contains("fa-play")){
        playButton.classList.add("fa-pause")
        playButton.classList.remove("fa-play")
        audio.play()
        isplaying = true;
    }
    else if(playButton.classList.contains("fa-pause")){
        playButton.classList.add("fa-play")
        playButton.classList.remove("fa-pause")
        audio.pause()
        isplaying = false;
    }
}

audio.addEventListener("timeupdate",updateProgress)

function updateProgress(e){
if(isplaying){
    let currentTime = e.target.currentTime;
    let lastTime = e.target.duration;
    let percent = (currentTime/lastTime)*100
    progressBlack.style.width = `${percent}%`

    let lastTimeMinutes = Math.floor(lastTime/60);
    let lastTimeSecond = Math.floor(lastTime%60);
    if(lastTimeSecond){
        if(lastTimeSecond<10){
            lastTimeSpan.textContent = `${lastTimeMinutes}:0${lastTimeSecond}`
        }
        else{
            lastTimeSpan.textContent = `${lastTimeMinutes}:${lastTimeSecond}`
        }
    }


    let currentTimeMinute = Math.floor(currentTime/60);
    let currentTimeSecond = Math.floor(currentTime%60);
    if(currentTimeSecond){
        if(currentTimeSecond<10){
            firstTimeSpan.textContent = `${currentTimeMinute}:0${currentTimeSecond}`;
        }
        else{
            firstTimeSpan.textContent = `${currentTimeMinute}:${currentTimeSecond}`;
        }
    }
    if(currentTime==lastTime){
        number++;
    }

}
}
progress.addEventListener("click",setProgressBar)

function setProgressBar(e){
    const width = e.srcElement.clientWidth;
    const offsetx = e.offsetX;
    const x = (offsetx/width)*audio.duration
    audio.currentTime = x;
    console.log(x)
    playButton.classList.add("fa-pause")
    playButton.classList.remove("fa-play")
    audio.play()
    isplaying = true;
}

audio.addEventListener("ended",nextSong)
