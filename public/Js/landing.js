let offerbtn = document.querySelectorAll(".header li")[0];
let contactbtn = document.querySelectorAll(".header li")[1];
let names = ["Women", "Humanity", "Nation"];
let changingText = document.querySelector(".container h1 span");
let idx = 0;
let word = names[idx];
let text = "";
let isDeleting = false;


window.addEventListener("load", function () {
    typeWords();
    offerbtn.addEventListener("click",offerbtnHandler);
    contactbtn.addEventListener("click",contactbtnHandler);
})
function offerbtnHandler(){
    window.location.href = "/about";
}
function contactbtnHandler(){
    window.location.href = "/contact";
}

function typeWords() {
    if (isDeleting && text.length == 0) {
        idx = (idx + 1) % names.length;
        word = names[idx];
        isDeleting = false;
    }

    if (text.length == word.length) {
        isDeleting = true;
    }

    text = isDeleting ? word.substring(0, text.length - 1) : word.substring(0, text.length + 1);
    changingText.innerHTML = text;
    setTimeout(typeWords, text.length == word.length ? 1000 : 100);
}