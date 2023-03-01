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

let section1 = document.getElementsByClassName('index-section-1');
let section2 = document.getElementsByClassName('index-section-2');
let section3 = document.getElementsByClassName('index-section-3');
let scrollAnimate = document.getElementsByClassName('scrollAnimate');
let logo = document.getElementsByClassName('logo');
const header = document.getElementById('indexHeader');
let y = 0;
let mobIndex = 1;

if(isMobile.any()) {
    mobIndex = 1;
} else {
    mobIndex = 20;
};

function isGallery () {
    let key = localStorage.getItem('whereGo?');
    if (key == 'gallery') {
        section1[0].classList.remove("active");
        section2[0].classList.remove("active");
        section3[0].classList.add("active");
        logo[0].classList.remove("section2");
        logo[0].classList.add("active");
        logo[0].classList.add("section3");
    }
    localStorage.clear();
}isGallery ();

function goToSection2 (event) {
    event.preventDefault();

    let x = event.screenX;
    console.log('X_'+x)
    document.body.addEventListener('pointermove', listenScroll);
    event.preventDefault();

    function listenScroll (event) {
        event.preventDefault();

        document.body.addEventListener('pointerup', pointerUpFunction)
        y = event.screenX;
        function pointerUpFunction () {

            if (section1[0].classList.contains('active') && x-y>(5*mobIndex)) {
                let index = 30;

                let transitionToSection2 = setInterval(() => {
                    index++;
                    section1[0].style.transform = 'translateX(-' + index + '%)';
                    section2[0].style.transform = 'translateX(0%)';

                    if (index >= 101){
                        logo[0].classList.add("active");
                        clearInterval(transitionToSection2);
                        section1[0].classList.remove("active");

                        let logoAnimStep1 = setTimeout(() => {
                            logo[0].classList.add("section2");
                            section2[0].classList.add("active");
                            clearTimeout(logoAnimStep1);
                        }, 1500);
                    };
                }, 4);
            }
                document.body.removeEventListener('pointermove', listenScroll)
                document.body.removeEventListener('pointerdown', goToSection2)
                document.body.removeEventListener('pointerup', pointerUpFunction)
        }
    }
}

function goToSection3 (event) {
    event.preventDefault();
    document.body.addEventListener('pointermove', listenScroll);
    let x = event.screenX;

    function listenScroll (event) {
        event.preventDefault();

        document.body.addEventListener('pointerup', pointerUpFunction)
        y = event.screenX;

        function pointerUpFunction () {

            if (section2[0].classList.contains('active') && x-y<=-(5*mobIndex) && !(section1[0].classList.contains('active'))) {
                let index = 30;

                let transitionToSection1 = setInterval(() => {
                    index++;
                    section2[0].style.transform = 'translateX(' + index + '%)';
                    let reverseIndex = index - 100;
                    section1[0].style.transform = 'translateX(' + reverseIndex + '%)';

                    if (reverseIndex == 0){
                        section2[0].classList.remove("active");
                        section3[0].classList.remove("active");
                        section1[0].classList.add("active");
                        logo[0].classList.remove("section2");
                        logo[0].classList.remove("section3");
                        logo[0].classList.remove("active");
                        clearInterval(transitionToSection1);
                    };
                }, 4);
            } else {
                if (section2[0].classList.contains('active')  && x-y>=(5*mobIndex) && !(section3[0].classList.contains('active'))) {
                    let index = 30;
    
                    let transitionToSection3 = setInterval(() => {
                        index++;
                        section2[0].style.transform = 'translateX(-' + index + '%)';
    
                        if (index >= 101){
                            clearInterval(transitionToSection3);
                            section2[0].classList.remove("active");
                            logo[0].classList.remove("section2");
                            logo[0].classList.add("section3");
                            section3[0].classList.add("active");
    
    
                            let logoAnimStep2 = setTimeout(() => {
                                logo[0].classList.add("active");
                                clearTimeout(logoAnimStep2);
                            }, 50);
                        };
                    }, 4);
                }
            }
            document.body.removeEventListener('pointermove', listenScroll)
            document.body.removeEventListener('pointerdown', goToSection3)
            document.body.removeEventListener('pointerup', pointerUpFunction)
        }
    }
}

function goToSection2Reverse (event) {
    event.preventDefault();
    document.body.addEventListener('pointermove', listenScroll);
    let x = event.screenX;

    function listenScroll (event) {
        event.preventDefault();

        document.body.addEventListener('pointerup', pointerUpFunction)
        y = event.screenX;

        function pointerUpFunction () {
            document.body.removeEventListener('pointermove', listenScroll)

            if (section3[0].classList.contains('active') && x-y<=-(5*mobIndex)) {

                let index = 30;

                let transitionToSection2 = setInterval(() => {
                    index++;
                    section3[0].style.transform = 'translateX(' + index + '%)';
                    let reverseIndex = index - 100;
                    section2[0].style.transform = 'translateX(' + reverseIndex + '%)';


                    if (index >= 101){
                        clearInterval(transitionToSection2);
                        section3[0].classList.remove("active");
                        logo[0].classList.add("section2");
                        section2[0].classList.add("active");


                        let logoAnimReversStep1 = setTimeout(() => {
                            section3[0].style.transform = 'translateX(0%)';
                            logo[0].classList.add("active");
                            clearTimeout(logoAnimReversStep1);
                        }, 50);
                    };
                }, 4);
            }
            document.body.removeEventListener('pointerdown', goToSection2Reverse)
            document.body.removeEventListener('pointerup', pointerUpFunction)
        }
    }
}

function checkCurrentSection() {
    if (section1[0].classList.contains('active') && !section2[0].classList.contains('active') && !section3[0].classList.contains('active')) {
        document.body.addEventListener('pointerdown', goToSection2);
        header.classList.remove('show');
    } else {
        if (section2[0].classList.contains('active') && !section1[0].classList.contains('active') && !section3[0].classList.contains('active')) {
            document.body.addEventListener('pointerdown', goToSection3);
            header.classList.remove('show');
        } else {
            if (section3[0].classList.contains('active') && !section1[0].classList.contains('active') && !section2[0].classList.contains('active')) {
            document.body.addEventListener('pointerdown', goToSection2Reverse);
            header.classList.add('show');
            }
        }
    }
}

let checkCurrentSectionInterval = setInterval(() => {
    checkCurrentSection();
}, 1000);

function headeInnerMenu () {
    const menuArrow = document.getElementById('menuArrow');
    const arrow = document.getElementById('arrow');
    let innerMenu = document.getElementById('headerMenu');

    menuArrow.addEventListener('click', shwoInnerMenu)

    function shwoInnerMenu () {
        if (header.classList.contains('show')) {
            innerMenu.classList.toggle('active');
            arrow.classList.toggle('active');
        } else {
            innerMenu.classList.remove('active');
        }
    }
}headeInnerMenu();