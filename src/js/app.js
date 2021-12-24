document.addEventListener('DOMContentLoaded', function () {
    // INPUTMASK
    Inputmask().mask(document.querySelectorAll('input'));

    // HEIGHT 100VH FIX FOR IOS
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // HEIGHT HEADER
    let header = document.querySelector('.header'); // header
    let headerh = header ? header.getBoundingClientRect().height : 0; // height header
    document.documentElement.style.setProperty('--headerh', `${headerh}px`);

    // HEIGHT FILTERS HEADER
    let filtersHeader = document.querySelector('.filters__wrap--active > .filters__header'); // filters header
    let filtersheaderh = filtersHeader ? filtersHeader.getBoundingClientRect().height : 0; // height filters header
    document.documentElement.style.setProperty('--filtersheaderh', `${filtersheaderh}px`);

    // RESIZE
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        let headerh = header ? header.getBoundingClientRect().height : 0; // height header
        let filtersHeader = document.querySelector('.filters__wrap--active > .filters__header'); // filters header
        let filtersheaderh = filtersHeader ? filtersHeader.getBoundingClientRect().height : 0; // height filters header
        
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.documentElement.style.setProperty('--headerh', `${headerh}px`);
        document.documentElement.style.setProperty('--filtersheaderh', `${filtersheaderh}px`);
    });
    
    // SMOOTH SCROLL
    function currentYPosition() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;

        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;

        return 0;
    } 
    
    function elmYPosition(eID) {
        let elm = document.getElementById(eID);
        let y = elm.offsetTop;
        let node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        } return y;
    }
    
    function smoothScroll(eID) {
        let startY = currentYPosition();
        let stopY = elmYPosition(eID);
        let distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        let speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        let step = Math.round(distance / 25);
        let leapY = stopY > startY ? startY + step : startY - step;
        let timer = 0;
        if (stopY > startY) {
            for (let i = startY; i < stopY; i += step ) {
                setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for (let i = startY; i > stopY; i -= step ) {
            setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
    }

    // ALL LINKS SMOOTH SCROLL
    const allLinks = document.querySelectorAll('a[href^="#"]')

    if (allLinks) {
        allLinks.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()
        
                setTimeout(() => {
                    if (item.getAttribute('href').length > 1) {
                        smoothScroll(item.getAttribute('href').slice(1))
                    }
                }, 500);
            })
        })
    }

    // SELECT
    const selects = document.querySelectorAll('.select')

    selects.forEach(item => {
        new SlimSelect({
            select: item
        })
    })

    // MENU
    const hamburger = document.querySelector('.hamburger')
    const menu = document.querySelector('.menu')
    const menuStart = document.querySelector('.menu__start')
    const menuResults = document.querySelector('.menu__results')
    const menuSearch = document.querySelector('.menu__search')
    const menuInput = document.querySelector('.menu__input')
    const menuClose = document.querySelector('.menu__close')

    if (hamburger) {
        hamburger.addEventListener('click', (event) => {
            event.preventDefault()

            menu.classList.add('menu--active')
            document.body.classList.add('scroll-disabled')
        })
    }

    if (menuClose) {
        menuClose.addEventListener('click', (event) => {
            event.preventDefault()

            if (menuInput.classList.contains('menu__input--active') && menuInput.value.length < 1) {
                menuInput.classList.remove('menu__input--active')
            }
            menu.classList.remove('menu--active')
            document.body.classList.remove('scroll-disabled')
        })
    }

    if (menuSearch) {
        menuSearch.addEventListener('click', (event) => {
            event.preventDefault()

            menuInput.classList.add('menu__input--active')
        })
    }

    if (menuInput) {
        menuInput.addEventListener('input', () => {
            if (menuInput.value.length > 0) {
                menuStart.classList.add('menu__start--hidden')
                menuResults.classList.add('menu__results--active')
            } else {
                menuStart.classList.remove('menu__start--hidden')
                menuResults.classList.remove('menu__results--active')
            }
        })
    }

    // LIKED
    const likeBtn = document.querySelectorAll('.c-liked')

    if (likeBtn) {
        likeBtn.forEach((item) => {
            item.addEventListener('click', () => {
                item.classList.add('c-liked--active')
            })
        })
    }
    
    // TABS
    const tabsItems = document.querySelectorAll('.tabs__item')

    if (tabsItems) {
        tabsItems.forEach((item, i) => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.tabs__item').forEach((child) => child.classList.remove('tabs__item--active'))
                document.querySelectorAll('.tabs__wrapper').forEach((child) => child.classList.remove('tabs__wrapper--active'))
    
                item.classList.add('tabs__item--active')
                document.querySelectorAll('.tabs__wrapper')[i].classList.add('tabs__wrapper--active')
            })
        })
    }

    // GALLERY MORE
    const galleryMoreBtn = document.querySelectorAll('.gallery__btn')

    if (galleryMoreBtn) {
        galleryMoreBtn.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                const currentWrapper = item.closest('.gallery__wrapper')

                if (currentWrapper.classList.contains('gallery__wrapper--hidden')) {
                    currentWrapper.classList.remove('gallery__wrapper--hidden')
                    currentWrapper.classList.add('gallery__wrapper--visible')
                } else {
                    currentWrapper.classList.add('gallery__wrapper--hidden')
                    currentWrapper.classList.remove('gallery__wrapper--visible')
                }
            })
        })
    }
    
    // FILTERS
    const filtersWrap = document.querySelectorAll('.filters__wrap')
    const filtersLink = document.querySelectorAll('.filters__link')
    const filtersBack = document.querySelectorAll('.filters__back')
    const filtersMore = document.querySelector('.filters__more')
    const filtersClose = document.querySelector('.filters__close')
    const filterListCheckbox = document.querySelector('.filter__checkbox-list')
    const filterMoreCheckbox = document.querySelector('.filter__checkbox-more')
    const countriesLink = document.querySelectorAll('.c-countries__filter-btn')

    if (filtersLink) {
        filtersLink.forEach((item, i) => {
            item.addEventListener('click', () => {
                const currentWrap = item.closest('.filters__wrap')

                currentWrap.classList.add('filters__wrap--hidden')
                currentWrap.classList.remove('filters__wrap--active')
                filtersWrap[1].classList.add('filters__wrap--active')
    
                setTimeout(() => {
                    filtersWrap.forEach(item => item.classList.remove('filters__wrap--hidden'))
                }, 400)

                if (window.innerWidth < 1024) {
                    header.classList.add('header--hidden')
                    item.closest('.filters__wrapper').querySelector('.filters__left').classList.add('filters__left--full')
                    item.closest('.filters__wrapper').querySelector('.filters__map').classList.add('filters__map--full')
                }
                    
                // FILTERS HEADER HEIGHT
                let filtersHeader = document.querySelector('.filters__wrap--active > .filters__header'); // filters header
                let filtersheaderh = filtersHeader ? filtersHeader.getBoundingClientRect().height : 0; // height filters header

                document.documentElement.style.setProperty('--filtersheaderh', `${filtersheaderh}px`);
            })
        })
    }

    if (filtersBack) {
        filtersBack.forEach((item, i) => {
            item.addEventListener('click', () => {
                const currentWrap = item.closest('.filters__wrap')

                item.setAttribute('disabled', 'disabled')
                currentWrap.classList.add('filters__wrap--hidden')
                currentWrap.classList.remove('filters__wrap--active')
                filtersWrap[0].classList.add('filters__wrap--active')
    
                if (window.innerWidth < 1024) {
                    const filtersBodyHidden = document.querySelector('.filters__body--hidden')
                    const filtersLeftFull = document.querySelector('.filters__left--full')
                    
                    header.classList.remove('header--hidden')
                    if (filtersLeftFull) { filtersLeftFull.classList.remove('filters__left--full') }
                    if (filtersBodyHidden) { filtersBodyHidden.classList.remove('filters__body--hidden') }
                    item.closest('.filters__wrapper').querySelector('.filters__map').classList.remove('filters__map--visible')
                    item.closest('.filters__wrapper').querySelector('.filters__map').classList.remove('filters__map--full')
                }

                setTimeout(() => {
                    filtersWrap.forEach(item => item.classList.remove('filters__wrap--hidden'))
                    
                    // FILTERS HEADER HEIGHT
                    let filtersHeader = document.querySelector('.filters__wrap--active > .filters__header'); // filters header
                    let filtersheaderh = filtersHeader ? filtersHeader.getBoundingClientRect().height : 0; // height filters header
    
                    document.documentElement.style.setProperty('--filtersheaderh', `${filtersheaderh}px`);
                }, 400)
                setTimeout(() => {
                    item.removeAttribute('disabled')
                }, 800)
            })
        })
    }

    if (filtersMore) {
        filtersMore.addEventListener('click', (event) => {
            event.preventDefault()

            const currentWrap = filtersMore.closest('.filters__wrap')

            filtersMore.setAttribute('disabled', 'disabled')
            filtersClose.setAttribute('disabled', 'disabled')
            currentWrap.classList.add('filters__wrap--hidden')
            currentWrap.classList.remove('filters__wrap--active')
            filtersWrap[2].classList.add('filters__wrap--active')

            setTimeout(() => {
                filtersWrap.forEach(item => item.classList.remove('filters__wrap--hidden'))

                // FILTERS HEADER HEIGHT
                let filtersHeader = document.querySelector('.filters__wrap--active > .filters__header'); // filters header
                let filtersheaderh = filtersHeader ? filtersHeader.getBoundingClientRect().height : 0; // height filters header
    
                document.documentElement.style.setProperty('--filtersheaderh', `${filtersheaderh}px`);
            }, 400)
            setTimeout(() => {
                filtersMore.removeAttribute('disabled')
                filtersClose.removeAttribute('disabled')
            }, 800)
        })
    }

    if (filtersClose) {
        filtersClose.addEventListener('click', (event) => {
            event.preventDefault()

            const currentWrap = filtersClose.closest('.filters__wrap')

            filtersClose.setAttribute('disabled', 'disabled')
            filtersMore.setAttribute('disabled', 'disabled')
            currentWrap.classList.add('filters__wrap--hidden')
            currentWrap.classList.remove('filters__wrap--active')
            filtersWrap[1].classList.add('filters__wrap--active')

            setTimeout(() => {
                filtersWrap.forEach(item => item.classList.remove('filters__wrap--hidden'))
            
                // FILTERS HEADER HEIGHT
                let filtersHeader = document.querySelector('.filters__wrap--active > .filters__header'); // filters header
                let filtersheaderh = filtersHeader ? filtersHeader.getBoundingClientRect().height : 0; // height filters header
    
                document.documentElement.style.setProperty('--filtersheaderh', `${filtersheaderh}px`);
            }, 400)
            setTimeout(() => {
                filtersClose.removeAttribute('disabled')
                filtersMore.removeAttribute('disabled')
            }, 800)
        })
    }

    if (filterMoreCheckbox) {
        filterMoreCheckbox.addEventListener('click', (event) => {
            event.preventDefault()

            if (!filterListCheckbox.classList.contains('filter__checkbox-list--hidden')) {
                filterListCheckbox.classList.add('filter__checkbox-list--hidden')
                filterMoreCheckbox.innerHTML = 'Показать ещё'
            } else {
                filterListCheckbox.classList.remove('filter__checkbox-list--hidden')
                filterMoreCheckbox.innerHTML = 'Скрыть'
            }
        })
    }

    if (countriesLink) {
        countriesLink.forEach(item => {
            item.addEventListener('click', (event) => {
                if (window.innerWidth < 1024) {
                    event.preventDefault()

                    item.closest('.filters__body').classList.add('filters__body--hidden')
                    item.closest('.filters__wrapper').querySelector('.filters__map').classList.add('filters__map--visible')
                }
            })
        })
    }

    // MAPS
    const mapsLists = document.querySelector('.maps__lists')
    const mapsMoreBtn = document.querySelector('.maps__more')
    const mapsInfo = document.querySelector('.maps__info')
    const mapsAllLink = document.querySelector('.maps__all')
    const mapsClose = document.querySelector('.maps__close')

    if (mapsMoreBtn) {
        mapsMoreBtn.addEventListener('click', (event) => {
            event.preventDefault()

            const mapsInfoHeight = mapsInfo.getBoundingClientRect().height

            mapsMoreBtn.classList.add('maps__more--hidden')
            mapsInfo.classList.add('maps__info--hidden')
            mapsAllLink.classList.add('maps__all--visible')
            mapsClose.classList.add('maps__close--visible')
            mapsLists.classList.add('maps__lists--full')
            mapsLists.style.top = '-' + (mapsInfoHeight) + 'px'

            //smoothScroll('maps')
        })
    }

    if (mapsClose) {
        mapsClose.addEventListener('click', (event) => {
            event.preventDefault()

            mapsMoreBtn.classList.remove('maps__more--hidden')
            mapsInfo.classList.remove('maps__info--hidden')
            mapsAllLink.classList.remove('maps__all--visible')
            mapsClose.classList.remove('maps__close--visible')
            mapsLists.classList.remove('maps__lists--full')
            mapsLists.style.top = 0
        })
    }

    // SWIPER
    const upcomingEventsSlider = document.querySelector('.upcoming-events__slider .swiper-container')
    const gallerySlider = document.querySelector('.gallery-slider__slider .swiper-container')
    const modalSlider = document.querySelectorAll('.modal__slider .swiper-container')
    const imageSlider = document.querySelector('.image-slider .swiper-container')
    const imageSliderDescriptions = document.querySelectorAll('.image-slider__description')

    if (upcomingEventsSlider) {
        const myUpcomingEventsSlider = new Swiper(upcomingEventsSlider, {
            slidesPerView: 'auto',
            speed: 1000,
            spaceBetween: 20,
        })
    }

    if (gallerySlider) {
        const myGallerySlider = new Swiper(gallerySlider, {
            slidesPerView: 1,
            //effect: 'fade',
            speed: 1000,
            navigation: {
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }

    if (modalSlider) {
        modalSlider.forEach(slider => {
            const myModalSlider = new Swiper(slider, {
                slidesPerView: 1,
                speed: 1000,
                navigation: {
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                },
            })
        })
    }

    if (imageSlider) {
        const myImageSlider = new Swiper(imageSlider, {
            slidesPerView: 'auto',
            loop: true,
            speed: 1000,
            spaceBetween: 20,
            navigation: {
                nextEl: imageSlider.closest('.image-slider').querySelector('.swiper-button-next'),
            },
        })

        myImageSlider.on('slideChange', function () {
            let currentSlideIndex = myImageSlider.realIndex
            let previousSlideIndex = myImageSlider.previousIndex - (myImageSlider.slides.length / 3)

            if (previousSlideIndex < 0) {
                previousSlideIndex = 0
            } else if (previousSlideIndex > imageSliderDescriptions.length - 1) {
                previousSlideIndex = imageSliderDescriptions.length - 1
            }

            imageSliderDescriptions[previousSlideIndex].classList.add('image-slider__description--hidden')
            imageSliderDescriptions[previousSlideIndex].classList.remove('image-slider__description--active')
            imageSliderDescriptions[currentSlideIndex].classList.add('image-slider__description--active')

            setTimeout(() => imageSliderDescriptions.forEach(item => item.classList.remove('image-slider__description--hidden')), 400)
        });
    }

    // MODAL
    const modalBtn = document.querySelectorAll('.modal-btn')
    const modal = document.querySelectorAll('.modal')
    const modalClose = document.querySelectorAll('.modal__close')
    const modalOverlay = document.querySelector('.modal-overlay')
    
    if (modalBtn) {
        modalBtn.forEach((item, i) => {
            item.addEventListener('click', (event) => {
                event.preventDefault();

                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                if (!modalOverlay.classList.contains('modal-overlay--active')) {
                    modalOverlay.classList.add('modal-overlay--active')
                }
                document.body.classList.add('scroll-disabled')

                const modalID = item.dataset.id
                document.getElementById(modalID).classList.add('modal--active')
            });
        });
    }

    document.body.addEventListener('keyup', (event) => {
        let key = event.keyCode;

        if (modal && modalOverlay.classList.contains('modal-overlay--active')) {
            if (key == 27) {
                document.body.classList.remove('scroll-disabled')
                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                modalOverlay.classList.remove('modal-overlay--active')
            };
        }
    }, false);


    if (modalOverlay) {
        modalOverlay.addEventListener('click', () => {
            if (modal && modalOverlay.classList.contains('modal-overlay--active')) {
                document.body.classList.remove('scroll-disabled')
                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                modalOverlay.classList.remove('modal-overlay--active')
            }
        });
    }

    if (modalClose) {
        modalClose.forEach((item) => {
            item.addEventListener('click', () => {
                document.body.classList.remove('scroll-disabled')
                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                modalOverlay.classList.remove('modal-overlay--active')
            });
        });
    }
});