const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function headerInnerMenu () {
    const mobileBtn = document.getElementById('pcBtn');
    const innerMenu = document.getElementById('galleryHeaderMenuId');
    const arrow = document.getElementById('galleryMenuArrow');

    mobileBtn.addEventListener('click', (() => {
        innerMenu.classList.toggle('active');
    }));
};

function mobileHeaderInnerMenu () {
    const mobileBtn = document.getElementById('mobileBtn');
    const innerMenu = document.getElementById('mobileHeaderMenu');

    mobileBtn.addEventListener('click', (() => {
        innerMenu.classList.toggle('active');
    }));
};

if(isMobile.any()) {
    mobileHeaderInnerMenu();
} else {
    headerInnerMenu();
};

const sliders = document.getElementsByClassName('imagesRow');

function deleteAnim () {
    sliders[0].style.animation = "none";
    sliders[0].style.opacity = "1";
    sliders[0].style.transform = "translateX(0px)";
    console.log('loaded');
    sliders[0].style.animation = "scrollAnim 1s ease-in-out 1s";

    for (let i = 0; i < sliders.length; i++) {
        let slider = sliders[i];
        let timeout = setTimeout(() => {
            slider.style.animation = "none";
            slider.style.opacity = "1";
            slider.style.transform = "translateX(0px)";
            clearTimeout(timeout);
        }, 2000);
    }
}
window.onload = setTimeout(deleteAnim, 3000)


if(isMobile.any()) {
    mobileIndex = 1;
} else {
    mobileIndex = 3;
};

function slider () {
    let sliderWrappers = document.getElementsByClassName('sliderWrapper');
    const image = document.getElementsByClassName('sliderImageWrapper');
    let imageWidth = parseInt(getComputedStyle(image[0]).width);
    let xData = {};
    let y = mobileIndex;
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
            let x1 = event.offsetX;
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
                    if (y<=mobileIndex) {
                        y=mobileIndex;
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
                if (y<=mobileIndex) {
                    y=mobileIndex;
                };
                if (y>mobileIndex && y <= slidersLength) {
                    sliders[i].style.transform = "translateX(" + ((y-mobileIndex)*-imageWidth-(y-mobileIndex)*20) + "px)";
                } else if (y==mobileIndex) {
                    sliders[i].style.transform = "translateX(0px)";
                }
                getX0 ();
            };
        }
    }
};
setTimeout(() => {
    slider();
}, 3000);