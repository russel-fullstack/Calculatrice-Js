const dataLowercase = "abcdefghijklmnopqrstuvwxyz";
const dataUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const dataNumbers = "0123456789";
const dataSymbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

generateButton.addEventListener("click", () => {
    let data = [ ];
    let password = "";

    if(uppercase.checked) data.push(...dataUppercase);
    if(lowercase.checked) data.push(...dataLowercase);
    if(numbers.checked) data.push(...dataNumbers);
    if(symbols.checked) data.push(...dataSymbols);

    if(data.length === 0){
        alert("Veuillez sélectionner au moins un critère pour générer le mot de passe.");
        return;
    }
    
    for (i = 0; i < passwordLength.value; i++) {
      password += data[Math.floor(Math.random() * data.length)];
    }
 
  generatedPassword.value = password;
  generatedPassword.select();
  navigator.clipboard.writeText(generatedPassword.value);

  generateButton.textContent = "Copié!"

  setTimeout(() => {
    generateButton.textContent = "Générer mot de passe";
  }, 2000);
  
    
    
})


