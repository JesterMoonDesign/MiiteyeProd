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

let section1 = document.querySelector('.index-section-1');
let section2 = document.querySelector('.index-section-2');
let section3 = document.querySelector('.index-section-3');
let scrollAnimate = document.getElementsByClassName('scrollAnimate');
let logo = document.querySelector('.logo');
const header = document.getElementById('indexHeader');
let y = 0;
let mobIndex = 1;
let moveIndex = 1;

if(isMobile.any()) {
    mobIndex = 1;
    moveIndex = 5;
} else {
    mobIndex = 20;
    moveIndex = 1;
};

function isGallery () {
    let key = localStorage.getItem('whereGo?');
    if (key == 'gallery') {
        section1.classList.remove("active");
        section2.classList.remove("active");
        section3.classList.add("active");
        header.classList.add("show");
        logo.classList.remove("section2");
        logo.classList.add("active");
        logo.classList.add("section3");
    }
    localStorage.clear();
}isGallery ();

function moveMainPage () {
    if (section1.classList.contains('active') && !section2.classList.contains('active') && !section3.classList.contains('active')) {
        section1.onpointerdown = function goToSection2 (event) {
            section1.setPointerCapture(event.pointerId);
            let x = event.screenX;

            section1.onpointermove = function (event) {
                event.preventDefault();
                y = event.screenX;
                function endTouch () {
                    

                    if (section1.classList.contains('active') && x-y>(5*mobIndex)) {
                        let index = 30;

                        let transitionToSection2 = setInterval(() => {
                            index+=moveIndex;
                            section1.style.transform = 'translateX(-' + index + '%)';
                            section1.style.webkitTransform = 'translateX(-' + index + '%)';
                            section1.style.mozTransform = 'translateX(-' + index + '%)';
                            section2.style.transform = 'translateX(0%)';
                            section2.style.webkitTransform = 'translateX(0%)';
                            section2.style.mozTransform = 'translateX(0%)';

                            if (index >= 100){
                                logo.classList.add("active");
                                clearInterval(transitionToSection2);
                                section1.classList.remove("active");
                                section2.style.display = "flex";
                                section2.scrollIntoView({block: "start", behavior: "instant"});

                                let logoAnimStep1 = setTimeout(() => {
                                    logo.classList.add("section2");
                                    section2.classList.add("active");
                                    section1.style.display = "none";
                                    section1.onpointermove = null;
                                    clearTimeout(logoAnimStep1);
                                }, 1500);
                            };
                        }, 4);
                    }
                }
                section1.onpointerup = endTouch;
                section1.onpointerend = endTouch;
                section1.onpointerleave = endTouch;
                section1.onpointercancel = endTouch;
            }
        }
        } else {
        if (section2.classList.contains('active') && !section1.classList.contains('active') && !section3.classList.contains('active')) {
            section2.onpointerdown = function goToSection3 (event) {
                event.preventDefault();
                section2.setPointerCapture(event.pointerId);
                let x = event.screenX;

                section2.onpointermove = function (event) {
                    event.preventDefault();
                    y = event.screenX;

                    function endTouch () {
                        

                        if (section2.classList.contains('active') && x-y<=-(5*mobIndex) && !(section1.classList.contains('active'))) {
                            let index = 30;

                            let transitionToSection1 = setInterval(() => {
                                index+=moveIndex;
                                section2.style.transform = 'translateX(' + index + '%)';
                                section2.style.webkitTransform = 'translateX(' + index + '%)';
                                section2.style.mozTransform = 'translateX(' + index + '%)';
                                let reverseIndex = index - (100 + moveIndex);
                                section1.style.transform = 'translateX(' + reverseIndex + '%)';
                                section1.style.webkitTransform = 'translateX(' + reverseIndex + '%)';
                                section1.style.mozTransform = 'translateX(' + reverseIndex + '%)';

                                if (reverseIndex == 0){
                                    section2.classList.remove("active");
                                    section3.classList.remove("active");
                                    header.classList.remove("show");
                                    section1.classList.add("active");
                                    section1.style.display = "flex";
                                    section1.scrollIntoView({block: "start", behavior: "instant"});
                                    logo.classList.remove("section2");
                                    logo.classList.remove("section3");
                                    logo.classList.remove("active");
                                    clearInterval(transitionToSection1);

                                    let logoAnimStep1 = setTimeout(() => {
                                        section2.style.display = "none";
                                        section3.style.display = "none";
                                        section2.onpointermove = null;
                                        clearTimeout(logoAnimStep1);
                                    }, 50);
                                };
                            }, 4);
                        } else {
                            if (section2.classList.contains('active')  && x-y>=(5*mobIndex) && !(section3.classList.contains('active'))) {
                                let index = 30;
                
                                let transitionToSection3 = setInterval(() => {
                                    index+=moveIndex;
                                    section2.style.transform = 'translateX(-' + index + '%)';
                                    section2.style.webkitTransform = 'translateX(-' + index + '%)';
                                    section2.style.mozTransform = 'translateX(-' + index + '%)';
                
                                    if (index >= 100){
                                        clearInterval(transitionToSection3);
                                        section2.classList.remove("active");
                                        logo.classList.remove("section2");
                                        logo.classList.add("section3");
                                        section3.classList.add("active");
                                        section3.style.display = "block";
                                        header.classList.add("show");
                                        section3.scrollIntoView({block: "start", behavior: "instant"});
                
                
                                        let logoAnimStep2 = setTimeout(() => {
                                            logo.classList.add("active");
                                            section2.style.display = "none";
                                            section2.onpointermove = null;
                                            clearTimeout(logoAnimStep2);
                                        }, 50);
                                    };
                                }, 4);
                            }
                        }
                    }
                    section2.onpointerup = endTouch;
                    section2.onpointerend = endTouch;
                    section2.onpointerleave = endTouch;
                    section2.onpointercancel = endTouch;
                }
            }
        } else {
            if (section3.classList.contains('active') && !section1.classList.contains('active') && !section2.classList.contains('active')) {
                function goToSection2Reverse (event) {
                    let x = event.screenX;

                    section3.onpointermove = function (event) {
                        event.preventDefault();
                        y = event.screenX;

                        function endTouch () {
                            
                            if (section3.classList.contains('active') && x-y<=-(5*mobIndex)) {
                                

                                let index = 30;

                                let transitionToSection2 = setInterval(() => {
                                    index+=moveIndex;
                                    section3.style.transform = 'translateX(' + index + '%)';
                                    section3.style.webkitTransform = 'translateX(' + index + '%)';
                                    section3.style.mozTransform = 'translateX(' + index + '%)';
                                    let reverseIndex = index - (100+moveIndex);
                                    section2.style.transform = 'translateX(' + reverseIndex + '%)';
                                    section2.style.webkitTransform = 'translateX(' + reverseIndex + '%)';
                                    section2.style.mozTransform = 'translateX(' + reverseIndex + '%)';


                                    if (index >= 105){
                                        clearInterval(transitionToSection2);
                                        section3.classList.remove("active");
                                        logo.classList.add("section2");
                                        section2.classList.add("active");
                                        section2.style.display = "flex";
                                        section2.scrollIntoView({block: "start", behavior: "instant"});


                                        let logoAnimReversStep1 = setTimeout(() => {
                                            section3.style.transform = 'translateX(0%)';
                                            section3.style.webkitTransform = 'translateX(0%)';
                                            section3.style.mozTransform = 'translateX(0%)';
                                            logo.classList.add("active");
                                            header.classList.remove("show");
                                            section3.style.display = "none";
                                            section3.onpointermove = null;
                                            clearTimeout(logoAnimReversStep1);
                                        }, 50);
                                    };
                                }, 4);
                            }
                        }
                        section3.onpointerup = endTouch;
                        section3.onpointerleave = endTouch;
                        section3.onpointerend = endTouch;
                        section3.onpointercancel = endTouch;
                    }
                }
                section3.onpointerdown = goToSection2Reverse;
            }
        }
    }
}

let checkCurrentSectionInterval = setInterval(() => {
    moveMainPage ();
}, 1000);


function headerInnerMenu () {
    const mobileBtn = document.getElementById('pcBtn');
    const innerMenu = document.getElementById('headerMenu');
    const arrow = document.getElementById('arrow');

    mobileBtn.addEventListener('click', (() => {
        innerMenu.classList.toggle('active');
        arrow.classList.toggle('active');
    }));
};

function mobileHeaderInnerMenu () {
    const mobileBtn = document.getElementById('mobileBtn');
    const innerMenu = document.getElementById('mobileHeaderMenu');

    mobileBtn.addEventListener('click', (() => {
        innerMenu.classList.toggle('active');
    }));
};

if (isMobile.any()) {
    mobileHeaderInnerMenu();
} else {
    headerInnerMenu();
};