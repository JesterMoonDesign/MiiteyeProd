
function galleryMenuInnerMenu () {
    const galleryMenuArrow = document.getElementById('galleryMenuArrow');
    const galleryInnerMenu = document.getElementsByClassName('galleryHeaderMenu');
    galleryMenuArrow.addEventListener('click', showMenu);
    function showMenu () {
        galleryInnerMenu[0].classList.toggle('active');
    }
}galleryMenuInnerMenu();