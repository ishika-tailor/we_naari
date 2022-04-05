
let loginbtn = document.querySelector(".loginbtn");
let registerbtn = document.querySelector(".registerbtn");

loginbtn.addEventListener("click", loginbtnHandler);
registerbtn.addEventListener("click",registerbtnHandler);

function loginbtnHandler(){
    window.location.href = "/profile";
}

function registerbtnHandler(){
    window.location.href = "/stats";
}
