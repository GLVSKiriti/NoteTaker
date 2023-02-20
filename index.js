const body = document.querySelector('body')
const signInSignUpButton = document.querySelector('.signin-signup')


window.addEventListener('load',() => {
    body.classList.add("visible");

    const token = localStorage.getItem("jwt");

    if(token){
        location.href = 'authenication/aindex.html';
    }
});

signInSignUpButton.addEventListener('click',() => {
    location.href = 'authenication/aindex.html';
});