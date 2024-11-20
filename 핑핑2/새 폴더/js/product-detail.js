document.addEventListener('DOMContentLoaded', function() {
    // Image Gallery
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Update main image
            mainImage.src = this.querySelector('img').src;
            // Update active state
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Option Selection
    const optionSelect = document.querySelector('.product-option');
    const selectedOptionsContainer = document.querySelector('.selected-options');
    const totalPriceElement = document.querySelector('.total-price .total');
    let selectedOptions = new Map();

    optionSelect.addEventListener('change', function() {
        if (this.value) {
            const option = this.options[this.selectedIndex];
            const optionText = option.text;
            const optionValue = option.value;
            
            if (!selectedOptions.has(optionValue)) {
                // Create option item
                const optionItem = createOptionItem(optionValue, optionText);
                selectedOptionsContainer.appendChild(optionItem);
                selectedOptions.set(optionValue, {
                    price: getOptionPrice(optionValue),
                    quantity: 1
                });
                updateTotalPrice();
            }
            
            this.value = ''; // Reset select
        }
    });

    // Like Button
    const likeButton = document.querySelector('.like-button');
    likeButton.addEventListener('click', function() {
        this.classList.toggle('active');
        const icon = this.querySelector('i');
        icon.classList.toggle('fas');
        icon.classList.toggle('far');
    });

    // Cart Button
    const cartButton = document.querySelector('.cart-button');
    cartButton.addEventListener('click', function() {
        if (selectedOptions.size === 0) {
            alert('상품 옵션을 선택해주세요.');
            return;
        }
        alert('장바구니에 추가되었습니다.');
    });

    // Buy Button
    const buyButton = document.querySelector('.buy-button');
    buyButton.addEventListener('click', function() {
        if (selectedOptions.size === 0) {
            alert('상품 옵션을 선택해주세요.');
            return;
        }
        // Redirect to checkout page
        window.location.href = '/checkout';
    });

    // Tab Navigation
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Review Image Modal
    const reviewImages = document.querySelectorAll('.review-images img');
    reviewImages.forEach(img => {
        img.addEventListener('click', function() {
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <img src="${this.src}" alt="Review Image">
                    <button class="close-modal">&times;</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Close modal
            modal.querySelector('.close-modal').addEventListener('click', () => {
                modal.remove();
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });

    // QnA Write Button
    const writeQnaButton = document.querySelector('.write-qna');
    writeQnaButton.addEventListener('click', function() {
        // Check if user is logged in
        const isLoggedIn = false; // This would come from your auth system
        
        if (!isLoggedIn) {
            if (confirm('로그인이 필요한 서비스입니다. 로그인하시겠습니까?')) {
                window.location.href = '/login';
            }
            return;
        }
        
        // Show QnA form modal
        // This would typically open a modal with a form
        alert('문의하기 폼이 열립니다.');
    });

    // Helper Functions
    function createOptionItem(value, text) {
        const div = document.createElement('div');
        div.className = 'option-item';
        div.innerHTML = `
            <span>${text}</span>
            <div class="quantity">
                <button class="decrease">-</button>
                <span>1</span>
                <button class="increase">+</button>
                <button class="remove">&times;</button>
            </div>
        `;

        // Quantity controls
        const quantitySpan = div.querySelector('.quantity span');
        div.querySelector('.decrease').addEventListener('click', () => {
            const current = selectedOptions.get(value);
            if (current.quantity > 1) {
                current.quantity--;
                quantitySpan.textContent = current.quantity;
                updateTotalPrice();
            }
        });

        div.querySelector('.increase').addEventListener('click', () => {
            const current = selectedOptions.get(value);
            current.quantity++;
            quantitySpan.textContent = current.quantity;
            updateTotalPrice();
        });

        div.querySelector('.remove').addEventListener('click', () => {
            selectedOptions.delete(value);
            div.remove();
            updateTotalPrice();
        });

        return div;
    }

    function getOptionPrice(optionValue) {
        const basePrice = 39200;
        const optionPrices = {
            'basic': 0,
            'deluxe': 10000,
            'premium': 20000
        };
        return basePrice + (optionPrices[optionValue] || 0);
    }

    function updateTotalPrice() {
        let total = 0;
        for (const [_, data] of selectedOptions) {
            total += data.price * data.quantity;
        }
        totalPriceElement.textContent = `${total.toLocaleString()}원`;
    }
});