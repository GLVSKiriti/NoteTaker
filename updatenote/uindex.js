const urlParams = new URLSearchParams(window.location.search);
const noteId = urlParams.get("noteId");


const body = document.querySelector('body')


const apiUrl = "http://localhost:8000";
const token = localStorage.getItem("jwt");

function updateView(heading,content){
    
    const card = document.querySelector(".card");
    const insidehtml = `<div class="create-note-container"><div class="create-note-heading">Update Note</div><input type="text" value="${heading}" maxlength="30" class="create-note-input-heading"><textarea type="text" value="${content}" class="create-note-input"></textarea><div class="create-note-button">Update</div>`
    card.innerHTML = insidehtml;

    const textareas = card.querySelector(".create-note-input");
    textareas.value = content;

    const updateNoteButton = card.querySelector(".create-note-button");
    updateNoteButton.addEventListener("click", () => {

        const heading = card.querySelector(".create-note-input-heading").value;
        const content = card.querySelector(".create-note-input").value;
    
        // console.log(heading,content);
        if(token){
            fetch(`${apiUrl}/note/update/${noteId}`,{
                method: "PUT",
                headers:{
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
                alert("Error in updating the note!! Re-Try...");
                console.log(err);
            });
        }
    });
}



window.addEventListener('load',() => {
    body.classList.add("visible");
    fetch(`${apiUrl}/note/update/${noteId}`,{
        method: "GET",
        headers:{
            "Content-Type": "application/json",
             authorization: token,
        },
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data.data);
        const heading = data.data[0].heading;
        const content = data.data[0].content;
        
        updateView(heading,content);
    })
    .catch((err) => {
        alert("Error in updating the note!! Re-Try...");
        console.log(err);
    });
   

})

