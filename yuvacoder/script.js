// Global Variables
let currentPage = 'welcomePage';
let currentLanguage = 'en';
let isLoading = false;
let products = [
    { id: 1, name: "Organic Wheat", price: 35, quantity: 150, emoji: "🌾", status: "available" },
    { id: 2, name: "Fresh Rice", price: 45, quantity: 200, emoji: "🍚", status: "available" },
    { id: 3, name: "Yellow Maize", price: 25, quantity: 0, emoji: "🌽", status: "sold" }
];

let consumerProducts = [
    { id: 1, name: "Organic Tomatoes", price: 25, farmer: "Ramesh Patil", location: "Nashik, MH", emoji: "🍅", rating: 4.8, available: 150, organic: true },
    { id: 2, name: "Fresh Cucumbers", price: 18, farmer: "Suresh Kumar", location: "Pune, MH", emoji: "🥒", rating: 4.6, available: 200, organic: false },
    { id: 3, name: "Alphonso Mangoes", price: 350, farmer: "Mahesh Jadhav", location: "Ratnagiri, MH", emoji: "🥭", rating: 4.9, available: 50, organic: true }
];

let activities = [
    { icon: '✅', iconClass: 'success', text: 'Rahul from Nashik sold 100kg tomatoes to Mumbai consumers', time: '2 hours ago' },
    { icon: '💰', iconClass: 'info', text: '₹50,000 loan funded for wheat seeds in Punjab', time: '4 hours ago' },
    { icon: '🌾', iconClass: 'warning', text: 'New organic vegetables listing from Kerala farmers', time: '6 hours ago' },
    { icon: '🎉', iconClass: 'success', text: '1000th successful transaction completed on FarmLink!', time: '1 day ago' }
];

// Language translations
const translations = {
    en: {
        title: "Welcome Back",
        subtitle: "Login to your decentralized farm account",
        emailLabel: "Email Address",
        passwordLabel: "Password",
        rememberMe: "Remember me for 30 days",
        loginButton: "Login",
        signInButton: "Sign up",
        forgotPassword: "Forgot your password?",
        connectWallet: "Connect with Petra Wallet",
        signUp: "New to FarmLink?",
        createAccount: "Create an account",
        loggingIn: "Logging in...",
        successfullyLoggedIn: "🎉 Successfully logged in!",
        invalidCredentials: "Invalid email or password.",
        walletConnected: "🎉 Successfully connected to Petra Wallet!",
        walletError: "Failed to connect to Petra Wallet.",
        emailValidation: "Please enter a valid email address",
        passwordValidation: "Password must be at least 6 characters"
    },
    hi: {
        title: "आपका स्वागत है",
        subtitle: "अपने विकेंद्रीकृत कृषि खाते में लॉगिन करें",
        emailLabel: "ईमेल पता",
        passwordLabel: "पासवर्ड",
        rememberMe: "मुझे 30 दिनों के लिए याद रखें",
        loginButton: "लॉगिन करें",
        signInButton: "साइन इन करें",
        forgotPassword: "अपना पासवर्ड भूल गए?",
        connectWallet: "Petra वॉलेट से कनेक्ट करें",
        signUp: "FarmLink में नए हैं?",
        createAccount: "खाता बनाएं",
        loggingIn: "लॉगिन हो रहा है...",
        successfullyLoggedIn: "🎉 सफलतापूर्वक लॉगिन किया गया!",
        invalidCredentials: "अमान्य ईमेल या पासवर्ड।",
        walletConnected: "🎉 Petra वॉलेट से सफलतापूर्वक कनेक्ट हुआ!",
        walletError: "Petra वॉलेट से कनेक्ट नहीं हो सका।",
        emailValidation: "कृपया एक वैध ईमेल पता दर्ज करें",
        passwordValidation: "पासवर्ड कम से कम 6 वर्ण का होना चाहिए"
    },
    mr: {
        title: "आपले स्वागत आहे",
        subtitle: "आपल्या विकेंद्रीकृत शेती खात्यात लॉगिन करा",
        emailLabel: "ईमेल पत्ता",
        passwordLabel: "पासवर्ड",
        rememberMe: "मला 30 दिवसांसाठी लक्षात ठेवा",
        loginButton: "लॉगिन करा",
        signInButton: "साइन इन करा",
        forgotPassword: "आपला पासवर्ड विसरलात?",
        connectWallet: "Petra वॉलेटशी कनेक्ट करा",
        signUp: "FarmLink मध्ये नवीन आहात?",
        createAccount: "खाते तयार करा",
        loggingIn: "लॉगिन होत आहे...",
        successfullyLoggedIn: "🎉 यशस्वीपणे लॉगिन झाले!",
        invalidCredentials: "अवैध ईमेल किंवा पासवर्ड।",
        walletConnected: "🎉 Petra वॉलेटशी यशस्वीपणे कनेक्ट झाले!",
        walletError: "Petra वॉलेटशी कनेक्ट होऊ शकले नाही।",
        emailValidation: "कृपया वैध ईमेल पत्ता टाका",
        passwordValidation: "पासवर्ड किमान 6 वर्णांचा असावा"
    }
};

// Valid credentials for demo
const validCredentials = {
    'petra.butten@farmlink.com': 'petra2024',
    'farmer@farmlink.com': 'farm123',
    'admin@farmlink.com': 'admin123',
    'demo@farmlink.com': 'demo123'
};

// Page Management Functions
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    currentPage = pageId;
    
    // Initialize page-specific functionality
    if (pageId === 'dashboardPage') {
        setTimeout(animateStats, 500);
        renderActivities();
    } else if (pageId === 'farmerPage') {
        setTimeout(animateFarmerStats, 500);
        renderProducts();
    } else if (pageId === 'consumerPage') {
        renderConsumerProducts();
    }
}

// Welcome Page Functions
function handleWelcomeClick() {
    const successMessage = document.getElementById('successMessage');
    const welcomeBtn = document.getElementById('welcomeBtn');
    
    successMessage.classList.add('show');
    welcomeBtn.textContent = 'Welcome! 🎉';
    
    setTimeout(() => {
        successMessage.classList.remove('show');
        welcomeBtn.textContent = 'Welcome to FarmLink';
    }, 3000);
}

// Sign In Page Functions
function changeLanguage() {
    const languageSelect = document.getElementById('languageSelect');
    currentLanguage = languageSelect.value;
    updateUIText();
}

function updateUIText() {
    const t = translations[currentLanguage];
    
    const elements = {
        signinTitle: document.getElementById('signinTitle'),
        signinSubtitle: document.getElementById('signinSubtitle'),
        emailLabel: document.getElementById('emailLabel'),
        passwordLabel: document.getElementById('passwordLabel'),
        rememberLabel: document.getElementById('rememberLabel'),
        loginButton: document.getElementById('loginButton'),
        altSigninButton: document.getElementById('altSigninButton'),
        forgotPasswordLink: document.getElementById('forgotPasswordLink'),
        walletButtonText: document.getElementById('walletButtonText'),
        signupText: document.getElementById('signupText'),
        signupLink: document.getElementById('signupLink')
    };
    
    Object.keys(elements).forEach(key => {
        if (elements[key]) {
            const translationKey = key.replace(/Label|Button|Link|Text/, '').toLowerCase();
            if (t[translationKey]) {
                elements[key].textContent = t[translationKey];
            }
        }
    });
}

function showMessage(text, type) {
    const messageArea = document.getElementById('messageArea');
    messageArea.textContent = text;
    messageArea.className = `message ${type}`;
    messageArea.classList.remove('hidden');
    
    setTimeout(() => {
        messageArea.classList.add('hidden');
    }, 5000);
}

function validateForm() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const t = translations[currentLanguage];
    
    let isValid = true;
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        showMessage(t.emailValidation, 'error');
        isValid = false;
    }
    
    if (!password || password.length < 6) {
        showMessage(t.passwordValidation, 'error');
        isValid = false;
    }
    
    return isValid;
}

function handleSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (isLoading) return;
    
    const t = translations[currentLanguage];
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const loginButton = document.getElementById('loginButton');
    
    isLoading = true;
    loginButton.textContent = t.loggingIn;
    loginButton.disabled = true;
    
    setTimeout(() => {
        if (validCredentials[email] && validCredentials[email] === password) {
            showMessage(t.successfullyLoggedIn, 'success');
            setTimeout(() => showPage('dashboardPage'), 1500);
        } else {
            showMessage(t.invalidCredentials, 'error');
        }
        
        isLoading = false;
        loginButton.textContent = t.loginButton;
        loginButton.disabled = false;
    }, 1500);
}

function connectPetraWallet() {
    const t = translations[currentLanguage];
    const walletButton = document.getElementById('walletButton');
    const walletButtonText = document.getElementById('walletButtonText');
    
    walletButton.classList.add('connecting');
    walletButtonText.textContent = 'Connecting...';
    walletButton.disabled = true;
    
    setTimeout(() => {
        if (Math.random() > 0.3) {
            showMessage(t.walletConnected, 'success');
            setTimeout(() => showPage('dashboardPage'), 1500);
        } else {
            showMessage(t.walletError, 'error');
        }
        
        walletButton.classList.remove('connecting');
        walletButtonText.textContent = t.connectWallet;
        walletButton.disabled = false;
    }, 2000);
}

function forgotPassword() {
    const t = translations[currentLanguage];
    const email = document.getElementById('email').value.trim();
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        showMessage(t.emailValidation, 'error');
        return;
    }
    
    showMessage(`Password reset link sent to ${email}`, 'success');
}

function alternateSignIn() {
    showMessage('Sign up functionality - Redirecting to registration...', 'success');
}

function signUp() {
    showMessage('Redirecting to sign up page...', 'success');
}

// Dashboard Functions
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current).toLocaleString();
        }, 20);
    });
}

function renderActivities() {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;
    
    activityList.innerHTML = '';
    
    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        
        activityItem.innerHTML = `
            <div class="activity-icon ${activity.iconClass}">${activity.icon}</div>
            <div class="activity-content">
                <div class="activity-text">${activity.text}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `;
        
        activityList.appendChild(activityItem);
    });
}

function handleProfileClick() {
    alert('👤 User Profile\n\n• View Profile\n• Settings\n• Transaction History\n• Help & Support\n• Logout');
}

// Farmer Dashboard Functions
function animateFarmerStats() {
    const stats = document.querySelectorAll('.stat-value');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current).toLocaleString();
        }, 30);
    });
}

function getProductEmoji(category) {
    const emojis = {
        'grains': ['🌾', '🌽', '🍚', '🥜'],
        'pulses': ['🫘', '🟤', '🟢', '🔴'],
        'vegetables': ['🍅', '🥒', '🥕', '🥬', '🌶', '🥔'],
        'fruits': ['🍎', '🍊', '🍌', '🥭', '🍇', '🍓'],
        'spices': ['🌶', '🧄', '🧅']
    };
    const categoryEmojis = emojis[category] || ['🌾'];
    return categoryEmojis[Math.floor(Math.random() * categoryEmojis.length)];
}

function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">₹${product.price}/kg</div>
                <span class="product-status ${product.status === 'available' ? 'status-available' : 'status-sold'}">
                    ${product.status === 'available' ? `Available - ${product.quantity}kg` : 'Sold Out'}
                </span>
                <div class="product-actions">
                    <button class="product-btn btn-edit" onclick="editProduct(${product.id})">✏️ Edit</button>
                    <button class="product-btn btn-delete" onclick="deleteProduct(${product.id})">🗑️ Delete</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

function openModal() {
    document.getElementById('productModal').classList.add('show');
}

function closeModal() {
    document.getElementById('productModal').classList.remove('show');
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productQuantity').value = '';
}

function addProduct(event) {
    event.preventDefault();
    
    const newProduct = {
        id: Date.now(),
        name: document.getElementById('productName').value,
        price: parseInt(document.getElementById('productPrice').value),
        quantity: parseInt(document.getElementById('productQuantity').value),
        emoji: getProductEmoji('grains'),
        status: "available"
    };

    products.push(newProduct);
    renderProducts();
    closeModal();
    alert('✅ Product added successfully!');
}

function editProduct(id) {
    alert('📝 Edit product functionality - Opening edit form...');
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(product => product.id !== id);
        renderProducts();
        alert('🗑 Product deleted successfully!');
    }
}

function applyLoan() {
    alert('💰 Loan Application\n\n• Quick loans up to ₹1,00,000\n• Low interest rates\n• Fast approval process');
}

function viewAnalytics() {
    alert('📊 Analytics dashboard coming soon!');
}

function updateProfile() {
    alert('👤 Profile update functionality');
}

// Consumer Marketplace Functions
function renderConsumerProducts() {
    const productsGrid = document.getElementById('consumerProductsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';

    consumerProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                ${product.emoji}
                <div class="farmer-badge">${product.farmer}</div>
                ${product.organic ? '<div class="organic-badge">Organic</div>' : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-farmer">📍 ${product.location}</p>
                <div class="product-price">
                    <span class="current-price">₹${product.price}/kg</span>
                </div>
                <div class="product-details">
                    <span>⭐ ${product.rating} rating</span>
                    <span>📦 ${product.available}kg available</span>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                    <button class="wishlist-btn" onclick="toggleWishlist('${product.name}')">❤</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase();
    alert(`Searching for: "${query}"`);
}

function filterCategory(category) {
    // Remove active class from all pills
    document.querySelectorAll('.category-pill').forEach(pill => {
        pill.classList.remove('active');
    });
    
    // Add active class to clicked pill
    event.target.classList.add('active');
    
    alert(`Filtering by category: ${category}`);
}

function clearFilters() {
    alert('All filters cleared!');
}

function addToCart(productName, price) {
    alert(`Added ${productName} (₹${price}) to cart!`);
    
    // Update cart count
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const currentCount = parseInt(cartCount.textContent);
        cartCount.textContent = currentCount + 1;
    }
}

function toggleWishlist(productName) {
    alert(`${productName} added to wishlist!`);
}

function toggleCart() {
    alert('Cart functionality - Opening cart sidebar...');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Welcome page button
    const welcomeBtn = document.getElementById('welcomeBtn');
    if (welcomeBtn) {
        welcomeBtn.addEventListener('click', handleWelcomeClick);
    }
    
    // Language selector
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', changeLanguage);
    }
    
    // Sign in form
    const signinForm = document.getElementById('signinForm');
    if (signinForm) {
        signinForm.addEventListener('submit', handleSubmit);
    }
    
    // Alternative signin button
    const altSigninButton = document.getElementById('altSigninButton');
    if (altSigninButton) {
        altSigninButton.addEventListener('click', alternateSignIn);
    }
    
    // Forgot password link
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            forgotPassword();
        });
    }
    
    // Wallet button
    const walletButton = document.getElementById('walletButton');
    if (walletButton) {
        walletButton.addEventListener('click', connectPetraWallet);
    }
    
    // Sign up link
    const signupLink = document.getElementById('signupLink');
    if (signupLink) {
        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            signUp();
        });
    }
    
    // Modal close when clicking outside
    const productModal = document.getElementById('productModal');
    if (productModal) {
        productModal.addEventListener('click', function(event) {
            if (event.target === this) {
                closeModal();
            }
        });
    }
    
    // Initialize UI text
    updateUIText();
    
    // Show welcome page by default
    showPage('welcomePage');
});

// Utility Functions
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
}

// Add periodic activity updates
setInterval(() => {
    if (currentPage === 'dashboardPage') {
        const newActivities = [
            { icon: '✅', iconClass: 'success', text: 'New farmer joined from Maharashtra with organic rice', time: 'Just now' },
            { icon: '💰', iconClass: 'info', text: '₹25,000 loan approved for irrigation system', time: 'Just now' },
            { icon: '🛒', iconClass: 'warning', text: 'Fresh mangoes pre-ordered for summer season', time: 'Just now' }
        ];

        const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)];
        activities.unshift(randomActivity);
        
        if (activities.length > 5) {
            activities = activities.slice(0, 5);
        }
        
        renderActivities();
    }
}, 15000); // Update every 15 seconds