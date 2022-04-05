const table = document.querySelector(".container");

async function pre() {
    let data = await axios.get("http://localhost:3000/user/getUser");

    data = data.data.data;

    let tbody = document.createElement("tbody");
    for (let i = 0; i < data.length; i++) {

        
        if (data[i].role == "admin") continue;
        let tr = document.createElement("tr");

        let name = document.createElement("td");
        let email = document.createElement("td");
        let designation = document.createElement("td");
        let accessbtn = document.createElement("td");

        name.innerHTML = data[i].name;
        email.innerHTML = data[i].email;
        designation.innerHTML = data[i].Designation;

        if (data[i].role == "user") {
            accessbtn.innerHTML = "Make Admin";
            accessbtn.addEventListener("click", async function () {
                try {
                    await axios.post("http://localhost:3000/user/change", { id: data[i]._id })

                    window.location.reload();
                }
                catch (err) {
                    console.log(err);
                }

            })
        } 
        console.log(data[i].role);
        if (data[i].role == "admin") {
            console.log("enter");
            accessbtn.innerHTML = "Make User";
            accessbtn.addEventListener("click", async function () {
                
                    await axios.post("http://localhost:3000/user/remove", { id: data[i]._id })

                    window.location.reload();
                 
            })

        }

        tr.appendChild(name);
        tr.appendChild(email);
        tr.appendChild(designation);
        tr.appendChild(accessbtn);
        tbody.appendChild(tr);
    }

    table.appendChild(tbody);




}

pre();