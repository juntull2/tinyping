document.addEventListener('DOMContentLoaded', function() {
    // 폼 요소 가져오기
    const form = document.querySelector('.signup-form');
    if (!form) return;

    // 입력 필드 요소들
    const emailInput = form.querySelector('input[name="email"]');
    const emailDomainSelect = form.querySelector('select[name="emailDomain"]');
    const emailDomainInput = form.querySelector('input[name="emailDomainInput"]');
    const passwordInput = form.querySelector('input[name="password"]');
    const passwordConfirmInput = form.querySelector('input[name="passwordConfirm"]');
    const nameInput = form.querySelector('input[name="name"]');
    const phone1 = document.getElementById('phone1');
    const phone2 = document.getElementById('phone2');
    const phone3 = document.getElementById('phone3');
    const birthYear = document.getElementById('birthYear');
    const birthMonth = document.getElementById('birthMonth');
    const birthDay = document.getElementById('birthDay');

    // 유효성 검사 함수들
    const validators = {
        validateEmail: (email, domain) => {
            if (!email || !domain) return false;
            const fullEmail = `${email}@${domain}`;
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            return emailRegex.test(fullEmail);
        },

        validatePassword: (password) => {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
            return passwordRegex.test(password);
        },

        validateName: (name) => {
            return name.length >= 2 && name.length <= 20;
        },

        validatePhone: (phone1, phone2, phone3) => {
            const phoneRegex = /^\d+$/;
            return phoneRegex.test(phone1) && phoneRegex.test(phone2) && phoneRegex.test(phone3) &&
                   phone1.length === 3 && phone2.length === 4 && phone3.length === 4;
        },

        validateBirthDate: (year, month, day) => {
            const currentYear = new Date().getFullYear();
            const yearNum = parseInt(year);
            const monthNum = parseInt(month);
            const dayNum = parseInt(day);

            if (yearNum < 1900 || yearNum > currentYear) return false;
            if (monthNum < 1 || monthNum > 12) return false;
            if (dayNum < 1 || dayNum > 31) return false;

            const lastDayOfMonth = new Date(yearNum, monthNum, 0).getDate();
            if (dayNum > lastDayOfMonth) return false;

            return true;
        }
    };

    // 이메일 도메인 선택 처리
    if (emailDomainSelect && emailDomainInput) {
        emailDomainInput.style.display = 'none';

        emailDomainSelect.addEventListener('change', () => {
            if (emailDomainSelect.value === 'direct') {
                emailDomainInput.style.display = 'block';
                emailDomainInput.value = '';
                emailDomainInput.focus();
            } else {
                emailDomainInput.style.display = 'none';
                emailDomainInput.value = emailDomainSelect.value;
            }
        });
    }

    // 휴대폰 번호 자동 포커스 이동
    const setupPhoneAutoFocus = () => {
        phone1.addEventListener('input', (e) => {
            if (phone1.value.length === 3) {
                phone2.focus();
            }
        });

        phone2.addEventListener('input', (e) => {
            if (phone2.value.length === 4) {
                phone3.focus();
            }
        });

        // 백스페이스로 지울 때 이전 입력으로 포커스 이동
        phone2.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && phone2.value.length === 0) {
                phone1.focus();
            }
        });

        phone3.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && phone3.value.length === 0) {
                phone2.focus();
            }
        });
    };

    // 생년월일 자동 포커스 이동
    const setupBirthDateAutoFocus = () => {
        birthYear.addEventListener('input', (e) => {
            if (birthYear.value.length === 4) {
                birthMonth.focus();
            }
        });

        birthMonth.addEventListener('input', (e) => {
            const value = parseInt(birthMonth.value);
            if (value > 12) {
                birthMonth.value = '12';
            }
            if (birthMonth.value.length === 2 || value > 1) {
                birthDay.focus();
            }
        });

        // 백스페이스로 지울 때 이전 입력으로 포커스 이동
        birthMonth.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && birthMonth.value.length === 0) {
                birthYear.focus();
            }
        });

        birthDay.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && birthDay.value.length === 0) {
                birthMonth.focus();
            }
        });

        // 날짜 입력 제한
        birthDay.addEventListener('input', (e) => {
            const value = parseInt(birthDay.value);
            if (value > 31) {
                birthDay.value = '31';
            }
        });
    };

    // 숫자만 입력 가능하도록 제한
    const onlyNumbers = (event) => {
        if (!/[0-9]/.test(event.key) && 
            event.key !== 'Backspace' && 
            event.key !== 'Tab' && 
            event.key !== 'ArrowLeft' && 
            event.key !== 'ArrowRight' && 
            event.key !== 'Delete') {
            event.preventDefault();
        }
    };

    // 숫자 입력 제한 적용
    [phone1, phone2, phone3, birthYear, birthMonth, birthDay].forEach(input => {
        input.addEventListener('keydown', onlyNumbers);
    });

    // 자동 포커스 기능 초기화
    setupPhoneAutoFocus();
    setupBirthDateAutoFocus();

    // 약관 동의 체크박스 처리
    const setupAgreements = () => {
        const agreeAll = document.querySelector('#agreeAll');
        const agreementCheckboxes = document.querySelectorAll('.agreement-items input[type="checkbox"]:not(#agreeAll)');

        // 전체 동의 체크박스 이벤트
        if (agreeAll) {
            agreeAll.addEventListener('change', (e) => {
                agreementCheckboxes.forEach(checkbox => {
                    checkbox.checked = e.target.checked;
                });
            });
        }

        // 개별 체크박스 이벤트
        agreementCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const allChecked = Array.from(agreementCheckboxes).every(cb => cb.checked);
                if (agreeAll) {
                    agreeAll.checked = allChecked;
                }
            });
        });
    };

    // 약관 동의 기능 초기화
    setupAgreements();

    // 모달 관련 기능
    const setupModals = () => {
        const modals = {
            terms: document.getElementById('termsModal'),
            privacy: document.getElementById('privacyModal'),
            marketing: document.getElementById('marketingModal')
        };

        // 보기 버튼들과 모달 매핑
        const viewButtons = document.querySelectorAll('.btn-view');
        viewButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                switch(index) {
                    case 0: // 이용약관
                        showModal(modals.terms);
                        break;
                    case 1: // 개인정보 처리방침
                        showModal(modals.privacy);
                        break;
                    case 2: // 마케팅 정보
                        showModal(modals.marketing);
                        break;
                }
            });
        });

        // 모달 닫기 버튼 이벤트
        document.querySelectorAll('.btn-close, .btn-confirm').forEach(button => {
            button.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) {
                    hideModal(modal);
                }
            });
        });

        // 모달 외부 클릭 시 닫기
        Object.values(modals).forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    hideModal(modal);
                }
            });
        });
    };

    // 모달 표시 함수
    const showModal = (modal) => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // 스크롤 방지
    };

    // 모달 숨기기 함수
    const hideModal = (modal) => {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // 스크롤 복원
    };

    // 모달 기능 초기화
    setupModals();

    // 폼 제출 처리
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let errorMessage = '';

        // 이메일 검사
        const emailDomain = emailDomainSelect.value === 'direct' ? 
            emailDomainInput.value : 
            emailDomainSelect.value;
            
        if (!emailInput.value || !emailDomain) {
            errorMessage = '이메일을 입력해주세요.';
        } else if (!validators.validateEmail(emailInput.value, emailDomain)) {
            errorMessage = '올바른 이메일 형식이 아닙니다.';
        }
        // 비밀번호 검사
        else if (!passwordInput.value) {
            errorMessage = '비밀번호를 입력해주세요.';
        } else if (!validators.validatePassword(passwordInput.value)) {
            errorMessage = '비밀번호는 8~16자의 영문, 숫자, 특수문자를 포함해야 합니다.';
        }
        // 비밀번호 확인 검사
        else if (!passwordConfirmInput.value) {
            errorMessage = '비밀번호 확인을 입력해주세요.';
        } else if (passwordInput.value !== passwordConfirmInput.value) {
            errorMessage = '비밀번호가 일치하지 않습니다.';
        }
        // 이름 검사
        else if (!nameInput.value) {
            errorMessage = '이름을 입력해주세요.';
        } else if (!validators.validateName(nameInput.value)) {
            errorMessage = '이름은 2~20자 사이여야 합니다.';
        }
        // 전화번호 검사
        else if (!phone1.value || !phone2.value || !phone3.value) {
            errorMessage = '전화번호를 입력해주세요.';
        } else if (!validators.validatePhone(phone1.value, phone2.value, phone3.value)) {
            errorMessage = '올바른 전화번호를 입력해주세요.';
        }
        // 생년월일 검사
        else if (!birthYear.value || !birthMonth.value || !birthDay.value) {
            errorMessage = '생년월일을 입력해주세요.';
        } else if (!validators.validateBirthDate(birthYear.value, birthMonth.value, birthDay.value)) {
            errorMessage = '올바른 생년월일을 입력해주세요.';
        }
        // 필수 약관 동의 검사
        else {
            const requiredAgreements = document.querySelectorAll('.agreement-items input[type="checkbox"][required]');
            const hasUncheckedAgreement = Array.from(requiredAgreements).some(checkbox => !checkbox.checked);
            
            if (hasUncheckedAgreement) {
                errorMessage = '필수 약관에 동의해주세요.';
            }
        }

        // 에러가 있으면 경고창 표시
        if (errorMessage) {
            alert(errorMessage);
            return;
        }

        // 모든 검사 통과 시 폼 제출
        form.submit();
    });
}); 