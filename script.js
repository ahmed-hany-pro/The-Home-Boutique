// ==========================================
// HOTEL SERVICES APP - JAVASCRIPT
// ==========================================

// ==========================================
// CONFIGURATION
// ==========================================

const EMAIL_CONFIG = {
  service: "gmail",
  user: "ahhasa842@gmail.com",
  recipients: {
    food: "ahmedhany40w@gmail.com",
    tour: "ahmedhany40w@gmail.com",
    transport: "ahmedhany40w@gmail.com",
    housekeeping: "ahmedhany40w@gmail.com",
  },
};

const GOOGLE_SHEETS_CONFIG = {
  webAppUrl:
    "https://script.google.com/macros/s/AKfycbzbbe5iB4YX-j8pZS6WjPlYkrhZz5Np1kpTb87bAoKBEvOAGIbYfNhXzQRRoRlKHdLp/exec",
  enableLogging: true,
};

const CATEGORY_IMAGES = {
  Salad:
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200",
  Soup: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1200",
  "Hot Drinks":
    "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1200",
  Dessert:
    "https://images.unsplash.com/photo-1541782814452-d1df5a516422?q=80&w=1200",
  "Oriental Dessert":
    "https://images.unsplash.com/photo-1606850246023-7fc9ba50f2be?q=80&w=1200",
  Pizza:
    "https://images.unsplash.com/photo-1548365328-9f547fb09530?q=80&w=1200",
  Sandwich:
    "https://images.unsplash.com/photo-1550317138-10000687a72b?q=80&w=1200",
  Beverages:
    "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1200",
  "Main Course":
    "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200",
  Pasta:
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1200",
  Appetizer:
    "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200",
};

// ==========================================
// GLOBAL STATE
// ==========================================

let cart = [];
let currentTab = "food";
let menuLayout = localStorage.getItem("menuLayout") || "grid";
let pendingEmailData = null;

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  initializeSplashScreen();
  initializeTabs();
  initializeMenu();
  initializeForms();
  initializeCheckboxes();
  initializeSearch();
  updateCartDisplay();
  setMinimumDates();
});

// ==========================================
// SPLASH SCREEN
// ==========================================

function initializeSplashScreen() {
  const splashScreen = document.getElementById("splashScreen");

  setTimeout(() => {
    splashScreen.classList.add("fade-out");
    setTimeout(() => {
      splashScreen.style.display = "none";
    }, 800);
  }, 3000);
}

// ==========================================
// TAB NAVIGATION
// ==========================================

function initializeTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab");
      switchTab(targetTab);
    });
  });
}

function switchTab(tabName) {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");

  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.remove("active");
  });
  document.getElementById(tabName).classList.add("active");

  currentTab = tabName;
}

// ==========================================
// MENU FUNCTIONALITY
// ==========================================

function initializeMenu() {
  enhanceMenuWithImages();
  attachMenuImageListeners();
  setupCategoryButtons();
  setupLayoutButtons();
  setupAddButtons();
  applyMenuLayout();
  runAdjustHeightsDeferred();
}

function enhanceMenuWithImages() {
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach((item) => {
    const categoryWrapper = item.closest(".menu-category");
    const category = categoryWrapper?.getAttribute("data-category") || "";
    const nameElement = item.querySelector(".item-info h4");
    const itemName = nameElement?.textContent.trim() || "";

    const inlineImg = item.querySelector("img[data-item-image], img.item-src");
    const desiredSrc = getImageUrl(item, itemName, category);

    let imageDiv = item.querySelector(".item-image");
    if (!imageDiv) {
      imageDiv = document.createElement("div");
      imageDiv.className = "item-image";
      item.prepend(imageDiv);
    }

    if (inlineImg && !imageDiv.contains(inlineImg)) {
      imageDiv.querySelectorAll("img").forEach((n) => n.remove());
      imageDiv.appendChild(inlineImg);
    }

    let primaryImg = imageDiv.querySelector("img");
    if (!primaryImg) {
      primaryImg = document.createElement("img");
      imageDiv.appendChild(primaryImg);
    }

    if (desiredSrc) {
      primaryImg.src = desiredSrc;
      primaryImg.alt = itemName || category || "Menu item";
      primaryImg.loading = "lazy";
    } else if (!primaryImg.src) {
      primaryImg.remove();
    }

    item.querySelectorAll(":scope > img").forEach((stray) => {
      if (!imageDiv.contains(stray)) {
        imageDiv.appendChild(stray);
      }
    });

    const imgsInside = imageDiv.querySelectorAll("img");
    if (imgsInside.length > 1) {
      imgsInside.forEach((imgEl, idx) => {
        if (idx > 0) imgEl.remove();
      });
    }

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
        if (title) {
          title.classList.add("item-title");
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

function getImageUrl(item, itemName, category) {
  if (item.dataset?.image) return item.dataset.image.trim();

  const inlineImg = item.querySelector("img[data-item-image], img.item-src");
  if (inlineImg?.src) return inlineImg.src;

  if (CATEGORY_IMAGES[category]) return CATEGORY_IMAGES[category];

  return null;
}

function setupCategoryButtons() {
  const categoryButtons = document.querySelectorAll(".category-btn");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");
      switchCategory(category);
    });
  });

  if (categoryButtons.length > 0) {
    const firstCategory = categoryButtons[0].getAttribute("data-category");
    switchCategory(firstCategory);
  }
}

function switchCategory(category) {
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document
    .querySelector(`[data-category="${category}"]`)
    .classList.add("active");

  document.querySelectorAll(".menu-category").forEach((panel) => {
    panel.classList.remove("active");
  });

  const activePanel = document.querySelector(
    `.menu-category[data-category="${category}"]`
  );

  if (activePanel) {
    activePanel.classList.add("active");
    applyMenuLayout();
    // Reset scroll position only when category changes
    activePanel.scrollTo({ left: 0, behavior: "smooth" });
    runAdjustHeightsDeferred();
  }
}

function setupLayoutButtons() {
  document.addEventListener("click", (e) => {
    const layoutBtn = e.target.closest(".layout-btn");
    if (layoutBtn) {
      menuLayout = layoutBtn.dataset.layout || "grid";
      localStorage.setItem("menuLayout", menuLayout);
      
      // Check if search is active
      const searchInput = document.getElementById("menuSearch");
      const isSearchActive = searchInput && searchInput.value.trim() !== "";
      
      if (isSearchActive) {
        // Re-trigger search to apply new layout
        handleSearch({ target: searchInput });
      } else {
        applyMenuLayout(false);
        // Reset scroll when switching TO carousel layout and NOT searching
        const activePanel = getActivePanel();
        if (activePanel && menuLayout === "carousel") {
          activePanel.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
      runAdjustHeightsDeferred();
    }

    const prev = e.target.closest(".scroller-prev");
    const next = e.target.closest(".scroller-next");
    if (prev || next) {
      const active = getActivePanel();
      if (!active) return;
      const amount = Math.max(180, active.clientWidth - 40);
      if (prev) active.scrollBy({ left: -amount, behavior: "smooth" });
      if (next) active.scrollBy({ left: amount, behavior: "smooth" });
    }
  });
}



function getActivePanel() {
  return document.querySelector(".menu-category.active");
}

function applyMenuLayout(isSearchActive = false) {
  const panels = document.querySelectorAll(".menu-category");

  panels.forEach((panel) => {
    panel.classList.remove("horizontal");
    panel.style.display = "";
  });

  document.querySelectorAll(".layout-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.layout === menuLayout);
  });

  const active = getActivePanel();

  if (menuLayout === "carousel") {
    panels.forEach((panel) => {
      // During search, show all categories with visible items
      if (isSearchActive) {
        const hasVisibleItems = Array.from(panel.querySelectorAll(".menu-item"))
          .some(item => !item.classList.contains("hidden"));
        
        if (hasVisibleItems) {
          panel.style.display = "flex";
          panel.classList.add("horizontal");
        } else {
          panel.style.display = "none";
        }
      } else {
        // Normal behavior: only show active category
        if (panel === active) {
          panel.style.display = "flex";
          panel.classList.add("horizontal");
        } else {
          panel.style.display = "none";
        }
      }
    });
  } else {
    // Grid layout
    panels.forEach((panel) => {
      // During search, show all categories with visible items
      if (isSearchActive) {
        const hasVisibleItems = Array.from(panel.querySelectorAll(".menu-item"))
          .some(item => !item.classList.contains("hidden"));
        
        if (hasVisibleItems) {
          panel.style.display = "";
        } else {
          panel.style.display = "none";
        }
      } else {
        panel.style.display = "";
      }
    });

    if (active && !isSearchActive) {
      active.style.display = "";
    }
  }
}


function setupAddButtons() {
  const addButtons = document.querySelectorAll(".add-btn");

  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name");
      const price = parseFloat(button.getAttribute("data-price"));
      addToCart(name, price);
    });
  });
}

// ==========================================
// CART FUNCTIONALITY
// ==========================================

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
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
          <div class="cart-item-price">${itemTotal.toFixed(2)} L.E</div>
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

// ==========================================
// FORMS
// ==========================================

function initializeForms() {
  document
    .getElementById("placeOrderBtn")
    .addEventListener("click", handleFoodOrder);
  document
    .getElementById("tourForm")
    .addEventListener("submit", handleTourForm);
  document
    .getElementById("transportForm")
    .addEventListener("submit", handleTransportForm);
  document
    .getElementById("housekeepingForm")
    .addEventListener("submit", handleHousekeepingForm);
}

function initializeCheckboxes() {
  const immediateServiceCheckbox = document.getElementById("immediateService");
  const dateTimeFields = document.getElementById("dateTimeFields");
  const timeField = document.getElementById("timeField");
  const cleaningDate = document.getElementById("cleaningDate");
  const cleaningTime = document.getElementById("cleaningTime");

  if (immediateServiceCheckbox) {
    immediateServiceCheckbox.addEventListener("change", function () {
      if (this.checked) {
        dateTimeFields.style.display = "none";
        timeField.style.display = "none";
        cleaningDate.removeAttribute("required");
        cleaningTime.removeAttribute("required");
      } else {
        dateTimeFields.style.display = "block";
        timeField.style.display = "block";
        cleaningDate.setAttribute("required", "required");
        cleaningTime.setAttribute("required", "required");
      }
    });
  }

  const needGuideCheckbox = document.getElementById("tourNeedGuide");
  const languageGroup = document.getElementById("tourGuideLanguageGroup");

  if (needGuideCheckbox && languageGroup) {
    needGuideCheckbox.addEventListener("change", () => {
      languageGroup.style.display = needGuideCheckbox.checked
        ? "block"
        : "none";
      if (!needGuideCheckbox.checked) {
        document.getElementById("tourGuideLanguage").value = "";
      }
    });
  }
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

  let orderTotal = 0;
  let orderItems = [];
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    orderTotal += itemTotal;
    orderItems.push(`${item.name} x${item.quantity}`);
  });

  const orderData = {
    type: "Food Order",
    customerName,
    roomNumber,
    items: orderItems.join(", "),
    total: orderTotal.toFixed(2),
    orderDate: new Date().toISOString().split("T")[0],
    orderTime: new Date().toLocaleTimeString(),
  };

  const emailData = {
    message: orderDetails,
    recipient: EMAIL_CONFIG.recipients.food,
    subject: `Room ${roomNumber} - Food Order Request`,
    roomNumber,
    orderData,
  };

  showConfirmationModal(confirmationContent, emailData);
}

function handleTourForm(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const customerName = formData.get("tourCustomerName");
  const roomNumber = formData.get("tourRoomNumber");

  if (!customerName?.trim() || !roomNumber?.trim()) {
    showErrorMessage("Please fill in all required fields!");
    return;
  }

  const tourDetails = generateTourMessage(formData);
  const confirmationContent = generateTourConfirmationContent(formData);

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
    roomNumber,
    orderData,
  };

  showConfirmationModal(confirmationContent, emailData);
}

function handleTransportForm(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const customerName = formData.get("transportCustomerName");
  const roomNumber = formData.get("transportRoomNumber");

  if (!customerName?.trim() || !roomNumber?.trim()) {
    showErrorMessage("Please fill in all required fields!");
    return;
  }

  const transportDetails = generateTransportMessage(formData);
  const confirmationContent = generateTransportConfirmationContent(formData);

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
    roomNumber,
    orderData,
  };

  showConfirmationModal(confirmationContent, emailData);
}

function handleHousekeepingForm(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const customerName = formData.get("housekeepingCustomerName");
  const roomNumber = formData.get("housekeepingRoomNumber");

  if (!customerName?.trim() || !roomNumber?.trim()) {
    showErrorMessage("Please fill in all required fields!");
    return;
  }

  const housekeepingDetails = generateHousekeepingMessage(formData);
  const confirmationContent = generateHousekeepingConfirmationContent(formData);

  const emailData = {
    message: housekeepingDetails,
    recipient: EMAIL_CONFIG.recipients.housekeeping,
    subject: `Room ${roomNumber} - Housekeeping Request`,
    roomNumber,
  };

  showConfirmationModal(confirmationContent, emailData);
}

// ==========================================
// MESSAGE GENERATION
// ==========================================

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
  message += `📍 Destination: ${formData.get("tourDestination")}\n`;
  message += `📅 Date: ${formData.get("tourDate")}\n`;
  message += `🕐 Time: ${formData.get("tourTime")}\n`;
  message += `⏱️ Duration: ${formData.get("tourDuration")}\n`;
  message += `👥 Participants: ${formData.get("tourParticipants")}\n`;

  if (formData.get("tourNeedGuide")) {
    message += "🧭 Tour Guide: Required\n";
    if (formData.get("tourGuideLanguage")) {
      message += `🗣️ Guide Language: ${formData.get("tourGuideLanguage")}\n`;
    }
  } else {
    message += "🧭 Tour Guide: Not required\n";
  }

  if (formData.get("tourSpecialRequests")) {
    message += `📝 Special Requests: ${formData.get("tourSpecialRequests")}\n`;
  }

  message += `\n📅 Request Date: ${new Date().toLocaleDateString()}\n`;
  message += `🕐 Request Time: ${new Date().toLocaleTimeString()}\n`;

  return message;
}

function generateTransportMessage(formData) {
  let message = "🚗 TRANSPORTATION REQUEST\n\n";
  message += `👤 Guest Name: ${formData.get("transportCustomerName")}\n`;
  message += `🏨 Room Number: ${formData.get("transportRoomNumber")}\n\n`;
  message += `🚙 Transport Type: ${formData.get("transportType")}\n`;
  message += `📍 Pickup Location: ${formData.get("pickupLocation")}\n`;
  message += `🎯 Destination: ${formData.get("destination")}\n`;
  message += `📅 Date: ${formData.get("transportDate")}\n`;
  message += `🕐 Time: ${formData.get("transportTime")}\n`;
  message += `👥 Passengers: ${formData.get("passengers")}\n`;

  if (formData.get("transportSpecialRequests")) {
    message += `📝 Special Requests: ${formData.get(
      "transportSpecialRequests"
    )}\n`;
  }

  message += `\n📅 Request Date: ${new Date().toLocaleDateString()}\n`;
  message += `🕐 Request Time: ${new Date().toLocaleTimeString()}\n`;

  return message;
}

function generateHousekeepingMessage(formData) {
  let message = "🏠 HOUSEKEEPING REQUEST\n\n";
  message += `👤 Guest Name: ${formData.get("housekeepingCustomerName")}\n`;
  message += `🏨 Room Number: ${formData.get("housekeepingRoomNumber")}\n\n`;

  const immediateService = document.getElementById("immediateService").checked;
  if (immediateService) {
    message += "⚡ SERVICE TYPE: IMMEDIATE SERVICE REQUESTED\n";
    message += "🕐 Requested Time: ASAP\n";
  } else {
    message += `📅 Preferred Date: ${formData.get("cleaningDate")}\n`;
    message += `🕐 Preferred Time: ${formData.get("cleaningTime")}\n`;
  }

  if (formData.get("housekeepingSpecialRequests")) {
    message += `📝 Special Requests: ${formData.get(
      "housekeepingSpecialRequests"
    )}\n`;
  }

  message += `\n📅 Request Date: ${new Date().toLocaleDateString()}\n`;
  message += `🕐 Request Time: ${new Date().toLocaleTimeString()}\n`;

  return message;
}

// ==========================================
// CONFIRMATION CONTENT
// ==========================================

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
      <p><strong>Destination:</strong> ${formData.get("tourDestination")}</p>
      <p><strong>Date:</strong> ${formData.get("tourDate")}</p>
      <p><strong>Time:</strong> ${formData.get("tourTime")}</p>
      <p><strong>Duration:</strong> ${formData.get("tourDuration")}</p>
      <p><strong>Participants:</strong> ${formData.get("tourParticipants")}</p>
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
      <p><strong>Transport Type:</strong> ${formData.get("transportType")}</p>
      <p><strong>Pickup Location:</strong> ${formData.get("pickupLocation")}</p>
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
      <p><strong>Preferred Date:</strong> ${formData.get("cleaningDate")}</p>
      <p><strong>Preferred Time:</strong> ${formData.get("cleaningTime")}</p>
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

// ==========================================
// MODAL FUNCTIONS
// ==========================================

function showConfirmationModal(content, emailData) {
  pendingEmailData = emailData;
  document.getElementById("confirmationContent").innerHTML = content;
  document.getElementById("confirmationModal").style.display = "block";

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

window.onclick = function (event) {
  const modal = document.getElementById("confirmationModal");
  if (event.target === modal) {
    closeConfirmationModal();
  }
};

// ==========================================
// EMAIL & GOOGLE SHEETS
// ==========================================

function saveToGoogleSheets(orderData) {
  if (!GOOGLE_SHEETS_CONFIG.enableLogging) return;

  if (
    !GOOGLE_SHEETS_CONFIG.webAppUrl ||
    GOOGLE_SHEETS_CONFIG.webAppUrl.includes("YOUR_GOOGLE_APPS_SCRIPT")
  ) {
    console.log("Google Sheets URL not configured. Skipping data save.");
    return;
  }

  fetch(GOOGLE_SHEETS_CONFIG.webAppUrl, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  })
    .then(() => console.log(orderData.type + " saved to Google Sheets"))
    .catch((error) => console.error("Error saving to Google Sheets:", error));
}

function sendEmail(message, recipient, subject, roomNumber, orderData = null) {
  showInfoMessage("Sending your request...");

  if (orderData) {
    saveToGoogleSheets(orderData);
  }

  const emailData = {
    to_email: recipient,
    subject: subject,
    message: message,
    from_name: `Room ${roomNumber}`,
    reply_to: EMAIL_CONFIG.user,
  };

  emailjs
    .send("service_eh9ii0d", "template_wh5vo5k", emailData)
    .then(function (response) {
      console.log("Request sent successfully!", response.status, response.text);
      showSuccessMessage("Your request sent successfully!");

      if (currentTab === "food") {
        cart = [];
        updateCartDisplay();
        document.getElementById("customerName").value = "";
        document.getElementById("roomNumber").value = "";
      } else {
        document
          .querySelectorAll(".service-form")
          .forEach((form) => form.reset());
      }
    })
    .catch(function (error) {
      console.error("Error sending request:", error);
      showErrorMessage("Failed to send request. Please try again.");
    });
}

// ==========================================
// NOTIFICATIONS
// ==========================================

function showNotification(message, type = "info", duration = 4000) {
  const container = document.getElementById("notificationContainer");
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;

  let icon = "fas fa-info-circle";
  if (type === "success") icon = "fas fa-check-circle";
  if (type === "error") icon = "fas fa-exclamation-circle";

  notification.innerHTML = `
    <i class="notification-icon ${icon}"></i>
    <span class="notification-message">${message}</span>
    <button class="notification-close" onclick="removeNotification(this)">
      <i class="fas fa-times"></i>
    </button>
  `;

  container.appendChild(notification);

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

function showSuccessMessage(text) {
  showNotification(text, "success", 3000);
}

function showErrorMessage(text) {
  showNotification(text, "error", 5000);
}

function showInfoMessage(text) {
  showNotification(text, "info", 4000);
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function setMinimumDates() {
  const today = new Date().toISOString().split("T")[0];
  document.querySelectorAll('input[type="date"]').forEach((input) => {
    input.min = today;
  });
}

// ==========================================
// SEARCH FUNCTIONALITY
// ==========================================

function initializeSearch() {
  const searchInput = document.getElementById("menuSearch");
  const clearBtn = document.getElementById("clearSearch");

  if (!searchInput || !clearBtn) return;

  searchInput.addEventListener("input", handleSearch);
  clearBtn.addEventListener("click", clearSearch);

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      clearSearch();
    }
  });
}

// Replace existing handleSearch and clearSearch with this version

function handleSearch(e) {
  const rawVal = e?.target?.value ?? "";
  const searchTerm = String(rawVal).toLowerCase().trim();
  const clearBtn = document.getElementById("clearSearch");
  const allItems = Array.from(document.querySelectorAll(".menu-category:not([data-category='SearchResults']) .menu-item"));
  const allCategories = Array.from(document.querySelectorAll(".menu-category:not([data-category='SearchResults'])"));
  const categoryButtons = document.querySelectorAll(".category-btn");
  const categoryButtonsContainer = document.querySelector(".menu-categories");

  // Show/hide clear button
  if (clearBtn) clearBtn.style.display = searchTerm ? "flex" : "none";

  // If no search -> restore default view
  if (!searchTerm) {
    // Remove any existing SearchResults panel
    const existingSearchPanel = document.querySelector('.menu-category[data-category="SearchResults"]');
    if (existingSearchPanel) existingSearchPanel.remove();

    // Show all items in their original categories
    allItems.forEach(item => {
      item.style.display = "";
    });

    // Restore category buttons order
    restoreCategoryButtonsOrder();

    // Restore original layout
    applyMenuLayout();
    runAdjustHeightsDeferred();
    return;
  }

  // --- Real-time search within categories ---
  let hasResultsGlobal = false;
  const categoryResults = new Map(); // Track which categories have results
  const categoryMatchCounts = new Map(); // Track number of matches per category

  allItems.forEach((item) => {
    const itemName = item.querySelector(".item-info h4")?.textContent.toLowerCase() || "";
    const itemDesc = item.querySelector(".item-info p")?.textContent.toLowerCase() || "";
    const categoryElement = item.closest(".menu-category");
    const categoryName = categoryElement?.getAttribute("data-category") || "";

    const matches =
      itemName.includes(searchTerm) ||
      itemDesc.includes(searchTerm) ||
      categoryName.toLowerCase().includes(searchTerm);

    if (matches) {
      hasResultsGlobal = true;
      item.style.display = "";
      
      // Track this category has results
      if (!categoryResults.has(categoryName)) {
        categoryResults.set(categoryName, true);
        categoryMatchCounts.set(categoryName, 0);
      }
      categoryMatchCounts.set(categoryName, categoryMatchCounts.get(categoryName) + 1);
    } else {
      item.style.display = "none";
    }
  });

  // Show/hide categories based on whether they have matching items
  allCategories.forEach((category) => {
    const categoryName = category.getAttribute("data-category");
    const hasResults = categoryResults.has(categoryName);
    
    if (hasResults) {
      category.style.display = "";
    } else {
      category.style.display = "none";
    }
  });

  // Reorder category buttons - categories with results first
  reorderCategoryButtons(categoryResults, categoryMatchCounts);

  // Update category buttons to show which have results
  categoryButtons.forEach((btn) => {
    const categoryName = btn.getAttribute("data-category");
    const hasResults = categoryResults.has(categoryName);
    
    if (hasResults) {
      btn.style.opacity = "1";
      btn.style.pointerEvents = "auto";
    } else {
      btn.style.opacity = "0.3";
      btn.style.pointerEvents = "none";
    }
  });

  // Apply current layout
  applyMenuLayout();

  // Show message if no results
  if (!hasResultsGlobal) {
    // Create temporary message in active panel
    const activePanel = getActivePanel();
    if (activePanel) {
      const noResultsMsg = document.createElement("div");
      noResultsMsg.className = "no-results-message";
      noResultsMsg.style.cssText = "grid-column: 1/-1; text-align: center; padding: 40px; color: #6c757d; font-size: 1.1rem;";
      noResultsMsg.innerHTML = '<i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.3; display: block;"></i>No items found matching your search';
      
      // Remove any existing message
      const existing = activePanel.querySelector(".no-results-message");
      if (existing) existing.remove();
      
      activePanel.appendChild(noResultsMsg);
    }
  } else {
    // Remove no results messages
    document.querySelectorAll(".no-results-message").forEach(msg => msg.remove());
  }

  runAdjustHeightsDeferred();
}

// Store original button order
let originalCategoryButtonsOrder = null;

function reorderCategoryButtons(categoryResults, categoryMatchCounts) {
  const categoryButtonsContainer = document.querySelector(".menu-categories");
  if (!categoryButtonsContainer) return;

  const allButtons = Array.from(categoryButtonsContainer.querySelectorAll(".category-btn"));
  
  // Store original order if not already stored
  if (!originalCategoryButtonsOrder) {
    originalCategoryButtonsOrder = allButtons.map(btn => ({
      element: btn,
      category: btn.getAttribute("data-category")
    }));
  }

  // Sort buttons: categories with results first (by match count), then rest
  const sortedButtons = allButtons.sort((a, b) => {
    const catA = a.getAttribute("data-category");
    const catB = b.getAttribute("data-category");
    
    const hasResultsA = categoryResults.has(catA);
    const hasResultsB = categoryResults.has(catB);
    
    // If both have results or both don't, sort by match count (descending)
    if (hasResultsA && hasResultsB) {
      return (categoryMatchCounts.get(catB) || 0) - (categoryMatchCounts.get(catA) || 0);
    }
    
    // Categories with results come first
    if (hasResultsA && !hasResultsB) return -1;
    if (!hasResultsA && hasResultsB) return 1;
    
    // Keep original order for categories without results
    return 0;
  });

  // Clear and re-append in new order
  categoryButtonsContainer.innerHTML = "";
  sortedButtons.forEach(btn => categoryButtonsContainer.appendChild(btn));
}

function restoreCategoryButtonsOrder() {
  if (!originalCategoryButtonsOrder) return;
  
  const categoryButtonsContainer = document.querySelector(".menu-categories");
  if (!categoryButtonsContainer) return;

  // Clear container
  categoryButtonsContainer.innerHTML = "";
  
  // Restore original order
  originalCategoryButtonsOrder.forEach(item => {
    categoryButtonsContainer.appendChild(item.element);
    // Reset styles
    item.element.style.opacity = "1";
    item.element.style.pointerEvents = "auto";
  });
}

function clearSearch() {
  const searchInput = document.getElementById("menuSearch");
  const clearBtn = document.getElementById("clearSearch");

  if (searchInput) searchInput.value = "";
  if (clearBtn) clearBtn.style.display = "none";

  // Remove search results panel and reset items
  const searchPanel = document.querySelector('.menu-category[data-category="SearchResults"]');
  if (searchPanel) searchPanel.remove();

  // Unhide all original items and categories
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.classList.remove("hidden", "highlight");
  });
  document.querySelectorAll(".menu-category").forEach((cat) => {
    cat.style.display = "";
    cat.classList.remove("horizontal");
  });

  // Restore first category as active (existing behavior)
  const categoryButtons = document.querySelectorAll(".category-btn");
  if (categoryButtons.length > 0) {
    const firstCategory = categoryButtons[0].getAttribute("data-category");
    switchCategory(firstCategory);
  }

  runAdjustHeightsDeferred();
  // keep focus in the search box for convenience
  if (searchInput) searchInput.focus();
}


// ==========================================
// IMAGE LOADING & HEIGHT ADJUSTMENT
// ==========================================

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

  const timeout = new Promise((resolve) => setTimeout(resolve, timeoutMs));
  return Promise.race([Promise.all(promises), timeout]);
}

async function adjustCarouselCardHeights() {
  if (menuLayout !== "carousel") {
    document.querySelectorAll(".menu-category .menu-item").forEach((it) => {
      it.style.height = "";
    });
    return;
  }

  const activePanel = document.querySelector(".menu-category.active");
  if (!activePanel) return;

  activePanel.style.display = "flex";
  await waitForImagesInContainer(activePanel, 1400);

  const items = Array.from(activePanel.querySelectorAll(".menu-item"));
  if (items.length === 0) return;

  items.forEach((item) => {
    item.style.height = "auto";
  });

  let maxHeight = 0;
  items.forEach((item) => {
    const h = item.scrollHeight;
    if (h > maxHeight) maxHeight = h;
  });

  const maxAllowed = Math.max(500, Math.round(window.innerHeight * 0.85));
  if (maxHeight > maxAllowed) maxHeight = maxAllowed;

  items.forEach((item) => {
    item.style.height = maxHeight + "px";
  });
}

function runAdjustHeightsDeferred() {
  clearTimeout(window.__adjustCarouselTimeout);
  window.__adjustCarouselTimeout = setTimeout(() => {
    adjustCarouselCardHeights().catch((err) => {
      console.warn("adjustCarouselCardHeights error:", err);
    });
  }, 70);
}

function attachMenuImageListeners() {
  document.querySelectorAll(".menu-items img").forEach((img) => {
    img.addEventListener("load", runAdjustHeightsDeferred, { passive: true });
    img.addEventListener("error", runAdjustHeightsDeferred, { passive: true });
  });
}

// ==========================================
// EVENT LISTENERS
// ==========================================

window.addEventListener("resize", runAdjustHeightsDeferred);
window.addEventListener("orientationchange", runAdjustHeightsDeferred);

// Make functions globally accessible for inline event handlers
window.updateQuantity = updateQuantity;
window.closeConfirmationModal = closeConfirmationModal;
window.removeNotification = removeNotification;