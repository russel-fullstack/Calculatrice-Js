const target = document.getElementById("target");
const array = ["Développeur !", "Graphiste !", "Créatif !"];
let arrayIndex = 0;
let letterIndex = 0;
console.log(array.length);

const createLetter = () => {
  const letter = document.createElement("span");
  target.appendChild(letter);
  letter.textContent = array[arrayIndex][letterIndex];
  letter.style.color = "red";

  setTimeout(() => {
    letter.remove();
  }, 2800);
};

const loop = () => {
  setTimeout(() => {
    if (arrayIndex >= array.length) {
      arrayIndex = 0;
      letterIndex = 0;
      loop()
    }else if (letterIndex < array[arrayIndex].length) {
      createLetter();
      letterIndex++;
      loop();
    } else {
      arrayIndex++;
      letterIndex = 0;
      setTimeout(() => {
        loop();
      }, 2800);
    }
  }, 200);
};

loop();
