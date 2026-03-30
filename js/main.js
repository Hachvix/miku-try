const { Player } = TextAliveApp;

// Elementos del DOM
const lyricsEl = document.querySelector("#lyrics-container");
const btnEl = document.querySelector("#play-btn");
const infoEl = document.querySelector("#song-info");
const containerEl = document.querySelector("#main-container");

const player = new Player({
    app: { token: "14gvJVMxNmJMxKdM" },
    mediaElement: document.querySelector("#media")
});

player.addListener({
    onAppReady(app) {
        if (!app.managed) {
            player.createFromSongUrl("https://piapro.jp/t/6W2N", {
                video: { lyricId: "9o24", lyricHost: "piapro.jp" }
            });
        }
    },

    onVideoReady() {
        btnEl.disabled = false;
        btnEl.innerText = "INICIAR SONAR";
        lyricsEl.innerText = "LAGO LISTO";
        const info = player.data.song;
        infoEl.innerText = `${info.name} - ${info.artist.name}`;
    },

    onBeatUpdate(beat) {
        // Animación de "Sonar": El contenedor pulsa con el ritmo
        containerEl.style.transform = "scale(1.05)";
        setTimeout(() => { containerEl.style.transform = "scale(1)"; }, 70);
    },

    onTimeUpdate(pos) {
        const word = player.video.findWord(pos);
        if (word) {
            lyricsEl.innerText = word.text;
        }
    }
});

btnEl.addEventListener("click", () => {
    player.requestPlay();
    btnEl.style.display = "none";
});