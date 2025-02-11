document.addEventListener("DOMContentLoaded", function () {
    const authButton = document.getElementById("auth-button");
    const arrowSpan = authButton.querySelector(".arrow");

    function updateAuthButton() {
        if (localStorage.getItem("isLoggedIn") === "true") {
            authButton.textContent = "Logout";
            authButton.classList.add("logout");
        } else {
            authButton.textContent = "Login";
            authButton.appendChild(arrowSpan); 
            arrowSpan.textContent = "→";
            authButton.classList.remove("logout");
        }
    }

    authButton.addEventListener("click", function () {
        if (localStorage.getItem("isLoggedIn") === "true") {
            localStorage.removeItem("isLoggedIn"); 
        } else {
            localStorage.setItem("isLoggedIn", "true"); 
        }
        updateAuthButton();
    });

    updateAuthButton(); 
});
