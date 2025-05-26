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
            <img src="../../img/static/setting.svg" class="nav-icon-desktop">
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
