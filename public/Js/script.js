let block = document.querySelector(".welcome");
let load = document.querySelector(".load");
let close = document.querySelector(".close");
let submit = document.querySelector(".submit");
let change = document.querySelector(".change");
let burgerNavBar = document.querySelector(".burger-nav");
let navBarSlide = document.querySelector(".nav-btn-slide")
let lat = document.querySelector("#lat");
let long = document.querySelector("#long");
let mess = document.querySelector(".mess");
let loadingAnime = document.querySelector(".loadingAnime");
let lists = document.querySelector(".lists");
let aboutDiv = document.querySelector(".about")
let graphDiv = document.querySelector(".graph")
let state = document.querySelector("#state");

let latLabel = document.querySelector(".lat")
let longLabel = document.querySelector(".long")
// stats page

window.addEventListener("load", function () {
    // burgerNavBar.addEventListener("click", burgerNav);

    state.addEventListener("change", function () {
        let option = state.value;

         if (option == "Other") {
            lat.style.display = "flex"
            long.style.display = "flex"
            longLabel.style.display = "flex"
            latLabel.style.display = "flex"
        }else  {
            lat.style.display = "none"
            long.style.display = "none"
            latLabel.style.display = "none"
            longLabel.style.display = "none"

        }
    })

    submit.addEventListener("click", async function (e) {
        try {

            let option = state.value;

            if (option == "Select") {
                mess.innerHTML = "Select State first";
            } else if (option == "Other") {
                if (lat.value && long.value) {
                    e.preventDefault();
                    let words = "";
                    if(words == ""){
                        words = "women rape";
                    }
                    let formData = new FormData();
                    formData.append("city1", lat.value);
                    formData.append("city2", long.value);
                    formData.append("words", words);

                    load.style.display = "none";
                    loadingAnime.style.display = "flex";
                    mess.innerHTML = "";
                    let data = await axios.post("https://avekshaml.herokuapp.com/", formData)
                    console.log(data.data);
                    let cloudURL = data.data.url1;
                    let graphURL = data.data.url2;
                    data = data.data.row_data;
                    let arr = []

                    for (let i = 0; i < data.length; i++) {
                        let obj = {
                            "atag": data[i][0],
                            "location": data[i][1],
                            "hash": data[i][4],
                            "tweet": data[i][3],
                            "pol": data[i][7]
                        }
                        arr.push(obj);
                    }

                    arr.sort((a, b) => (a.pol > b.pol) ? 1 : ((b.pol > a.pol) ? -1 : 0))
                    let wrap = document.createElement("div");
                    if (lists != null) {

                        for (let i = 0; i < data.length; i++) {
                            let pt = document.createElement("div");
                            pt.classList.add("pt");
                            let name = document.createElement("h3");
                            let atag = document.createElement("a");
                            atag.innerHTML = arr[i].atag;
                            atag.setAttribute("target", "_blank");
                            atag.setAttribute("href", `https://twitter.com/${arr[i].atag}`)
                            name.appendChild(atag)
                            let location = document.createElement("h3");
                            location.innerHTML = arr[i].location;
                            let hash = document.createElement("h3");
                            hash.innerHTML = arr[i].hash;
                            let tweet = document.createElement("h3");
                            tweet.innerHTML = arr[i].tweet;
                            pt.appendChild(name);
                            pt.appendChild(location);
                            pt.appendChild(hash)
                            pt.appendChild(tweet);
                            wrap.appendChild(pt);
                        }

                        lists.append(wrap);
                    }
                    aboutDiv.style.backgroundImage = `url(https://avekshaml.herokuapp.com/${cloudURL.substring(1)})`
                    graphDiv.style.backgroundImage = `url(https://avekshaml.herokuapp.com/${graphURL.substring(1)})`
                    loadingAnime.style.display = "none";
                    block.style.display = "flex";

                } else {
                    mess.innerHTML = "Enter Longitude and Latitude";
                }

            } else {
                e.preventDefault();

                let cord = option.split(" ");
                let words = "";
                if(words == ""){
                    words = "women rape";
                }
                let formData = new FormData();
                formData.append("city1", cord[0]);
                formData.append("city2", cord[1]);
                formData.append("words", words);

                load.style.display = "none";
                loadingAnime.style.display = "flex";
                mess.innerHTML = "";
                let data = await axios.post("https://avekshaml.herokuapp.com/", formData)
                let cloudURL = data.data.url1;
                let graphURL = data.data.url2;
                data = data.data.row_data;
                let arr = []

                for (let i = 0; i < data.length; i++) {
                    let obj = {
                        "atag": data[i][0],
                        "location": data[i][1],
                        "hash": data[i][4],
                        "tweet": data[i][3],
                        "pol": data[i][7]
                    }
                    arr.push(obj);
                }

                arr.sort((a, b) => (a.pol > b.pol) ? 1 : ((b.pol > a.pol) ? -1 : 0))
                let wrap = document.createElement("div");
                if (lists != null) {

                    for (let i = 0; i < data.length; i++) {
                        let pt = document.createElement("div");
                        pt.classList.add("pt");
                        let name = document.createElement("h3");
                        let atag = document.createElement("a");
                        atag.innerHTML = arr[i].atag;
                        atag.setAttribute("target", "_blank");
                        atag.setAttribute("href", `https://twitter.com/${arr[i].atag}`)
                        name.appendChild(atag)
                        let location = document.createElement("h3");
                        location.innerHTML = arr[i].location;
                        let hash = document.createElement("h3");
                        hash.innerHTML = arr[i].hash;
                        let tweet = document.createElement("h3");
                        tweet.innerHTML = arr[i].tweet;
                        pt.appendChild(name);
                        pt.appendChild(location);
                        pt.appendChild(hash)
                        pt.appendChild(tweet);
                        wrap.appendChild(pt);
                    }

                    lists.append(wrap);
                }
                aboutDiv.style.backgroundImage = `url(https://avekshaml.herokuapp.com/${cloudURL.substring(1)})`
                graphDiv.style.backgroundImage = `url(https://avekshaml.herokuapp.com/${graphURL.substring(1)})`
                loadingAnime.style.display = "none";
                block.style.display = "flex";



            }


        } catch (err) {
            load.style.display = "flex";
            mess.innerHTML = "No tweets found";
            loadingAnime.style.display = "none";

        }

    })
    change.addEventListener("click", function () {
        window.location.reload();
    })
    close.addEventListener("click", function () {
        load.style.display = "none";
        block.style.display = "flex";
    })
})


function burgerNav() {
    if (navBarSlide.classList.contains("activeBar")) {
        navBarSlide.classList.remove("activeBar");
    } else {
        navBarSlide.classList.add("activeBar");
    }

}


