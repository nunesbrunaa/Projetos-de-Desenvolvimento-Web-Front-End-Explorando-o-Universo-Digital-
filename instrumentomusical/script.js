function tocaTecla(event) {
    const audio = document.querySelector(`audio[data-tecla="${event.keyCode}"]`);
    const tecla = document.querySelector(`div[data-tecla="${event.keyCode}"]`);

    if (!audio) return;

    tecla.classList.add('playing');

    audio.currentTime = 0;
    audio.play();
}

function removeTransicao(e) {
    e.target.classList.remove('playing');
}

const teclasArray = Array.from(document.querySelectorAll('.tecla'));

teclasArray.forEach(tecla => tecla.addEventListener('transitionend', removeTransicao));

window.addEventListener('keydown', tocaTecla);
