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

    chapterMenu:
        document.getElementById("chapterMenu"),

    chapter1:
        document.getElementById("chapter1")

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


        gain.gain.exponentialRampToValueAtTime(
            0.06,
            audioContext.currentTime + 0.01
        );


        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            audioContext.currentTime + 0.08
        );


        oscillator.connect(gain);

        gain.connect(
            audioContext.destination
        );


        oscillator.start();


        oscillator.stop(
            audioContext.currentTime + 0.08
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
                            "Kalau begitu...";


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


        showPage(
            pages.chapterMenu
        );

    }
);



/* ==================================================
   CHAPTER SYSTEM
================================================== */

const chapterCards =
    document.querySelectorAll(
        ".chapter-card"
    );


const enterChapterButton =
    document.getElementById(
        "enterChapterButton"
    );


const chapterMessage =
    document.getElementById(
        "chapterMessage"
    );


let selectedChapter =
    1;


/*
  Untuk sekarang:

  Chapter 1 = terbuka
  Chapter 2 = terkunci
  Chapter 3 = terkunci

  Nanti setelah Chapter 1 selesai:

  unlockedChapter = 2
*/

let unlockedChapter =
    1;



/* ==================================================
   SELECT CHAPTER
================================================== */

chapterCards.forEach(
    card => {

        card.addEventListener(
            "click",
            () => {

                playClickSound();


                selectedChapter =
                    Number(
                        card.dataset.chapter
                    );


                chapterCards.forEach(
                    item => {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                card.classList.add(
                    "selected"
                );


                /*
                  Jika terkunci,
                  tampilkan pesan.
                */

                if (
                    selectedChapter >
                    unlockedChapter
                ) {

                    chapterMessage.textContent =
                        "Chapter ini masih terkunci. Selesaikan chapter sebelumnya dulu.";

                    chapterMessage.classList.add(
                        "show"
                    );

                }

                else {

                    chapterMessage.classList.remove(
                        "show"
                    );

                }

            }
        );

    }
);



/* ==================================================
   BUTTON MASUK CHAPTER
================================================== */

enterChapterButton.addEventListener(
    "click",
    () => {

        playClickSound();


        /*
          Jika chapter belum terbuka
        */

        if (
            selectedChapter >
            unlockedChapter
        ) {

            chapterMessage.textContent =
                "Belum bisa masuk. Selesaikan Chapter sebelumnya dulu.";

            chapterMessage.classList.add(
                "show"
            );


            return;

        }


        /*
          CHAPTER 1
        */

        if (
            selectedChapter === 1
        ) {

            showPage(
                pages.chapter1
            );


            return;

        }


        /*
          Placeholder untuk
          Chapter berikutnya.
    
          Nanti kita tambahkan:
          Chapter 2
          Chapter 3
          dst.
        */

    }
);



/* ==================================================
   KEMBALI KE CHAPTER MENU
================================================== */

const backToChapterMenu =
    document.getElementById(
        "backToChapterMenu"
    );


backToChapterMenu.addEventListener(
    "click",
    () => {

        playClickSound();


        showPage(
            pages.chapterMenu
        );

    }
);