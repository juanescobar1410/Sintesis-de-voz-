/* eslint-disable no-undef, no-unused-vars */

// DECLARACIONES

// Variable donde se almacena el sintetizador de voz
let speech;

// RETO 1: velocidad de la voz (1 = normal, 0.5 = lenta, 2 = rápida)
const VELOCIDAD = 1.5;

// RETO 2: idioma del sintetizador (ej: "es-ES", "es-MX", "en-US", "fr-FR", "pt-BR")
const IDIOMA = "en-US";

// RETO 3: frase que sintetiza el software (debe estar en el idioma elegido)
const FRASE = "Welcome to the Multimedia Systems Architecture course";

// FUNCIÓN DE CONFIGURACIÓN
function setup() {
  // Crea un lienzo de tamaño 250x250
  createCanvas(250, 250);
  // Crea un objeto de sintetizador de audio.
  // Las voces se cargan de forma asíncrona, por eso se pasa la función
  // vocesListas, que se ejecuta cuando el navegador termina de cargarlas
  speech = new p5.Speech(vocesListas);
  // Configura el idioma del sintetizador (Reto 2)
  speech.setLang(IDIOMA);
  // Configura la velocidad de la voz (Reto 1)
  speech.setRate(VELOCIDAD);
}

// FUNCIÓN QUE SE EJECUTA CUANDO LAS VOCES ESTÁN DISPONIBLES
function vocesListas() {
  // RETO 4: obtén el listado de voces disponibles
  // listVoices() imprime la lista en la consola del navegador
  speech.listVoices();

  // speech.voices es el arreglo con todas las voces del navegador
  console.log("Cantidad de voces: " + speech.voices.length);
  for (let i = 0; i < speech.voices.length; i++) {
    console.log(i + ": " + speech.voices[i].name + " (" + speech.voices[i].lang + ")");
  }

  // RETO 5: cambia la voz utilizada en el sintetizador
  // Se busca la primera voz cuyo idioma coincida con IDIOMA (ej: "en-US")
  let voz = speech.voices.find((v) => v.lang.replace("_", "-") === IDIOMA);
  if (voz) {
    // setVoice acepta el nombre de la voz o su índice en el arreglo
    speech.setVoice(voz.name);
    console.log("Voz seleccionada: " + voz.name);
  } else {
    console.log("No hay una voz para " + IDIOMA + ", se usa la voz por defecto");
  }
}

// FUNCIÓN DE PINTADO
function draw() {
  // Pinta un cuadrado negro con la palabra ASM en blanco
  fill(0);
  noStroke();
  rect(0, 0, 250, 250);
  fill(255);
  textStyle(BOLD);
  textSize(95);
  text("ASM", 10, 150);
}

// FUNCIÓN DE CAPTURA DEL CLIC DEL RATÓN
function mouseClicked() {
  // Sintetiza en voz el texto pasado como parámetro
  speech.speak(FRASE);
}