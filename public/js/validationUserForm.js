function validateForm(){
    

    // input constants 
    const userEmail = document.getElementById('email');
    const userNickname = document.getElementById('userName');
    const userPwd = document.getElementById('password');
    // error constants
    const errorUserNickname = document.getElementById('errorUserName');
    const errorUserEmail = document.getElementById('errorEmail');
    const errorUserPwd = document.getElementById('errorPassword')
    // summary constant
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([userNickname, userEmail],[errorUserNickname, errorUserEmail], errorsSummary);

    let valid = true;

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


    if (!checkRequired(userNickname.value)){
        valid = false;
        userNickname.classList.add("error-input");
        errorUserNickname.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(userNickname.value, 2, 20)){
        valid = false;
        userNickname.classList.add("error-input");
        errorUserNickname.innerText = "Pole powinno zawierać od 2 do 20 znaków";
    }

    if (!checkRequired(userPwd.value)){
        valid = false;
        userPwd.classList.add("error-input");
        errorUserPwd.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(userNickname.value, 2, 20)){
        valid = false;
        userPwd.classList.add("error-input");
        errorUserPwd.innerText = "Pole powinno zawierać od 2 do 20 znaków";
    }
   
    if(!valid){
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}