const container=document.getElementById('container');
const songname=document.getElementById('song-name');
const progress=document.getElementById('progress');
const progressbar=document.getElementById('progress-bar');
const albumart=document.getElementById('album-art');
const previousbtn=document.getElementById('previous-btn');
const playbtn=document.getElementById('play-btn');
const next=document.getElementById('next');
const audio = document.getElementById('audio');
const timestamp=document.getElementById('timestamp');

const tracks=[ 'Let Me Down', 'No Method'];

let trackindex=0;
loadtrack(tracks[trackindex]);

function loadtrack(track)
{
    songname.innerText=track;
    audio.src = `music/${track}.mp3`;
    albumart.src=`images/${track}.jpg`;
};
function playtrack(){
    container.classList.add('play');
    playbtn.innerHTML=' <i class="fas fa-pause"></i>';
    audio.play();
}
function pausetrack(){
    container.classList.remove('play');
    playbtn.innerHTML='<i class="fas fa-play"></i>';
    audio.pause();
}
//event listners
playbtn.addEventListener('click', ()=>{
    const isplaying=container.classList.contains('play');
    if(isplaying){
        pausetrack();
    }
    else{
        playtrack();
    }
})
function previoustrack(){
      trackindex--;
      if(trackindex<0){
          trackindex=tracks.length-1;
      }
      loadtrack(tracks[trackindex]);
      playtrack();
}
function nexttrack(){
    trackindex++;
    if(trackindex>tracks.length-1)
    {
        trackindex=0;
    }
    loadtrack(tracks[trackindex]);
      playtrack();
    
}
function updateprogress(e){
    const {duration,currentTime}=e.srcElement;
    const progresspercentage=(currentTime/duration)*100
    progressbar.style.width=`${progresspercentage}%`;
    let mins=Math.floor(audio.currentTime/60);
    if(mins<10){
        mins='0'+String(mins);
    }
    let secs=Math.floor(audio.currentTime%60);
    if(secs<10){
        secs='0'+String(secs);
    }
    timestamp.innerHTML=`${mins}:${secs}`;
    
}
function setprogress(e){
    const width=this.clientWidth;
    const clicklocation=e.offsetX;
    const duration=audio.duration;
    audio.currentTime=clicklocation/width*duration;
}
previousbtn.addEventListener('click', previoustrack);
next.addEventListener('click', nexttrack);
audio.addEventListener('timeupdate', updateprogress);
audio.addEventListener('ended', nexttrack);
progress.addEventListener('click', setprogress);