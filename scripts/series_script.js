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
    }
}setTimeout(deleteAnim, 3000);

function slider () {
    let sliderWrappers = document.getElementsByClassName('sliderWrapper');
    const image = document.getElementsByClassName('sliderImageWrapper');
    let imageWidth = parseInt(getComputedStyle(image[0]).width);
    let xData = {};

    for(let i = 0; i < sliderWrappers.length; i++) {
        sliderWrappers[i].addEventListener('pointerdown', startSlide);
    
        function getX0 () {
            let matrex = window.getComputedStyle(sliders[i]).getPropertyValue("transform");
            let matrexArr = matrex.split(", ");
            xData.x0 = parseInt(matrexArr[4]);
        };

        function startSlide (event) {
            event.preventDefault();
            this.addEventListener('pointermove', moveSlide);
            this.addEventListener('pointerup', endSlide);
            this.addEventListener('pointercancel', endSlide);
            this.addEventListener('pointerleave', endSlide);
            let x1 = event.offsetX;//точка первого касания

            function moveSlide (event, x) {
                let x2 = event.layerX;
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

                if (xData.x0 < 0) {
                    if (xData.x < 0 && Math.abs(xData.x) >= (0.5*imageWidth)) {
                        if (Math.abs(xData.x) >= (2.5*imageWidth)) {
                            sliders[i].style.transform = "translateX(" + (-3*imageWidth-60) + 'px)';
                        };
                        if (Math.abs(xData.x) >= (1.5*imageWidth) && Math.abs(xData.x) < (2.5*imageWidth))  {
                            sliders[i].style.transform = "translateX(" + (-2*imageWidth-40) + 'px)';
                        };
                        if (Math.abs(xData.x) >= (0.5*imageWidth) && Math.abs(xData.x) < (1.5*imageWidth)) {
                            sliders[i].style.transform = "translateX(" + (-1*imageWidth-20) + 'px)';
                        };
                    } else {
                        if (xData.x > 0 && Math.abs(xData.x) >= (0.5*imageWidth) && xData.x0 < 0) {
                            if (Math.abs(xData.x) >= (2.5*imageWidth)) {
                                sliders[i].style.transform = "translateX(" + (3*imageWidth+60) + 'px)';
                            };
                            if (Math.abs(xData.x) >= (1.5*imageWidth) && Math.abs(xData.x) < (2.5*imageWidth)) {
                                sliders[i].style.transform = "translateX(" + (2*imageWidth+40) + 'px)';
                            };
                            if (Math.abs(xData.x) >= (0.5*imageWidth) && Math.abs(xData.x) < (1.5*imageWidth)) {
                                sliders[i].style.transform = "translateX(" + (1*imageWidth+20) + 'px)';
                            }
                        };
                    };
                } else if (xData.x0 > 0) {
                    sliders[i].style.transform = "translateX(" + 0 + 'px)';
                };
                getX0 ();
                if (Math.abs(xData.x) < (0.5*imageWidth) && xData.x > 0) {
                    sliders[i].style.transform = "translateX(" + 0 + 'px)';
                } else if (xData.x < 0 && Math.abs(xData.x) < (0.5*imageWidth) ) {
                    sliders[i].style.transform = "translateX(" + 0 + 'px)';
                };
            };
        }
    }
}slider();