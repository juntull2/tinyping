document.addEventListener('DOMContentLoaded', function() {
    const filterBtn = document.querySelector('.filter-btn');
    const filterSidebar = document.querySelector('.filter-sidebar');
    const closeFilterBtn = document.querySelector('.close-filter');

    // 필터 버튼 클릭 이벤트
    filterBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        filterSidebar.classList.toggle('visible');
        
        // 클릭 위치 기준으로 사이드바 위치 조정
        const btnRect = filterBtn.getBoundingClientRect();
        const sidebarHeight = filterSidebar.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // 화면 하단에 공간이 부족할 경우 위로 표시
        if (btnRect.bottom + sidebarHeight > windowHeight) {
            filterSidebar.style.top = 'auto';
            filterSidebar.style.bottom = 'calc(100% + 10px)';
        } else {
            filterSidebar.style.top = 'calc(100% + 10px)';
            filterSidebar.style.bottom = 'auto';
        }
    });

    // 닫기 버튼 클릭 이벤트
    closeFilterBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        filterSidebar.classList.remove('visible');
    });

    // 외부 클릭 시 닫기
    document.addEventListener('click', function(e) {
        if (!filterSidebar.contains(e.target) && !filterBtn.contains(e.target)) {
            filterSidebar.classList.remove('visible');
        }
    });

    // 사이드바 내부 클릭 시 이벤트 전파 중지
    filterSidebar.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // ESC 키 누를 때 사이드바 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            filterSidebar.classList.remove('visible');
        }
    });
});