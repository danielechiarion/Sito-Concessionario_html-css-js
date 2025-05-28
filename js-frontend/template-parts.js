import * as SizeDevice from "./size-device_bootstrap.js";

/* here are the most used template parts in the sites,
that are formatted with the data they receive */

/**
 * Function that returns a formatted error message
 * @param {string} message 
 * @returns formatted error message to print 
 */
export function getErrorMessage(message){
    return `<div class="col-12 d-flex justify-content-center align-items-center errorContainer">
        <img src="../../img/static/alert.svg">
        ${message}
    </div>`;
}

/**
 * Function that returns a formatted success message
 * @param {string} message 
 * @returns formatted success message to print
 */
export function getSuccessMessage(message){
    return `<div class="col-12 d-flex justify-content-center align-items-center successContainer" id="login-success">
        <img src="../../img/static/tick.svg">
        ${message}
    </div>`;
}

/** Get a navbar from the customer point of view */
export function getNavbarAdmin(){
    return `<!-- NAVBAR FOR SMARTPHONE -->
    <div id="accordionMenus">
      <div class="collapse navbar-collapse collapse-mobile" id="menuHamburger" data-bs-theme="light" data-bs-parent="#accordionMenus">
        <div class="bg-light p-4">
          <li class="d-flex align-items-center link-group_navMobile">
            <img src="../../img/static/settings.svg" class="nav-icon-desktop">
            <a class="nav-link-mobile" href="admin_add-items.html">Aggiungi articoli</a>
          </li>
        </div>
      </div>
      <div class="collapse navbar-collapse collapse-mobile" id="menuProfile" data-bs-theme="light" data-bs-parent="#accordionMenus">
        <div class="bg-light p-4">
          <h4><a class="nav-link-mobile link-group_navMobile" href="profile.html">Il tuo profilo</a></h4>
          <h4><a class="nav-link-mobile link-group_navMobile" href="login.html">Accedi / Logout</a></h4>
          <h4><a class="nav-link-mobile link-group_navMobile" href="sign-up.html">Registrati</a></h4>
        </div>
      </div>
    </div>
        <nav class="navbar navbar-light bg-light fixed-bottom d-block d-sm-none">
          <div class="container-fluid d-flex justify-content-between align-items-center">
            <!-- Home icon -->
            <a href="index.html" class="navbar-brand m-0 p-0">
              <img src="../../img/static/home.svg" alt="Home" class="nav-icon-mobile">
            </a>
            <!-- Profile icon -->
            <a href="#" class="navbar-brand m-0 p-0" data-bs-toggle="collapse" data-bs-target="#menuProfile" aria-controls="#menuProfile" aria-expanded="false" aria-label="Toogle navigation">
              <img src="../../img/static/profile.svg" alt="Home" class="nav-icon-mobile">
            </a>
            <!-- Hamburger with the site links-->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuHamburger" aria-controls="#menuHamburger" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <!-- Search - car configurator -->
            <a href="car-configurator.html" class="navbar-brand m-0 p-0">
              <img src="../../img/static/search.svg" alt="Home" class="nav-icon-mobile">
            </a>
            <!-- Dark/Light switch -->
            <label class="switch mb-0">
              <input type="checkbox">
              <span class="slider round"></span>
            </label>
          </div>
        </nav>

      <!-- NAVBAR FOR PC -->
      <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top d-none d-md-block">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item d-flex align-items-center">
                <img src="../../img/static/home.svg" class="nav-icon-desktop">
                <a class="nav-link-desktop" href="index.html">Home</a>
              </li>
              <li class="nav-item d-flex align-items-center">
                <img src="../../img/static/car.svg" class="nav-icon-desktop car-icon_nav">
                <a class="nav-link-desktop" href="car-configurator.html">Configuratore</a>
              </li>
              <li class="nav-item dropdown d-flex align-items-center">
                <img src="../../img/static/index.svg" class="nav-icon-desktop index-icon_nav">
                <a class="nav-link dropdown-toggle nav-link-desktop" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Per te
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item nav-link-desktop-sub" href="admin_add-items.html">Aggiungi articoli</a></li>
                </ul>
              </li>
            </ul>
            <div class="collapse navbar-collapse nav-item-right-desktop" id="profile-menu-dropdown_computer">
              <ul class="navbar-nav ms-auto">
                <li class="nav-item dropdown">
                  <button class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="../../img/static/profile.svg" class="nav-icon-desktop">
                  </button>
                  <ul class="dropdown-menu dropdown-menu-light">
                    <li><a class="dropdown-item nav-link-desktop-sub" href="profile.html">Vedi Profilo</a></li>
                    <li><a class="dropdown-item nav-link-desktop-sub" href="login.html">Accedi / Logout</a></li>
                    <li><a class="dropdown-item nav-link-desktop-sub" href="sign-up.html">Registrati</a></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="nav-item-right-desktop d-flex align-items-center">
              <img src="../../img/static/light.svg" class="nav-icon-desktop">
              <!-- Dark/Light switch -->
              <label class="switch mb-0">
                <input type="checkbox">
                <span class="slider round"></span>
              </label>
              <img src="../../img/static/dark.svg" class="nav-icon-desktop">
            </div>
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
    </nav>

    <!-- NAVBAR FOR TABLET-->
    <div class="collapse collapse-tablet" id="hamburgerTablet" data-bs-theme="light">
      <div class="bg-light p-4">
        <li class="d-flex align-items-center link-group_navMobile">
          <img src="../../img/static/home.svg" class="nav-icon-desktop">
          <a class="nav-link-mobile" href="index.html">Home</a>
        </li>
        <li class="d-flex align-items-center link-group_navMobile">
          <img src="../../img/static/car.svg" class="nav-icon-desktop car-icon_nav">
          <a class="nav-link-mobile" href="car-configurator.html">Configuratore</a>
        </li>
        <li class="d-flex align-items-center link-group_navMobile">
          <img src="../../img/static/settings.svg" class="nav-icon-desktop">
          <a class="nav-link-mobile" href="admin_add-items.html">Aggiungi articoli</a>
        </li>

        <br>
        <li class="d-flex align-items-center link-group_navMobile">
          <img src="../../img/static/profile.svg" class="nav-icon-desktop">
          <a class="nav-link-mobile" href="profile.html">Profilo personale</a>
        </li>
        <li class="d-flex align-items-center link-group_navMobile">
          <img src="../../img/static/profile.svg" class="nav-icon-desktop">
          <a class="nav-link-mobile" href="login.html">Accedi/Login</a>
        </li>
        <li class="d-flex align-items-center link-group_navMobile">
          <img src="../../img/static/profile.svg" class="nav-icon-desktop">
          <a class="nav-link-mobile" href="sign-up.html">Registrati</a>
        </li>
      </div>
    </div>
    <nav class="navbar navbar-light bg-light fixed-top d-none d-sm-block d-md-none">
      <div class="container-fluid d-flex justify-content-between align-items-center flex-nowrap">
        <div>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#hamburgerTablet" aria-controls="hamburgerTablet" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div class="d-flex align-items-center flex-shrink-0">
          <img src="../../img/static/light.svg" class="nav-icon-desktop">
          <!-- Dark/Light switch -->
          <label class="switch mb-0">
            <input type="checkbox">
            <span class="slider round"></span>
          </label>
          <img src="../../img/static/dark.svg" class="nav-icon-desktop">
        </div>
        <!-- Search section -->
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </nav>`
}


/**
 * Return a navbar for the admin point of view
 */
export function getNavbarCustomer(){
    return `<!-- NAVBAR FOR SMARTPHONE -->
    <div id="accordionMenus">
      <div class="collapse navbar-collapse collapse-mobile" id="menuHamburger" data-bs-theme="light" data-bs-parent="#accordionMenus">
        <div class="bg-light p-4">
          <li class="d-flex align-items-center link-group_navMobile">
            <img src="../../img/static/shopping-cart.svg" class="nav-icon-desktop">
            <a class="nav-link-mobile" href="shopping-cart.html">Vai al carrello</a>
          </li>
          <li class="d-flex align-items-center link-group_navMobile">
            <img src="../../img/static/gift.svg" class="nav-icon-desktop">
            <a class="nav-link-mobile" href="wish-list.html">Lista dei desideri</a>
          </li>
          <li class="d-flex align-items-center link-group_navMobile">
            <img src="../../img/static/dollar.svg" class="nav-icon-desktop">
            <a class="nav-link-mobile" href="purchase-list.html">Lista degli acquisti</a>
          </li>
        </div>
      </div>
      <div class="collapse navbar-collapse collapse-mobile" id="menuProfile" data-bs-theme="light" data-bs-parent="#accordionMenus">
        <div class="bg-light p-4">
          <h4><a class="nav-link-mobile link-group_navMobile" href="profile.html">Il tuo profilo</a></h4>
          <h4><a class="nav-link-mobile link-group_navMobile" href="login.html">Accedi / Logout</a></h4>
          <h4><a class="nav-link-mobile link-group_navMobile" href="sign-up.html">Registrati</a></h4>
        </div>
      </div>
    </div>
        <nav class="navbar navbar-light bg-light fixed-bottom d-block d-sm-none">
          <div class="container-fluid d-flex justify-content-between align-items-center">
            <!-- Home icon -->
            <a href="index.html" class="navbar-brand m-0 p-0">
              <img src="../../img/static/home.svg" alt="Home" class="nav-icon-mobile">
            </a>
            <!-- Profile icon -->
            <a href="#" class="navbar-brand m-0 p-0" data-bs-toggle="collapse" data-bs-target="#menuProfile" aria-controls="#menuProfile" aria-expanded="false" aria-label="Toogle navigation">
              <img src="../../img/static/profile.svg" alt="Home" class="nav-icon-mobile">
            </a>
            <!-- Hamburger with the site links-->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuHamburger" aria-controls="#menuHamburger" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <!-- Search - car configurator -->
            <a href="car-configurator.html" class="navbar-brand m-0 p-0">
              <img src="../../img/static/search.svg" alt="Home" class="nav-icon-mobile">
            </a>
            <!-- Dark/Light switch -->
            <label class="switch mb-0">
              <input type="checkbox">
              <span class="slider round"></span>
            </label>
          </div>
        </nav>

      <!-- NAVBAR FOR PC -->
      <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top d-none d-md-block">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item d-flex align-items-center">
                <img src="../../img/static/home.svg" class="nav-icon-desktop">
                <a class="nav-link-desktop" href="index.html">Home</a>
              </li>
              <li class="nav-item d-flex align-items-center">
                <img src="../../img/static/shopping-cart.svg" class="nav-icon-desktop">
                <a class="nav-link-desktop" href="shopping-cart.html">Acquista</a>
              </li>
              <li class="nav-item d-flex align-items-center">
                <img src="../../img/static/car.svg" class="nav-icon-desktop car-icon_nav">
                <a class="nav-link-desktop" href="car-configurator.html">Configuratore</a>
              </li>
              <li class="nav-item dropdown d-flex align-items-center">
                <img src="../../img/static/index.svg" class="nav-icon-desktop index-icon_nav">
                <a class="nav-link dropdown-toggle nav-link-desktop" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Per te
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item nav-link-desktop-sub" href="wish-list.html">Lista dei desideri</a></li>
                  <li><a class="dropdown-item nav-link-desktop-sub" href="purchase-list.html">Storico acquisti</a></li>
                </ul>
              </li>
            </ul>
            <div class="collapse navbar-collapse nav-item-right-desktop" id="profile-menu-dropdown_computer">
              <ul class="navbar-nav ms-auto">
                <li class="nav-item dropdown">
                  <button class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="../../img/static/profile.svg" class="nav-icon-desktop">
                  </button>
                  <ul class="dropdown-menu dropdown-menu-light">
                    <li><a class="dropdown-item nav-link-desktop-sub" href="profile.html">Vedi Profilo</a></li>
                    <li><a class="dropdown-item nav-link-desktop-sub" href="login.html">Accedi / Logout</a></li>
                    <li><a class="dropdown-item nav-link-desktop-sub" href="sign-up.html">Registrati</a></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="nav-item-right-desktop d-flex align-items-center">
              <img src="../../img/static/light.svg" class="nav-icon-desktop">
              <!-- Dark/Light switch -->
              <label class="switch mb-0">
                <input type="checkbox">
                <span class="slider round"></span>
              </label>
              <img src="../../img/static/dark.svg" class="nav-icon-desktop">
            </div>
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
    </nav>

    <!-- NAVBAR FOR TABLET-->
    <div class="collapse collapse-tablet" id="hamburgerTablet" data-bs-theme="light">
      <div class="bg-light p-4">
        <li class="d-flex align-items-center link-group_navMobile">
          <img src="../../img/static/home.svg" class="nav-icon-desktop">
          <a class="nav-link-mobile" href="index.html">Home</a>
        </li>
        <li class="d-flex align-items-center link-group_navMobile">
          <img src="../../img/static/car.svg" class="nav-icon-desktop car-icon_nav">
          <a class="nav-link-mobile" href="car-configurator.html">Configuratore</a>
        </li>
        <li class="d-flex align-items-center link-group_navMobile">
          <img src="../../img/static/shopping-cart.svg" class="nav-icon-desktop">
          <a class="nav-link-mobile" href="shopping-cart.html">Vai al carrello</a>
        </li>
        <li class="d-flex align-items-center link-group_navMobile">
          <img src="../../img/static/gift.svg" class="nav-icon-desktop">
          <a class="nav-link-mobile" href="wish-list.html">Lista dei desideri</a>
        </li>
        <li class="d-flex align-items-center link-group_navMobile">
          <img src="../../img/static/dollar.svg" class="nav-icon-desktop">
          <a class="nav-link-mobile" href="purchase-list.html">Lista degli acquisti</a>
        </li>

        <br>
        <li class="d-flex align-items-center link-group_navMobile">
          <img src="../../img/static/profile.svg" class="nav-icon-desktop">
          <a class="nav-link-mobile" href="profile.html">Profilo personale</a>
        </li>
        <li class="d-flex align-items-center link-group_navMobile">
          <img src="../../img/static/profile.svg" class="nav-icon-desktop">
          <a class="nav-link-mobile" href="login.html">Accedi/Login</a>
        </li>
        <li class="d-flex align-items-center link-group_navMobile">
          <img src="../../img/static/profile.svg" class="nav-icon-desktop">
          <a class="nav-link-mobile" href="sign-up.html">Registrati</a>
        </li>
      </div>
    </div>
    <nav class="navbar navbar-light bg-light fixed-top d-none d-sm-block d-md-none">
      <div class="container-fluid d-flex justify-content-between align-items-center flex-nowrap">
        <div>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#hamburgerTablet" aria-controls="hamburgerTablet" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div class="d-flex align-items-center flex-shrink-0">
          <img src="../../img/static/light.svg" class="nav-icon-desktop">
          <!-- Dark/Light switch -->
          <label class="switch mb-0">
            <input type="checkbox">
            <span class="slider round"></span>
          </label>
          <img src="../../img/static/dark.svg" class="nav-icon-desktop">
        </div>
        <!-- Search section -->
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </nav>`
}

/**
 * Returns a formatted select options for a form
 * @param {string[]} values 
 * @returns formatted string with the options
 */
export function getFormSelectOptions(values){
  let options = "";
  for(let i=0; i<values.length;i++){
    options += `<option value="${i}">${values[i]}</option>`;
  }

  return options;
}

/**
 * Returns a formatted switch options for a form
 * and adding an optional class
 * @param {string[]} values 
 * @param {string} class
 * @returns formatted string with the switch options
 */
export function getSwitchOption(values, elementClass){
  let options = "";
  for(let i=0; i<values.length;i++){
    options += `<div class="form-check form-switch">
      <input class="form-check-input ${elementClass}" type="checkbox" role="switch">
      <label class="form-check-label" for="switchCheckDefault">${values[i]}</label>
    </div>`;
  }

  return options;
}

/**
 * Gets a formatted card for a brand
 * @param {Brand} brand 
 * @returns formatted html card for the brand
 */
export function getBrandCard(brand){
  return `<div class="card brand-card d-flex flex-column justify-content-center align-items-center" id="brandCardPreview" style="width: 18rem;">
    <img src=${brand.getLogoPath()} class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title" align="center">${brand.getName()}</h5>
      </div>
  </div>`;
}

/**
 * Gets a formatted card for a car given
 * @param {Car} car 
 * @returns formatted card for that car
 */
export function getCarCard(car){
  return ` <div class="d-flex overflow-visible">
          <div class="d-flex overflow-visible">
            <div class="card card-zoom me-3" style="width: 18rem;" data-car-id="${car.getID()}">
              <img src="${car.getMainImage()}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${car.getBrand().getName()} ${car.getModel()}</h5>
                <p class="card-text">
                  <ul class="card-ul">
                    <li><span class="card-descriptor">Motore: </span>${car.getEngine()}</li>
                    <li><span class="card-descriptor">Potenza: </span>${car.getMinPower()}KW</li>
                    <li><span class="card-descriptor">Posti: </span>${car.getSeats()}</li>
                    <li><span class="card-descriptor">Porte: </span>${car.getDoorsNumber()}</li>
                  </ul>
                </p>
                <p class="price">${car.getInitialValue()}€</p>
                <div class="d-flex align-items-center justify-content-end gap-1">
                  <button type="button" class="shopping-cart-button" id="123456-popover" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Macchina aggiunta al carrello!">
                    <img src="../../img/static/shopping-cart.svg" class="shopping-cart-icon">
                  </button>
                  <button type="button" class="shopping-cart-button" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Aggiunta alla lista dei desideri">
                    <img src="../../img/static/gift.svg" class="wish-list-icon">
                  </button>
                  <a href="../posts/${car.getHtmlNamePage()}" class="btn btn-secondary btn-card-details">Dettagli</a>
                </div>
              </div>
            </div>
          </div>
        </div>`;
}

/**
 * Function to get a carousel
 * for mobile devices
 * @param {string} content mobile carousel
 */
export function getCarouselMobile(content) {
  return `<div id="most-sold-carousel" class="carousel slide d-block d-md-none position-relative overflow-visible">
            <div class="carousel-inner">
              ${content}
            </div>
            <!-- Controls -->
            <button class="carousel-control-prev position-absolute start-0 w-auto" type="button" data-bs-target="#most-sold-carousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next position-absolute end-0 w-auto" type="button" data-bs-target="#most-sold-carousel" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>                          
          </div>`;
}

/**
* Function to get a carousel for tablet-size
* @param {string} content 
* @returns formatted string for tablet
*/
export function getCarouselTablet(content) {
  return `<div id="most-sold-carousel" class="carousel slide d-none d-md-block d-lg-none position-relative overflow-visible">
            <div class="carousel-inner">
              ${content}
            </div>
            <!-- Controls -->
            <button class="carousel-control-prev position-absolute start-0 w-auto" type="button" data-bs-target="#most-sold-carousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next position-absolute end-0 w-auto" type="button" data-bs-target="#most-sold-carousel" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>                          
          </div>`;
}

/**
* Function to get carousel for the desktop size
* @param content
* @return formatted string for carousel desktop size
*/
export function getCarouselDesktop(content) {
  return `<div id="most-sold-carousel" class="carousel slide d-none d-lg-block position-relative">
            <div class="carousel-inner">
              ${content}
            </div>
            <!-- Controls -->
            <button class="carousel-control-prev position-absolute start-0 w-auto" type="button" data-bs-target="#most-sold-carousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next position-absolute end-0 w-auto" type="button" data-bs-target="#most-sold-carousel" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>                          
          </div>`;
}

/**
* Gets a formatted carousel item
* @param {number} index 
* @param {string} content 
* @returns formatted string for the carousel item
*/
export function getCarouselItem(index, content) {
  let attribute = "";
  if (index === 0)
      attribute = "active";

  return `<div class="carousel-item ${attribute}">
              <div class="d-flex">
                  ${content}
              </div>
          </div>`;
}

/**
* Gets all the content of the carousel
* @param {any[]} items items to add 
* @param {number} numberMobile number of items to show on mobile per carousel item
* @param {number} numberTablet number of items to show on tablet per carousel item 
* @param {number} numberDesktop number of items to show on desktop per carousel item
* @returns completed carousel with all items divided
*/
export function getCarouselItems(items, numberMobile, numberTablet, numberDesktop) {
  /* declare and initialize all
  the variables to do the carousel */
  let divider;
  const numberItems = items.length;
  const dimDevice = window.innerWidth;

  /* decide which one is the divider */
  if (dimDevice < SizeDevice.getBootstrapBreakPointValue('md'))
      divider = numberMobile;
  else if (dimDevice < SizeDevice.getBootstrapBreakPointValue('lg'))
      divider = numberTablet;
  else
      divider = numberDesktop;

  let content = "";

  /* divide the items */
  for (let i = 0; i < numberItems; i += divider) {
      const portion = items.slice(i, Math.min(i + divider, numberItems));
      let subcontent = "";
      for (let j = 0; j < portion.length; j++) {
          subcontent += items[j];
      }
      content += getCarouselItem(i, subcontent);
  }

  /* check the size of the device
  and get the corresponding type of carousel */
  if (dimDevice < SizeDevice.getBootstrapBreakPointValue('md'))
      content = getCarouselMobile(content);
  else if (dimDevice < SizeDevice.getBootstrapBreakPointValue('lg'))
      content = getCarouselTablet(content);
  else
      content = getCarouselDesktop(content);

  return content;
}