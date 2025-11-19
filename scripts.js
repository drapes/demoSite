const { StatsigClient, runStatsigAutoCapture, runStatsigSessionReplay } = window.Statsig;
    
const statsig = new StatsigClient(
    'client-dthhbm2Vqw5knUhDGAL7KKdsNGQmFb66ozEGwRNIrmu', 
    { userID: 'a-user' }
);

runStatsigSessionReplay(statsig);
runStatsigAutoCapture(statsig);

 statsig.initializeAsync();


const categories = [
    {
        id: 'audio',
        name: 'Audio',
        icon: '🎧',
        description: 'Headphones, speakers, and audio equipment'
    },
    {
        id: 'computers',
        name: 'Computers',
        icon: '💻',
        description: 'Laptops, desktops, and accessories'
    },
    {
        id: 'mobile',
        name: 'Mobile Devices',
        icon: '📱',
        description: 'Smartphones, tablets, and wearables'
    },
    {
        id: 'gaming',
        name: 'Gaming',
        icon: '🎮',
        description: 'Gaming peripherals and accessories'
    },
    {
        id: 'accessories',
        name: 'Accessories',
        icon: '⌨️',
        description: 'Keyboards, mice, and other accessories'
    },
    {
        id: 'displays',
        name: 'Displays',
        icon: '🖥️',
        description: 'Monitors and display solutions'
    }
];

 products = [
    {
        id: 1,
        name: "Wireless Headphones Pro",
        description: "Premium noise-cancelling headphones with 30hr battery",
        price: 199.99,
        icon: "🎧",
        category: 'audio'
    },
    {
        id: 2,
        name: "Bluetooth Speaker",
        description: "Portable waterproof speaker with rich sound",
        price: 79.99,
        icon: "🔊",
        category: 'audio'
    },
    {
        id: 3,
        name: "Gaming Laptop",
        description: "Powerful 15.6\" gaming laptop with RTX graphics",
        price: 1499.99,
        icon: "💻",
        category: 'computers'
    },
    {
        id: 4,
        name: "Ultrabook",
        description: "Slim and lightweight laptop for professionals",
        price: 1299.99,
        icon: "💻",
        category: 'computers'
    },
    {
        id: 5,
        name: "Desktop PC",
        description: "High-performance desktop for work and play",
        price: 999.99,
        icon: "🖥️",
        category: 'computers'
    },
    {
        id: 6,
        name: "Smartphone Pro",
        description: "Latest flagship phone with 5G and amazing camera",
        price: 899.99,
        icon: "📱",
        category: 'mobile'
    },
    {
        id: 7,
        name: "Tablet",
        description: "10.5\" tablet perfect for work and entertainment",
        price: 499.99,
        icon: "📱",
        category: 'mobile'
    },
    {
        id: 8,
        name: "Smart Watch",
        description: "Fitness tracking and notifications on your wrist",
        price: 299.99,
        icon: "⌚",
        category: 'mobile'
    },
    {
        id: 9,
        name: "Gaming Mouse",
        description: "RGB gaming mouse with 16,000 DPI sensor",
        price: 69.99,
        icon: "🖱️",
        category: 'gaming'
    },
    {
        id: 10,
        name: "Gaming Keyboard",
        description: "Mechanical RGB keyboard for competitive gaming",
        price: 149.99,
        icon: "⌨️",
        category: 'gaming'
    },
    {
        id: 11,
        name: "Gaming Headset",
        description: "7.1 surround sound gaming headset with mic",
        price: 129.99,
        icon: "🎧",
        category: 'gaming'
    },
    {
        id: 12,
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with precision tracking",
        price: 49.99,
        icon: "🖱️",
        category: 'accessories'
    },
    {
        id: 13,
        name: "Mechanical Keyboard",
        description: "Professional mechanical keyboard for typing",
        price: 149.99,
        icon: "⌨️",
        category: 'accessories'
    },
    {
        id: 14,
        name: "Webcam HD",
        description: "1080p HD webcam with auto-focus",
        price: 79.99,
        icon: "📹",
        category: 'accessories'
    },
    {
        id: 15,
        name: "4K Monitor",
        description: "27\" 4K UHD monitor with HDR support",
        price: 449.99,
        icon: "🖥️",
        category: 'displays'
    },
    {
        id: 16,
        name: "Ultrawide Monitor",
        description: "34\" curved ultrawide for immersive experience",
        price: 599.99,
        icon: "🖥️",
        category: 'displays'
    },
    {
        id: 17,
        name: "Portable Monitor",
        description: "15.6\" portable monitor for on-the-go productivity",
        price: 199.99,
        icon: "📺",
        category: 'displays'
    }
];

function checkDiscount(){
    discount = statsig.getDynamicConfig("site_config").get('discount',null) 
    if (discount > 0){
        products.forEach((number, index) => { products[index].price = (products[index].price - (products[index].price / discount))})
    }
}

checkDiscount();

let cart = [];
let currentCategory = null;

function showPage(page) {
    document.getElementById('homePage').classList.add('hidden');
    document.getElementById('categoriesPage').classList.add('hidden');
    document.getElementById('categoryProductsPage').classList.add('hidden');

    if (page === 'home') {
        document.getElementById('homePage').classList.remove('hidden');
        renderHomeCategories();
    } else if (page === 'categories') {
        document.getElementById('categoriesPage').classList.remove('hidden');
        renderCategories();
    }
}

function onLogin(){
    user = {
        email: 'test@email.com',
        userID: statsig._user.userID,
    }
    statsig._updateUserSyncImpl(user)
    checkRecentlyPurchased()
}

function checkRecentlyPurchased(){
   if (statsig.checkGate('recently_purchased')){
    document.getElementsByClassName('hero-content')[0].innerHTML = `
        <h2>Suggested Products</h2>
        <div class="products-grid" id="productsGrid">
            <div class="product-card">
                <div class="product-image">🎧</div>
                <div class="product-info">
                <div class="product-name">Wireless Headphones Pro</div>
                <div class="product-description">Premium noise-cancelling headphones with 30hr battery</div>
                <div class="product-price">$199.99</div>
                <button class="add-to-cart-btn" onclick="addToCart(1)">Add to Cart</button>
            </div>
        </div>
          <div class="product-card">
            <div class="product-image">🔊</div>
            <div class="product-info">
              <div class="product-name">Bluetooth Speaker</div>
              <div class="product-description">Portable waterproof speaker with rich sound</div>
              <div class="product-price">$79.99</div>
              <button class="add-to-cart-btn" onclick="addToCart(2)">Add to Cart</button>
            </div>
          </div>
        </div>
    `
    }
}

function renderHomeCategories() {
    const grid = document.getElementById('homeCategoriesGrid');
    grid.innerHTML = categories.map(cat => `
        <div class="category-card" onclick="showCategoryProducts('${cat.id}')">
            <div class="category-image">${cat.icon}</div>
            <div class="category-info">
                <div class="category-name">${cat.name}</div>
                <div class="category-description">${cat.description}</div>
            </div>
        </div>
    `).join('');
}

function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    grid.innerHTML = categories.map(cat => `
        <div class="category-card" onclick="showCategoryProducts('${cat.id}')">
            <div class="category-image">${cat.icon}</div>
            <div class="category-info">
                <div class="category-name">${cat.name}</div>
                <div class="category-description">${cat.description}</div>
            </div>
        </div>
    `).join('');
}

function showCategoryProducts(categoryId) {
    currentCategory = categoryId;
    const category = categories.find(c => c.id === categoryId);
    
    document.getElementById('homePage').classList.add('hidden');
    document.getElementById('categoriesPage').classList.add('hidden');
    document.getElementById('categoryProductsPage').classList.remove('hidden');
    
    document.getElementById('categoryTitle').textContent = category.name;
    
    const categoryProducts = products.filter(p => p.category === categoryId);
    const grid = document.getElementById('productsGrid');
    
    grid.innerHTML = categoryProducts.map(product => `
        <div class="product-card">
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }


    // Log add to cart event
    statsig.logEvent('add_to_cart', product.name, {
        product_id: product.id,
        product_name: product.name,
        category: product.category,
        price: product.price,
        cart_size: cart.length
    });

    updateCartDisplay();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const totalAmount = document.getElementById('totalAmount');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Your cart is empty</p>
            </div>
        `;
        cartTotal.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.icon}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalAmount.textContent = `$${total.toFixed(2)}`;
        cartTotal.style.display = 'block';
    }
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('active');
}

function checkout() {
    if (cart.length === 0) return;
    alert(`Thank you for your purchase!\nTotal: $${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}`);
    cart = [];
    updateCartDisplay();
    toggleCart();
}
checkRecentlyPurchased()
showPage('home');