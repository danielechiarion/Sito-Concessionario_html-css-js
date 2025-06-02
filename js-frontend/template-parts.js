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
export function getNavbarCostumer(){
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
    </nav>`;
}

/**
 * Returns a formatted navbar for the customer point of view,
 * adjusting the paths for use in pages located in a different directory.
 * @returns {string} Formatted HTML string for the customer navbar.
 */
export function getNavbarCostumerPosts() {
    return `<!-- NAVBAR FOR SMARTPHONE -->
    <div id="accordionMenus">
      <div class="collapse navbar-collapse collapse-mobile" id="menuHamburger" data-bs-theme="light" data-bs-parent="#accordionMenus">
        <div class="bg-light p-4">
          <li class="d-flex align-items-center link-group_navMobile">
            <img src="../../img/static/shopping-cart.svg" class="nav-icon-desktop">
            <a class="nav-link-mobile" href="../pages/shopping-cart.html">Vai al carrello</a>
          </li>
          <li class="d-flex align-items-center link-group_navMobile">
            <img src="../../img/static/gift.svg" class="nav-icon-desktop">
            <a class="nav-link-mobile" href="../pages/wish-list.html">Lista dei desideri</a>
          </li>
          <li class="d-flex align-items-center link-group_navMobile">
            <img src="../../img/static/dollar.svg" class="nav-icon-desktop">
            <a class="nav-link-mobile" href="../pages/purchase-list.html">Lista degli acquisti</a>
          </li>
        </div>
      </div>
      <div class="collapse navbar-collapse collapse-mobile" id="menuProfile" data-bs-theme="light" data-bs-parent="#accordionMenus">
        <div class="bg-light p-4">
          <h4><a class="nav-link-mobile link-group_navMobile" href="../pages/profile.html">Il tuo profilo</a></h4>
          <h4><a class="nav-link-mobile link-group_navMobile" href="../pages/login.html">Accedi / Logout</a></h4>
          <h4><a class="nav-link-mobile link-group_navMobile" href="../pages/sign-up.html">Registrati</a></h4>
        </div>
      </div>
    </div>
        <nav class="navbar navbar-light bg-light fixed-bottom d-block d-sm-none">
          <div class="container-fluid d-flex justify-content-between align-items-center">
            <!-- Home icon -->
            <a href="../pages/index.html" class="navbar-brand m-0 p-0">
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
            <a href="../pages/car-configurator.html" class="navbar-brand m-0 p-0">
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
                <a class="nav-link-desktop" href="../pages/index.html">Home</a>
              </li>
              <li class="nav-item d-flex align-items-center">
                <img src="../../img/static/shopping-cart.svg" class="nav-icon-desktop">
                <a class="nav-link-desktop" href="../pages/shopping-cart.html">Acquista</a>
              </li>
              <li class="nav-item d-flex align-items-center">
                <img src="../../img/static/car.svg" class="nav-icon-desktop car-icon_nav">
                <a class="nav-link-desktop" href="../pages/car-configurator.html">Configuratore</a>
              </li>
              <li class="nav-item dropdown d-flex align-items-center">
                <img src="../../img/static/index.svg" class="nav-icon-desktop index-icon_nav">
                <a class="nav-link dropdown-toggle nav-link-desktop" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Per te
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item nav-link-desktop-sub" href="../pages/wish-list.html">Lista dei desideri</a></li>
                  <li><a class="dropdown-item nav-link-desktop-sub" href="../pages/purchase-list.html">Storico acquisti</a></li>
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
                    <li><a class="dropdown-item nav-link-desktop-sub" href="../pages/profile.html">Vedi Profilo</a></li>
                    <li><a class="dropdown-item nav-link-desktop-sub" href="../pages/login.html">Accedi / Logout</a></li>
                    <li><a class="dropdown-item nav-link-desktop-sub" href="../pages/sign-up.html">Registrati</a></li>
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
          <a class="nav-link-mobile" href="../pages/index.html">Home</a>
        </li>
        <li class="d-flex align-items-center link-group_navMobile">
          <img src="../../img/static/car.svg" class="nav-icon-desktop car-icon_nav">
          <a class="nav-link-mobile" href="../pages/car-configurator.html">Configuratore</a>
        </li>
        <li class="d-flex align-items-center link-group_navMobile">
          <img src="../../img/static/shopping-cart.svg" class="nav-icon-desktop">
          <a class="nav-link-mobile" href="../pages/shopping-cart.html">Vai al carrello</a>
        </li>
        <li class="d-flex align-items-center link-group_navMobile">
          <img src="../../img/static/gift.svg" class="nav-icon-desktop">
          <a class="nav-link-mobile" href="../pages/wish-list.html">Lista dei desideri</a>
        </li>
        <li class="d-flex align-items-center link-group_navMobile">
          <img src="../../img/static/dollar.svg" class="nav-icon-desktop">
          <a class="nav-link-mobile" href="../pages/purchase-list.html">Lista degli acquisti</a>
        </li>

        <br>
        <li class="d-flex align-items-center link-group_navMobile">
          <img src="../../img/static/profile.svg" class="nav-icon-desktop">
          <a class="nav-link-mobile" href="../pages/profile.html">Profilo personale</a>
        </li>
        <li class="d-flex align-items-center link-group_navMobile">
          <img src="../../img/static/profile.svg" class="nav-icon-desktop">
          <a class="nav-link-mobile" href="../pages/login.html">Accedi/Login</a>
        </li>
        <li class="d-flex align-items-center link-group_navMobile">
          <img src="../../img/static/profile.svg" class="nav-icon-desktop">
          <a class="nav-link-mobile" href="../pages/sign-up.html">Registrati</a>
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
    </nav>`;
}

/**
 * Return a navbar for the admin point of view
 */
export function getNavbarAdminPosts(){
    return `<!-- NAVBAR FOR SMARTPHONE -->
    <div id="accordionMenus">
      <div class="collapse navbar-collapse collapse-mobile" id="menuHamburger" data-bs-theme="light" data-bs-parent="#accordionMenus">
        <div class="bg-light p-4">
          <li class="d-flex align-items-center link-group_navMobile">
            <img src="../../img/static/settings.svg" class="nav-icon-desktop">
            <a class="nav-link-mobile" href="../pages/admin_add-items.html">Aggiungi articoli</a>
          </li>
        </div>
      </div>
      <div class="collapse navbar-collapse collapse-mobile" id="menuProfile" data-bs-theme="light" data-bs-parent="#accordionMenus">
        <div class="bg-light p-4">
          <h4><a class="nav-link-mobile link-group_navMobile" href="../pages/profile.html">Il tuo profilo</a></h4>
          <h4><a class="nav-link-mobile link-group_navMobile" href="../pages/login.html">Accedi / Logout</a></h4>
          <h4><a class="nav-link-mobile link-group_navMobile" href="../pages/sign-up.html">Registrati</a></h4>
        </div>
      </div>
    </div>
        <nav class="navbar navbar-light bg-light fixed-bottom d-block d-sm-none">
          <div class="container-fluid d-flex justify-content-between align-items-center">
            <!-- Home icon -->
            <a href="../pages/index.html" class="navbar-brand m-0 p-0">
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
            <a href="../pages/car-configurator.html" class="navbar-brand m-0 p-0">
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
                <a class="nav-link-desktop" href="../pages/index.html">Home</a>
              </li>
              <li class="nav-item d-flex align-items-center">
                <img src="../../img/static/car.svg" class="nav-icon-desktop car-icon_nav">
                <a class="nav-link-desktop" href="../pages/car-configurator.html">Configuratore</a>
              </li>
              <li class="nav-item dropdown d-flex align-items-center">
                <img src="../../img/static/index.svg" class="nav-icon-desktop index-icon_nav">
                <a class="nav-link dropdown-toggle nav-link-desktop" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Per te
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item nav-link-desktop-sub" href="../pages/admin_add-items.html">Aggiungi articoli</a></li>
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
                    <li><a class="dropdown-item nav-link-desktop-sub" href="../pages/profile.html">Vedi Profilo</a></li>
                    <li><a class="dropdown-item nav-link-desktop-sub" href="../pages/login.html">Accedi / Logout</a></li>
                    <li><a class="dropdown-item nav-link-desktop-sub" href="../pages/sign-up.html">Registrati</a></li>
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
          <a class="nav-link-mobile" href="../pages/index.html">Home</a>
        </li>
        <li class="d-flex align-items-center link-group_navMobile">
          <img src="../../img/static/car.svg" class="nav-icon-desktop car-icon_nav">
          <a class="nav-link-mobile" href="../pages/car-configurator.html">Configuratore</a>
        </li>
        <li class="d-flex align-items-center link-group_navMobile">
          <img src="../../img/static/settings.svg" class="nav-icon-desktop">
          <a class="nav-link-mobile" href="../pages/admin_add-items.html">Aggiungi articoli</a>
        </li>

        <br>
        <li class="d-flex align-items-center link-group_navMobile">
          <img src="../../img/static/profile.svg" class="nav-icon-desktop">
          <a class="nav-link-mobile" href="../pages/profile.html">Profilo personale</a>
        </li>
        <li class="d-flex align-items-center link-group_navMobile">
          <img src="../../img/static/profile.svg" class="nav-icon-desktop">
          <a class="nav-link-mobile" href="../pages/login.html">Accedi/Login</a>
        </li>
        <li class="d-flex align-items-center link-group_navMobile">
          <img src="../../img/static/profile.svg" class="nav-icon-desktop">
          <a class="nav-link-mobile" href="../pages/sign-up.html">Registrati</a>
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
    </nav>`;
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
  return `<div class="card brand-card d-flex flex-column justify-content-center align-items-center" style="width: 18rem;">
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
  return `<div class="card car-card card-zoom me-3" style="width: 18rem;" data-car-id="${car.getID()}">
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
                  <button type="button" class="wish-list-button" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Aggiunta alla lista dei desideri">
                    <img src="../../img/static/gift.svg" class="wish-list-icon">
                  </button>
                  <a href="../posts/car-details_showroom.html" class="btn btn-secondary btn-card-details">Dettagli</a>
                </div>
              </div>
            </div>`;
}

/**
 * Returns a car for the wish-list
 * @param {Car} car 
 * @returns formatted string with the car
 */
export function getCarCardWish(car){
  return `<div class="card car-card card-zoom me-3" style="width: 18rem;" data-car-id="${car.getID()}">
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
                  <button type="button" class="remove-wish-button" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Aggiunta alla lista dei desideri">
                    <img src="../../img/static/bin.svg" class="wish-list-icon">
                  </button>
                  <a href="../posts/car-details_showroom" class="btn btn-secondary btn-card-details">Dettagli</a>
                </div>
              </div>
            </div>`;
}

/**
 * Return card used for shopping cart purchases
 * @param {Car} car 
 * @returns formatted string with the car for the shopping cart
 */
export function getCarCardShoppingCart(car){
  return `<div class="card car-card card-zoom me-3" style="width: 18rem;" data-car-id="${car.getID()}">
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
                  <button type="button" class="remove-shopping-cart-button" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Aggiunta alla lista dei desideri">
                    <img src="../../img/static/bin.svg" class="wish-list-icon">
                  </button>
                  <a href="../posts/car-details_showroom" class="btn btn-secondary btn-card-details">Dettagli</a>
                </div>
              </div>
            </div>`;
}

/**
 * Function to get a carousel
 * for mobile devices
 * @param {string} content mobile carousel
 * @param {string} id id of the carousel
 * @return formatted string with the carousel
 */
export function getCarouselMobile(content, id) {
  return `<div id="${id}" class="carousel slide d-block d-md-none position-relative overflow-visible">
            <div class="carousel-inner overflow-visible">
              ${content}
            </div>
            <!-- Controls -->
            <button class="carousel-control-prev position-absolute start-0 w-auto" type="button" data-bs-target="#${id}" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next position-absolute end-0 w-auto" type="button" data-bs-target="#${id}" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>                          
          </div>`;
}

/**
* Function to get a carousel for tablet-size
* @param {string} content 
* @param {string} id ID of the carousel
* @returns formatted string for tablet
*/
export function getCarouselTablet(content, id) {
  return `<div id="${id}" class="carousel slide d-none d-md-block d-lg-none position-relative overflow-visible">
            <div class="carousel-inner overflow-visible">
              ${content}
            </div>
            <!-- Controls -->
            <button class="carousel-control-prev position-absolute start-0 w-auto" type="button" data-bs-target="#${id}" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next position-absolute end-0 w-auto" type="button" data-bs-target="#${id}" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>                          
          </div>`;
}

/**
* Function to get carousel for the desktop size
* @param {string} content
* @param {string} id id of the carousel
* @return formatted string for carousel desktop size
*/
export function getCarouselDesktop(content, id) {
  return `<div id="${id}" class="carousel slide d-none d-lg-block position-relative overflow-visible">
            <div class="carousel-inner overflow-visible">
              ${content}
            </div>
            <!-- Controls -->
            <button class="carousel-control-prev position-absolute start-0 w-auto" type="button" data-bs-target="#${id}" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next position-absolute end-0 w-auto" type="button" data-bs-target="#${id}" data-bs-slide="next">
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
              <div class="d-flex justify-content-center align-items-center g-0">
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
* @param {string} id ID of the carousel
* @returns completed carousel with all items divided
*/
export function getCarouselItems(items, numberMobile, numberTablet, numberDesktop, id) {
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
          subcontent += portion[j];
      }
      content += getCarouselItem(i, subcontent);
  }

  /* check the size of the device
  and get the corresponding type of carousel */
  if (dimDevice < SizeDevice.getBootstrapBreakPointValue('md'))
      content = getCarouselMobile(content, id);
  else if (dimDevice < SizeDevice.getBootstrapBreakPointValue('lg'))
      content = getCarouselTablet(content, id);
  else
      content = getCarouselDesktop(content, id);

  return content;
}

/**
 * Function that returns the link to the other pages on home
 * for normal users and when no one has logged
 * @returns formatted string to home link pages
 */
export function getHomeLinkPagesNormal(){
  return `<div class="row">
          <!-- shopping cart link -->
          <div class="col-md-6">
            <div class="card">
              <h5 class="card-header card-sitelink-header">Carrello</h5>
              <div class="card-body">
                <div class="row">
                  <div class="col-4 d-flex justify-content-center align-items-center">
                    <img src="../../img/static/shopping-cart.svg" class="pagelink-card">
                  </div>
                  <div class="col-8">
                    <p class="card-text">Rivedi gli articoli che hai aggiunto e decidi quali scartare e quali acquistare...</p>
                    <a href="shopping-cart.html" class="btn btn-secondary">Visita</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- car configurator link -->
          <div class="col-md-6">
            <div class="card">
              <h5 class="card-header card-sitelink-header">Configuratore auto</h5>
              <div class="card-body">
                <div class="row">
                  <div class="col-4 d-flex justify-content-center align-items-center">
                    <img src="../../img/static/car.svg" class="pagelink-card">
                  </div>
                  <div class="col-8">
                    <p class="card-text">Ricerca l'auto più adatta ai tuoi gusti e alle tue esigenze...</p>
                    <a href="car-configurator.html" class="btn btn-secondary">Visita</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <!-- wish-list link -->
          <div class="col-md-6">
            <div class="card">
              <h5 class="card-header card-sitelink-header">Lista dei desideri</h5>
              <div class="card-body">
                <div class="row">
                  <div class="col-4 d-flex justify-content-center align-items-center">
                    <img src="../../img/static/gift.svg" class="pagelink-card">
                  </div>
                  <div class="col-8">
                    <p class="card-text">Scegli le auto da tenere d'occhio. Il tuo sogno potrebbe trasformarsi in realtà...</p>
                    <a href="wish-list.html" class="btn btn-secondary">Visita</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- purchase-list link -->
          <div class="col-md-6">
            <div class="card">
              <h5 class="card-header card-sitelink-header">Lista acquisti</h5>
              <div class="card-body">
                <div class="row">
                  <div class="col-4 d-flex justify-content-center align-items-center">
                    <img src="../../img/static/dollar.svg" class="pagelink-card">
                  </div>
                  <div class="col-8">
                    <p class="card-text">Controlla gli ultimi bolidi che hai acquistato!</p>
                    <a href="purchase-list.html" class="btn btn-secondary">Visita</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
}

/**
 * Get home links to other pages by
 * the admin point of view
 * @returns formatted strings with the links
 */
export function getHomeLinkPagesAdmin(){
  return  `<div class="row">
          <!-- shopping cart link -->
          <div class="col-12 d-flex justify-content-center">
            <div class="card card-sitelink">
              <h5 class="card-header card-sitelink-header">Aggiungi articoli</h5>
              <div class="card-body">
                <div class="row">
                  <div class="col-4 d-flex justify-content-center align-items-center">
                    <img src="../../img/static/settings.svg" class="pagelink-card">
                  </div>
                  <div class="col-8">
                    <p class="card-text">Aggiungi macchine, marchi e optional al concessionario...</p>
                    <a href="admin_add-items.html" class="btn btn-secondary">Visita</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
}

/**
 * Function that returns all the result using a grid
 * @param {any[]} elements elements to be printed
 * @param {number} sizeMobile size of an item for mobile devices
 * @param {number} sizeTablet size of an item for tablets
 * @param {number} sizeDesktop size of an item for a PC
 * @returns formatted string with the elements
 */
export function getResultGridView(elements, sizeMobile, sizeTablet, sizeDesktop){
  let output = "";
  for(const element of elements){
    output += `<div class="col-sm-${sizeMobile} col-md-${sizeTablet} col-lg-${sizeDesktop} mb-3">
      ${element}
    </div>`
  }

  return output;
}

/**
 * Returns a single circle color-picker
 * @param {string} color 
 * @returns formatted string for a single color-picker
 */
function getSingleColorPicker(color){
  return `<div class="color-option" style="background-color: ${color};" data-color="${color}"></div>`;
}

/**
 * Function to get the color picker with
 * custom colors
 * @param {string[]} colors color available
 * @param {number} id id of the color-picker
 * @returns 
 */
export function getColorPicker(colors, id){
  let content = "";
  
  for(let color of colors)
    content += getSingleColorPicker(color);

  return `<div class="color-picker" id="${id}">
            ${content}
          </div>`
}

/**
 * Returns the shopping cart table with
 * all the information about the car
 * @param {Car[]} shoppingCart 
 * @returns formatted string with the values of the car
 */
export function getTableShoppingCart(shoppingCart){
  let content = '';
  
  for(let i=0;i<shoppingCart.length;i++){
    content += `<tr>
      <th>${i+1}</th>
      <td>${shoppingCart[i].getBrand().getName()}</td>
      <td>${shoppingCart[i].getModel()}</td>
      <td>${shoppingCart[i].getEngine()}</td>
      <td>${shoppingCart[i].getSeats()} posti - ${shoppingCart[i].getDoorsNumber()} porte</td>
      <td>${getColorPicker(shoppingCart[i].getColorsAvailable(), "color-picker-"+(i+1))}</td>
      <td class="car-optionals">${getSwitchOption(shoppingCart[i].getOptionalList().map(optional => optional.getName() + " + " + optional.getPrice()+"€"))}</td>
      <td class="car-price">${shoppingCart[i].getPrice()}</td>
      <td><input type="number" class="input-car-quantity" name="quantity" min="1"></td>
    </tr>`
  }

  return `<div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <th>#</th>
                <td>Marca</td>
                <td>Modello</td>
                <td>Motore</td>
                <td>Capienza</td>
                <td>Colore</td>
                <td>Optional</td>
                <td>Prezzo</td>
                <td>Quantità</td>
              </thead>
              <tbody>
                ${content}
              </tbody>
            </table>
          </div>`;
}

/**
 * Returns a formatted table with the last purchases made 
 * by the user
 * @param {Purchase} purchases 
 * @returns formatted table with all the required data
 */
export function getTablePurchaseList(purchases){
  let content = "";

  for(const purchase of purchases){
    content += `<tr>
            <td><img src="${purchase.getCar().getMainImage()}" style="width: 100px;"></td>
            <td>${purchase.getCar().getBrand().getName()} ${purchase.getCar().getModel()}</td>
            <td>${purchase.getCar().getEngine()}</td>
            <td>${getSingleColorPicker(purchase.getCar().getColorsAvailable()[0])}</td>
            <td>${purchase.getCar().getSeats()} posti - ${purchase.getCar().getDoorsNumber()} porte</td>
            <td>€${purchase.getCar().getPrice()}</td>
            <td>${purchase.getCar().getQuantityAvailable()}</td>
            <td>${purchase.toStringDate()}</td>
            <td><a href="../post/${purchase.getCar().getHtmlNamePage()}" class="btn btn-sm btn-secondary">Dettagli auto</a></td>
          </tr>`
  }

  return `<div class="table-responsive">
        <table class="table table-hover align-middle">
          <thead class="table-light">
            <tr>
              <th scope="col">Immagine</th>
              <th scope="col">Modello</th>
              <th scope="col">Motore</th>
              <th scope="col">Colore</th>
              <th scope="col">Capienza</th>
              <th scope="col">Prezzo</th>
              <th scope="col">Quantità</th>
              <th scope="col">Data Acquisto</th>
              <th scope="col">Azioni</th>
            </tr>
          </thead>
          <tbody>
            ${content}
          </tbody>
        </table>
      </div>
    </div>`;
}

/**
 * Function that returns a mini carousel
 * to show in the car details page
 * @param {string} mainImage 
 * @param {string[]} detailsImages other optional images of the car
 * @returns formatted string with the mini carousel
 */
export function getMiniCarouselForCarDetails(mainImage, detailsImages){
  const arrayImages = [mainImage, ...detailsImages];
  let content = "";
  let attribute;

  for(let i=0;i<arrayImages.length;i++){
    if(i === 0)
        attribute = "active";
    else
        attribute = "";

    content += `<div class="carousel-item ${attribute}">
                  <img src="${arrayImages[i]}">
                </div>`;
  }  

  return `<div id="car-details-image" class="carousel slide mini-carousel-car-details">
            <div class="carousel-inner">
              ${content}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#car-details-image" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#car-details-image" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>              
          </div>`;
}

/**
 * Get the UL with the elements given
 * @param {string[]} elements 
 * @returns formatted string with the UL
 */
export function getUL(elements){
  let content = "";
  for(const element of elements){
    content += `<li class="list-group-item">${element}</li>`;
  }

  return `<ul>
    ${content}
  </ul>`;
}