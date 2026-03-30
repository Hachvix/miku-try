const { Player } = TextAliveApp;

// 1. Selección de elementos del DOM (Asegúrate de que coincidan con tu index.html)
const lyricsEl = document.querySelector("#lyrics-container");
const btnEl = document.querySelector("#play-btn");
const infoEl = document.querySelector("#song-info");
const containerEl = document.querySelector("#main-container");

// 2. Inicialización del Player con tu NUEVO TOKEN vinculado a GitHub Pages
const player = new Player({
    app: { token: "GYNK2L33H7hndhfs" }, 
    mediaElement: document.querySelector("#media")
});

// 3. Eventos de la API
player.addListener({
    onAppReady(app) {
        if (!app.managed) {
            // Canción oficial: "Magical Cure! Love Shot!" o la que prefieras del concurso
            player.createFromSongUrl("https://piapro.jp/t/6W2N", {
                video: { lyricId: "9o24", lyricHost: "piapro.jp" }
            });
        }
    },

    onVideoReady() {
        // Cuando la API valida el token y carga la canción, activamos el botón
        btnEl.disabled = false;
        btnEl.innerText = "INICIAR SONAR";
        lyricsEl.innerText = "LAGO LISTO";
        
        const info = player.data.song;
        infoEl.innerText = `${info.name} - ${info.artist.name}`;
    },

    onBeatUpdate(beat) {
        // Efecto visual: El contenedor se expande un poco en cada pulso (Beat)
        containerEl.style.transform = "scale(1.1)";
        setTimeout(() => {
            containerEl.style.transform = "scale(1)";
        }, 100);
    },

    onTimeUpdate(pos) {
        // Buscamos la palabra exacta según el tiempo de la canción
        const word = player.video.findWord(pos);
        if (word) {
            lyricsEl.innerText = word.text;
        }
    }
});

// 4. Control del botón de inicio
btnEl.addEventListener("click", () => {
    player.requestPlay();
    btnEl.style.display = "none"; // Ocultamos el botón al empezar
});
