document.addEventListener('DOMContentLoaded', function() {
    // 폼 요소 가져오기
    const signupForm = document.querySelector('.signup-form');
    const emailInput = signupForm.querySelector('input[type="email"]');
    const passwordInput = signupForm.querySelector('input[type="password"]');
    const passwordConfirmInput = signupForm.querySelectorAll('input[type="password"]')[1];
    const phoneInput = signupForm.querySelector('input[type="tel"]');
    const agreementAll = document.getElementById('agreeAll');
    const agreementItems = document.querySelectorAll('.agreement-items input[type="checkbox"]');

    // 이메일 중복 확인
    const emailVerifyBtn = signupForm.querySelector('.input-with-button .btn-verify');
    emailVerifyBtn.addEventListener('click', async () => {
        const email = emailInput.value;
        if (!email) {
            alert('이메일을 입력해주세요.');
            return;
        }
        
        try {
            // API 호출 예시
            // const response = await fetch('/api/check-email', {
            //     method: 'POST',
            //     body: JSON.stringify({ email }),
            //     headers: { 'Content-Type': 'application/json' }
            // });
            // const data = await response.json();
            // if (data.isDuplicate) {
            //     alert('이미 사용 중인 이메일입니다.');
            // } else {
            //     alert('사용 가능한 이메일입니다.');
            // }
            alert('이메일 중복 확인 기능 구현 필요');
        } catch (error) {
            console.error('이메일 중복 확인 중 오류 발생:', error);
        }
    });

    // 비밀번호 유효성 검사
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        const isValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(password);
        
        const guide = passwordInput.nextElementSibling;
        if (!isValid) {
            guide.style.color = 'red';
        } else {
            guide.style.color = 'green';
        }
    });

    // 비밀번호 확인 일치 검사
    passwordConfirmInput.addEventListener('input', () => {
        if (passwordInput.value !== passwordConfirmInput.value) {
            passwordConfirmInput.setCustomValidity('비밀번호가 일치하지 않습니다.');
        } else {
            passwordConfirmInput.setCustomValidity('');
        }
    });

    // 휴대폰 번호 인증
    const phoneVerifyBtn = signupForm.querySelectorAll('.btn-verify')[1];
    phoneVerifyBtn.addEventListener('click', () => {
        const phone = phoneInput.value.replace(/[^0-9]/g, '');
        if (phone.length !== 11) {
            alert('올바른 휴대폰 번호를 입력해주세요.');
            return;
        }
        // TODO: 휴대폰 인증 로직 구현
        alert('휴대폰 인증 기능 구현 필요');
    });

    // 전체 동의 체크박스 이벤트
    if (agreementAll) {
        agreementAll.addEventListener('change', function() {
            const isChecked = this.checked;
            agreementItems.forEach(item => {
                item.checked = isChecked;
            });
        });

        // 개별 체크박스 변경 시 전체 동의 상태 업데이트
        agreementItems.forEach(item => {
            item.addEventListener('change', function() {
                const allChecked = Array.from(agreementItems).every(checkbox => checkbox.checked);
                agreementAll.checked = allChecked;
            });
        });
    }

    // 모달 관련 기능
    const modal = document.getElementById('termsModal');
    const btnViews = document.querySelectorAll('.btn-view');
    const btnClose = document.querySelector('.btn-close');
    const btnConfirm = document.querySelector('.btn-confirm');

    if (modal && btnViews.length > 0) {
        // 모달 열기
        btnViews.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.style.display = 'block';
            });
        });

        // 모달 닫기 함수
        const closeModal = () => {
            modal.style.display = 'none';
        };

        // 닫기 버튼 클릭
        if (btnClose) {
            btnClose.addEventListener('click', closeModal);
        }

        // 확인 버튼 클릭
        if (btnConfirm) {
            btnConfirm.addEventListener('click', closeModal);
        }

        // 모달 외부 클릭
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // 폼 제출 처리
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 필수 약관 동의 확인
        const requiredAgreements = Array.from(agreementItems)
            .filter(item => item.required)
            .every(item => item.checked);

        if (!requiredAgreements) {
            alert('필수 약관에 동의해주세요.');
            return;
        }

        // 폼 데이터 수집
        const formData = {
            email: emailInput.value,
            password: passwordInput.value,
            name: signupForm.querySelector('input[type="text"]').value,
            phone: phoneInput.value,
            birthDate: signupForm.querySelector('input[type="date"]').value,
            marketingAgreed: agreementItems[2].checked
        };

        try {
            // API 호출 예시
            // const response = await fetch('/api/signup', {
            //     method: 'POST',
            //     body: JSON.stringify(formData),
            //     headers: { 'Content-Type': 'application/json' }
            // });
            // const data = await response.json();
            // if (data.success) {
            //     window.location.href = '/login';
            // }
            console.log('회원가입 데이터:', formData);
            alert('회원가입 API 연동 필요');
        } catch (error) {
            console.error('회원가입 처리 중 오류 발생:', error);
        }
    });

    // 입력값 자동 포커스 이동 함수
    function setupNumberInput(input, nextInput, maxLength) {
        input.addEventListener('input', function() {
            // 숫자만 허용
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // 최대 길이에 도달하면 다음 입력칸으로 이동
            if (this.value.length === maxLength && nextInput) {
                setTimeout(() => nextInput.focus(), 0);
            }
        });

        // 백스페이스로 이전 입력칸으로 이동
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value.length === 0) {
                let prev = this.previousElementSibling;
                while (prev && prev.tagName !== 'INPUT') {
                    prev = prev.previousElementSibling;
                }
                if (prev) {
                    prev.focus();
                }
            }
        });
    }

    // 전화번호 입력 설정
    const phone1 = document.getElementById('phone1');
    const phone2 = document.getElementById('phone2');
    const phone3 = document.getElementById('phone3');

    setupNumberInput(phone1, phone2, 3);
    setupNumberInput(phone2, phone3, 4);
    setupNumberInput(phone3, null, 4);

    // 생년월일 입력 설정
    const birthYear = document.getElementById('birthYear');
    const birthMonth = document.getElementById('birthMonth');
    const birthDay = document.getElementById('birthDay');

    setupNumberInput(birthYear, birthMonth, 4);
    setupNumberInput(birthMonth, birthDay, 2);
    setupNumberInput(birthDay, null, 2);

    // 생년월일 추가 유효성 검사
    birthMonth.addEventListener('input', function() {
        if (parseInt(this.value) > 12) {
            this.value = '12';
        }
    });

    birthDay.addEventListener('input', function() {
        if (parseInt(this.value) > 31) {
            this.value = '31';
        }
    });

    // 이메일 도메인 직접입력 처리
    const emailDomainSelect = document.getElementById('email_domain');
    const domainInput = document.getElementById('domain_txt');

    emailDomainSelect.addEventListener('change', function() {
        if (this.value === 'direct') {
            // 직접입력 선택 시
            domainInput.style.display = 'block';
            domainInput.value = '';
            domainInput.focus();
        } else if (this.value === '') {
            // '선택' 선택 시
            domainInput.style.display = 'none';
            domainInput.value = '';
        } else {
            // 다른 도메인 선택 시
            domainInput.style.display = 'none';
            domainInput.value = this.value;
        }
    });

    // CSS 스타일 추가
    domainInput.style.marginLeft = '5px';

}); 