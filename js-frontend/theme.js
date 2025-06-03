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