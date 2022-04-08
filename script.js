console.log("Welcome to Spotify");

let songIndex=0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressbar = document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "abs", filePath:"1.mp3",coverPath:"covers/1.jpg"},
    {songName: "xyz", filePath:"2.mp3",coverPath:"covers/2.jpg"},
    {songName: "df", filePath:"3.mp3",coverPath:"covers/3.jpg"},
    {songName: "waefWG", filePath:"1.mp3",coverPath:"covers/4.jpg"},
    {songName: "efF", filePath:"8.mp3",coverPath:"covers/5.jpg"},
    {songName: "WEV", filePath:"6.mp3",coverPath:"covers/6.jpg"}
];

songItems.forEach((element ,i)=>{
    console.log(element,i);
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText =songs[i].songName;
})

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
         masterPlay.classList.remove('fa-play-circle');
         masterPlay.classList.add('fa-pause-circle');
         gif.style.opacity=1;
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
         masterPlay.classList.add('fa-play-circle');
         gif.style.opacity=0;
    }
})


// audioElement.play();
audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');
    // updateseekBar
  progress = parseFloat((audioElement.currentTime/audioElement.duration)*100);
//   console.log(progress);
  myProgressbar.value = progress;
});
 
myProgressbar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressbar.value*audioElement.duration)/100;
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        // element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=songs[songIndex-1].filePath;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
  songIndex=(songIndex+1)%songs.length;

  audioElement.src=songs[songIndex-1].filePath;
  audioElement.currentTime=0;
  audioElement.play();
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex>1)
    songIndex=songIndex-1;

    else
    songIndex=songs.length-1;

    audioElement.src=songs[songIndex-1].filePath;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

