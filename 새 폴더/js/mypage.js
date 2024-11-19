document.addEventListener('DOMContentLoaded', function() {
    // Navigation handling
    const navLinks = document.querySelectorAll('.mypage-nav a');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');

            // Hide all sections
            contentSections.forEach(section => {
                section.style.display = 'none';
            });

            // Show selected section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
                loadSectionContent(targetId);
            }
        });
    });

    // Order detail button handling
    const orderDetailButtons = document.querySelectorAll('.order-detail');
    orderDetailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderNumber = this.closest('.order-header')
                .querySelector('.order-number')
                .textContent.split(': ')[1];
            
            showOrderDetail(orderNumber);
        });
    });

    // Section content loading
    function loadSectionContent(sectionId) {
        switch(sectionId) {
            case 'orders':
                // Already loaded in HTML
                break;
            case 'cart':
                loadCart();
                break;
            case 'wishlist':
                loadWishlist();
                break;
            case 'reviews':
                loadReviews();
                break;
            case 'profile':
                loadProfile();
                break;
            case 'address':
                loadAddresses();
                break;
            case 'points':
                loadPoints();
                break;
            case 'coupons':
                loadCoupons();
                break;
            case 'inquiries':
                loadInquiries();
                break;
            case 'notices':
                loadNotices();
                break;
            case 'faq':
                loadFAQ();
                break;
        }
    }

    // Section loading functions
    function loadCart() {
        const cartItems = window.toyShop.cart.items;
        const cartSection = createSection('cart', '장바구니');
        
        if (cartItems.length === 0) {
            cartSection.innerHTML += '<p>장바구니가 비어있습니다.</p>';
        } else {
            // Render cart items
            const cartHTML = cartItems.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-info">
                        <h3>${item.name}</h3>
                        <p class="price">${item.price.toLocaleString()}원</p>
                        <div class="quantity">
                            수량: ${item.quantity}
                        </div>
                    </div>
                </div>
            `).join('');
            
            cartSection.innerHTML += cartHTML;
        }
    }

    function loadWishlist() {
        const wishlistItems = window.toyShop.wishlist.items;
        const wishlistSection = createSection('wishlist', '찜한 상품');
        
        if (wishlistItems.length === 0) {
            wishlistSection.innerHTML += '<p>찜한 상품이 없습니다.</p>';
        } else {
            const wishlistHTML = `
                <div class="wishlist-grid">
                    ${wishlistItems.map(item => `
                        <div class="product-card">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="product-info">
                                <h3>${item.name}</h3>
                                <p class="price">${item.price.toLocaleString()}원</p>
                                <button class="add-to-cart">장바구니 담기</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            wishlistSection.innerHTML += wishlistHTML;
        }
    }

    function loadReviews() {
        const reviewsSection = createSection('reviews', '상품후기');
        reviewsSection.innerHTML += `
            <div class="review-list">
                <div class="review-item">
                    <div class="review-header">
                        <span class="stars">⭐⭐⭐⭐⭐</span>
                        <span class="date">2024.03.15</span>
                    </div>
                    <h3>레고 듀플로 동물원 세트</h3>
                    <p class="review-text">아이가 너무 좋아해요. 조립하면서 동물들을 알아가는 재미가 있네요.</p>
                    <div class="review-images">
                        <img src="../img/reviews/review1.jpg" alt="Review Image">
                    </div>
                </div>
            </div>
        `;
    }

    function loadProfile() {
        const profileSection = createSection('profile', '회원정보 수정');
        profileSection.innerHTML += `
            <form class="profile-form">
                <div class="form-group">
                    <label>이름</label>
                    <input type="text" value="김토이" readonly>
                </div>
                <div class="form-group">
                    <label>이메일</label>
                    <input type="email" value="toy@example.com">
                </div>
                <div class="form-group">
                    <label>휴대폰</label>
                    <input type="tel" value="010-1234-5678">
                </div>
                <div class="form-group">
                    <label>비밀번호 변경</label>
                    <input type="password" placeholder="새 비밀번호">
                </div>
                <div class="form-group">
                    <label>비밀번호 확인</label>
                    <input type="password" placeholder="새 비밀번호 확인">
                </div>
                <button type="submit" class="button button-primary">정보 수정</button>
            </form>
        `;
    }

    function loadAddresses() {
        const addressSection = createSection('address', '배송지 관리');
        addressSection.innerHTML += `
            <div class="address-list">
                <div class="address-item default">
                    <div class="address-header">
                        <span class="badge">기본배송지</span>
                        <div class="address-actions">
                            <button>수정</button>
                            <button>삭제</button>
                        </div>
                    </div>
                    <div class="address-content">
                        <p class="receiver">김토이</p>
                        <p class="address">서울시 강남구 테헤란로 123 456호</p>
                        <p class="phone">010-1234-5678</p>
                    </div>
                </div>
            </div>
            <button class="add-address">+ 새 배송지 추가</button>
        `;
    }

    function loadPoints() {
        const pointsSection = createSection('points', '포인트');
        pointsSection.innerHTML += `
            <div class="points-summary">
                <div class="available-points">
                    <h3>사용 가능한 포인트</h3>
                    <p class="point-amount">2,500P</p>
                </div>
            </div>
            <div class="points-history">
                <div class="points-history-item">
                    <div class="point-info">
                        <span class="point-date">2024.03.15</span>
                        <span class="point-description">상품 구매 적립</span>
                    </div>
                    <span class="point-amount">+500P</span>
                </div>
            </div>
        `;
    }

    function loadCoupons() {
        const couponsSection = createSection('coupons', '쿠폰');
        couponsSection.innerHTML += `
            <div class="coupon-list">
                <div class="coupon-item">
                    <div class="coupon-amount">5,000원</div>
                    <div class="coupon-info">
                        <h3>신규가입 할인쿠폰</h3>
                        <p class="validity">유효기간: 2024.04.15까지</p>
                    </div>
                </div>
            </div>
        `;
    }

    function loadInquiries() {
        const inquiriesSection = createSection('inquiries', '1:1 문의');
        inquiriesSection.innerHTML += `
            <div class="inquiry-list">
                <div class="inquiry-item">
                    <div class="inquiry-header">
                        <span class="inquiry-date">2024.03.15</span>
                        <span class="inquiry-status">답변완료</span>
                    </div>
                    <div class="inquiry-content">
                        <p class="inquiry-text">배송 관련 문의드립니다.</p>
                        <div class="inquiry-answer">
                            <p>안녕하세요. 고객님...</p>
                        </div>
                    </div>
                </div>
            </div>
            <button class="write-inquiry">문의하기</button>
        `;
    }

    function loadNotices() {
        const noticesSection = createSection('notices', '공지사항');
        noticesSection.innerHTML += `
            <div class="notice-list">
                <div class="notice-item">
                    <div class="notice-header">
                        <span class="notice-date">2024.03.15</span>
                        <h3>봄맞이 이벤트 안내</h3>
                    </div>
                    <div class="notice-content">
                        <p>3월 한달간 진행되는 봄맞이 이벤트를 안내드립니다.</p>
                    </div>
                </div>
            </div>
        `;
    }

    function loadFAQ() {
        const faqSection = createSection('faq', '자주 묻는 질문');
        faqSection.innerHTML += `
            <div class="faq-list">
                <div class="faq-item">
                    <div class="faq-question">
                        <span>Q. 배송은 얼마나 걸리나요?</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>일반적으로 결제 완료 후 1-3일 내에 배송이 완료됩니다.</p>
                    </div>
                </div>
            </div>
        `;

        // Add FAQ toggle functionality
        const faqItems = faqSection.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            item.querySelector('.faq-question').addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
    }

    // Helper function to create section
    function createSection(id, title) {
        const section = document.getElementById(id) || document.createElement('section');
        section.id = id;
        section.className = 'content-section';
        section.innerHTML = `<h2>${title}</h2>`;
        return section;
    }

    // Order detail modal
    function showOrderDetail(orderNumber) {
        const modalContent = `
            <div class="order-detail-content">
                <h2>주문 상세 내역</h2>
                <p class="order-number">주문번호: ${orderNumber}</p>
                <div class="order-info">
                    <!-- Order details would be populated here -->
                </div>
            </div>
        `;

        window.toyShop.createModal(modalContent, {
            className: 'order-detail-modal',
            closeOnOutsideClick: true
        });
    }

    // Initialize with orders section
    document.querySelector('.mypage-nav a[href="#orders"]').click();
});