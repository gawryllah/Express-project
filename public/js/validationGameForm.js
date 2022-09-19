function validateForm(){
    

    // input constants 
    const gameTitle = document.getElementById('title');
    
    
    
    // error constants
    const errorgameTitle = document.getElementById('errorTitle');

    // summary constant
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([gameTitle],[errorgameTitle], errorsSummary);

    let valid = true;


    if (!checkRequired(gameTitle.value) || gameTitle.value == '' || gameTitle.value == null){
        valid = false;
        gameTitle.classList.add("error-input");
        errorgameTitle.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(gameTitle.value, 2, 40)){
        valid = false;
        gameTitle.classList.add("error-input");
        errorgameTitle.innerText = "Pole powinno zawierać od 2 do 40 znaków";
    }

    if(!valid){
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}