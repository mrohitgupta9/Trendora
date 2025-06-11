// Product data
const products = [
  // Tech Products
  {
    id: 1,
    name: "iPhone 15 Pro",
    description: "Latest Apple smartphone with advanced camera system",
    price: 999,
    category: "smartphones",
    icon: "📱",
  },
  {
    id: 2,
    name: "MacBook Pro M3",
    description: "Powerful laptop for professionals and creators",
    price: 1999,
    category: "laptops",
    icon: "💻",
  },
  {
    id: 3,
    name: "AirPods Pro",
    description: "Premium wireless earbuds with noise cancellation",
    price: 249,
    category: "accessories",
    icon: "🎧",
  },
  {
    id: 4,
    name: "Samsung Galaxy S24",
    description: "Android flagship with exceptional display",
    price: 899,
    category: "smartphones",
    icon: "📱",
  },
  {
    id: 5,
    name: "Dell XPS 13",
    description: "Ultra-portable laptop with stunning display",
    price: 1299,
    category: "laptops",
    icon: "💻",
  },
  {
    id: 6,
    name: "Apple Watch Series 9",
    description: "Advanced smartwatch with health monitoring",
    price: 399,
    category: "accessories",
    icon: "⌚",
  },
  // Fashion Products
  {
    id: 7,
    name: "Designer Leather Jacket",
    description: "Premium genuine leather jacket with modern cut",
    price: 299,
    category: "clothing",
    icon: "🧥",
  },
  {
    id: 8,
    name: "Luxury Handbag",
    description: "Elegant designer handbag perfect for any occasion",
    price: 450,
    category: "bags",
    icon: "👜",
  },
  {
    id: 9,
    name: "Premium Sneakers",
    description: "Comfortable and stylish sneakers for everyday wear",
    price: 180,
    category: "shoes",
    icon: "👟",
  },
  {
    id: 10,
    name: "Silk Evening Dress",
    description: "Elegant silk dress perfect for special occasions",
    price: 320,
    category: "clothing",
    icon: "👗",
  },
  {
    id: 11,
    name: "Diamond Necklace",
    description: "Stunning diamond necklace with 18k gold chain",
    price: 1200,
    category: "jewelry",
    icon: "💎",
  },
  {
    id: 12,
    name: "Classic Denim Jeans",
    description: "High-quality denim jeans with perfect fit",
    price: 89,
    category: "clothing",
    icon: "👖",
  },
  {
    id: 13,
    name: "Leather Boots",
    description: "Handcrafted leather boots for style and comfort",
    price: 220,
    category: "shoes",
    icon: "👢",
  },
  {
    id: 14,
    name: "Designer Sunglasses",
    description: "UV protection sunglasses with premium frames",
    price: 150,
    category: "accessories",
    icon: "🕶️",
  },
  {
    id: 15,
    name: "Cashmere Scarf",
    description: "Luxurious cashmere scarf in multiple colors",
    price: 95,
    category: "accessories",
    icon: "🧣",
  },
  {
    id: 16,
    name: "Business Suit",
    description: "Professional tailored suit for business occasions",
    price: 550,
    category: "clothing",
    icon: "👔",
  },
  {
    id: 17,
    name: "Gold Watch",
    description: "Elegant gold watch with Swiss movement",
    price: 800,
    category: "jewelry",
    icon: "⌚",
  },
  {
    id: 18,
    name: "Canvas Backpack",
    description: "Durable canvas backpack perfect for travel",
    price: 75,
    category: "bags",
    icon: "🎒",
  },
];

// State
let cart = [];
let currentUser = null;
let activeFilter = "all";
let currentCheckoutStep = "shipping";
let quickViewQuantity = 1;
let currentQuickViewProduct = null;
let currentSlide = 0;
let slideInterval;
const totalSlides = 5;
let searchTimeout;

// DOM Elements
const themeToggle = document.getElementById("themeToggle");
const userButton = document.getElementById("userButton");
const userDropdown = document.getElementById("userDropdown");
const userInfo = document.getElementById("userInfo");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const logoutButton = document.getElementById("logoutButton");
const cartButton = document.getElementById("cartButton");
const cartCount = document.getElementById("cartCount");
const productsGrid = document.getElementById("productsGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const navLinks = document.querySelectorAll("[data-scroll]");
const footerLinks = document.querySelectorAll(".footer-link");
const featuredGrid = document.getElementById("featuredGrid");
const dealsGrid = document.getElementById("dealsGrid");
const quickViewModal = document.getElementById("quickViewModal");
const closeQuickViewModal = document.getElementById("closeQuickViewModal");
const quickViewImage = document.getElementById("quickViewImage");
const quickViewTitle = document.getElementById("quickViewTitle");
const quickViewDescription = document.getElementById("quickViewDescription");
const quickViewPrice = document.getElementById("quickViewPrice");
const quickViewCategory = document.getElementById("quickViewCategory");
const quickViewQuantityDisplay = document.getElementById("quickViewQuantity");
const decreaseQtyBtn = document.getElementById("decreaseQty");
const increaseQtyBtn = document.getElementById("increaseQty");
const quickViewAddToCartBtn = document.getElementById("quickViewAddToCart");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const searchContainer = document.getElementById("searchContainer");
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navLinksElement = document.getElementById("navLinks");

// Modals
const authModal = document.getElementById("authModal");
const closeAuthModal = document.getElementById("closeAuthModal");
const authTitle = document.getElementById("authTitle");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const switchToSignup = document.getElementById("switchToSignup");
const switchToLogin = document.getElementById("switchToLogin");
const togglePasswordButtons = document.querySelectorAll(".toggle-password");

const cartModal = document.getElementById("cartModal");
const closeCartModal = document.getElementById("closeCartModal");
const cartItems = document.getElementById("cartItems");
const cartEmpty = document.getElementById("cartEmpty");
const cartTotal = document.getElementById("cartTotal");
const totalPrice = document.querySelector(".total-price");
const checkoutButton = document.getElementById("checkoutButton");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Load theme preference
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.className = `${savedTheme}-theme`;

  // Display products
  displayProducts(products);

  // Setup event listeners
  setupEventListeners();

  // Display featured products
  displayFeaturedProducts();

  // Display deals
  displayDeals();

  // Start hero slideshow
  startSlideshow();
});

// Event Listeners
function setupEventListeners() {
  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // User dropdown
  if (userButton) {
    userButton.addEventListener("click", toggleUserDropdown);
  }
  document.addEventListener("click", closeUserDropdownOutside);

  // Auth modal
  if (userButton) {
    userButton.addEventListener("click", () => {
      if (!currentUser) {
        openAuthModal();
      }
    });
  }
  if (closeAuthModal) {
    closeAuthModal.addEventListener("click", () => closeModal(authModal));
  }
  if (switchToSignup) {
    switchToSignup.addEventListener("click", showSignupForm);
  }
  if (switchToLogin) {
    switchToLogin.addEventListener("click", showLoginForm);
  }
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }
  if (signupForm) {
    signupForm.addEventListener("submit", handleSignup);
  }
  togglePasswordButtons.forEach((button) => {
    button.addEventListener("click", togglePasswordVisibility);
  });

  // Cart modal
  if (cartButton) {
    cartButton.addEventListener("click", openCartModal);
  }
  if (closeCartModal) {
    closeCartModal.addEventListener("click", () => closeModal(cartModal));
  }
  if (checkoutButton) {
    checkoutButton.addEventListener("click", openCheckoutModal);
  }

  // Filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");
      filterProducts(filter);
    });
  });

  // Footer category links
  document.querySelectorAll("[data-filter]").forEach((link) => {
    if (link.classList.contains("footer-link")) {
      link.addEventListener("click", () => {
        const filter = link.getAttribute("data-filter");
        filterProducts(filter);
        scrollToSection("products");
      });
    }
  });

  // Navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const section = link.getAttribute("data-scroll");
      scrollToSection(section);
    });
  });

  // Footer navigation links
  footerLinks.forEach((link) => {
    if (link.hasAttribute("data-scroll")) {
      link.addEventListener("click", () => {
        const section = link.getAttribute("data-scroll");
        scrollToSection(section);
      });
    }
  });

  // Logout
  if (logoutButton) {
    logoutButton.addEventListener("click", handleLogout);
  }

  // Quick view modal
  if (closeQuickViewModal) {
    closeQuickViewModal.addEventListener("click", () =>
      closeModal(quickViewModal)
    );
  }
  if (decreaseQtyBtn) {
    decreaseQtyBtn.addEventListener("click", () => updateQuickViewQuantity(-1));
  }
  if (increaseQtyBtn) {
    increaseQtyBtn.addEventListener("click", () => updateQuickViewQuantity(1));
  }
  if (quickViewAddToCartBtn) {
    quickViewAddToCartBtn.addEventListener("click", addQuickViewToCart);
  }

  // Close modals when clicking outside
  document.addEventListener("click", (e) => {
    if (e.target === quickViewModal) {
      closeModal(quickViewModal);
    }
    if (e.target === authModal) {
      closeModal(authModal);
    }
    if (e.target === cartModal) {
      closeModal(cartModal);
    }
  });

  // Hero gallery navigation
  const prevSlide = document.getElementById("prevSlide");
  const nextSlide = document.getElementById("nextSlide");
  if (prevSlide) {
    prevSlide.addEventListener("click", () => changeSlide(-1));
  }
  if (nextSlide) {
    nextSlide.addEventListener("click", () => changeSlide(1));
  }

  // Hero indicators
  document.querySelectorAll(".indicator").forEach((indicator, index) => {
    indicator.addEventListener("click", () => goToSlide(index));
  });

  // Dropdown menu links
  document.querySelectorAll(".dropdown-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const category = link.getAttribute("data-category");

      if (category) {
        filterProducts(category);
        scrollToSection("products");
      }
    });
  });

  // Search functionality
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      performSearch(searchInput.value);
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        if (searchInput.value.length >= 2) {
          performSearch(searchInput.value);
        } else {
          hideSearchResults();
        }
      }, 300);
    });

    searchInput.addEventListener("focus", () => {
      if (searchInput.value.length >= 2) {
        showSearchResults();
      }
    });
  }

  document.addEventListener("click", (e) => {
    if (searchContainer && !searchContainer.contains(e.target)) {
      hideSearchResults();
    }
  });

  // Mobile menu toggle
  if (mobileMenuToggle && navLinksElement) {
    mobileMenuToggle.addEventListener("click", toggleMobileMenu);
  }
}

// Theme Toggle
function toggleTheme() {
  const isDark = document.body.classList.contains("dark-theme");
  document.body.className = isDark ? "light-theme" : "dark-theme";
  localStorage.setItem("theme", isDark ? "light" : "dark");
}

// User Dropdown
function toggleUserDropdown(e) {
  e.stopPropagation();
  if (currentUser && userDropdown) {
    userDropdown.classList.toggle("active");
  }
}

function closeUserDropdownOutside(e) {
  if (
    userDropdown &&
    userDropdown.classList.contains("active") &&
    !userDropdown.contains(e.target) &&
    e.target !== userButton
  ) {
    userDropdown.classList.remove("active");
  }
}

// Auth Modal
function openAuthModal() {
  showLoginForm();
  openModal(authModal);
}

function showLoginForm() {
  if (authTitle) authTitle.textContent = "Sign In";
  if (loginForm) loginForm.classList.remove("hidden");
  if (signupForm) signupForm.classList.add("hidden");
}

function showSignupForm() {
  if (authTitle) authTitle.textContent = "Create Account";
  if (loginForm) loginForm.classList.add("hidden");
  if (signupForm) signupForm.classList.remove("hidden");
}

function togglePasswordVisibility(e) {
  const button = e.currentTarget;
  const input = button.parentElement.querySelector("input");
  const icon = button.querySelector("i");

  if (input.type === "password") {
    input.type = "text";
    icon.className = "fas fa-eye-slash";
  } else {
    input.type = "password";
    icon.className = "fas fa-eye";
  }
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // Simulate login (in a real app, this would call an API)
  currentUser = {
    name: email.split("@")[0],
    email: email,
  };

  updateUserUI();
  closeModal(authModal);
}

function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords don't match!");
    return;
  }

  // Simulate signup (in a real app, this would call an API)
  currentUser = {
    name: name,
    email: email,
  };

  updateUserUI();
  closeModal(authModal);
}

function updateUserUI() {
  if (currentUser) {
    if (userName) userName.textContent = currentUser.name;
    if (userEmail) userEmail.textContent = currentUser.email;
    if (userInfo) userInfo.classList.remove("hidden");
  } else {
    if (userInfo) userInfo.classList.add("hidden");
  }
}

function handleLogout() {
  currentUser = null;
  cart = [];
  updateUserUI();
  updateCartCount();
  if (userDropdown) userDropdown.classList.remove("active");
}

// Cart Modal
function openCartModal() {
  updateCartUI();
  openModal(cartModal);
}

function updateCartUI() {
  if (cart.length === 0) {
    if (cartEmpty) cartEmpty.classList.remove("hidden");
    if (cartItems) cartItems.classList.add("hidden");
    if (cartTotal) cartTotal.classList.add("hidden");
  } else {
    if (cartEmpty) cartEmpty.classList.add("hidden");
    if (cartItems) cartItems.classList.remove("hidden");
    if (cartTotal) cartTotal.classList.remove("hidden");

    // Clear existing items
    if (cartItems) cartItems.innerHTML = "";

    // Add cart items
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-icon">${item.icon}</div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p class="cart-item-price">$${item.price} each</p>
                    </div>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
      if (cartItems) cartItems.appendChild(cartItem);
    });

    // Update total price
    if (totalPrice) totalPrice.textContent = `$${getTotalPrice().toFixed(2)}`;
  }
}

function openCheckoutModal() {
  // Placeholder for checkout functionality
  alert("Checkout functionality would be implemented here");
}

// Products
function displayProducts(productsToShow) {
  if (!productsGrid) return;

  productsGrid.innerHTML = "";

  productsToShow.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
            <div class="product-image">${product.icon}</div>
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
    productsGrid.appendChild(productCard);
  });
}

function filterProducts(category) {
  activeFilter = category;

  // Update active button
  filterButtons.forEach((btn) => {
    if (btn.getAttribute("data-filter") === category) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Filter products
  const filteredProducts =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);

  displayProducts(filteredProducts);
}

// Cart Functions
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartCount();
  showAddToCartAnimation();
}

function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartUI();
      updateCartCount();
    }
  }
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartUI();
  updateCartCount();
}

function getTotalItems() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getTotalPrice() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function updateCartCount() {
  const count = getTotalItems();
  if (cartCount) {
    cartCount.textContent = count;

    if (count > 0) {
      cartCount.style.display = "flex";
    } else {
      cartCount.style.display = "none";
    }
  }
}

function showAddToCartAnimation() {
  if (cartButton) {
    cartButton.classList.add("pulse");
    setTimeout(() => {
      cartButton.classList.remove("pulse");
    }, 300);
  }
}

// Utility Functions
function openModal(modal) {
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modal) {
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerHeight = document.querySelector(".header").offsetHeight;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

// Featured Products Functions
function getFeaturedProducts() {
  // Select 8 featured products (mix of categories)
  const featuredIds = [1, 2, 7, 8, 11, 13, 14, 17]; // Mix of tech and fashion
  return products.filter((product) => featuredIds.includes(product.id));
}

function displayFeaturedProducts() {
  if (!featuredGrid) return;

  const featuredProducts = getFeaturedProducts();
  featuredGrid.innerHTML = "";

  featuredProducts.forEach((product) => {
    const featuredCard = document.createElement("div");
    featuredCard.className = "featured-card";
    featuredCard.innerHTML = `
            <div class="featured-image">
                ${product.icon}
                <div class="featured-overlay">
                    <button class="quick-view-btn" onclick="openQuickView(${product.id})">
                        Quick View
                    </button>
                </div>
            </div>
            <div class="featured-content">
                <h3 class="featured-title">${product.name}</h3>
                <p class="featured-description">${product.description}</p>
                <div class="featured-price">$${product.price}</div>
                <div class="featured-footer">
                    <span class="category-tag">${product.category}</span>
                    <button class="featured-add-btn" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    featuredGrid.appendChild(featuredCard);
  });
}

// Deals Functions
function displayDeals() {
  if (!dealsGrid) return;

  // Filter products under $100 for deals
  const dealsProducts = products.filter((product) => product.price < 100);
  dealsGrid.innerHTML = "";

  dealsProducts.forEach((product) => {
    const dealCard = document.createElement("div");
    dealCard.className = "product-card";
    dealCard.innerHTML = `
            <div class="product-image">${product.icon}</div>
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
    dealsGrid.appendChild(dealCard);
  });
}

// Quick View Functions
function openQuickView(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  currentQuickViewProduct = product;
  quickViewQuantity = 1;

  // Update quick view content
  if (quickViewImage) quickViewImage.textContent = product.icon;
  if (quickViewTitle) quickViewTitle.textContent = product.name;
  if (quickViewDescription)
    quickViewDescription.textContent = product.description;
  if (quickViewPrice) quickViewPrice.textContent = `$${product.price}`;
  if (quickViewCategory) quickViewCategory.textContent = product.category;
  if (quickViewQuantityDisplay)
    quickViewQuantityDisplay.textContent = quickViewQuantity;

  openModal(quickViewModal);
}

function updateQuickViewQuantity(change) {
  quickViewQuantity = Math.max(1, quickViewQuantity + change);
  if (quickViewQuantityDisplay)
    quickViewQuantityDisplay.textContent = quickViewQuantity;
}

function addQuickViewToCart() {
  if (!currentQuickViewProduct) return;

  const existingItem = cart.find(
    (item) => item.id === currentQuickViewProduct.id
  );

  if (existingItem) {
    existingItem.quantity += quickViewQuantity;
  } else {
    cart.push({ ...currentQuickViewProduct, quantity: quickViewQuantity });
  }

  updateCartCount();
  showAddToCartAnimation();
  closeModal(quickViewModal);

  // Reset quantity for next use
  quickViewQuantity = 1;
}

// Hero Gallery Functions
function startSlideshow() {
  slideInterval = setInterval(() => {
    changeSlide(1);
  }, 5000); // Change slide every 5 seconds
}

function stopSlideshow() {
  clearInterval(slideInterval);
}

function changeSlide(direction) {
  stopSlideshow();

  currentSlide += direction;

  if (currentSlide >= totalSlides) {
    currentSlide = 0;
  } else if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
  }

  updateSlide();
  startSlideshow();
}

function goToSlide(slideIndex) {
  stopSlideshow();
  currentSlide = slideIndex;
  updateSlide();
  startSlideshow();
}

function updateSlide() {
  // Update slides
  document.querySelectorAll(".hero-slide").forEach((slide, index) => {
    if (index === currentSlide) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });

  // Update indicators
  document.querySelectorAll(".indicator").forEach((indicator, index) => {
    if (index === currentSlide) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });
}

// Search functions
function performSearch(query) {
  query = query.toLowerCase().trim();

  if (query.length < 2) {
    hideSearchResults();
    return;
  }

  const results = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
  );

  displaySearchResults(results, query);
}

function displaySearchResults(results, query) {
  if (!searchResults) return;

  searchResults.innerHTML = "";

  if (results.length === 0) {
    searchResults.innerHTML = `
            <div class="search-no-results">
                No products found matching "${query}"
            </div>
        `;
  } else {
    results.slice(0, 5).forEach((product) => {
      const resultItem = document.createElement("div");
      resultItem.className = "search-result-item";
      resultItem.innerHTML = `
                <div class="search-result-icon">${product.icon}</div>
                <div class="search-result-details">
                    <div class="search-result-title">${product.name}</div>
                    <div class="search-result-price">$${product.price}</div>
                </div>
            `;
      resultItem.addEventListener("click", () => {
        openQuickView(product.id);
        hideSearchResults();
      });
      searchResults.appendChild(resultItem);
    });

    if (results.length > 5) {
      const viewMore = document.createElement("div");
      viewMore.className = "search-result-item";
      viewMore.innerHTML = `
                <div class="search-result-details">
                    <div class="search-result-title">View all ${results.length} results</div>
                </div>
            `;
      viewMore.addEventListener("click", () => {
        // Display all search results in the products grid
        displayProducts(results);
        scrollToSection("products");
        hideSearchResults();
      });
      searchResults.appendChild(viewMore);
    }
  }

  showSearchResults();
}

function showSearchResults() {
  if (searchResults) searchResults.classList.add("active");
}

function hideSearchResults() {
  if (searchResults) searchResults.classList.remove("active");
}

// Mobile menu functions
function toggleMobileMenu() {
  if (navLinksElement) {
    navLinksElement.classList.toggle("active");

    const isOpen = navLinksElement.classList.contains("active");
    if (mobileMenuToggle) {
      mobileMenuToggle.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    }
  }
}

// Pause slideshow when user hovers over hero
const heroElement = document.querySelector(".hero");
if (heroElement) {
  heroElement.addEventListener("mouseenter", stopSlideshow);
  heroElement.addEventListener("mouseleave", startSlideshow);
}

// Responsive handling
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    if (navLinksElement) navLinksElement.classList.remove("active");
    if (mobileMenuToggle)
      mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  }
});
