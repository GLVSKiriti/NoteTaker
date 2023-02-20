const body = document.querySelector('body');
const logout = document.querySelector('.logout');
const createNoteButton = document.querySelector('.new-note');
const cardContainer = document.querySelector(".card-container");

const apiUrl = "http://localhost:8000";

const token = localStorage.getItem("jwt");

logout.addEventListener("click", () => {
    localStorage.removeItem("jwt");
    location.href = "/index.html";
});

let cardData = [];

createNoteButton.addEventListener("click", () => {
    location.href = "/createnote/cindex.html";
});

const createNotes = (array) =>{

    array.forEach((cardObj) => {
        const {heading,content} = cardObj;
        const id = cardObj.noteId;


        const card = document.createElement("div");
        card.classList.add("card");
        card.id = id;
        
        const insidehtml = `<div class="card-header"><div class="heading">${heading}</div><a href="/updatenote/uindex.html?noteId=${id}"><div class="edit-note"><img src="/dashboard/icons8-edit.svg" alt=""></div></a> <div class="delete-note"><img src="/assets/icons8-delete.svg" alt=""></div></div><div class="card-content">${content}</div>`
        
        card.innerHTML = insidehtml;

        const deleteButton = card.querySelector(".delete-note");

        deleteButton.addEventListener("click",() => {
            fetch(`${apiUrl}/note/delete/${id}`,{
                method: "DELETE",
                headers:{
                    authorization: token
                }
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.message);
                location.href = "/dashboard/dindex.html";
            })
            .catch((err) => {
                console.log(err);
            })
        })
        cardContainer.appendChild(card);
    });
};

window.addEventListener('load',() => {
    body.classList.add("visible")

    if(token){
        fetch(`${apiUrl}/note/getallnotes`,{
            method: "GET",
            headers: {
                authorization: token
            },
        })
        .then((res) => res.json())
        .then((data) => {
            cardData = data.data;
            createNotes(data.data);
        })
        .catch((err) => {
            alert("Error fetching data");
            console.log(err);
        });
    }
});