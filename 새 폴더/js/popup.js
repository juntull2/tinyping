class Popup {
    constructor() {
        this.popup = document.getElementById('mainPopup');
        this.closeBtn = this.popup.querySelector('.popup-close');
        this.todayCheck = document.getElementById('todayCloseCheck');
        
        this.init();
    }
    
    init() {
        // 쿠키 체크
        if (this.getCookie('mainPopupHide')) {
            this.popup.style.display = 'none';
        }
        
        // 이벤트 리스너 등록
        this.closeBtn.addEventListener('click', () => this.closePopup());
        
        // ESC 키로 팝업 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closePopup();
        });
        
        // 팝업 외부 클릭시 닫기
        this.popup.addEventListener('click', (e) => {
            if (e.target === this.popup) this.closePopup();
        });
    }
    
    closePopup() {
        // 오늘 하루 보지 않기 체크 확인
        if (this.todayCheck.checked) {
            this.setCookie('mainPopupHide', 'true', 1);
        }
        
        // 팝업 닫기 애니메이션
        this.popup.style.opacity = '0';
        setTimeout(() => {
            this.popup.style.display = 'none';
            this.popup.style.opacity = '1';
        }, 300);
    }
    
    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/`;
    }
    
    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
}

// 페이지 로드 시 팝업 초기화
document.addEventListener('DOMContentLoaded', () => new Popup()); 