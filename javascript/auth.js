
function registerUser() {
    const username = document.getElementById("regUsername").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("regConfirmPassword").value;
    let msg = document.getElementById("message");

    //checking if the password and confirmpassword arw matching
    if(password !== confirmPassword) {
        // if not match throwing an error message
        msg.textContent = "Password do not match!";
        // console.log("Password and confirm password are not matching");
        // reseting the password fields
        document.getElementById("regPassword").value = "";
        document.getElementById("regConfirmPassword").value = "";
        return false;
    }

    // Getting existing user if exist or else creating an new localstorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Checking for existing username or email
    const userExists = users.some(user => user.username === username || user.email === email);

    // if exists returning error message
    if(userExists) {
        msg.textContent = "User already exists. Please login.";
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000)
        return false;
    }

    // Create new user Objects
    const newUser = {
        username: username,
        email: email,
        password: password
    };

    // Adding to users array and storing in the localstorage
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    msg.style.color = "green";
    msg.textContent = "Registration Successful!";

    window.location.href = "index.html";

    //Clearing form fields 
    document.getElementById("registerForm").reset();

    return false; 

}

function loginUser() {
    const username = document.getElementById("loginUsername").value.trim();
    const email = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;
    const msg = document.getElementById("message");

    if(username === "Admin" && password === "Admin") {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "home.html";
        return false;
    }

    //getting the user from the local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // console.log(users);
    

    // finding the user if exists with email or username and password
    const user = users.find(user => ((user.username === username || user.email === email) && user.password === password));

    // if user exists printing message as "login successfull" and storing the loggedUser info and redirecting to dashboard
    if(user) {
        msg.style.color = "green";
        msg.textContent = "Login successfull!";

        // storing the logged user info in local storage
        localStorage.setItem("loggedInUser", username);

        // redirecring to the home page or dashboard
        setTimeout(() => {
            window.location.href = "home.html";
        }, 1000);
        
    } else {
        msg.textContent = "Invalid username or password";
    }

    //Clearing form fields 
    document.getElementById("loginForm").reset();

    return false;
}