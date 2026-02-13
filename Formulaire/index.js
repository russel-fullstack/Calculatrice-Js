const inputs = document.querySelectorAll(
  'input[type="text"],  input[type="password"]'
);
const progressBar = document.querySelector(".progress-bar");
const form = document.querySelector(".form-container");
let pseudo, email, password, confirmPassword;

const errorDisplay = (tag, message, valid) => {
    const container = document.querySelector(`.${tag}-container`);
    const span = container.querySelector( "span");
    if(!valid){
        container.classList.add("error");
        span.classList.remove("display");
        span.textContent = message;
    } else {
        container.classList.remove("error");
        span.classList.add("display");
    }
}

const pseudoChecker = (value) => {
    if ((value.length > 0 && value.length < 3) || value.length > 20) {
      errorDisplay("pseudo", "Le nom doit contenir entre 3 et 20 caractères", false);
      pseudo = null;
    } else if (!value.match(/^[a-zA-Z0-9_.-]+$/)) {
      errorDisplay("pseudo", "Le nom ne doit pas contenir des caractères spéciaux", false);
      pseudo = null;
    } else {
      errorDisplay("pseudo", "", true);
      pseudo = value;
    }
}
const emailChecker = (value) => {
    if(!value.match(/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/)){
        errorDisplay("email", "Votre email doit être sous la forme nom@domaine.com", false);
        email = null;
    } else {
        errorDisplay("email", "", true);
        email = value;
    }
    
}
const passwordChecker = (value) => {
    if(value.length < 8 || !value.match(/[^a-zA-Z0-9]/)){
        errorDisplay("password", "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial", false);
        progressBar.classList.add("progressRed");
        password = null;
    } else if(value.length < 12){
        errorDisplay("password", "", true);
        progressBar.classList.remove("progressRed");
        progressBar.classList.add("progressBlue");
        password = value;
    } else {
        errorDisplay("password", "", true);
        progressBar.classList.remove("progressBlue");
        progressBar.classList.add("progressGreen");
        password = value;
    }
    
}
const confirmPasswordChecker = (value) => {
    if(value !== password){
        errorDisplay("confirm", "Les mots de passe ne correspondent pas", false);
        confirmPassword = null;
    } else {
        errorDisplay("confirm", "", true);
        confirmPassword = value;
    }
    
}

inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
        switch (e.target.id) {
            case "name":
                pseudoChecker(e.target.value);
                break;
            case "email":
                emailChecker(e.target.value);
                break;
            case "password":
                passwordChecker(e.target.value);
                break;
            case "confirm-password":
                confirmPasswordChecker(e.target.value);
                break;
        }
    })
});
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(pseudo && email && password && confirmPassword){
        const data = {
            pseudo,
            email,  
            password,
            confirmPassword
        }
        console.log(data);  
        inputs.forEach(input => input.value = "");
        progressBar.className = "progress-bar";
        pseudo = null;
        email = null;
        password = null;
        confirmPassword = null;
    } else {
        alert("Veuillez remplir correctement tous les champs du formulaire.");
    }
})