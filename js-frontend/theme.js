/**
 * Function to change the icon of the head of the page
 * according to the browser theme. 
 * If this one is dark the image will be inverted
 * @param {*} result result containing the theme adopted by the browser 
 */
function themeFavicon(result){
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
        favicon.href = !result.matches
            ? "../../img/static/logo.svg"
            : "../../img/static/logo_dark.svg";
    }
}

if(localStorage.getItem('theme') === null)
    localStorage.setItem('theme', 'false');

const themeSwitch = document.querySelectorAll('nav .switch input[type="checkbox"]');

themeSwitch.forEach(themeSingleSwitch => {
    themeSingleSwitch.addEventListener("change", () => {
        const isChecked = themeSingleSwitch.checked; // get the current status
        document.body.classList.toggle('dark-theme', isChecked); // change the background class
        themeSwitch.forEach(otherSwitch => otherSwitch.checked = isChecked); // change the status of all switches
        localStorage.setItem('theme', isChecked.toString()); // save the status in localStorage
    });
});

// Apply the starting theme
const statusTheme = localStorage.getItem('theme') === 'true'; // Converte in booleano
themeSwitch.forEach(themeSingleSwitch => themeSingleSwitch.checked = statusTheme);
document.body.classList.toggle('dark-theme', statusTheme);

/* apply the theme for the header icon */
themeFavicon(window.matchMedia('(prefers-color-scheme: dark)'));
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => themeFavicon(e));