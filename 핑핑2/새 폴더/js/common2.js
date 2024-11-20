document.addEventListener('DOMContentLoaded', function() {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide:not(.clone)');
    const prevBtn = document.querySelector('.slider-button.prev');
    const nextBtn = document.querySelector('.slider-button.next');
    const paginationDots = document.querySelectorAll('.pagination-dot');
    
    let currentIndex = 1;
    let isTransitioning = false;
    
    // 초기 위치 설정
    updatePosition(false);
    
    function updatePosition(withTransition = true) {
        if (withTransition) {
            sliderWrapper.style.transition = 'transform 0.5s ease-in-out';
        } else {
            sliderWrapper.style.transition = 'none';
        }
        sliderWrapper.style.transform = `translateX(-${currentIndex * 20}%)`;
        
        // 페이지네이션 업데이트
        const realIndex = (currentIndex - 1 + slides.length) % slides.length;
        paginationDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === realIndex);
        });
    }
    
    function moveToNextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        updatePosition();
    }
    
    function moveToPrevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex--;
        updatePosition();
    }
    
    sliderWrapper.addEventListener('transitionend', function() {
        isTransitioning = false;
        
        if (currentIndex >= slides.length + 1) {
            currentIndex = 1;
            updatePosition(false);
        }
        if (currentIndex === 0) {
            currentIndex = slides.length;
            updatePosition(false);
        }
    });
    
    // 이벤트 리스너
    prevBtn.addEventListener('click', moveToPrevSlide);
    nextBtn.addEventListener('click', moveToNextSlide);
    
    // 자동 슬라이드
    let autoSlideInterval = setInterval(moveToNextSlide, 5000);
    
    const sliderContainer = document.querySelector('.slider-container');
    
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(moveToNextSlide, 5000);
    });
    
    // 페이지네이션 클릭 이벤트
    paginationDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (isTransitioning) return;
            currentIndex = index + 1;
            updatePosition();
        });
    });
});