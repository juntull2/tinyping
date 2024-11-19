document.addEventListener('DOMContentLoaded', function() {
    // Select All Functionality
    const selectAllCheckbox = document.getElementById('selectAll');
    const itemCheckboxes = document.querySelectorAll('.item-checkbox');

    selectAllCheckbox.addEventListener('change', function() {
        itemCheckboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
        updateTotalPrice();
    });

    // Individual Checkbox Change
    itemCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateSelectAllCheckbox();
            updateTotalPrice();
        });
    });

    // Quantity Controls
    const quantityControls = document.querySelectorAll('.quantity-control');
    quantityControls.forEach(control => {
        const decreaseBtn = control.querySelector('.decrease');
        const increaseBtn = control.querySelector('.increase');
        const input = control.querySelector('input');

        decreaseBtn.addEventListener('click', function() {
            if (input.value > 1) {
                input.value = parseInt(input.value) - 1;
                updateItemPrice(control.closest('.cart-item'));
            }
        });

        increaseBtn.addEventListener('click', function() {
            input.value = parseInt(input.value) + 1;
            updateItemPrice(control.closest('.cart-item'));
        });

        input.addEventListener('change', function() {
            if (this.value < 1) this.value = 1;
            updateItemPrice(control.closest('.cart-item'));
        });
    });

    // Remove Item
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('상품을 삭제하시겠습니까?')) {
                button.closest('.cart-item').remove();
                updateTotalPrice();
            }
        });
    });

    // Delete Selected Items
    const deleteSelectedBtn = document.querySelector('.delete-selected');
    deleteSelectedBtn.addEventListener('click', function() {
        const selectedItems = document.querySelectorAll('.item-checkbox:checked');
        if (selectedItems.length === 0) {
            alert('삭제할 상품을 선택해주세요.');
            return;
        }

        if (confirm('선택한 상품을 삭제하시겠습니까?')) {
            selectedItems.forEach(checkbox => {
                checkbox.closest('.cart-item').remove();
            });
            updateTotalPrice();
        }
    });

    // Checkout Button
    const checkoutButton = document.querySelector('.checkout-button');
    checkoutButton.addEventListener('click', function() {
        const selectedItems = document.querySelectorAll('.item-checkbox:checked');
        if (selectedItems.length === 0) {
            alert('구매할 상품을 선택해주세요.');
            return;
        }
        // Redirect to checkout page or open checkout modal
        window.location.href = '/checkout';
    });

    // Helper Functions
    function updateSelectAllCheckbox() {
        const allChecked = Array.from(itemCheckboxes).every(checkbox => checkbox.checked);
        selectAllCheckbox.checked = allChecked;
    }

    function updateItemPrice(cartItem) {
        const quantity = parseInt(cartItem.querySelector('input[type="number"]').value);
        const originalPrice = parseInt(cartItem.querySelector('.original-price').textContent.replace(/[^0-9]/g, ''));
        const discountRate = 0.2; // 20% discount
        
        const discountedPrice = Math.round(originalPrice * (1 - discountRate));
        const totalPrice = discountedPrice * quantity;
        
        cartItem.querySelector('.final-price').textContent = totalPrice.toLocaleString() + '원';
        updateTotalPrice();
    }

    function updateTotalPrice() {
        let subtotal = 0;
        let discount = 0;
        
        document.querySelectorAll('.cart-item').forEach(item => {
            if (item.querySelector('.item-checkbox').checked) {
                const originalPrice = parseInt(item.querySelector('.original-price').textContent.replace(/[^0-9]/g, ''));
                const finalPrice = parseInt(item.querySelector('.final-price').textContent.replace(/[^0-9]/g, ''));
                const quantity = parseInt(item.querySelector('input[type="number"]').value);
                
                subtotal += originalPrice * quantity;
                discount += (originalPrice - finalPrice) * quantity;
            }
        });

        document.querySelector('.summary-item:nth-child(1) span:last-child').textContent = subtotal.toLocaleString() + '원';
        document.querySelector('.summary-item:nth-child(2) span:last-child').textContent = '-' + discount.toLocaleString() + '원';
        document.querySelector('.summary-total span:last-child').textContent = (subtotal - discount).toLocaleString() + '원';
    }
});