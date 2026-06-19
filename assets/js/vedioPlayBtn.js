const videoPlayBtn = document.getElementById('video-play-btn');
const playIcon = document.querySelector('#video-play-btn span');
let playbtnflag = false;

videoPlayBtn.addEventListener('click', () => {
    const videoOverlay = document.getElementById('video-overlay');

    playbtnflag = !playbtnflag;
    videoOverlay.style.display = playbtnflag ? 'none' : 'block';
    playIcon.textContent = playbtnflag ? 'pause' : 'play_arrow';
});

