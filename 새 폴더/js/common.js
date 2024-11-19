// Common JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Modal Management
    function createModal(content, options = {}) {
        const modal = document.createElement('div');
        modal.className = 'modal ' + (options.className || '');
        modal.innerHTML = `
            <div class="modal-content">
                ${options.showClose !== false ? '<button class="modal-close">&times;</button>' : ''}
                ${content}
            </div>
        `;

        // Close button functionality
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.remove();
                if (options.onClose) options.onClose();
            });
        }

        // Click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal && options.closeOnOutsideClick !== false) {
                modal.remove();
                if (options.onClose) options.onClose();
            }
        });

        document.body.appendChild(modal);
        return modal;
    }

    // Header Navigation
    function initializeNavigation() {
        // Category button handling
        const categoryButtons = document.querySelectorAll('.bubble[data-category]');
        categoryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const category = button.dataset.category;
                openCategoryModal(category);
            });
        });

        // User menu handling
        const cartButton = document.querySelector('.user-menu a[href*="cart"]');
        if (cartButton) {
            cartButton.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = '/pages/cart.html';
            });
        }
    }

    // Search Functionality
    function initializeSearch() {
        const searchInput = document.querySelector('.search-bar input');
        const searchDropdown = document.querySelector('.search-dropdown');
        const deleteButtons = document.querySelectorAll('.delete-search');

        // Recent searches management
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const searchItem = button.closest('li');
                searchItem.remove();
                // Here you would typically also update the localStorage or backend
            });
        });

        // Search input handling
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const searchTerm = searchInput.value.trim();
                    if (searchTerm) {
                        performSearch(searchTerm);
                    }
                }
            });
        }
    }

    // Category Modal
    function openCategoryModal(category) {
        fetch('/pages/category.html')
            .then(response => response.text())
            .then(html => {
                createModal(html, {
                    className: 'category-modal',
                    closeOnOutsideClick: true
                });
            })
            .catch(error => {
                console.error('Error loading category modal:', error);
            });
    }

    // Event Modal
    function openEventModal() {
        fetch('/pages/events.html')
            .then(response => response.text())
            .then(html => {
                createModal(html, {
                    className: 'events-modal',
                    closeOnOutsideClick: true
                });
            })
            .catch(error => {
                console.error('Error loading events modal:', error);
            });
    }

    // Search functionality
    function performSearch(term) {
        // Add to recent searches
        addToRecentSearches(term);
        
        // Redirect to search results
        window.location.href = `/search?q=${encodeURIComponent(term)}`;
    }

    function addToRecentSearches(term) {
        const recentSearches = getRecentSearches();
        // Add new search term and keep only last 5
        recentSearches.unshift(term);
        const uniqueSearches = [...new Set(recentSearches)].slice(0, 5);
        
        // Save to localStorage
        localStorage.setItem('recentSearches', JSON.stringify(uniqueSearches));
        
        // Update UI
        updateRecentSearchesUI(uniqueSearches);
    }

    function getRecentSearches() {
        try {
            return JSON.parse(localStorage.getItem('recentSearches')) || [];
        } catch {
            return [];
        }
    }

    function updateRecentSearchesUI(searches) {
        const recentSearchesList = document.querySelector('.recent-searches ul');
        if (recentSearchesList) {
            recentSearchesList.innerHTML = searches.map(term => `
                <li>
                    ${term}
                    <button class="delete-search"><i class="fas fa-times"></i></button>
                </li>
            `).join('');
        }
    }

    // Cart Management
    const cart = {
        items: [],

        addItem(product) {
            const existingItem = this.items.find(item => 
                item.id === product.id && item.option === product.option
            );

            if (existingItem) {
                existingItem.quantity += product.quantity;
            } else {
                this.items.push(product);
            }

            this.saveCart();
            this.updateCartUI();
        },

        removeItem(productId, option) {
            this.items = this.items.filter(item => 
                !(item.id === productId && item.option === option)
            );
            this.saveCart();
            this.updateCartUI();
        },

        updateQuantity(productId, option, quantity) {
            const item = this.items.find(item => 
                item.id === productId && item.option === option
            );
            if (item) {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartUI();
            }
        },

        getTotal() {
            return this.items.reduce((total, item) => 
                total + (item.price * item.quantity), 0
            );
        },

        saveCart() {
            localStorage.setItem('cart', JSON.stringify(this.items));
        },

        loadCart() {
            try {
                this.items = JSON.parse(localStorage.getItem('cart')) || [];
            } catch {
                this.items = [];
            }
            this.updateCartUI();
        },

        updateCartUI() {
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
                cartCount.textContent = totalItems;
                cartCount.style.display = totalItems > 0 ? 'block' : 'none';
            }
        }
    };

    // Wishlist Management
    const wishlist = {
        items: [],

        toggleItem(productId) {
            const index = this.items.indexOf(productId);
            if (index === -1) {
                this.items.push(productId);
            } else {
                this.items.splice(index, 1);
            }
            this.saveWishlist();
            this.updateWishlistUI();
        },

        isInWishlist(productId) {
            return this.items.includes(productId);
        },

        saveWishlist() {
            localStorage.setItem('wishlist', JSON.stringify(this.items));
        },

        loadWishlist() {
            try {
                this.items = JSON.parse(localStorage.getItem('wishlist')) || [];
            } catch {
                this.items = [];
            }
            this.updateWishlistUI();
        },

        updateWishlistUI() {
            const wishlistButtons = document.querySelectorAll('.like-button');
            wishlistButtons.forEach(button => {
                const productId = button.dataset.productId;
                if (productId) {
                    button.classList.toggle('active', this.isInWishlist(productId));
                }
            });
        }
    };

    // Initialize everything
    function initialize() {
        initializeNavigation();
        initializeSearch();
        cart.loadCart();
        wishlist.loadWishlist();
    }

    // Export for global use
    window.toyShop = {
        createModal,
        openCategoryModal,
        openEventModal,
        cart,
        wishlist
    };

    // Initialize
    initialize();
});