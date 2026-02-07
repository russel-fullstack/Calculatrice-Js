//clic-event

//Toujours déclarer les variables tout en haut(pointer la balise)
const questionContainer = document.querySelector(".click-event");
const btn1 = document.getElementById("btn-1"); //autre façon de cibler un selecteur avec son id
const btn2 = document.getElementById("btn-2");
const answer = document.querySelector("p");

questionContainer.addEventListener("click", () => {
  questionContainer.classList.toggle("other");
});

btn1.addEventListener("click", () => {
  answer.style.background = "green";
  answer.classList.add("show-answer");
});
btn2.addEventListener("click", () => {
  answer.style.background = "red";
  answer.classList.add("show-answer");
});

//--------------------------------------
// Mouse Events
const mousemove = document.querySelector(".mousemove");

window.addEventListener("mousemove", (e) => {
  mousemove.style.left = e.pageX + "px";
  mousemove.style.top = e.pageY + "px";
});

window.addEventListener("mousedown", () => {
  mousemove.style.transform = "scale(2) translate(-25%, -25%)";
});
window.addEventListener("mouseup", () => {
  mousemove.style.transform = "scale(1) translate(-50%, -50%)";
});

questionContainer.addEventListener("mouseenter", () => {
  questionContainer.style.background = "rgba(0, 0, 0, 0.6)";
});
questionContainer.addEventListener("mouseleave", () => {
  questionContainer.style.background = "pink";
});

//---------------------------------------------
//Keypress events
const keyContainer = document.querySelector(".keypress");
const key = document.getElementById("key");

document.addEventListener("keypress", (e) => {
  key.textContent = e.key;

  if (e.key === "j") {
    keyContainer.style.background = "pink";
  } else if (e.key === "h") {
    keyContainer.style.background = "teal";
  } else {
    keyContainer.style.background = "red";
  }
});

//------------------------------------------------
//Scroll event
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 120) {
    nav.style.top = 0;
  } else {
    nav.style.top = "-50px";
  }
});

//-------------------------------------------------------
//form events
const inputName = document.querySelector('input[type="text"]');
const select = document.querySelector("select");
const form = document.querySelector("form");
let pseudo = "";
let language = "";

inputName.addEventListener("input", (e) => {
  pseudo = e.target.value;
});

select.addEventListener("input", (e) => {
  language = e.target.value;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (cgv.checked) {
    document.querySelector("form > div");
  } else {
    alert("veuillez accepter le CGV");
  }
});

//6--------------------------------------------------
//BOM

// window.open("http://google.com", "coursjs", "height=600, width=800");

//confirm
btn2.addEventListener("click", () => {
  confirm("voulez-vous vraiment vous trompez?");
});

//prompt
btn1.addEventListener("click", () => {
  let answer = prompt("Entrez votre nom !");

  questionContainer.innerHTML += "<h3>Bravo" + answer + "</h3>";
});

//Timer, compte à rebours
setTimeout(() => {
  questionContainer.style.borderRadius = "300px";
}, 2000);
// let interval = setInterval(() => {
//   document.body.innerHTML += '<div class="box"><h2>Nouvelle Boite</h2></div>';
// }, 1000);

// document.body.addEventListener("click", () => {
//   clearInterval(interval);
// });
// window.history.back();

//méthodes string
// indexOf eval() =

//methodes array
// forEach, map, filter, reduce, find, sort
//shift() pour enlever le premier élément d'un array
//pop() pour enlever le dernier élément d'un array


