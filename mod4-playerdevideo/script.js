 const video1 = document.querySelector('video'),
 btnPlayPause = document.querySelector(".play-pause i"),
 btnVoltar = document.querySelector('.passa-tras'),
 btnAvancar = document.querySelector('.passa-frente'),
 btnVolume = document.querySelector('.volume i'),
 volumeSlider = document.querySelector('.left input'),
 speedOptions = document.querySelector('.speed-options'),
 btnSpeed = document.querySelector('.btn-speed'),
 btnJanela = document.querySelector('.janela'),
 btnTelaCheia = document.querySelector('.fullscreen'),
 container = document.querySelector('.container'),
 videoTimeline = document.querySelector('.video-timeline'),
 progressBar = document.querySelector('.progress-bar'),
 elementoRaiz = document.documentElement,
 txtCurrenntTime =document.querySelector('.current-time'),
 txtDuration = document.querySelector('.video-duration');


const formataTempo = (tempo) => {
    let segundos = Math.floor(tempo % 60), 
    minutos = Math.floor( tempo / 60) % 60, 
    horas = Math.floor(tempo / 3600);

    // if(segundos < 10){
    //     segundos = '0${segundos}';
    // }

    segundos = (segundos < 10) ? `0${segundos}`: segundos;
    minutos = (minutos < 10) ? `0${minutos}`: minutos;
    horas = (horas < 10) ? `0${horas}`: horas;

    

    if (horas == 0) {
        return `${minutos}:${segundos}`;
    } else {
        return `${horas}:${minutos}:${segundos}`;
    }    
};

video1.addEventListener('timeupdate', (e) => {
    // Desestruturação
    let { currentTime, duration } = e.target;
    let percent = (currentTime / duration) * 100;

    elementoRaiz.style.setProperty('--progress-value', `${percent}%`);
    txtCurrenntTime.innerText = formataTempo(video1.currentTime);
    txtDuration.innerText = formataTempo(video1.duration);
});

const arrastaProgress = (e) =>{
    let larguraTotal = videoTimeline.clientWidth;
    video1.currentTime = (e.offsetX/larguraTotal)* video1.duration;
};

videoTimeline.addEventListener('mousedown', () => {
    videoTimeline.addEventListener('mousemove', arrastaProgress);
});

videoTimeline.addEventListener('click', (e) => {
    let larguraTotal = videoTimeline.clientWidth;
    video1.currentTime = (e.offsetX/larguraTotal) * video1.duration;

    console.log(videoTimeline.clientwidth);
});


btnPlayPause.addEventListener('click', ( ) => {
    video1.paused ? video1.play( ) : video1.pause();
});

video1.addEventListener('play', () =>{
    btnPlayPause.classList.replace("fa-play", "fa-pause");
});

video1.addEventListener('pause', () =>{
    btnPlayPause.classList.replace("fa-pause", "fa-play");
});

btnVoltar.addEventListener('click', () => {
    video1.currentTime -= 5;
});

btnAvancar.addEventListener('click', () => {
    video1.currentTime += 5;
});

// btnVolume.addEventListener('click', () => {
//     if(!volumeXmark){
//         video1.volume = 0;
//         btnVolume.classList.replace("fa-volume-high", "fa-volume-xmark");
//         volumeXmark = true;
//     } else{
//         video1.volume = 0.5;
//     btnVolume.classList.replace("fa-volume-xtark", "fa-volume-high");
//     volumeXmark = false;
//     }
// });

btnVolume.addEventListener('click', () => {
    if (btnVolume.classList.contains('fa-volume-high')) {
        video1.volume = 0;
        btnVolume.classList.replace("fa-volume-high", "fa-volume-xmark");
    } else {
        video1.volume = 0.5;
        btnVolume.classList.replace("fa-volume-xmark", "fa-volume-high");
    }
    volumeSlider.value = video1.volume;
});


volumeSlider.addEventListener('input', (e) => {
    video1.volume = e.target.value;

    if (e.target.value == 0) {
        return btnVolume.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    

    btnVolume.classList.replace("fa-volume-xmak", "fa-volume-high")
});

btnSpeed.addEventListener('click', () => {
    speedOptions.classList.toggle('amostradinha');
});

speedOptions.querySelectorAll('li').forEach(option => {
    option.addEventListener('click', () => {
        video1.playbackRate = option.dataset.speed;
        speedOptions.querySelector('.ativa').classList.remove('ativa');
        option.classList.add('ativa');
    });
});


btnJanela.addEventListener('click', () => {
    video1.requestPictureInPicture ();
});

btnTelaCheia.addEventListener('click', () => {
    container.classList.toggle('fullscreen');
    if (document.fullscreenElement) {
        btnTelaCheia.classList.replace('fa-compress', 'fa-expand');
        document.exitFullscreen();
    } else {
        btnTelaCheia.classList.replace('fa-expand', 'fa-compress');
        container.requestFullscreen();
    }
});


