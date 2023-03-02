function goToGallery () {
    localStorage.clear()
    const goToGallery = document.getElementById("btnToGallery");
    const goToGalleryMobile = document.getElementById("indexBtnToGallery");

    goToGallery.addEventListener('click', storageGallery);
    goToGalleryMobile.addEventListener('click', storageGallery);

    function storageGallery () {
        localStorage.setItem('whereGo?', 'gallery');
    }
}goToGallery();