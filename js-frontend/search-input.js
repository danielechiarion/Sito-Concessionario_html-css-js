const buttons = Array.from(document.querySelectorAll("nav .btn-outline-success, .top-navbar-search .btn-outline-success"));
const inputs = Array.from(document.querySelectorAll('nav input[type="search"], .top-navbar-search input[type="search"]'));

buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        const input = button.closest("form").querySelector('input[type="search"]');
        const query = input.value.trim();
        if(query === "")
            return;

        localStorage.setItem("searchQuery", query);
        if(window.location.href.includes("/posts/"))
            window.location.href = "../pages/search.html";
        else
            window.location.href = "search.html";
    });
});