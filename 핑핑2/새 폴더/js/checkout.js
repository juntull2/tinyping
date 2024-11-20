document.addEventListener('DOMContentLoaded', function() {
    // Delivery request handling
    const deliverySelect = document.querySelector('.delivery-info select');
    const deliveryDirectInput = document.querySelector('.delivery-request-direct');

    deliverySelect.addEventListener('change', function() {
        if (this.value === 'direct') {
            deliveryDirectInput.style.display = 'block';
        } else {
            deliveryDirectInput.style.display = 'none';
        }
    });

    // Payment method handling
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const cardOptions = document.getElementById('cardOptions');

    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.id === 'card') {
                cardOptions.style.display = 'flex';
            } else {
                cardOptions.style.display = 'none';
            }
        });
    });

    // Points handling
    const pointInput = document.querySelector('.point-input input');
    const useAllPointsBtn = document.querySelector('.use-all-points');
    const availablePoints = 2000; // This would typically come from the server

    useAllPointsBtn.addEventListener('click', function() {
        pointInput.value = availablePoints;
        updateTotalPrice();
    });

    pointInput.addEventListener('input', function() {
        if (parseInt(this.value) > availablePoints) {
            this.value = availablePoints;
        }
        if (parseInt(this.value) < 0) {
            this.value = 0;
        }
        updateTotalPrice();
    });

    // Coupon handling
    const couponSelect = document.querySelector('.coupon-select select');
    const applyCouponBtn = document.querySelector('.apply-coupon');

    applyCouponBtn.addEventListener('click', function() {
        if (couponSelect.value !== '사용 가능한 쿠폰 선택') {
            updateTotalPrice();
            alert('쿠폰이 적용되었습니다.');
        } else {
            alert('적용할 쿠폰을 선택해주세요.');
        }
    });

    // Agreement handling
    const agreeAllCheckbox = document.getElementById('agreeAll');
    const agreeItems = document.querySelectorAll('.agree-item');

    agreeAllCheckbox.addEventListener('change', function() {
        agreeItems.forEach(item => {
            item.checked = this.checked;
        });
    });

    agreeItems.forEach(item => {
        item.addEventListener('change', function() {
            const allChecked = Array.from(agreeItems).every(item => item.checked);
            agreeAllCheckbox.checked = allChecked;
        });
    });

    // Proceed payment button
    const proceedPaymentBtn = document.querySelector('.proceed-payment');
    
    proceedPaymentBtn.addEventListener('click', function() {
        // Validation
        const requiredFields = document.querySelectorAll('input[type="text"]:not([readonly]), input[type="tel"]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ff6b6b';
            } else {
                field.style.borderColor = '#ddd';
            }
        });

        if (!isValid) {
            alert('필수 정보를 모두 입력해주세요.');
            return;
        }

        const isAgreed = Array.from(agreeItems).every(item => item.checked);
        if (!isAgreed) {
            alert('필수 약관에 동의해주세요.');
            return;
        }

        // Proceed with payment
        alert('결제를 진행합니다.');
        // Here you would typically submit the form or make an API call
    });

    // Helper function to update total price
    function updateTotalPrice() {
        const originalPrice = 49000;
        const productDiscount = 9800;
        let couponDiscount = 0;
        let pointsUsed = parseInt(pointInput.value) || 0;

        // Apply coupon discount
        if (couponSelect.value === '신규가입 5,000원 할인') {
            couponDiscount = 5000;
        } else if (couponSelect.value === '봄맞이 10% 할인') {
            couponDiscount = Math.floor((originalPrice - productDiscount) * 0.1);
        }

        // Calculate total
        const total = originalPrice - productDiscount - couponDiscount - pointsUsed;

        // Update summary display
        document.querySelector('.summary-item:nth-child(4) span:last-child').textContent = 
            `-${couponDiscount.toLocaleString()}원`;
        document.querySelector('.summary-item:nth-child(5) span:last-child').textContent = 
            `-${pointsUsed.toLocaleString()}원`;
        document.querySelector('.total-payment span:last-child').textContent = 
            `${total.toLocaleString()}원`;
        proceedPaymentBtn.textContent = `${total.toLocaleString()}원 결제하기`;
    }

    // Address finder (mock functionality)
    const findAddressBtn = document.querySelector('.find-address');
    findAddressBtn.addEventListener('click', function() {
        alert('주소 찾기 기능은 실제 서비스에서 다음 주소 API 등을 연동하여 구현됩니다.');
    });
});