const tanah = document.querySelectorAll('.tanah');
const tikus = document.querySelectorAll('.tikus');
const papanSkor = document.querySelector('.papan-skor');
const audio = new Audio('pop.mp3');

let tanahSebelumnya;
let selesai;
let skor;

function randomTanah(tanah) {
    const t = Math.floor(Math.random() * tanah.length);
    const tRandom = tanah[t];
    if( tRandom == tanahSebelumnya ) {
        randomTanah(tanah);
    }
    tanahSebelumnya = tRandom;
    return tRandom;
}

function randomWaktu(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function munculkanTikus() {
    const tRandom = randomTanah(tanah);
    const wRandom = randomWaktu(300, 1500);
    tRandom.classList.add('muncul');
    setTimeout(() => {
        tRandom.classList.remove('muncul');
        if(!selesai){
            munculkanTikus();
        }
    }, wRandom);
}

function mulai() {
    selesai = false;
    skor = 0;
    papanSkor.textContent = 0;
    munculkanTikus()
    setTimeout(() => {
        selesai = true;
    }, 600000);
}

function pukul() {
    skor++;
    papanSkor.textContent = skor;
    this.parentNode.classList.remove('muncul');
    audio.play();
}

tikus.forEach(t => {
    t.addEventListener('click', pukul);
    audio.play();
});

window.onload = function() {
    window.addEventListener("keydown", checkKeyPress, false);
    
    function checkKeyPress(key){
        if (key.keyCode == "32"){
            skor++;
            papanSkor.textContent = skor;
            audio.play();
        }
    }
}