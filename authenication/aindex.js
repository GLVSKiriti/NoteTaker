const body = document.querySelector('body')

const apiUrl = "http://localhost:8000"

window.addEventListener('load',() => {
    body.classList.add("visible")
})

const signInForm = document.querySelector(".signin");

signInForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const signInEmail = document.querySelector(".signin-email");
    const signInPassword = document.querySelector(".signin-password");

    const email = signInEmail.value;
    const password = signInPassword.value;

    fetch(`${apiUrl}/auth/signin`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email,password}),
    })
    .then((res) => res.json())
    .then((data) => {
        const {token} = data;

        if(token){
            localStorage.setItem("jwt",token);
            location.href = "/dashboard/dindex.html";
        }
        else{
            alert("SignIn again");
        }
    })
    .catch((err) => {
        alert("Error Signing In!!! Re-Try.....");
        console.log(err);
    });
});

const signUpForm = document.querySelector(".signup");

signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.querySelector(".signup-email").value;
    const name = document.querySelector(".name").value;
    const password = document.querySelector(".signup-password").value;
    const retypedPassword = document.querySelector(".ReSignup-password").value;   

    if(password !== retypedPassword){
        alert("Passwords doesn't match");
        return;
    }

    fetch(`${apiUrl}/auth/signup`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email,name,password}),
    })
    .then((res) => res.json())
    .then((data) => {
        const {token} = data;

        if(token){
            localStorage.setItem("jwt",token);
            location.href = "/dashboard/dindex.html";
        }
        else{
            alert("SignUp Again");
        }
    })
    .catch((err) => {
        alert("Error Signing Up!!!! Re-Try");
        console.log(err);
    });
});

