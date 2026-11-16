// MENIUL APLICATIEI

const butoaneMeniu = document.querySelectorAll("[data-page]");
const pagini = document.querySelectorAll(".page");

butoaneMeniu.forEach(function (buton) {
  buton.addEventListener("click", function () {
    const paginaAleasa = buton.dataset.page;

    pagini.forEach(function (pagina) {
      pagina.classList.remove("active");
    });

    document.getElementById(paginaAleasa).classList.add("active");
  });
});


// BUGETUL MEU

const butonCalcul = document.getElementById("calculeaza");

butonCalcul.addEventListener("click", function () {
  const venit = Number(document.getElementById("venit").value);
  const cheltuieli = Number(document.getElementById("cheltuieli").value);
  const rezultat = document.getElementById("rezultatBuget");

  if (
    document.getElementById("venit").value === "" ||
    document.getElementById("cheltuieli").value === "" ||
    venit < 0 ||
    cheltuieli < 0
  ) {
    rezultat.textContent = "Introdu valori valide pentru venituri și cheltuieli.";
    return;
  }

  const sold = venit - cheltuieli;

  if (sold > 0) {
    rezultat.textContent = "Ți-au rămas " + sold + " lei. Poți economisi această sumă!";
  } else if (sold === 0) {
    rezultat.textContent = "Ai folosit toți banii din buget.";
  } else {
    rezultat.textContent = "Cheltuielile depășesc veniturile cu " + Math.abs(sold) + " lei.";
  }
});


// INTREBARILE QUIZ-ULUI

const intrebari = [
  {
    text: "Ce înseamnă să economisești bani?",
    variante: [
      "Să cheltuiești toți banii",
      "Să păstrezi bani pentru viitor",
      "Să împrumuți bani"
    ],
    corect: 1
  },
  {
    text: "Ce este un buget personal?",
    variante: [
      "O listă cu veniturile și cheltuielile",
      "O listă de cumpărături",
      "O sumă de bani împrumutată"
    ],
    corect: 0
  },
  {
    text: "Care dintre următoarele este o nevoie?",
    variante: [
      "Un joc video nou",
      "O pereche de pantofi de firmă",
      "Hrana"
    ],
    corect: 2
  },
  {
    text: "Ce reprezintă venitul?",
    variante: [
      "Banii pe care îi primești",
      "Banii pe care îi cheltuiești",
      "Banii pe care îi pierzi"
    ],
    corect: 0
  },
  {
    text: "De ce este util să îți planifici cheltuielile?",
    variante: [
      "Pentru a cheltui mai mulți bani",
      "Pentru a-ți gestiona mai bine banii",
      "Pentru a evita orice economisire"
    ],
    corect: 1
  }
];


// ELEMENTELE QUIZ-ULUI

let scor = 0;
let indexIntrebare = 0;
let raspunsDat = false;
let quizuriFinalizate = 0;
let celMaiBunScor = 0;

const butonStart = document.getElementById("start");
const zonaQuiz = document.getElementById("zonaQuiz");
const zonaIntrebare = document.getElementById("intrebare");
const zonaNumar = document.getElementById("numarIntrebare");
const zonaRaspunsuri = document.getElementById("raspunsuri");
const zonaMesaj = document.getElementById("mesaj");
const zonaScor = document.getElementById("scor");
const butonUrmator = document.getElementById("urmatoarea");
const zonaFinal = document.getElementById("finalQuiz");
const zonaScorFinal = document.getElementById("scorFinal");
const butonRestart = document.getElementById("restart");


// PORNIREA QUIZ-ULUI

butonStart.addEventListener("click", function () {
  scor = 0;
  indexIntrebare = 0;

  butonStart.hidden = true;
  zonaFinal.hidden = true;
  zonaQuiz.hidden = false;

  afiseazaIntrebare();
});


// AFISAREA INTREBARILOR

function afiseazaIntrebare() {
  raspunsDat = false;

  const intrebareCurenta = intrebari[indexIntrebare];

  zonaNumar.textContent =
    "Întrebarea " + (indexIntrebare + 1) +
    " din " + intrebari.length;

  zonaIntrebare.textContent = intrebareCurenta.text;

  zonaRaspunsuri.innerHTML = "";
  zonaMesaj.textContent = "";
  zonaScor.textContent = "⭐ Scor: " + scor + " puncte";

  butonUrmator.hidden = true;

  for (let i = 0; i < intrebareCurenta.variante.length; i++) {
    const buton = document.createElement("button");

    buton.textContent = intrebareCurenta.variante[i];

    buton.addEventListener("click", function () {
      verificaRaspuns(i, buton);
    });

    zonaRaspunsuri.appendChild(buton);
  }
}


// VERIFICAREA RASPUNSULUI

function verificaRaspuns(alegere, butonApasat) {
  if (raspunsDat) {
    return;
  }

  raspunsDat = true;

  const intrebareCurenta = intrebari[indexIntrebare];
  const butoane = zonaRaspunsuri.querySelectorAll("button");

  // Dezactivăm toate variantele după primul răspuns.
  butoane.forEach(function (buton) {
    buton.disabled = true;
  });

  if (alegere === intrebareCurenta.corect) {
    scor = scor + 10;
    zonaMesaj.textContent = "Corect! Ai primit 10 puncte.";
  } else {
    zonaMesaj.textContent =
      "Răspuns greșit! Varianta corectă era: " +
      intrebareCurenta.variante[intrebareCurenta.corect];
  }

  zonaScor.textContent = "⭐ Scor: " + scor + " puncte";

  if (indexIntrebare === intrebari.length - 1) {
    butonUrmator.textContent = "Vezi rezultatul";
  } else {
    butonUrmator.textContent = "Următoarea întrebare";
  }

  butonUrmator.hidden = false;
}


// TRECEREA LA URMATOAREA INTREBARE

butonUrmator.addEventListener("click", function () {
  if (!raspunsDat) {
    return;
  }

  indexIntrebare++;

  if (indexIntrebare < intrebari.length) {
    afiseazaIntrebare();
  } else {
    terminaQuiz();
  }
});


// AFISAREA REZULTATULUI FINAL

function terminaQuiz() {
  zonaQuiz.hidden = true;
  zonaFinal.hidden = false;

  zonaScorFinal.textContent =
    "Ai obținut " + scor + " puncte din 50 de puncte!";

  quizuriFinalizate++;

  if (scor > celMaiBunScor) {
    celMaiBunScor = scor;
  }

  actualizeazaProgres();
}


// RELUAREA QUIZ-ULUI

butonRestart.addEventListener("click", function () {
  scor = 0;
  indexIntrebare = 0;

  zonaFinal.hidden = true;
  zonaQuiz.hidden = false;

  afiseazaIntrebare();
});


// ACTUALIZAREA PROGRESULUI

function actualizeazaProgres() {
  document.getElementById("progresQuiz").textContent =
    "Quiz-uri finalizate: " + quizuriFinalizate;

  document.getElementById("celMaiBunScor").textContent =
    "Cel mai bun scor: " + celMaiBunScor + " puncte";
}