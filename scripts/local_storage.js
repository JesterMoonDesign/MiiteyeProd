function goToGallery () {
    localStorage.clear()
    const goToGallery = document.getElementById("btnToGallery");

    goToGallery.addEventListener('click', storageGallery);

    function storageGallery () {
        localStorage.setItem('whereGo?', 'gallery');
    }
}goToGallery();