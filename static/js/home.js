import { getEvents } from '../events.js'
document.addEventListener("DOMContentLoaded", async function () {
    const authButton = document.getElementById("auth-button");
    const arrowSpan = authButton.querySelector(".arrow");

    const events = await getEvents();

    if (events) {
        updateEventCard(updateCard);
        window.location.href = 'dashboard.js';
    } else {
        showError('form-error', updateCard?.error || "Can't update an event");
    }

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
