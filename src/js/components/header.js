const Header = function() {

    const burger = document.querySelector('[data-js="burger"]');
    const nav = document.querySelector('[data-js="nav"]');
    const navLinks = document.querySelectorAll('[data-js="nav-link"]');


    const toggleMenu = function(e) {
        this.classList.toggle('is--active');
        nav.classList.toggle('is--active');
        document.body.classList.toggle("is--no-scrollable");
    }

    const activeLink = function() {
        if(window.innerWidth < 768) {
            document.body.classList.remove("is--no-scrollable");
            nav.classList.remove('is--active');
            burger.classList.remove('is--active');
        }
    }

    if(burger) {
        burger.addEventListener('click', toggleMenu);
    }

    if(navLinks) {
        if (window.NodeList && !NodeList.prototype.forEach) 
            NodeList.prototype.forEach = Array.prototype.forEach;
        navLinks.forEach(link => {
            link.addEventListener('click', activeLink);
        })
    }
}
export default Header;
