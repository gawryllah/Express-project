function validateForm(){
    
    
    // input constants 
    const profileNickname = document.getElementById('userName');
    const profileFavouriteGame = document.getElementById('favGame_id');
    const profileIsPrivate = document.getElementById('privateProfile');
    const profileVU = document.getElementById('mvpDate');
    const profileGameScore =  document.getElementById('gameScore');
    
    
    // error constants
    const errorProfileNickname = document.getElementById('errorUserName');
    const errorProfileFavouriteGame = document.getElementById('errorFavouriteGame');
    const errorProfileIsPrivate = document.getElementById('errorPrivateProfile');
    const errorProfileVU = document.getElementById('errorMvpDate');
    const errorProfileGameScore = document.getElementById('errorGameScore');

    
    // summary constant
    const errorsSummary = document.getElementById('errorsSummary');
    

    resetErrors([profileNickname, profileFavouriteGame, profileIsPrivate, profileVU, profileGameScore],[errorProfileNickname, errorProfileFavouriteGame, errorProfileIsPrivate, errorProfileVU, errorProfileGameScore], errorsSummary);
  

    let valid = true;


    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();
    
    if (month.length < 2)
        month = '0' + month;
    
    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');


    if (!(checkRequired(profileNickname.value)) || profileNickname.value == "--- Wybierz użytkownika ---"){
        valid = false;
        profileNickname.classList.add("error-input");
        errorProfileNickname.innerText = "Pole jest wymagane";
    }

    
    if (!(checkRequired(profileFavouriteGame.value)) || profileFavouriteGame.value == "--- Wybierz gre ---" || profileFavouriteGame.value == "--- Edytuj gre ---" ){
        valid = false;
        profileFavouriteGame.classList.add("error-input");
        errorProfileFavouriteGame.innerText = "Pole jest wymagane";
    } 

    if(!checkDate(profileVU.value)){
        console.log(profileVU.value)
        valid = false;
        profileVU.classList.add("error-input");
        errorProfileVU.innerText = "Pole powinno być w formacie yyyy-MM-dd";

    } else if(checkDateIfAfter(profileVU.value, nowString)){
        valid = false;
        profileVU.classList.add("error-input");
        errorProfileVU.innerText = "Data nie może być z przyszłości";
    }

    if(!checkNumberRange(profileGameScore.value, 1, 10)){
        valid = false;
        profileGameScore.classList.add("error-input");
        errorProfileGameScore.innerText = "Ocena powinna mieścić się w zakresie 1-10";
    }


    if(!valid){
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    console.log(profileIsPrivate.checked)

    
    return valid;
}