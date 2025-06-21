import * as device from './size-device_bootstrap.js'

/* define constants */
const NAVBARDISTANCEDESKTOP = 75;
const NAVBARDISTANCEMOBILEBOTTOM = 50;
const NAVBARDISTANCEMOBILETOP = 65;

function resizer(){
        /* add a space to separate the content-page from the navbar */
        if(window.innerWidth < device.getBootstrapBreakPointValue('md')){
            document.getElementById("navbar-spacer-bottom").style.height = `${NAVBARDISTANCEMOBILEBOTTOM}px`;
            document.getElementById("navbar-spacer-top").style.height = `${NAVBARDISTANCEMOBILETOP}px`;
        }else{
            document.getElementById("navbar-spacer-top").style.height = `${NAVBARDISTANCEDESKTOP}px`;
            document.getElementById("navbar-spacer-bottom").style.height = `0px`;
        }

        /* add an extra space before the footer to make it appear
        at the bottom of the page */
        document.getElementById("body-spacer").style.height = `0px`;
        let remainingSpace = window.innerHeight - document.body.scrollHeight;
        document.getElementById("body-spacer").style.height = `${remainingSpace}px`;
}

window.addEventListener('resize', resizer);
window.addEventListener('load', resizer);