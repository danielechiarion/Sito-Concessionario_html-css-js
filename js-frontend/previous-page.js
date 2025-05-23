const cardDetails = document.querySelectorAll(".btn-card-details");

cardDetails.forEach(button => 
    button.addEventListener("click", () => {
        localStorage.setItem("previousPage", window.location.href);
    })
);