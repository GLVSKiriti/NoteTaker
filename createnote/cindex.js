const body = document.querySelector('body');

const apiUrl = "http://localhost:8000";

const token = localStorage.getItem("jwt");

const createNoteButton = document.querySelector('.create-note-button');

createNoteButton.addEventListener("click", () => {
    const heading = document.querySelector('.create-note-input-heading').value;
    const content = document.querySelector('.create-note-input').value;

    if(token){
        fetch(`${apiUrl}/note/add`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: token,
            },
            body: JSON.stringify({content,heading}),
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.message){
                location.href = "/dashboard/dindex.html";
            }
        })
        .catch((err) => {
            alert("Error Creating Notes!! Re-Try....");
            console.log(err);
        });
    }
});

window.addEventListener('load',() => {
    body.classList.add("visible")
})