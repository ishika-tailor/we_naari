
let username = document.querySelector("#name");
let email = document.querySelector("#email");
let cusername = document.querySelector(".cname .value");
let cemail = document.querySelector(".cemail .value");
let pw = document.querySelector("#pw");
let cpw = document.querySelector("#cpw");
let phone = document.querySelector("#phone");
let cphone = document.querySelector(".cph .value");
let org = document.querySelector("#orgName");
let corg = document.querySelector(".corg .value ");
let Designation = document.querySelector("#Designation");
let ceid = document.querySelector(".ceid .value");
let signupBtn = document.querySelector(".submitbtn");
let mess = document.querySelector(".message")
let burgerNavBar = document.querySelector(".burger-nav");
let navBarSlide = document.querySelector(".nav-btn-slide")
let cpage = document.querySelector(".confirmpage")
let cbtn = document.querySelector(".confirm");
let editbtn = document.querySelector(".edit");
let loginbtn = document.querySelector(".loginbtn");

window.addEventListener("load", function () {
    burgerNavBar.addEventListener("click", burgerNav)
    loginbtn.addEventListener("click",loginbtnHandler);
    signupBtn.addEventListener("click", signupBtnHandler);
    cbtn.addEventListener("click",cbtnHandler);
    editbtn.addEventListener("click", editbtnHandler);
})
function loginbtnHandler(){
    window.location.href = "/login";
}
function burgerNav() {
    if (navBarSlide.classList.contains("active")) {
        navBarSlide.classList.remove("active");
    } else {
        navBarSlide.classList.add("active");
    }

}

function signupBtnHandler (e) {
    e.preventDefault();
    
    if (username.value && email.value && pw.value && cpw.value ) {
        mess.innerHTML = "";
        cusername.innerHTML = username.value;
        cemail.innerHTML = email.value;
        cphone.innerHTML = phone.value;
        corg.innerHTML = org.value;
        ceid.innerHTML = Designation.value;
        cpage.classList.add("block");
    }else{
        mess.innerHTML = "All fields are mandatory!!";
    }
}
async function cbtnHandler (e) {
    try {
            e.preventDefault(); 
            let obj = await axios.post('http://localhost:3000/user/signup',{name: username.value, email:email.value,phone:phone.value,orgName: org.value,Designation:Designation.value,password:pw.value,confirmPassword:cpw.value});
            // console.log(obj);
            // console.log('ohkay');
            // alert('recieved');

            if (obj.data.data) {
                
                window.location.href = "/stats";
            }
            else {
                mess.innerHTML = obj.data.message;
            }

        } catch (error) {
            cpage.classList.remove("block");
            mess.innerHTML = "INVALID DETAILS";
            console.log(error);
        }

}

function editbtnHandler () {
    cpage.classList.remove("block");
}
