let loginbtn = document.querySelector(".loginbtn");
let registerbtn = document.querySelector(".registerbtn");

loginbtn.addEventListener("click", loginbtnHandler);
registerbtn.addEventListener("click",registerbtnHandler);

function loginbtnHandler(){
    window.location.href = "/login";
}

function registerbtnHandler(){
    window.location.href = "/signup";
}
