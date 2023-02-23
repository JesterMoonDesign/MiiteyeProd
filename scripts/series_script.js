function galleryMenuInnerMenu () {
    const galleryMenuArrow = document.getElementById('galleryMenuArrow');
    const galleryInnerMenu = document.getElementsByClassName('galleryHeaderMenu');
    galleryMenuArrow.addEventListener('click', showMenu);
    function showMenu () {
        galleryInnerMenu[0].classList.toggle('active');
    }
}galleryMenuInnerMenu();

const sliders = document.getElementsByClassName('imagesRow');

function deleteAnim () {
    for (let i = 0; i < sliders.length; i++) {
        let slider = sliders[i];
        slider.style.animation = "none";
        slider.style.opacity = "1";
        slider.style.transform = "translateX(0px)";
    }
    clearTimeout(deleteAnim);
}setTimeout(deleteAnim, 2000);

function slider () {
    let sliderWrappers = document.getElementsByClassName('sliderWrapper');
    const image = document.getElementsByClassName('sliderImageWrapper');
    let imageWidth = parseInt(getComputedStyle(image[0]).width);
    let xData = {};
    let y = 3;
    for(let i = 0; i < sliderWrappers.length; i++) {
        sliderWrappers[i].addEventListener('pointerdown', startSlide);
    
        function getX0 () {
            let matrex = window.getComputedStyle(sliders[i]).getPropertyValue("transform");
            let matrexArr = matrex.split(", ");
            xData.x0 = parseInt(matrexArr[4]);
        }getX0();

        function startSlide (event) {
            const slidersLength = sliders[i].getElementsByClassName('sliderImageWrapper').length;
            let e1 = xData.x0;
            let e2 = 0;
            event.preventDefault();
            this.addEventListener('pointermove', moveSlide);
            this.addEventListener('pointerup', endSlide);
            this.addEventListener('pointercancel', endSlide);
            this.addEventListener('pointerleave', endSlide);
            let x1 = event.offsetX;//точка первого касания
            let x2 = 0;

            function moveSlide (event, x) {
                x2 = event.layerX;
                x = x2-x1;
                xData.x = x;
                sliders[i].style.transform = "translateX(" + x + 'px)';
            }

            function endSlide () {
                this.removeEventListener('pointermove', moveSlide);
                this.removeEventListener('pointerup', endSlide);
                this.removeEventListener('pointercancel', endSlide);
                this.removeEventListener('pointerleave', endSlide);
                getX0 ();
                e2 = xData.x0;

                if (e2 < e1 && e2-e1 < (-0.5*imageWidth) && y < slidersLength) {
                    if (y>=slidersLength) {
                        y=slidersLength;
                    } else if (y<slidersLength) {
                        y++;
                        if (e2-e1 < (-1.5*imageWidth)) {
                            y++;
                            if (e2-e1 < (-2.5*imageWidth)) {
                                y++;
                            }
                        }
                    };
                } else if (y>3 && e2 > e1 && e2-e1 > (0.5*imageWidth)) {
                    if (y<=3) {
                        y=3;
                    } else {
                        y--;
                        if (e2-e1 > (1.5*imageWidth)) {
                            y--;
                            if (e2-e1 > (2.5*imageWidth)) {
                                y--;
                            }
                        }
                    }
                };
                if (y>=slidersLength) {
                    y=slidersLength;
                }
                if (y<=3) {
                    y=3;
                };
                if (y>3 && y <= slidersLength) {
                    sliders[i].style.transform = "translateX(" + ((y-3)*-imageWidth-(y-3)*20) + "px)";
                } else if (y==3) {
                    sliders[i].style.transform = "translateX(0px)";
                }
                console.log(y,slidersLength);

                getX0 ();
            };
        }
    }
};
setTimeout(() => {
    slider();
}, 1500);