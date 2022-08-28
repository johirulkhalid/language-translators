// selecting
const formText = document.querySelector(".form_text"),
toText = document.querySelector(".to_text"),
selectTag = document.querySelectorAll("select"),
exchanageIcon = document.querySelector(".exchange"),
translateBtn = document.querySelector("button"),
icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, Id) => {
    for(const country_code in countries){
        // selecting english  by default as from language and hindi as to language
        let selected;
        if(Id == 0 && country_code == "en-GB"){
            selected = "selected";
        }else if(Id == 1 && country_code == "hi-IN"){
            selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option); //adding options tag inside select tag
    }
    
});
// exchange language
exchanageIcon.addEventListener('click', () =>{
    // exchange textarea and select tag value
    let tempText = formText.value,
    tempLan = selectTag[0].value;
    formText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLan;
});

// work with translate buton
translateBtn.addEventListener("click", () =>{
    let text = formText.value,
    translateForm = selectTag[0].value, //getting formselect tag value
    translateTo = selectTag[1].value; // getting toselect tag value
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateForm}|${translateTo}`;

    fetch(apiUrl).then(res => res.json()).then(data =>{
        console.log(data);
        toText.value = data.responseData.translatedText;
    })
});

// work with copy and speech
icons.forEach(icon => {
    icon.addEventListener("click", ({target}) =>{
        if(target.classList.contains("fa-copy")) {
            if(target.id == "form") {
                navigator.clipboard.writeText(formText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else{
           let utterance;
           if(target.id == "form") {
                utterance = new SpeechSynthesisUtterance(formText.value);
                utterance.lang = selectTag[0];
        } else {
            utterance = new SpeechSynthesisUtterance(toText.value);
            utterance.lang = selectTag[1];
        }
        SpeechSynthesis.speak(utterance);
       }
    });
});
