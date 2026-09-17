/* ==================================================
   PROJECT HAPPY BIRTHDAY
   SCRIPT JS
================================================== */


/* ==================================================
   PAGE ELEMENTS
================================================== */

const pages = {

    page1:
        document.getElementById("page1"),

    page2:
        document.getElementById("page2"),

    page3:
        document.getElementById("page3"),

    page4:
        document.getElementById("page4"),

    page5:
        document.getElementById("page5"),

    page6:
        document.getElementById("page6"),

    chapter1:
        document.getElementById("chapter1"),

    bookPage:
        document.getElementById("bookPage")

};



/* ==================================================
   PAGE NAVIGATION
================================================== */

function showPage(page) {

    Object.values(pages).forEach(
        currentPage => {

            if (currentPage) {

                currentPage.classList.remove(
                    "active"
                );

            }

        }
    );


    if (page) {

        page.classList.add(
            "active"
        );

    }

}



/* ==================================================
   SIMPLE CLICK SOUND
================================================== */

let audioContext = null;


function playClickSound() {
    try {
        if (!audioContext) {
            audioContext =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();
        }

        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();

        oscillator.type =
            "sine";

        oscillator.frequency.setValueAtTime(
            520,
            audioContext.currentTime
        );

        gain.gain.setValueAtTime(
            0.0001,
            audioContext.currentTime
        );

        /* Volume dinaikkan ke 0.95 & durasi diperpanjang ke 0.12 detik */
        gain.gain.exponentialRampToValueAtTime(
            0.95,
            audioContext.currentTime + 0.015
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            audioContext.currentTime + 0.12
        );

        oscillator.connect(gain);

        gain.connect(
            audioContext.destination
        );

        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + 0.12
        );

    }

    catch (error) {

        console.log(
            "Audio tidak tersedia."
        );

    }
}

/* ==================================================
   OPENING 1
================================================== */

const nicknameInput =
    document.getElementById(
        "nicknameInput"
    );


const nextToPage2 =
    document.getElementById(
        "nextToPage2"
    );


const inputMessage =
    document.getElementById(
        "inputMessage"
    );


let nickname = "";


const acceptedNames = [

    "dhira",

    "dira"

];



/* ==================================================
   MESSAGE
================================================== */

let inputMessageTimeout;


function showInputMessage(
    message
) {

    inputMessage.textContent =
        message;


    inputMessage.classList.add(
        "show"
    );


    clearTimeout(
        inputMessageTimeout
    );


    inputMessageTimeout =
        setTimeout(
            () => {

                inputMessage.classList.remove(
                    "show"
                );

            },
            2000
        );

}



/* ==================================================
   OPENING 1 → OPENING 2
================================================== */

nextToPage2.addEventListener(
    "click",
    () => {

        playClickSound();


        nickname =
            nicknameInput.value.trim();


        if (
            nickname === ""
        ) {

            showInputMessage(
                "Isi nama kamu dulu."
            );


            nicknameInput.focus();


            return;

        }


        const normalizedName =
            nickname.toLowerCase();


        if (
            !acceptedNames.includes(
                normalizedName
            )
        ) {

            nicknameInput.classList.add(
                "input-error"
            );


            showInputMessage(
                "Hmm... Kamu siapa?"
            );


            setTimeout(
                () => {

                    nicknameInput.classList.remove(
                        "input-error"
                    );

                },
                500
            );


            return;

        }


        nicknameInput.classList.remove(
            "input-error"
        );


        document.getElementById(
            "nicknameDisplay"
        ).textContent =
            nickname;


        /*
          Delay sedikit sebelum
          masuk Opening 2.
        */

        setTimeout(
            () => {

                showPage(
                    pages.page2
                );

            },
            1000
        );

    }
);



/* ==================================================
   ENTER KEY — OPENING 1
================================================== */

nicknameInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            nextToPage2.click();

        }

    }
);



/* ==================================================
   OPENING 2
================================================== */

const yesButton =
    document.getElementById(
        "yesButton"
    );


const noButton =
    document.getElementById(
        "noButton"
    );


const choiceContainer =
    document.querySelector(
        ".choice-container"
    );


let noClickCount = 0;

/* ==================================================
   PESAN IYA
================================================== */

const confidenceMessage =
    document.createElement(
        "p"
    );


confidenceMessage.className =
    "confidence-message";


confidenceMessage.textContent =
    "Kamu pede banget si🤭";


choiceContainer.parentElement.insertBefore(
    confidenceMessage,
    choiceContainer
);



/* ==================================================
   BUTTON IYA
================================================== */

yesButton.addEventListener(
    "click",
    () => {

        playClickSound();


        confidenceMessage.classList.add(
            "show"
        );


        yesButton.disabled =
            true;


        noButton.disabled =
            true;


        /*
          Setelah notifikasi,
          masuk ke:

          "Oh... ternyata benar kamu."
        */

        setTimeout(
            () => {

                confidenceMessage.classList.remove(
                    "show"
                );


                /*
                  Kita gunakan page 3
                  untuk kalimat:
                  Oh... ternyata benar kamu.
                */

                pages.page3.querySelector(
                    "h1"
                ).textContent =
                    "Oh... ternyata benar kamu.";


                showPage(
                    pages.page3
                );


                /*
                  Setelah delay →
                  "Kalau begitu..."
                */

                setTimeout(
                    () => {

                        pages.page3.querySelector(
                            "h1"
                        ).textContent =
                            "Kalo gitu...";


                        /*
                          Tetap di page 3,
                          tetapi animasi page
                          akan kita pakai sebagai
                          pergantian kalimat.
                        */

                        setTimeout(
                            () => {

                                showPage(
                                    pages.page4
                                );


                                /*
                                  Page 4:
                                  Karena itu kamu
                                */

                                setTimeout(
                                    () => {

                                        showPage(
                                            pages.page5
                                        );

                                        fullnameInput.focus();

                                    },
                                    2200
                                );

                            },
                            2200
                        );

                    },
                    2200
                );

            },
            1700
        );

    }
);



/* ==================================================
   BUTTON TIDAK
================================================== */

noButton.addEventListener(
    "click",
    () => {

        playClickSound();


        noClickCount++;


        /*
          Tombol IYA semakin besar
        */

        const yesScale =
            Math.min(
                2.2,
                1 +
                (
                    noClickCount *
                    0.15
                )
            );


        yesButton.style.transform =
            `scale(${yesScale})`;


        /*
          Tombol TIDAK semakin kecil
        */

        const noScale =
            Math.max(
                0.15,
                1 -
                (
                    noClickCount *
                    0.15
                )
            );


        moveNoButton(
            noScale
        );

    }
);



/* ==================================================
   RANDOM POSITION TOMBOL TIDAK
================================================== */

function moveNoButton(
    scale
) {

    const containerRect =
        choiceContainer.getBoundingClientRect();


    const buttonRect =
        noButton.getBoundingClientRect();


    const maxX =
        Math.max(
            40,
            (
                containerRect.width -
                buttonRect.width
            ) / 2
        );


    const randomX =
        (
            Math.random() *
            2 -
            1
        ) * maxX;


    const randomY =
        (
            Math.random() *
            2 -
            1
        ) * 55;


    noButton.style.transform =
        `
      translate(
        ${randomX}px,
        ${randomY}px
      )
      scale(${scale})
    `;

}



/* ==================================================
   OPENING 5
================================================== */

const fullnameInput =
    document.getElementById(
        "fullnameInput"
    );


const confirmName =
    document.getElementById(
        "confirmName"
    );


const nameError =
    document.getElementById(
        "nameError"
    );


const correctFullName =
    "Dhira Michel Ramadania";



/* ==================================================
   CHECK FULL NAME
================================================== */

confirmName.addEventListener(
    "click",
    () => {

        playClickSound();


        const enteredName =
            fullnameInput.value
                .trim()
                .toLowerCase();


        const correctName =
            correctFullName
                .toLowerCase();


        if (
            enteredName === ""
        ) {

            nameError.textContent =
                "Nama lengkapnya belum diisi 🤭";


            nameError.classList.add(
                "show"
            );


            fullnameInput.focus();


            return;

        }


        if (
            enteredName ===
            correctName
        ) {

            nameError.classList.remove(
                "show"
            );


            setTimeout(
                () => {

                    showPage(
                        pages.page6
                    );

                },
                700
            );


            return;

        }


        nameError.textContent =
            "Eee.. Kayaknya masih salah deh.";


        nameError.classList.add(
            "show"
        );


        fullnameInput.classList.add(
            "input-error"
        );


        setTimeout(
            () => {

                fullnameInput.classList.remove(
                    "input-error"
                );

            },
            500
        );

    }
);



/* ==================================================
   ENTER KEY — FULL NAME
================================================== */

fullnameInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            confirmName.click();

        }

    }
);



/* ==================================================
   PAGE 6 → CHAPTER MENU
================================================== */

const enterButton =
    document.getElementById(
        "enterButton"
    );


enterButton.addEventListener(
    "click",
    () => {

        playClickSound();

        showCelebration();

    }
);



/* ==================================================
   BIRTHDAY CELEBRATION
================================================== */

const celebrationOverlay =
    document.getElementById(
        "celebrationOverlay"
    );

const celebrationConfetti =
    document.getElementById(
        "celebrationConfetti"
    );

const celebrationContinueButton =
    document.getElementById(
        "celebrationContinueButton"
    );

const celebrationPhotos =
    document.getElementById(
        "celebrationPhotos"
    );

let celebrationPhotosTimer =
    null;

/* Fanfare: deretan nada gembok.
   Membuat AudioContext baru agar
   lebih keras dari click biasa. */
let birthdayAudio = null;

function playBirthdayFanfare() {
    try {
        if (!birthdayAudio) {
            // Ganti 'lagu.mp3' dengan nama/path file MP3 kamu
            birthdayAudio = new Audio('./sounds/hbd.mp3');
        }

        birthdayAudio.currentTime = 0; // Mengulang dari awal pas fungsi dipanggil lagi

        birthdayAudio.play().catch(error => {
            console.log("Audio gagal diputar:", error);
        });
    } catch (error) {
        console.log("Audio tidak tersedia.");
    }
}

function createConfetti() {

    const colors = [
        "#d81b7a",
        "#ffb84d",
        "#8f5fe8",
        "#4dd2ff",
        "#ff6b6b",
        "#7ed957"
    ];

    for (let i = 0; i < 80; i++) {

        const piece =
            document.createElement("div");

        piece.classList.add(
            "confetti-piece"
        );

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.background =
            colors[
                Math.floor(
                    Math.random() *
                        colors.length
                )
            ];

        const duration =
            2.5 + Math.random() * 2.5;

        piece.style.animationDuration =
            duration + "s";

        piece.style.animationDelay =
            Math.random() * 1.5 + "s";

        /* Semua mendarat di
           paling dasar layar */

        piece.style.setProperty(
            "--land",
            "calc(100vh + 15px)"
        );

        piece.style.transform =
            "rotate(" +
            Math.random() * 360 +
            "deg)";

        celebrationConfetti.appendChild(
            piece
        );

    }

}

function showCelebration() {

    celebrationOverlay.classList.add(
        "show"
    );

    /* Hapus confetti lama biar
       nggak numpuk kalau dibuka lagi */

    celebrationConfetti.innerHTML =
        "";

    /* Sembunyikan foto & tombol dulu,
       baru muncul setelah
       confetti selesai jatuh */

    celebrationPhotos.classList.remove(
        "show"
    );

    celebrationContinueButton.classList.remove(
        "show"
    );

    clearTimeout(
        celebrationPhotosTimer
    );

    createConfetti();

    playBirthdayFanfare();

    /* Tunggu sampai confetti
       turun selesai (~6 detik) */

    celebrationPhotosTimer =
        setTimeout(
            () => {

                celebrationPhotos.classList.add(
                    "show"
                );

                celebrationContinueButton.classList.add(
                    "show"
                );

            },
            6000
        );

}

function hideCelebration() {

    celebrationOverlay.classList.remove(
        "show"
    );

    celebrationConfetti.innerHTML =
        "";

    celebrationPhotos.classList.remove(
        "show"
    );

    celebrationContinueButton.classList.remove(
        "show"
    );

    clearTimeout(
        celebrationPhotosTimer
    );

}

celebrationContinueButton.addEventListener(
    "click",
    () => {

        playClickSound();

        hideCelebration();

        showBook();

    }
);


/* ==================================================
   BACKGROUND MUSIC (BGM)
   Lagunya baru jalan pas sampul dibuka,
   masuknya pelan-pelan (fade in) biar ga kaget.
================================================== */

const musicToggle = document.getElementById("musicToggle");

const BGM_SRC = "./sounds/love-song.mp3"; // Lokasi file lagunya
const BGM_VOLUME = 0.95; // Volume maksimal, 0 - 1
const BGM_FADE_IN = 2200; // Durasi fade in (ms)
const BGM_FADE_OUT = 900; // Durasi fade out (ms)

// Audio dibikin langsung dari JS, ga perlu tag <audio> di HTML
const bgmMusic = new Audio(BGM_SRC);
bgmMusic.loop = true;
bgmMusic.preload = "auto";
bgmMusic.volume = 0;

// Kalau file-nya ga ketemu / formatnya ditolak browser
bgmMusic.addEventListener("error", () => {
  console.log("Musik ga bisa dimuat. Cek lagi path-nya: " + BGM_SRC);

  if (musicToggle) {
    musicToggle.classList.remove("show", "playing");
  }
});

let bgmFadeTimer = null;
let bgmStarted = false;
let bgmMuted = false;

function fadeBgm(targetVolume, duration, onDone) {
  if (!bgmMusic) return;

  clearInterval(bgmFadeTimer);

  const startVolume = bgmMusic.volume;
  const startTime = performance.now();

  bgmFadeTimer = setInterval(() => {
    const progress = Math.min((performance.now() - startTime) / duration, 1);

    bgmMusic.volume = Math.max(
      0,
      Math.min(1, startVolume + (targetVolume - startVolume) * progress)
    );

    if (progress >= 1) {
      clearInterval(bgmFadeTimer);
      if (onDone) onDone();
    }
  }, 40);
}

function startBgm() {
  if (!bgmMusic || bgmStarted || bgmMuted) return;

  bgmStarted = true;
  bgmMusic.volume = 0;

  const played = bgmMusic.play();

  // Kalau browser nolak autoplay / file ga ketemu, jangan bikin error
  if (played && typeof played.catch === "function") {
    played.catch(() => {
      bgmStarted = false;
      console.log("Musik belum bisa diputar.");
    });
  }

  fadeBgm(BGM_VOLUME, BGM_FADE_IN);

  if (musicToggle) {
    musicToggle.classList.add("show", "playing");
    musicToggle.classList.remove("muted");
  }
}

function stopBgm() {
  if (!bgmMusic || !bgmStarted) return;

  bgmStarted = false;

  fadeBgm(0, BGM_FADE_OUT, () => {
    bgmMusic.pause();
    bgmMusic.currentTime = 0;
  });

  if (musicToggle) {
    musicToggle.classList.remove("show", "playing");
  }
}

/* Tombol mute / unmute */
if (musicToggle) {
  musicToggle.addEventListener("click", () => {
    if (!bgmMusic) return;

    bgmMuted = !bgmMuted;

    if (bgmMuted) {
      fadeBgm(0, 400, () => bgmMusic.pause());
      musicToggle.classList.add("muted");
      musicToggle.classList.remove("playing");
    } else {
      bgmMusic.play().catch(() => {});
      fadeBgm(BGM_VOLUME, 800);
      musicToggle.classList.remove("muted");
      musicToggle.classList.add("playing");
    }
  });
}

/* ==================================================
   SINGLE PAGE BOOK NAVIGATION LOGIC
   Flip 3D: lembar depan beneran diputar ke kiri,
   sisi belakangnya kelihatan, terus nyangkut di
   tumpukan kiri. Buka & tutup punya animasi sendiri.
================================================== */

const notePapers = Array.from(document.querySelectorAll(".note-paper"));
const bookWrapper = document.getElementById("bookWrapper");
const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");
const pageIndicator = document.getElementById("pageIndicator");

let currentPaperIndex = 0;
const totalPapers = notePapers.length;
let isFlipping = false;

/* Susun tumpukan: yang udah dibalik numpuk di kiri,
   yang belum numpuk di kanan (makin belakang makin dalam) */
function paintStack() {
  notePapers.forEach((paper, index) => {
    if (index < currentPaperIndex) {
      paper.classList.add("turned");
      paper.classList.remove("active");
      paper.style.setProperty("--depth", String(currentPaperIndex - index));
      paper.style.zIndex = String(20 + index);
    } else {
      paper.classList.remove("turned");
      paper.classList.toggle("active", index === currentPaperIndex);
      paper.style.setProperty("--depth", String(index - currentPaperIndex));
      paper.style.zIndex = String(20 + (totalPapers - index));
    }
  });
}

function paintNav() {
  if (currentPaperIndex === 0) {
    pageIndicator.textContent = "Sampul";
  } else {
    pageIndicator.textContent = `${currentPaperIndex} / ${totalPapers - 1}`;
  }

  prevPageBtn.disabled = isFlipping || currentPaperIndex === 0;
  nextPageBtn.disabled = isFlipping || currentPaperIndex === totalPapers - 1;
}

function updateBookState() {
  paintStack();
  paintNav();
}

/* direction: "next" (buka) atau "prev" (tutup) */
function flipPage(direction) {
  if (isFlipping) return;

  const targetIndex =
    direction === "next" ? currentPaperIndex : currentPaperIndex - 1;

  if (direction === "next" && currentPaperIndex >= totalPapers - 1) return;
  if (direction === "prev" && currentPaperIndex <= 0) return;

  const paper = notePapers[targetIndex];
  if (!paper) return;

  isFlipping = true;
  playClickSound();
  paintNav();

  // Sampul mulai kebuka -> musik nyala
  if (direction === "next" && currentPaperIndex === 0) {
    startBgm();
  }

  // Balik ke sampul -> musik pelan-pelan mati
  if (direction === "prev" && currentPaperIndex === 1) {
    stopBgm();
  }

  // Lembar yang lagi diflip harus paling depan
  paper.style.zIndex = "60";
  paper.style.setProperty("--depth", "0");
  paper.classList.remove("active");

  if (direction === "next") {
    paper.classList.add("flip-open");
  } else {
    paper.classList.remove("turned");
    paper.classList.add("flip-close");
  }

  let finished = false;

  const finish = (event) => {
    // Abaikan animationend dari ::before / ::after
    if (event && event.pseudoElement) return;
    if (finished) return;
    finished = true;

    paper.removeEventListener("animationend", finish);
    clearTimeout(safety);

    paper.classList.remove("flip-open", "flip-close");
    currentPaperIndex += direction === "next" ? 1 : -1;
    isFlipping = false;
    updateBookState();
  };

  // Jaga-jaga kalau animationend nggak kebaca
  const safety = setTimeout(finish, 1800);

  paper.addEventListener("animationend", finish);
}

function showBook() {
  isFlipping = false;

  stopBgm();
  bgmMuted = false;

  if (musicToggle) {
    musicToggle.classList.remove("show", "playing", "muted");
  }

  notePapers.forEach((paper) => {
    paper.classList.remove("flip-open", "flip-close");
  });

  currentPaperIndex = 0;
  updateBookState();
  showPage(pages.bookPage);
}

if (nextPageBtn) {
  nextPageBtn.addEventListener("click", () => flipPage("next"));
}

if (prevPageBtn) {
  prevPageBtn.addEventListener("click", () => flipPage("prev"));
}

/* Geser layar buat ngebalik halaman (HP) */
if (bookWrapper) {
  let touchStartX = 0;
  let touchStartY = 0;

  bookWrapper.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    },
    { passive: true }
  );

  bookWrapper.addEventListener(
    "touchend",
    (e) => {
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const deltaY = e.changedTouches[0].clientY - touchStartY;

      if (Math.abs(deltaX) < 55 || Math.abs(deltaX) < Math.abs(deltaY)) return;

      flipPage(deltaX < 0 ? "next" : "prev");
    },
    { passive: true }
  );
}

/* Panah kiri/kanan di keyboard */
document.addEventListener("keydown", (e) => {
  if (!pages.bookPage || !pages.bookPage.classList.contains("active")) return;

  if (e.key === "ArrowRight") flipPage("next");
  if (e.key === "ArrowLeft") flipPage("prev");
});
