function validateForm(){
    

    // input constants 
    const userNickname = document.getElementById('userName');
    const userEmail = document.getElementById('email');
    //const userCountry = document.getElementById('country');
    //const userLoginDate = document.getElementById('lastLogged');
    
    
    // error constants
    const errorUserNickname = document.getElementById('errorUserName');
    const errorUserEmail = document.getElementById('errorEmail');
    //const errorUserCountry = document.getElementById('errorCountry');
    //const errorUserLoginDate = document.getElementById('errorLastLogged');
    
    // summary constant
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([userNickname, userEmail],[errorUserNickname, errorUserEmail], errorsSummary);

    let valid = true;


    if (!checkRequired(userNickname.value)){
        valid = false;
        userNickname.classList.add("error-input");
        errorUserNickname.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(userNickname.value, 2, 20)){
        valid = false;
        userNickname.classList.add("error-input");
        errorUserNickname.innerText = "Pole powinno zawierać od 2 do 20 znaków";
    }

    if (!checkRequired(userEmail.value)){
        valid = false;
        userEmail.classList.add("error-input");
        errorUserEmail.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(userEmail.value, 4, 50)){
        valid = false;
        userEmail.classList.add("error-input");
        errorUserEmail.innerText = "Pole powinno zawierać od 4 do 50 znaków";
    } else if(!checkEmail(userEmail.value)){
        valid = false;
        userEmail.classList.add("error-input");
        errorUserEmail.innerText = "Pole powinno zawierać prawidłowy adres email";
    }

    if(!valid){
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}