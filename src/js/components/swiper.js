const Swiper = function() {

    const swiper = document.querySelector('[data-js="swiper"]');
    const slides = swiper.querySelectorAll('[data-js="swiper-slide"]');
    const pagination = swiper.querySelector('[data-js="swiper-pagination"]');
    let dots=[];
    if(swiper) {
        createPagination();

        dots.forEach(dot => {
            dot.addEventListener('click', changeSlide);
        });
    }

    function createPagination() {
        if(slides.length) {
            for(let i = 0; i< slides.length; i++) {
                let dot = document.createElement('div');
                dot.classList.add('swiper__pagination__dot');
                if(i === 0) dot.classList.add('is--selected');
                dot.setAttribute('data-js', 'swiper-pagination-dot');
                dot.setAttribute('data-dot', i +1);
                pagination.appendChild(dot);
                dots.push(dot);
            }
        }
    }

    function changeSlide() {
        let number = this.getAttribute('data-dot');
        showSlide(number);
    }

    function showSlide(newNumber) {
        swiper.querySelector('.is--active').classList.remove('is--active');
        swiper.querySelector(`[data-slide="${newNumber}"]`).classList.add('is--active');
        selectDot(newNumber);
    }

    function selectDot(newNumber) {
        swiper.querySelector('.is--selected').classList.remove('is--selected');
        swiper.querySelector(`[data-dot="${newNumber}"]`).classList.add('is--selected');
    }
}

export default Swiper;
