let block = document.querySelector(".welcome");
let load = document.querySelector(".load");
let close = document.querySelector(".close");
let submit = document.querySelector(".submit");
let change = document.querySelector(".change");
let burgerNavBar = document.querySelector(".burger-nav");
let navBarSlide = document.querySelector(".nav-btn-slide")
let lat = document.querySelector("#lat");
let long = document.querySelector("#long");
let mess =document.querySelector(".mess")

window.addEventListener("load", function(){
    burgerNavBar.addEventListener("click", burgerNav);

    submit.addEventListener("click", async function(e){
        if(lat.value && long.value){
            e.preventDefault();
            close.innerHTML = "X";
            load.style.display = "none";
            block.style.display = "flex";
            mess.innerHTML = "";
           
        }else{
            mess.innerHTML = "Enter Longitude and Latitude";
        }

    })
    change.addEventListener("click", function(){
        load.style.display = "flex";
        block.style.display = "none";
    })
    close.addEventListener("click", function(){
        load.style.display = "flex";
        block.style.display = "none";
    })
})


function burgerNav(){
    if( navBarSlide.classList.contains("activeBar")){
        navBarSlide.classList.remove("activeBar");
    }else{
        navBarSlide.classList.add("activeBar");
    }
    
}


