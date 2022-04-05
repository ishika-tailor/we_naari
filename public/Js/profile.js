let name = document.querySelector("#name");
let email = document.querySelector("#email");
let phone = document.querySelector("#mobile");
let org = document.querySelector("#org");
let designation = document.querySelector("#desig");
let editbtn = document.querySelector(".edit");
let cancelbtn = document.querySelector(".cancel");
let savebtn = document.querySelector(".save");
let dpbtn = document.querySelector(".dpbtn");
let dpInput = document.querySelector("#changeDP")

editbtn.addEventListener("click", function () {
    phone.readOnly = false;
    org.readOnly = false;
    designation.readOnly = false;
    dpbtn.style.display = "flex"
    savebtn.style.display = "flex"
    cancelbtn.style.display = "flex";
    editbtn.style.display = "none";
})

cancelbtn.addEventListener("click", function () {
    window.location.reload();
})

savebtn.addEventListener("click", async function () {
    try {
        let object = {};
        if (phone.value) {
            object.phone = phone.value;
        }
        if (org.value) {
            object.orgName = org.value;
        }
        if (designation.value) {
            object.Designation = designation.value;
        }
        await axios.post("http://localhost:3000/user/update", object);
        phone.readOnly = true;
        org.readOnly = true;
        designation.readOnly = true;
        dpbtn.style.display = "none"
        savebtn.style.display = "none";
        cancelbtn.style.display = "none";
        editbtn.style.display = "flex";

    } catch (err) {
        console.log(err);
    }

});

dpInput.addEventListener("change",async function (e) {
    const task = await storage.ref(`images/${e.target.files[0].name}`).put(e.target.files[0]);
    let link = await storage.ref("images").child(e.target.files[0].name).getDownloadURL()
    await axios.post("http://localhost:3000/user/updateprofilephoto",{imagePath:link});
    window.alert("Profile Pic Updated");
    window.location.reload();
})

