// Email Configuration
const EMAIL_CONFIG = {
  service: "gmail", // Email service provider
  user: "ahhasa842@gmail.com", // Your email address
  password: "your-app-password", // Your app password (not regular password)
  recipients: {
    food: "ahmedhany40w@gmail.com", // Food service email
    tour: "ahmedhany40w@gmail.com", // Tour service email
    transport: "ahmedhany40w@gmail.com", // Transport service email
    housekeeping: "ahmedhany40w@gmail.com", // Housekeeping service email
  },
};

// Google Sheets Configuration
const GOOGLE_SHEETS_CONFIG = {
  webAppUrl:
    "https://script.google.com/macros/s/AKfycbzbbe5iB4YX-j8pZS6WjPlYkrhZz5Np1kpTb87bAoKBEvOAGIbYfNhXzQRRoRlKHdLp/exec", // Replace with your Web App URL
  enableLogging: true, // Set to false to disable logging
};

// Global Variables
let cart = [];
let currentTab = "food";

// Initialize the app
document.addEventListener("DOMContentLoaded", function () {
  initializeSplashScreen();
  initializeTabs();
  initializeMenu();
  initializeForms();
  updateCartDisplay();
  initializeHousekeepingCheckbox();
  initializeTourGuideToggle();
});

// Splash Screen functionality
function initializeSplashScreen() {
  const splashScreen = document.getElementById("splashScreen");

  // Show splash screen for 3 seconds, then fade out
  setTimeout(() => {
    splashScreen.classList.add("fade-out");

    // Remove splash screen from DOM after fade animation completes
    setTimeout(() => {
      splashScreen.style.display = "none";
    }, 800); // Match the CSS transition duration
  }, 3000); // Show for 3 seconds
}
/* ---------- MENU LAYOUT (grid / carousel) ---------- */
/* ---------- Make ONLY the active category act as a carousel ---------- */

/* ---------- Unified Layout + Category behavior (default: GRID) ---------- */

// load saved layout or default to 'grid'
let menuLayout = localStorage.getItem("menuLayout");
if (!menuLayout) {
  menuLayout = "grid";
  localStorage.setItem("menuLayout", menuLayout);
}

function getActivePanel() {
  return document.querySelector(".menu-category.active");
}

function applyMenuLayout() {
  // remove horizontal from all panels
  document.querySelectorAll(".menu-category").forEach((panel) => {
    panel.classList.remove("horizontal");
  });

  // add horizontal only to the active panel when carousel mode is set
  const active = getActivePanel();
  if (active && menuLayout === "carousel") {
    active.classList.add("horizontal");
  }

  // update layout buttons UI
  document.querySelectorAll(".layout-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.layout === menuLayout);
  });
}

// Click handler for layout buttons and carousel arrows (delegated)
document.addEventListener("click", (e) => {
  const layoutBtn = e.target.closest(".layout-btn");
  if (layoutBtn) {
    // change layout and persist
    menuLayout = layoutBtn.dataset.layout || "grid";
    localStorage.setItem("menuLayout", menuLayout);
    applyMenuLayout();

    // reset scroll of active panel for clarity
    const activePanel = getActivePanel();
    if (activePanel) activePanel.scrollTo({ left: 0, behavior: "smooth" });
    return;
  }

  // arrows: scroll the currently active panel only
  const prev = e.target.closest(".scroller-prev");
  const next = e.target.closest(".scroller-next");
  if (prev || next) {
    const active = getActivePanel();
    if (!active) return;
    const amount = Math.max(180, active.clientWidth - 40); // one page, safe min
    if (prev) active.scrollBy({ left: -amount, behavior: "smooth" });
    if (next) active.scrollBy({ left: amount, behavior: "smooth" });
  }

  // category button clicks (if your UI uses .category-btn)
  const catBtn = e.target.closest(".category-btn");
  if (catBtn) {
    const category = catBtn.dataset.category;
    switchCategory(category);
  }
});

/* Make sure switching categories keeps behavior consistent */
function switchCategory(category) {
  // update category buttons
  document
    .querySelectorAll(".category-btn")
    .forEach((btn) => btn.classList.remove("active"));
  const btn = document.querySelector(
    `.category-btn[data-category="${category}"]`
  );
  if (btn) btn.classList.add("active");

  // show/hide panels
  document
    .querySelectorAll(".menu-category")
    .forEach((panel) => panel.classList.remove("active"));
  const activePanel = document.querySelector(
    `.menu-category[data-category="${category}"]`
  );
  if (activePanel) {
    activePanel.classList.add("active");

    // apply layout so only this panel becomes horizontal when carousel mode is set
    applyMenuLayout();

    // reset scroll to start (good UX when switching)
    activePanel.scrollTo({ left: 0, behavior: "smooth" });
  }
}

/* On page load: ensure there is an active category and apply layout */
document.addEventListener("DOMContentLoaded", () => {
  // ensure a category is active (if none, activate first)
  if (!document.querySelector(".category-btn.active")) {
    const firstBtn = document.querySelector(".category-btn");
    if (firstBtn) firstBtn.classList.add("active");
  }
  if (!document.querySelector(".menu-category.active")) {
    const firstPanel = document.querySelector(".menu-category");
    if (firstPanel) firstPanel.classList.add("active");
  }

  // make UI reflect chosen/default layout
  applyMenuLayout();
});

/* Click handler for layout buttons and carousel arrows */
document.addEventListener("click", (e) => {
  const layoutBtn = e.target.closest(".layout-btn");
  if (layoutBtn) {
    menuLayout = layoutBtn.dataset.layout || "grid";
    localStorage.setItem("menuLayout", menuLayout);
    applyMenuLayout();
    // reset scroll of active panel for clarity
    const activePanel = getActivePanel();
    if (activePanel) activePanel.scrollTo({ left: 0, behavior: "smooth" });
    return;
  }

  // arrows: scroll the currently active panel only
  const prev = e.target.closest(".scroller-prev");
  const next = e.target.closest(".scroller-next");
  if (prev || next) {
    const active = getActivePanel();
    if (!active) return;
    const amount = active.clientWidth - 40;
    if (prev) active.scrollBy({ left: -amount, behavior: "smooth" });
    if (next) active.scrollBy({ left: amount, behavior: "smooth" });
  }
});

/* Replace or update your switchCategory so it applies layout to the newly-active panel */
function switchCategory(category) {
  // update buttons
  document
    .querySelectorAll(".category-btn")
    .forEach((btn) => btn.classList.remove("active"));
  const btn = document.querySelector(
    `.category-btn[data-category="${category}"]`
  );
  if (btn) btn.classList.add("active");

  // show/hide panels
  document
    .querySelectorAll(".menu-category")
    .forEach((panel) => panel.classList.remove("active"));
  const activePanel = document.querySelector(
    `.menu-category[data-category="${category}"]`
  );
  if (activePanel) {
    activePanel.classList.add("active");
    // ensure layout is applied (so only this panel becomes horizontal if carousel mode)
    applyMenuLayout();
    // reset scroll to start
    activePanel.scrollTo({ left: 0, behavior: "smooth" });
  }
}

// call once on load
applyMenuLayout();

// layout button clicks (delegated)
document.addEventListener("click", (e) => {
  // layout toggle click
  const btn = e.target.closest(".layout-btn");
  if (btn) {
    menuLayout = btn.dataset.layout || "grid";
    localStorage.setItem("menuLayout", menuLayout);
    applyMenuLayout();
    // ensure active category scrolls to start (useful when switching)
    const activePanel = document.querySelector(".menu-category.active");
    if (activePanel) activePanel.scrollTo({ left: 0, behavior: "smooth" });
  }

  // scroll arrows
  if (
    e.target.closest(".scroller-prev") ||
    e.target.closest(".scroller-next")
  ) {
    const active = document.querySelector(".menu-category.active");
    if (!active) return;
    const amount = active.clientWidth - 40; // one "page"
    if (e.target.closest(".scroller-prev")) {
      active.scrollBy({ left: -amount, behavior: "smooth" });
    } else {
      active.scrollBy({ left: amount, behavior: "smooth" });
    }
  }
});

// ensure category switch resets scroll to start (so user sees first card)
const originalSwitchCategory = window.switchCategory;
if (typeof originalSwitchCategory === "function") {
  window.switchCategory = function (category) {
    originalSwitchCategory(category);
    // after DOM has updated, reset scroll
    setTimeout(() => {
      const panel = document.querySelector(
        `[data-category="${category}"].menu-category`
      );
      if (panel) panel.scrollTo({ left: 0, behavior: "smooth" });
    }, 80);
  };
}

// Tab Navigation
function initializeTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab");
      switchTab(targetTab);
    });
  });
}

function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");

  // Update tab panels
  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.remove("active");
  });
  document.getElementById(tabName).classList.add("active");

  currentTab = tabName;
}

// Menu Functionality
function initializeMenu() {
  enhanceMenuWithImages();
  attachMenuImageListeners();
  runAdjustHeightsDeferred();
  // Category buttons
  const categoryButtons = document.querySelectorAll(".category-btn");
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");
      switchCategory(category);
    });
  });

  // Set the first category as active by default on load
  if (categoryButtons.length > 0) {
    const firstCategory = categoryButtons[0].getAttribute("data-category");
    switchCategory(firstCategory);
  }

  // Add to cart buttons
  const addButtons = document.querySelectorAll(".add-btn");
  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name");
      const price = parseFloat(button.getAttribute("data-price"));
      addToCart(name, price);
    });
  });
}

// Inject images and restructure menu items into cards
function enhanceMenuWithImages() {
  const CATEGORY_IMAGES = {
    Salad: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop",
    Soup: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1200&auto=format&fit=crop",
    "Hot Drinks": "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1200&auto=format&fit=crop",
    Dessert: "https://images.unsplash.com/photo-1541782814452-d1df5a516422?q=80&w=1200&auto=format&fit=crop",
    "Oriental Dessert": "https://images.unsplash.com/photo-1606850246023-7fc9ba50f2be?q=80&w=1200&auto=format&fit=crop",
    Pizza: "https://images.unsplash.com/photo-1548365328-9f547fb09530?q=80&w=1200&auto=format&fit=crop",
    Sandwich: "https://images.unsplash.com/photo-1550317138-10000687a72b?q=80&w=1200&auto=format&fit=crop",
    Beverages: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1200&auto=format&fit=crop",
    "Main Course": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop",
    Pasta: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1200&auto=format&fit=crop",
    Appetizer: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
  };

  const ITEM_IMAGES = {
    // 'Greek': 'images/salad-greek.jpg',
  };

  function getImageUrlForItem(item, itemName, category) {
    // 1) data-image attribute on the .menu-item (highest priority)
    if (item.dataset && item.dataset.image) return item.dataset.image.trim();

    // 2) inline <img> that is meant to be the source (detect common classes/attributes)
    const inlineImg = item.querySelector('img[data-item-image], img.item-src, img.item-image-custom');
    if (inlineImg && inlineImg.src) return inlineImg.src;

    // 3) item-specific mapping (JS)
    if (ITEM_IMAGES[itemName]) return ITEM_IMAGES[itemName];

    // 4) fallback to category image
    if (category && CATEGORY_IMAGES[category]) return CATEGORY_IMAGES[category];

    return null;
  }

  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach((item) => {
    const categoryWrapper = item.closest(".menu-category");
    const category = categoryWrapper ? categoryWrapper.getAttribute("data-category") : "";
    const nameElement = item.querySelector(".item-info h4");
    const itemName = nameElement ? nameElement.textContent.trim() : "";

    const inlineImg = item.querySelector('img[data-item-image], img.item-src, img.item-image-custom');

    // Determine desired source (null if none)
    const desiredSrc = getImageUrlForItem(item, itemName, category);

    // Ensure one .item-image wrapper exists
    let imageDiv = item.querySelector(".item-image");
    if (!imageDiv) {
      imageDiv = document.createElement("div");
      imageDiv.className = "item-image";
      // prepend immediately so moves below can append/move images into it
      item.prepend(imageDiv);
    }

    // If there's an inline image outside .item-image, move it into the wrapper and use it
    if (inlineImg && !imageDiv.contains(inlineImg)) {
      // remove duplicate images inside wrapper first to avoid duplicates
      imageDiv.querySelectorAll("img").forEach((n) => n.remove());
      imageDiv.appendChild(inlineImg);
    }

    // Now choose/create the canonical <img> inside imageDiv
    let primaryImg = imageDiv.querySelector("img");
    if (!primaryImg) {
      primaryImg = document.createElement("img");
      imageDiv.appendChild(primaryImg);
    }

    // Set src: prefer data-image/inline, then item mapping, then category; if null, leave src as-is
    if (desiredSrc) {
      if (primaryImg.src !== desiredSrc) primaryImg.src = desiredSrc;
    } else if (!primaryImg.src) {
      // if we truly have no image, remove the tag to avoid empty placeholders
      primaryImg.remove();
      primaryImg = null;
    }

    // Ensure alt + lazy loading
    if (primaryImg) {
      if (!primaryImg.alt || primaryImg.alt.trim() === "") {
        primaryImg.alt = itemName || category || "Menu item";
      }
      primaryImg.loading = "lazy";
    }

    // Remove any stray <img> elements that are direct children of .menu-item but NOT inside .item-image
    item.querySelectorAll(':scope > img').forEach((stray) => {
      // if there's already an image inside .item-image, remove stray; otherwise move it in
      if (imageDiv && imageDiv.contains(stray) === false) {
        imageDiv.appendChild(stray);
      }
    });

    // Remove extra <img> inside imageDiv beyond the first (dedupe)
    const imgsInside = imageDiv.querySelectorAll("img");
    if (imgsInside.length > 1) {
      imgsInside.forEach((imgEl, idx) => {
        if (idx > 0) imgEl.remove();
      });
    }

    // Rebuild body/footer only if not present (keeps your original nodes if already structured)
    if (!item.querySelector(".item-body")) {
      const bodyDiv = document.createElement("div");
      bodyDiv.className = "item-body";

      const footerDiv = document.createElement("div");
      footerDiv.className = "item-footer";

      const info = item.querySelector(".item-info");
      const price = item.querySelector(".item-price");
      const addBtn = item.querySelector(".add-btn");

      if (info) {
        const title = info.querySelector("h4");
        if (title) title.classList.add("item-title");
        if (title) {
          const subtitle = document.createElement("div");
          subtitle.className = "item-subtitle";
          subtitle.textContent = category || "";
          title.insertAdjacentElement("afterend", subtitle);
        }
        bodyDiv.appendChild(info);
      }
      if (price) footerDiv.appendChild(price);
      if (addBtn) footerDiv.appendChild(addBtn);

      item.appendChild(bodyDiv);
      item.appendChild(footerDiv);
    }
  });
}


function switchCategory(category) {
  document
    .querySelectorAll(".category-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document
    .querySelector(`[data-category="${category}"]`)
    .classList.add("active");

  document
    .querySelectorAll(".menu-category")
    .forEach((panel) => panel.classList.remove("active"));
  const activePanel = document.querySelector(
    `[data-category="${category}"].menu-category`
  );
  if (activePanel) {
    activePanel.classList.add("active");
    activePanel.scrollTo({ left: 0, behavior: "smooth" });
  }
}

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1,
    });
  }

  updateCartDisplay();
  showSuccessMessage(`${name} added to cart!`);
}

function removeFromCart(name) {
  cart = cart.filter((item) => item.name !== name);
  updateCartDisplay();
}

function updateQuantity(name, change) {
  const item = cart.find((item) => item.name === name);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(name);
    } else {
      updateCartDisplay();
    }
  }
}

function updateCartDisplay() {
  const cartItems = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");
  const placeOrderBtn = document.getElementById("placeOrderBtn");

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    totalPrice.textContent = "0.00";
    placeOrderBtn.disabled = true;
    return;
  }

  let cartHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${itemTotal.toFixed(
                      2
                    )} L.E</div>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity('${
                      item.name
                    }', -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${
                      item.name
                    }', 1)">+</button>
                </div>
            </div>
        `;
  });

  cartItems.innerHTML = cartHTML;
  totalPrice.textContent = total.toFixed(2);
  placeOrderBtn.disabled = false;
}

// Form Handling
function initializeForms() {
  // Food order form
  const placeOrderBtn = document.getElementById("placeOrderBtn");
  placeOrderBtn.addEventListener("click", handleFoodOrder);

  // Tour form
  const tourForm = document.getElementById("tourForm");
  tourForm.addEventListener("submit", handleTourForm);

  // Transport form
  const transportForm = document.getElementById("transportForm");
  transportForm.addEventListener("submit", handleTransportForm);

  // Housekeeping form
  const housekeepingForm = document.getElementById("housekeepingForm");
  housekeepingForm.addEventListener("submit", handleHousekeepingForm);
}

// Housekeeping immediate service checkbox functionality
function initializeHousekeepingCheckbox() {
  const immediateServiceCheckbox = document.getElementById("immediateService");
  const dateTimeFields = document.getElementById("dateTimeFields");
  const timeField = document.getElementById("timeField");
  const cleaningDate = document.getElementById("cleaningDate");
  const cleaningTime = document.getElementById("cleaningTime");
  const checkboxLabel = document.querySelector(".checkbox-label");

  if (immediateServiceCheckbox) {
    immediateServiceCheckbox.addEventListener("change", function () {
      if (this.checked) {
        // Add checked class for styling
        checkboxLabel.classList.add("checked");

        // Hide date and time fields when immediate service is selected
        dateTimeFields.style.display = "none";
        timeField.style.display = "none";

        // Remove required attribute from date and time fields
        cleaningDate.removeAttribute("required");
        cleaningTime.removeAttribute("required");
      } else {
        // Remove checked class
        checkboxLabel.classList.remove("checked");

        // Show date and time fields when immediate service is not selected
        dateTimeFields.style.display = "block";
        timeField.style.display = "block";

        // Add required attribute back to date and time fields
        cleaningDate.setAttribute("required", "required");
        cleaningTime.setAttribute("required", "required");
      }
    });
  }
}

// Tour guide toggle (show language when checkbox is checked)
function initializeTourGuideToggle() {
  const needGuideCheckbox = document.getElementById("tourNeedGuide");
  const languageGroup = document.getElementById("tourGuideLanguageGroup");
  const languageInput = document.getElementById("tourGuideLanguage");

  if (!needGuideCheckbox || !languageGroup || !languageInput) {
    return;
  }

  const updateVisibility = () => {
    if (needGuideCheckbox.checked) {
      languageGroup.style.display = "block";
    } else {
      languageGroup.style.display = "none";
      languageInput.value = "";
    }
  };

  needGuideCheckbox.addEventListener("change", updateVisibility);
  // Initialize on load
  updateVisibility();
}

function handleFoodOrder(e) {
  e.preventDefault();

  if (cart.length === 0) {
    showErrorMessage("Your cart is empty!");
    return;
  }

  const customerName = document.getElementById("customerName").value.trim();
  const roomNumber = document.getElementById("roomNumber").value.trim();

  if (!customerName) {
    showErrorMessage("Please enter your name!");
    return;
  }

  if (!roomNumber) {
    showErrorMessage("Please enter your room number!");
    return;
  }

  const orderDetails = generateFoodOrderMessage(customerName, roomNumber);
  const confirmationContent = generateFoodConfirmationContent(
    customerName,
    roomNumber
  );

  // Prepare Google Sheets data
  let orderTotal = 0;
  let orderItems = [];
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    orderTotal += itemTotal;
    orderItems.push(`${item.name} x${item.quantity}`);
  });

  const orderData = {
    type: "Food Order",
    customerName: customerName,
    roomNumber: roomNumber,
    items: orderItems.join(", "),
    total: orderTotal.toFixed(2),
    orderDate: new Date().toISOString().split("T")[0],
    orderTime: new Date().toLocaleTimeString(),
  };

  const emailData = {
    message: orderDetails,
    recipient: EMAIL_CONFIG.recipients.food,
    subject: `Room ${roomNumber} - Food Order Request`,
    roomNumber: roomNumber,
    orderData: orderData,
  };

  showConfirmationModal(confirmationContent, emailData);
}

function handleTourForm(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const customerName = formData.get("tourCustomerName");
  const roomNumber = formData.get("tourRoomNumber");

  if (!customerName || !customerName.trim()) {
    showErrorMessage("Please enter your name!");
    return;
  }

  if (!roomNumber || !roomNumber.trim()) {
    showErrorMessage("Please enter your room number!");
    return;
  }

  const tourDetails = generateTourMessage(formData);
  const confirmationContent = generateTourConfirmationContent(formData);

  // Prepare Google Sheets data
  const orderData = {
    type: "Tour Organization",
    customerName: formData.get("tourCustomerName"),
    roomNumber: formData.get("tourRoomNumber"),
    destination: formData.get("tourDestination"),
    date: formData.get("tourDate"),
    time: formData.get("tourTime"),
    duration: formData.get("tourDuration"),
    participants: formData.get("tourParticipants"),
    needGuide: formData.get("tourNeedGuide") ? true : false,
    guideLanguage: formData.get("tourGuideLanguage") || "",
    specialRequests: formData.get("tourSpecialRequests") || "",
    orderDate: new Date().toISOString().split("T")[0],
    orderTime: new Date().toLocaleTimeString(),
  };

  const emailData = {
    message: tourDetails,
    recipient: EMAIL_CONFIG.recipients.tour,
    subject: `Room ${roomNumber} - Tour Organization Request`,
    roomNumber: roomNumber,
    orderData: orderData,
  };

  showConfirmationModal(confirmationContent, emailData);
}

function handleTransportForm(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const customerName = formData.get("transportCustomerName");
  const roomNumber = formData.get("transportRoomNumber");

  if (!customerName || !customerName.trim()) {
    showErrorMessage("Please enter your name!");
    return;
  }

  if (!roomNumber || !roomNumber.trim()) {
    showErrorMessage("Please enter your room number!");
    return;
  }

  const transportDetails = generateTransportMessage(formData);
  const confirmationContent = generateTransportConfirmationContent(formData);

  // Prepare Google Sheets data
  const orderData = {
    type: "Transportation",
    customerName: formData.get("transportCustomerName"),
    roomNumber: formData.get("transportRoomNumber"),
    transportType: formData.get("transportType"),
    pickupLocation: formData.get("pickupLocation"),
    destination: formData.get("destination"),
    date: formData.get("transportDate"),
    time: formData.get("transportTime"),
    passengers: formData.get("passengers"),
    specialRequests: formData.get("transportSpecialRequests") || "",
    orderDate: new Date().toISOString().split("T")[0],
    orderTime: new Date().toLocaleTimeString(),
  };

  const emailData = {
    message: transportDetails,
    recipient: EMAIL_CONFIG.recipients.transport,
    subject: `Room ${roomNumber} - Transportation Request`,
    roomNumber: roomNumber,
    orderData: orderData,
  };

  showConfirmationModal(confirmationContent, emailData);
}

function handleHousekeepingForm(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const customerName = formData.get("housekeepingCustomerName");
  const roomNumber = formData.get("housekeepingRoomNumber");

  if (!customerName || !customerName.trim()) {
    showErrorMessage("Please enter your name!");
    return;
  }

  if (!roomNumber || !roomNumber.trim()) {
    showErrorMessage("Please enter your room number!");
    return;
  }

  const housekeepingDetails = generateHousekeepingMessage(formData);
  const confirmationContent = generateHousekeepingConfirmationContent(formData);
  const emailData = {
    message: housekeepingDetails,
    recipient: EMAIL_CONFIG.recipients.housekeeping,
    subject: `Room ${roomNumber} - Housekeeping Request`,
    roomNumber: roomNumber,
  };

  showConfirmationModal(confirmationContent, emailData);
}

// Message Generation
function generateFoodOrderMessage(customerName, roomNumber) {
  let message = "🍽️ FOOD ORDER REQUEST\n\n";
  message += `👤 Guest Name: ${customerName}\n`;
  message += `🏨 Room Number: ${roomNumber}\n\n`;
  message += "📋 Order Details:\n";

  let total = 0;
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    message += ` x${item.quantity} ${item.name} -> ${itemTotal.toFixed(
      2
    )} L.E\n`;
  });

  message += `\n💰 Total: ${total.toFixed(2)} L.E\n`;
  message += `\n📅 Order Date: ${new Date().toLocaleDateString()}\n`;
  message += `🕐 Order Time: ${new Date().toLocaleTimeString()}\n`;

  return message;
}

function generateTourMessage(formData) {
  let message = "🗺️ TOUR ORGANIZATION REQUEST\n\n";
  message += `👤 Guest Name: ${formData.get("tourCustomerName")}\n`;
  message += `🏨 Room Number: ${formData.get("tourRoomNumber")}\n\n`;
  message += "📍 Destination: " + formData.get("tourDestination") + "\n";
  message += "📅 Date: " + formData.get("tourDate") + "\n";
  message += "🕐 Time: " + formData.get("tourTime") + "\n";
  message += "⏱️ Duration: " + formData.get("tourDuration") + "\n";
  message += "👥 Participants: " + formData.get("tourParticipants") + "\n";
  const needGuide = formData.get("tourNeedGuide") ? true : false;
  if (needGuide) {
    message += "🧭 Tour Guide: Required\n";
    if (formData.get("tourGuideLanguage")) {
      message +=
        "🗣️ Guide Language: " + formData.get("tourGuideLanguage") + "\n";
    }
  } else {
    message += "🧭 Tour Guide: Not required\n";
  }

  if (formData.get("tourSpecialRequests")) {
    message +=
      "📝 Special Requests: " + formData.get("tourSpecialRequests") + "\n";
  }

  message += `\n📅 Request Date: ${new Date().toLocaleDateString()}\n`;
  message += `🕐 Request Time: ${new Date().toLocaleTimeString()}\n`;

  return message;
}

function generateTransportMessage(formData) {
  let message = "🚗 TRANSPORTATION REQUEST\n\n";
  message += `👤 Guest Name: ${formData.get("transportCustomerName")}\n`;
  message += `🏨 Room Number: ${formData.get("transportRoomNumber")}\n\n`;
  message += "🚙 Transport Type: " + formData.get("transportType") + "\n";
  message += "📍 Pickup Location: " + formData.get("pickupLocation") + "\n";
  message += "🎯 Destination: " + formData.get("destination") + "\n";
  message += "📅 Date: " + formData.get("transportDate") + "\n";
  message += "🕐 Time: " + formData.get("transportTime") + "\n";
  message += "👥 Passengers: " + formData.get("passengers") + "\n";

  if (formData.get("transportSpecialRequests")) {
    message +=
      "📝 Special Requests: " + formData.get("transportSpecialRequests") + "\n";
  }

  message += `\n📅 Request Date: ${new Date().toLocaleDateString()}\n`;
  message += `🕐 Request Time: ${new Date().toLocaleTimeString()}\n`;

  return message;
}

function generateHousekeepingMessage(formData) {
  let message = "🏠 HOUSEKEEPING REQUEST\n\n";
  message += `👤 Guest Name: ${formData.get("housekeepingCustomerName")}\n`;
  message += `🏨 Room Number: ${formData.get("housekeepingRoomNumber")}\n\n`;

  // Check if immediate service is requested
  const immediateService = document.getElementById("immediateService").checked;
  if (immediateService) {
    message += "⚡ SERVICE TYPE: IMMEDIATE SERVICE REQUESTED\n";
    message += "🕐 Requested Time: ASAP (As Soon As Possible)\n";
  } else {
    message += "📅 Preferred Date: " + formData.get("cleaningDate") + "\n";
    message += "🕐 Preferred Time: " + formData.get("cleaningTime") + "\n";
  }

  if (formData.get("housekeepingSpecialRequests")) {
    message +=
      "📝 *Special Requests:* " +
      formData.get("housekeepingSpecialRequests") +
      "\n";
  }

  message += `\n📅 Request Date: ${new Date().toLocaleDateString()}\n`;
  message += `🕐 Request Time: ${new Date().toLocaleTimeString()}\n`;

  return message;
}

// Google Sheets Integration
function saveToGoogleSheets(orderData) {
  if (!GOOGLE_SHEETS_CONFIG.enableLogging) {
    return;
  }

  // Check if sheet URL is configured
  if (
    !GOOGLE_SHEETS_CONFIG.webAppUrl ||
    GOOGLE_SHEETS_CONFIG.webAppUrl ===
      "https://script.google.com/macros/s/YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL/exec"
  ) {
    console.log("Google Sheets URL not configured. Skipping data save.");
    return;
  }

  // Send data to Google Sheets (one URL handles all tabs)
  fetch(GOOGLE_SHEETS_CONFIG.webAppUrl, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })
    .then(() => {
      console.log(orderData.type + " saved to Google Sheets");
    })
    .catch((error) => {
      console.error("Error saving to Google Sheets:", error);
    });
}

// Email Integration using EmailJS
function sendEmail(message, recipient, subject, roomNumber, orderData = null) {
  // Show loading state
  showInfoMessage("Sending your request...");

  // Save to Google Sheets if orderData is provided
  if (orderData) {
    saveToGoogleSheets(orderData);
  }

  // EmailJS configuration
  const emailData = {
    to_email: recipient,
    subject: subject,
    message: message,
    from_name: `Room ${roomNumber}`,
    reply_to: EMAIL_CONFIG.user,
  };

  // Send email using EmailJS
  emailjs
    .send("service_eh9ii0d", "template_wh5vo5k", emailData)
    .then(function (response) {
      console.log(
        "Your request sent successfully!",
        response.status,
        response.text
      );
      showSuccessMessage("Your request sent successfully!");

      // Clear cart if it's a food order
      if (currentTab === "food") {
        cart = [];
        updateCartDisplay();
        document.getElementById("customerName").value = "";
        document.getElementById("roomNumber").value = "";
      } else {
        // Reset forms for other services
        const forms = document.querySelectorAll(".service-form");
        forms.forEach((form) => form.reset());
      }
    })
    .catch(function (error) {
      console.error("Error sending request:", error);
      showErrorMessage(
        "Failed to send request automatically. Please try again."
      );
    });
}

// Confirmation Content Generators
function generateFoodConfirmationContent(customerName, roomNumber) {
  let total = 0;
  let itemsHtml = "";

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    itemsHtml += `
            <div class="order-item">
                <span>${item.name} x${item.quantity}</span>
                <span>${itemTotal.toFixed(2)} L.E</span>
            </div>
        `;
  });

  return `
        <div class="confirmation-content">
            <div class="room-number">
                <i class="fas fa-user"></i> Your Name: ${customerName}
            </div>
            <div class="room-number">
                <i class="fas fa-door-open"></i> Room Number: ${roomNumber}
            </div>
            <h4><i class="fas fa-utensils"></i> Food Order Details</h4>
            <div class="order-items">
                ${itemsHtml}
                <div class="total">Total: ${total.toFixed(2)} L.E</div>
            </div>
            <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Order Time:</strong> ${new Date().toLocaleTimeString()}</p>
        </div>
    `;
}

function generateTourConfirmationContent(formData) {
  return `
        <div class="confirmation-content">
            <div class="room-number">
                <i class="fas fa-user"></i> Your Name: ${formData.get(
                  "tourCustomerName"
                )}
            </div>
            <div class="room-number">
                <i class="fas fa-door-open"></i> Room Number: ${formData.get(
                  "tourRoomNumber"
                )}
            </div>
            <h4><i class="fas fa-map-marked-alt"></i> Tour Request Details</h4>
            <p><strong>Destination:</strong> ${formData.get(
              "tourDestination"
            )}</p>
            <p><strong>Date:</strong> ${formData.get("tourDate")}</p>
            <p><strong>Time:</strong> ${formData.get("tourTime")}</p>
            <p><strong>Duration:</strong> ${formData.get("tourDuration")}</p>
            <p><strong>Participants:</strong> ${formData.get(
              "tourParticipants"
            )}</p>
            <p><strong>Tour Guide:</strong> ${
              formData.get("tourNeedGuide") ? "Required" : "Not required"
            }</p>
            ${
              formData.get("tourNeedGuide") && formData.get("tourGuideLanguage")
                ? `<p><strong>Guide Language:</strong> ${formData.get(
                    "tourGuideLanguage"
                  )}</p>`
                : ""
            }
            ${
              formData.get("tourSpecialRequests")
                ? `<p><strong>Special Requests:</strong> ${formData.get(
                    "tourSpecialRequests"
                  )}</p>`
                : ""
            }
            <p><strong>Request Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
    `;
}

function generateTransportConfirmationContent(formData) {
  return `
        <div class="confirmation-content">
            <div class="room-number">
                <i class="fas fa-user"></i> Your Name: ${formData.get(
                  "transportCustomerName"
                )}
            </div>
            <div class="room-number">
                <i class="fas fa-door-open"></i> Room Number: ${formData.get(
                  "transportRoomNumber"
                )}
            </div>
            <h4><i class="fas fa-car"></i> Transportation Request Details</h4>
            <p><strong>Transport Type:</strong> ${formData.get(
              "transportType"
            )}</p>
            <p><strong>Pickup Location:</strong> ${formData.get(
              "pickupLocation"
            )}</p>
            <p><strong>Destination:</strong> ${formData.get("destination")}</p>
            <p><strong>Date:</strong> ${formData.get("transportDate")}</p>
            <p><strong>Time:</strong> ${formData.get("transportTime")}</p>
            <p><strong>Passengers:</strong> ${formData.get("passengers")}</p>
            ${
              formData.get("transportSpecialRequests")
                ? `<p><strong>Special Requests:</strong> ${formData.get(
                    "transportSpecialRequests"
                  )}</p>`
                : ""
            }
            <p><strong>Request Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
    `;
}

function generateHousekeepingConfirmationContent(formData) {
  const immediateService = document.getElementById("immediateService").checked;

  let serviceDetails = "";
  if (immediateService) {
    serviceDetails = `
            <p><strong>Service Type:</strong> <span style="color: #43a1c7; font-weight: 600;">⚡ IMMEDIATE SERVICE</span></p>
            <p><strong>Requested Time:</strong> ASAP (As Soon As Possible)</p>
        `;
  } else {
    serviceDetails = `
            <p><strong>Preferred Date:</strong> ${formData.get(
              "cleaningDate"
            )}</p>
            <p><strong>Preferred Time:</strong> ${formData.get(
              "cleaningTime"
            )}</p>
        `;
  }

  return `
        <div class="confirmation-content">
            <div class="room-number">
                <i class="fas fa-user"></i> Your Name: ${formData.get(
                  "housekeepingCustomerName"
                )}
            </div>
            <div class="room-number">
                <i class="fas fa-door-open"></i> Room Number: ${formData.get(
                  "housekeepingRoomNumber"
                )}
            </div>
            <h4><i class="fas fa-home"></i> Housekeeping Request Details</h4>
            ${serviceDetails}
            ${
              formData.get("housekeepingSpecialRequests")
                ? `<p><strong>Special Requests:</strong> ${formData.get(
                    "housekeepingSpecialRequests"
                  )}</p>`
                : ""
            }
            <p><strong>Request Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
    `;
}

// Confirmation Modal Functions
let pendingEmailData = null;

function showConfirmationModal(content, emailData) {
  pendingEmailData = emailData;
  document.getElementById("confirmationContent").innerHTML = content;
  document.getElementById("confirmationModal").style.display = "block";

  // Set up confirm button event listener
  const confirmBtn = document.getElementById("confirmSendBtn");
  confirmBtn.onclick = function () {
    sendEmail(
      emailData.message,
      emailData.recipient,
      emailData.subject,
      emailData.roomNumber,
      emailData.orderData
    );
    closeConfirmationModal();
  };
}

function closeConfirmationModal() {
  document.getElementById("confirmationModal").style.display = "none";
  pendingEmailData = null;
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("confirmationModal");
  if (event.target === modal) {
    closeConfirmationModal();
  }
};

// Fixed Notification System
function showNotification(message, type = "info", duration = 4000) {
  const container = document.getElementById("notificationContainer");

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;

  // Set icon based on type
  let icon = "fas fa-info-circle";
  if (type === "success") icon = "fas fa-check-circle";
  if (type === "error") icon = "fas fa-exclamation-circle";
  if (type === "info") icon = "fas fa-info-circle";

  notification.innerHTML = `
        <i class="notification-icon ${icon}"></i>
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="removeNotification(this)">
            <i class="fas fa-times"></i>
        </button>
    `;

  // Add to container
  container.appendChild(notification);

  // Auto remove after duration
  if (duration > 0) {
    setTimeout(() => {
      removeNotification(notification.querySelector(".notification-close"));
    }, duration);
  }

  return notification;
}

function removeNotification(closeBtn) {
  const notification = closeBtn.closest(".notification");
  if (notification) {
    notification.classList.add("removing");
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }
}

// Utility Functions
function showSuccessMessage(text) {
  showNotification(text, "success", 3000);
}

function showErrorMessage(text) {
  showNotification(text, "error", 5000);
}

function showInfoMessage(text) {
  showNotification(text, "info", 4000);
}

// Set minimum date to today for date inputs
document.addEventListener("DOMContentLoaded", function () {
  const today = new Date().toISOString().split("T")[0];
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach((input) => {
    input.min = today;
  });
});

// Add loading state to forms
function addLoadingState(form) {
  form.classList.add("loading");
  const submitBtn = form.querySelector(".submit-btn");
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  setTimeout(() => {
    form.classList.remove("loading");
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 2000);
}

// Enhanced form validation
function validateForm(form) {
  const requiredFields = form.querySelectorAll("[required]");
  let isValid = true;

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.style.borderColor = "#dc3545";
      isValid = false;
    } else {
      field.style.borderColor = "#e9ecef";
    }
  });

  return isValid;
}

// Note: Form validation is handled individually in each form handler
// (handleTourForm, handleTransportForm, handleHousekeepingForm)

// central function to get active panel
function getActivePanel() {
  return document.querySelector(".menu-category.active");
}

function applyMenuLayout() {
  const panels = document.querySelectorAll(".menu-category");

  // Remove horizontal class from all panels and clear inline display
  panels.forEach((panel) => {
    panel.classList.remove("horizontal");
    // Clear any inline display set previously (we will set it per-mode)
    panel.style.display = "";
  });

  // Update layout buttons UI
  document.querySelectorAll(".layout-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.layout === menuLayout);
  });

  const active = getActivePanel();

  if (menuLayout === "carousel") {
    // In carousel mode: hide all panels except the active one and make the active one horizontal
    panels.forEach((panel) => {
      if (panel === active) {
        panel.style.display = "flex"; // make visible (horizontal CSS expects flex)
        panel.classList.add("horizontal"); // apply horizontal behavior
      } else {
        panel.style.display = "none"; // hide other categories entirely
      }
    });

    // reset scroll of active panel for clarity
    if (active) active.scrollTo({ left: 0, behavior: "smooth" });
  } else {
    // In grid mode: show active panel (CSS `.menu-category.active` controls grid layout)
    panels.forEach((panel) => {
      // Leave non-active panels hidden (they will be toggled by switchCategory), but clear inline 'display' so CSS controls it
      panel.style.display = "";
    });

    // ensure the active panel uses its normal grid layout
    if (active) {
      active.style.display = ""; // allow CSS .menu-category.active { display: grid; } to take effect
    }
  }
}

// Category button click handling (ensures visual active state + switchCategory + applyMenuLayout)
document.querySelectorAll(".category-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");

    // update category buttons UI
    document
      .querySelectorAll(".category-btn")
      .forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // show/hide panels
    document
      .querySelectorAll(".menu-category")
      .forEach((panel) => panel.classList.remove("active"));
    const activePanel = document.querySelector(
      `.menu-category[data-category="${category}"]`
    );
    if (activePanel) activePanel.classList.add("active");

    // Apply the layout behavior (so only active panel becomes horizontal in carousel mode)
    applyMenuLayout();

    // reset scroll to start (good UX)
    if (activePanel) activePanel.scrollTo({ left: 0, behavior: "smooth" });
  });
});

// ensure on page load we set a default active category & layout
document.addEventListener("DOMContentLoaded", () => {
  // set first category-button as active if none
  if (!document.querySelector(".category-btn.active")) {
    const firstBtn = document.querySelector(".category-btn");
    if (firstBtn) firstBtn.classList.add("active");
  }

  // set first panel active if none
  if (!document.querySelector(".menu-category.active")) {
    const firstPanel = document.querySelector(".menu-category");
    if (firstPanel) firstPanel.classList.add("active");
  }

  // apply saved/default menuLayout
  applyMenuLayout();
});

/*** RESPONSIVE EQUAL-HEIGHT FOR CAROUSEL CARDS ***/

/**
 * Make all cards in the active carousel panel match the tallest card height.
 * Also sync the image heights (and body max height) so layout remains consistent.
 * Call this after applyMenuLayout() when the panel becomes horizontal.
 */
function adjustCarouselCardHeights() {
  // Only run in carousel mode
  if (menuLayout !== "carousel") {
    // clear inline heights if any left from previous runs
    document.querySelectorAll(".menu-category .menu-item").forEach((it) => {
      it.style.height = "";
      const img = it.querySelector(".item-image");
      if (img) img.style.height = "";
      const body = it.querySelector(".item-body");
      if (body) body.style.maxHeight = "";
    });
    return;
  }

  const activePanel = document.querySelector(".menu-category.active");
  if (!activePanel) return;

  const items = Array.from(activePanel.querySelectorAll(".menu-item"));
  if (items.length === 0) return;

  // Reset heights to natural size so measurement is accurate
  items.forEach((item) => {
    item.style.height = "auto";
    const img = item.querySelector(".item-image");
    if (img) img.style.height = "auto";
    const body = item.querySelector(".item-body");
    if (body) body.style.maxHeight = "none";
  });

  // Wait a tick to ensure images/layout have settled (if called inline)
  // But since we call on image load too, this is mainly defensive
  requestAnimationFrame(() => {
    // find the tallest total item height
    let maxItemHeight = 0;
    let tallestImageHeight = 0;
    let footerHeight = 0;

    items.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const itemHeight = Math.ceil(itemRect.height);
      if (itemHeight > maxItemHeight) maxItemHeight = itemHeight;

      const img = item.querySelector(".item-image");
      if (img) {
        const imgRect = img.getBoundingClientRect();
        const imgH = Math.ceil(imgRect.height);
        if (imgH > tallestImageHeight) tallestImageHeight = imgH;
      }

      const footer = item.querySelector(".item-footer");
      if (footer) {
        const fh = Math.ceil(footer.getBoundingClientRect().height);
        // assume footer height is same across items, but take the max to be safe
        if (fh > footerHeight) footerHeight = fh;
      }
    });

    // Safety: if footerHeight not detected, use CSS fallback (60)
    if (!footerHeight) footerHeight = 60;

    // Now set all items to the max height; keep image heights proportional to the tallest image
    items.forEach((item) => {
      item.style.height = maxItemHeight + "px";
      const img = item.querySelector(".item-image");
      if (img) {
        // If tallestImageHeight found, use that; otherwise derive from ratio (55%)
        if (tallestImageHeight) {
          img.style.height = tallestImageHeight + "px";
        } else {
          img.style.height = Math.round(maxItemHeight * 0.55) + "px";
        }
      }

      // Allow item-body to take remaining space and show full content
      const body = item.querySelector(".item-body");
      if (body) {
        const bodyMax =
          maxItemHeight -
          (img
            ? img.getBoundingClientRect().height
            : Math.round(maxItemHeight * 0.55)) -
          footerHeight;
        body.style.maxHeight = (bodyMax > 0 ? bodyMax : 0) + "px";
        body.style.overflow = "auto"; // if text still taller, allow internal scrolling rather than cut off
      }
    });
  });
}

/* Re-run adjustCarouselCardHeights on events that change layout/content */

// run when layout or active category changes (call this from applyMenuLayout and from category switch)
function runAdjustHeightsDeferred() {
  // small delay to allow DOM changes to settle, images to render
  clearTimeout(window.__adjustCarouselTimeout);
  window.__adjustCarouselTimeout = setTimeout(() => {
    adjustCarouselCardHeights();
  }, 80);
}

// Listen for window resize and orientation changes
window.addEventListener("resize", runAdjustHeightsDeferred);
window.addEventListener("orientationchange", runAdjustHeightsDeferred);

// Also attach image load listeners inside menu to recalc as images become available
function attachImageLoadListeners() {
  document.querySelectorAll(".menu-item .item-image img").forEach((img) => {
    // If already loaded, no need to listen
    if (img.complete) return;
    img.addEventListener("load", () => {
      runAdjustHeightsDeferred();
    });
  });
}

// Make sure to call this once on DOM ready and whenever menu is updated
document.addEventListener("DOMContentLoaded", () => {
  attachImageLoadListeners();
  runAdjustHeightsDeferred();
});

// after applyMenuLayout() call
applyMenuLayout();
runAdjustHeightsDeferred();

/* ----- ROBUST EQUAL-HEIGHT FOR CAROUSEL (no truncation) ----- */

/**
 * Wait for all images inside a container to finish loading (resolve even on error or after timeout)
 * @param {HTMLElement} container
 * @param {number} timeoutMs
 * @returns {Promise<void>}
 */
function waitForImagesInContainer(container, timeoutMs = 1200) {
  const imgs = Array.from(container.querySelectorAll("img"));
  if (imgs.length === 0) return Promise.resolve();

  const promises = imgs.map((img) => {
    if (img.complete) return Promise.resolve();
    return new Promise((resolve) => {
      const onFinish = () => {
        img.removeEventListener("load", onFinish);
        img.removeEventListener("error", onFinish);
        resolve();
      };
      img.addEventListener("load", onFinish);
      img.addEventListener("error", onFinish);
    });
  });

  // enforce timeout so we don't hang forever
  const timeout = new Promise((resolve) => setTimeout(resolve, timeoutMs));
  return Promise.race([Promise.all(promises), timeout]);
}

/**
 * Make all menu cards inside the active carousel panel match the height of the tallest card,
 * measured by scrollHeight (so full content is included).
 */
async function adjustCarouselCardHeights() {
  // only when carousel mode
  if (menuLayout !== "carousel") {
    // clear any inline heights left from previous runs
    document.querySelectorAll(".menu-category .menu-item").forEach((it) => {
      it.style.height = "";
    });
    return;
  }

  const activePanel = document.querySelector(".menu-category.active");
  if (!activePanel) return;

  // ensure the active panel is visible for accurate measurement
  // (applyMenuLayout should already make it visible, but double-check)
  activePanel.style.display = "flex"; // allow measuring

  // wait for images to settle (images affect scrollHeight)
  await waitForImagesInContainer(activePanel, 1400);

  // Reset to natural heights first
  const items = Array.from(activePanel.querySelectorAll(".menu-item"));
  if (items.length === 0) return;

  items.forEach((item) => {
    item.style.height = "auto";
  });

  // Measure natural full height via scrollHeight (includes overflowing content)
  let maxHeight = 0;
  items.forEach((item) => {
    const h = item.scrollHeight;
    if (h > maxHeight) maxHeight = h;
  });

  // Safety cap — prevents extremely tall cards that break layout (optional)
  const maxAllowed = Math.max(500, Math.round(window.innerHeight * 0.85)); // allow up to 85% of viewport or 500px at minimum
  if (maxHeight > maxAllowed) maxHeight = maxAllowed;

  // Apply the measured height to all items
  items.forEach((item) => {
    item.style.height = maxHeight + "px";
  });

  // ensure scroll snaps to start after adjusting
  activePanel.scrollTo({ left: 0, behavior: "smooth" });
}

/* Helper that defers adjust call to let DOM settle and prevents rapid repeats */
function runAdjustHeightsDeferred() {
  clearTimeout(window.__adjustCarouselTimeout);
  window.__adjustCarouselTimeout = setTimeout(() => {
    adjustCarouselCardHeights().catch((err) => {
      console.warn("adjustCarouselCardHeights error:", err);
    });
  }, 70);
}

/* Attach listeners so we recalc when needed */
window.addEventListener("resize", runAdjustHeightsDeferred);
window.addEventListener("orientationchange", runAdjustHeightsDeferred);

/* Re-run when images load anywhere in menu area */
function attachMenuImageListeners() {
  document.querySelectorAll(".menu-items img").forEach((img) => {
    // always attach listener (use capture to be safer)
    img.addEventListener("load", runAdjustHeightsDeferred, { passive: true });
    img.addEventListener("error", runAdjustHeightsDeferred, { passive: true });
  });
}

// run on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  attachMenuImageListeners();
  // ensure any initial layout application triggers adjust
  runAdjustHeightsDeferred();
});

/* IMPORTANT: call runAdjustHeightsDeferred() after you call applyMenuLayout() and after category switches.
   e.g. in your category button click handler, after applyMenuLayout(); add runAdjustHeightsDeferred();
   and in layout toggle handler, after applyMenuLayout(); add runAdjustHeightsDeferred(); */
