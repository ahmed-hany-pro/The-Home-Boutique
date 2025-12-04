// ==========================================
// ADMIN PANEL - JAVASCRIPT
// ==========================================

// ==========================================
// CONFIGURATION
// ==========================================

const ADMIN_CONFIG = {
  username: "ahmed",
  password: "admin", // Change this to a secure password
  googleSheetsId: "1ZceDX2yLtsQGIbQQf1EFduqxOzKpQW_BLtKmWRCE0Ck",
  googleSheetsUrl: "https://docs.google.com/spreadsheets/d/1ZceDX2yLtsQGIbQQf1EFduqxOzKpQW_BLtKmWRCE0Ck/gviz/tq?tqx=out:json",
  appsScriptUrl: "https://script.google.com/macros/s/AKfycbz7rIr6Yq3oWzfRjWAW0mXaaaJKBwGAxPZ4NqoWbpQIHV2KZ0gD71bmjbNOciDrVKBY/exec" // Add your deployed Apps Script URL here
};

// Menu items data (from index.html)
const MENU_DATA = {
  "Appetizer": [
    { name: "Melanzana", price: 350, description: "Eggplant, Parmesan Cheese, minced meat and Mozzarella Cheese.", image: "images/Melanzana.jpg" },
    { name: "Chilli Cheese Fries", price: 450, description: "Pomme fries with bolognese sauce mix cheese, sour cream, jalapeño.", image: "images/Chilli Cheese Fries.jpg" },
    { name: "Shrimp Roll", price: 400, description: "Shrimp and vegetables with sweet chili sauce.", image: "images/Shrimp Roll.jpg" },
    { name: "Chicken Popcorn", price: 350, description: "Fried chicken breasts with honey mustard sauce.", image: "images/Chicken Popcorn.jpg" },
    { name: "Chicken BBQ Wings", price: 300, description: "Fried chicken wings with smoked barbecue sauce.", image: "images/Chicken BBQ Wings.jpg" },
    { name: "Nachos", price: 350, description: "Corn tortilla bread, chili cheese, minced meat, red beans, jalapeño, mix cheese.", image: "images/Nachos.jpg" },
    { name: "Bejo Dogry", price: 350, description: "Tortilla bread, chicken breasts, bigo dogry, cheese sauce.", image: "images/Bejo Dogry.jpg" }
  ],
  "Soup": [
    { name: "Chicken Mushroom", price: 250, description: "Fresh chicken and mushroom with dairy cream and garlic bread.", image: "images/Cream-of-Mushroom-Chicken-15-of-22-1.jpg" },
    { name: "Potato Ala Cream", price: 220, description: "Potatoes with creamy cheese, beef bacon and mix cheese with garlic bread.", image: "images/Potato Ala Cream.jpg" },
    { name: "Tomato", price: 220, description: "Creamy tomatoes and fresh thyme with olive.", image: "images/Tomato.jpg" },
    { name: "Beet Root", price: 220, description: "Beets with herb cream and garlic bread.", image: "images/Beet Root.jpg" },
    { name: "SeaFood", price: 300, description: "Shrimp, calamari and crab stick with cream.", image: "images/SeaFood.jpg" },
    { name: "Lentil", price: 220, description: "Lentil, vegetable and chicken soup.", image: "images/Lentil.jpg" }
  ],
  "Salad": [
    { name: "Greek", price: 250, description: "Lettuce, tomatoes, cucumber, sweet peppers, onions, feta cheese & vinaigrette sauce.", image: "images/Greek.jpg" },
    { name: "Fattoush", price: 250, description: "Lettuce, tomatoes, cucumber, sweet peppers, red radish, onions, toasted lebanese bread.", image: "images/Fattoush.jpg" },
    { name: "Roasted Beef", price: 370, description: "Minced meat, arugula, lettuce, mushrooms, onions, cherry tomatoes & red radish.", image: "images/Roasted Beef.jpg" },
    { name: "Chicken Caesar", price: 350, description: "Lettuce, chicken, Parmesan Cheese, Caeser sauce.", image: "images/Chicken Caesar.jpg" },
    { name: "Redshi Chicken", price: 350, description: "Mix vegetables with grilled chicken, Pesto sauce & Parmesan Cheese.", image: "images/Redshi Chicken.jpg" },
    { name: "Shrimp Avocado", price: 400, description: "Arugula with grilled shrimp, avocado & cherry tomatoes with vinaigrette sauce.", image: "images/Shrimp Avocado.jpg" }
  ],
  "Main Course": [
    { name: "Shish Kabab", price: 550, description: "250 grams of grilled meat.", image: "images/Shish Kabab.jpg" },
    { name: "Kofta", price: 500, description: "250 grams of grilled minced meat.", image: "images/Kofta.jpg" },
    { name: "Stuffed Pigeon", price: 400, description: "Pigeon stuffed with rice flavored with Egyptian spices.", image: "images/Stuffed Pigeon.jpg" },
    { name: "Grilled Ribs", price: 750, description: "4 pieces of grilled ribs marinated with Egyptian spices.", image: "images/Grilled Rib.jpg" },
    { name: "Grilled Chicken", price: 450, description: "Grilled half chicken marinated with Egyptian spices.", image: "images/Grilled Chicken.jpg" },
    { name: "Grape Leaves Casserole", price: 450, description: "Roasted beef and grape leaves stuffed with flavored rice topped with tomato sauce.", image: "images/Grape Leaves Casserole.jpg" },
    { name: "Okra Casserole", price: 450, description: "Roasted beef and okra flavored with tomato sauce and Egyptian spices.", image: "images/Okra Casserole.jpg" },
    { name: "Mix Grill", price: 700, description: "Grilled kofta, grilled kabab, grilled chicken and shish taouk.", image: "images/Mix Grill.jpg" }
  ],
  "Pasta": [
    { name: "Alfredo Sauce", price: 450, description: "Chicken, mushroom, white sauce, sour cream & Parmesan Cheese.", image: "images/Alfredo Sauce.jpg" },
    { name: "Chicken Jalapeno", price: 400, description: "Fried chicken with jalapeno, rose sauce & Parmesan Cheese.", image: "images/Chicken Jalapeno.jpg" },
    { name: "Linguine Shredded Beef", price: 450, description: "Beef slices, mushroom, demi-glace sauce & Parmesan Cheese.", image: "images/Linguine Shredded Beef.jpg" },
    { name: "Shrimp Lemon", price: 500, description: "Tender shrimp tossed in a buttery lemon sauce.", image: "images/Shrimp Lemon.jpg" },
    { name: "Salmon", price: 650, description: "Fresh salmon, cream sauce, red sauce & Parmesan Cheese.", image: "images/Salmon.jpg" },
    { name: "Pizziola", price: 350, description: "Bell peppers, olives, mushrooms, red sauce & Parmesan Cheese.", image: "images/Pizziola.jpg" },
    { name: "Two Faces", price: 350, description: "Red sauce with creamy pesto sauce & Parmesan Cheese.", image: "images/Two Faces.jpg" },
    { name: "Sausage Ala Forno", price: 500, description: "Sausage, dairy cream & mix cheese.", image: "images/Sausage Ala Forno.jpg" },
    { name: "Frutti Di Mare", price: 700, description: "Shrimp, crab, fish, gondophle, lemon sauce & white sauce.", image: "images/Frutti Di Mare.jpg" }
  ],
  "Pizza": [
    { name: "Margherita", price: 380, description: "Mozzarella cheese, fresh thyme and tomato sauce.", image: "images/margherita.jpg" },
    { name: "Shrimp & Mushroom", price: 670, description: "Mozzarella cheese, fresh thyme, fresh mushroom, shrimp, arugula, tomato sauce.", image: "images/Shrimp & Mushroom.jpg" },
    { name: "Seafood", price: 700, description: "Mozzarella cheese, shrimp, calamari, sweet peppers and tomato sauce.", image: "images/seafood pizza.jpg" },
    { name: "Pepperoni", price: 600, description: "Mozzarella cheese, pepperoni, pepper and tomato sauce.", image: "images/Pepperoni.jpg" },
    { name: "Mix Meat", price: 650, description: "Mozzarella cheese, smoked turkey, smoked beef, mushroom and tomato sauce.", image: "images/Mix Meat.jpg" },
    { name: "BBQ Chicken", price: 500, description: "Mozzarella cheese, BBQ chicken, sweet pepper, olives and tomato sauce.", image: "images/BBQ Chicken.jpg" },
    { name: "Vegetables", price: 450, description: "Sweet pepper, olive, onion, mushroom and tomato sauce.", image: "images/Vegetables.jpg" },
    { name: "Chicken Ranch", price: 550, description: "Chicken, sweet pepper, onion, olive, mushroom, ranch sauce and tomato sauce.", image: "images/Chicken Ranch.jpg" }
  ],
  "Sandwich": [
    { name: "Cheese Burger", price: 520, description: "Texas sauce, burger, lettuce, tomato & cheddar cheese.", image: "images/Cheese Burger.jpg" },
    { name: "Swiss Burger", price: 530, description: "Beef patty, Swiss cheese, sautéed mushroom.", image: "images/Swiss Burger.jpg" },
    { name: "Bacon Burger", price: 600, description: "Texas sauce, burger, lettuce, tomato, beef bacon & cheese.", image: "images/Bacon Burger.jpg" },
    { name: "Steak & Cheese", price: 520, description: "Meat, imance, onions, peppers, mushrooms and Mozzarella cheese.", image: "images/Steak & Cheese.jpg" },
    { name: "Grilled Chicken Panini", price: 400, description: "Panini bread, grilled chicken, tomato, lettuce, and cheddar cheese.", image: "images/Grilled Chicken Panini.jpg" },
    { name: "Chicken Cutlet", price: 450, description: "Fried chicken, tomato, lettuce & mix cheese.", image: "images/Chicken Cutlet.jpg" },
    { name: "Shish Taouk", price: 400, description: "Chicken breast, sweet pepper, onion, lettuce & mayonnaise.", image: "images/Shish Taouk.jpg" },
    { name: "Turkey Midnight", price: 400, description: "Chicken breast, turkey slices, dynamite sauce & lettuce.", image: "images/Turkey Midnight.jpg" },
    { name: "Kofta", price: 500, description: "Grilled minced meat marinated with Egyptian spices, prepared with love & care.", image: "images/Kofta san.jpg" },
    { name: "Kabab", price: 600, description: "Grilled meat marinated with Egyptian spices, prepared with love & care.", image: "images/Kabab.jpg" }
  ],
  "Oriental Dessert": [
    { name: "Oriental sweets", price: 150, description: "", image: "images/Oriental sweets.jpg" },
    { name: "Umm Ali", price: 150, description: "", image: "images/Umm Ali.jpg" },
    { name: "Rice Pudding", price: 120, description: "", image: "images/Rice Pudding.jpg" },
    { name: "Seasonal Fruits Salad", price: 220, description: "", image: "images/Seasonal Fruits Salad.jpg" }
  ],
  "Dessert": [
    { name: "Cheesecake Blueberry", price: 250, description: "", image: "images/Cheesecake Blueberry.jpg" },
    { name: "Cheesecake Caramel", price: 250, description: "", image: "images/Cheesecake Caramel.jpg" },
    { name: "Cheesecake Lotus", price: 250, description: "", image: "images/Cheesecake Lotus.jpg" },
    { name: "Cheesecake Red Velvet", price: 250, description: "", image: "images/Cheesecake Red Velvet.jpg" },
    { name: "Eclair White Chocolate", price: 150, description: "", image: "images/Eclair White Chocolate.jpg" },
    { name: "Eclair Dark Chocolate", price: 150, description: "", image: "images/Eclair Dark Chocolate.jpg" },
    { name: "Volcano", price: 250, description: "", image: "images/Volcano.jpg" },
    { name: "Red Velvet", price: 250, description: "", image: "images/Red Velvet.jpg" },
    { name: "Mix Berry Cake", price: 250, description: "", image: "images/Mix Berry Cake.jpg" },
    { name: "Caramel Pudding With Nuts", price: 250, description: "", image: "images/Caramel Pudding With Nuts.jpg" }
  ],
  "Hot Drinks": [
    { name: "Black Tea", price: 65, description: "", image: "images/Black Tea.jpg" },
    { name: "Earl Grey Tea", price: 65, description: "", image: "images/Earl Grey Tea.jpg" },
    { name: "Mint Tea", price: 65, description: "", image: "images/Mint Tea.jpg" },
    { name: "Chamomile Tea", price: 65, description: "", image: "images/Chamomile Tea.jpg" },
    { name: "Hibiscus", price: 65, description: "", image: "images/Hibiscus.jpg" },
    { name: "Hot Chocolate", price: 90, description: "", image: "images/Hot Chocolate.jpg" },
    { name: "Americano", price: 90, description: "", image: "images/Americano.jpg" },
    { name: "Latte", price: 90, description: "", image: "images/Latte.jpg" },
    { name: "Mocha", price: 90, description: "", image: "images/Mocha.jpg" },
    { name: "Cappucino", price: 90, description: "", image: "images/Cappucino.jpg" },
    { name: "Turkish Coffee", price: 90, description: "", image: "images/Turkish Coffee.jpg" },
    { name: "Turkish Coffee Double", price: 125, description: "", image: "images/Turkish Coffee Double.jpg" },
    { name: "Turkish Coffee Sertaya", price: 250, description: "", image: "images/Turkish Coffee Sertaya.jpg" },
    { name: "French Coffee", price: 100, description: "", image: "images/French Coffee.jpg" },
    { name: "Hot Lemon", price: 70, description: "", image: "images/Hot Lemon.jpg" },
    { name: "Lotus Latte", price: 140, description: "", image: "images/Lotus Latte.jpg" },
    { name: "Caramel Latte", price: 140, description: "", image: "images/Caramel Latte.jpg" },
    { name: "Vanilla Latte", price: 140, description: "", image: "images/Vanilla Latte.jpg" }
  ],
  "Beverages": [
    { name: "Iced Chocolate", price: 125, description: "", image: "images/Iced Chocolate.jpg" },
    { name: "Iced Coffee", price: 120, description: "", image: "images/Iced Coffee.jpg" },
    { name: "Fresh Juice", price: 125, description: "", image: "images/Fresh Juice.jpg" },
    { name: "Coca-Cola", price: 65, description: "", image: "images/Coca-Cola.jpg" },
    { name: "Coca-Cola Zero", price: 65, description: "", image: "images/Coca-Cola Zero.jpg" },
    { name: "Sprite", price: 65, description: "", image: "images/Sprite.jpg" },
    { name: "Miranda Orange", price: 65, description: "", image: "images/Miranda Orange.jpg" },
    { name: "Schweppes Pomegranate", price: 65, description: "", image: "images/Schweppes Pomegranate.jpg" },
    { name: "Sparkling Water", price: 125, description: "", image: "images/Sparkling Water.jpg" },
    { name: "Red Bull", price: 120, description: "", image: "images/Red Bull.jpg" },
    { name: "Lemon Mint", price: 130, description: "", image: "images/Lemon Mint.jpg" },
    { name: "Lemonade", price: 120, description: "", image: "images/Lemonade.jpg" },
    { name: "Banana With Milk", price: 140, description: "", image: "images/Banana With Milk.jpg" },
    { name: "Mineral Water 600Ml", price: 30, description: "", image: "images/Mineral Water 600Ml.jpg" }
  ]
};

// ==========================================
// GLOBAL STATE
// ==========================================
let currentActiveCategory = 'all';
let menuVisibility = {};
let roomsData = {};
let billsData = [];

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  checkLoginStatus();
  initializeLoginForm();
  loadMenuVisibility();
  loadRoomsData();
});

// ==========================================
// LOGIN SYSTEM
// ==========================================
function initializeLoginForm() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
}

function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === ADMIN_CONFIG.username && password === ADMIN_CONFIG.password) {
    localStorage.setItem('adminLoggedIn', 'true');
    showDashboard();
    showNotification('Login successful!', 'success');
  } else {
    showNotification('Invalid username or password!', 'error');
  }
}

function checkLoginStatus() {
  if (localStorage.getItem('adminLoggedIn') === 'true') {
    showDashboard();
  }
}

function showDashboard() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('adminDashboard').style.display = 'block';
  initializeAdminPanel();
}

function logout() {
  localStorage.removeItem('adminLoggedIn');
  location.reload();
}

// ==========================================
// ADMIN PANEL INITIALIZATION
// ==========================================
function initializeAdminPanel() {
  initializeNavigation();
  loadMenuManagement();
  loadRoomManagement();
  loadBillsManagement();
}

function initializeNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });
}

function switchTab(tabName) {
  // Update navigation buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

  // Update tab content
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  document.getElementById(`${tabName}Tab`).classList.add('active');
  
  // Refresh data when switching tabs
  if (tabName === 'rooms') {
    renderRooms();
  } else if (tabName === 'bills') {
    renderBills();
  }
}

// ==========================================
// MENU MANAGEMENT
// ==========================================
function loadMenuVisibility() {
  const saved = localStorage.getItem('menuVisibility');
  if (saved) {
    menuVisibility = JSON.parse(saved);
  } else {
    // Initialize all items as visible
    Object.keys(MENU_DATA).forEach(category => {
      MENU_DATA[category].forEach(item => {
        const key = `${category}-${item.name}`;
        menuVisibility[key] = true;
      });
    });
    saveMenuVisibility();
  }
}

function saveMenuVisibility() {
  localStorage.setItem('menuVisibility', JSON.stringify(menuVisibility));
}

function loadMenuManagement() {
  initializeCategoryFilters();
  renderMenuItems('all');
}

function initializeCategoryFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentActiveCategory = category;
      renderMenuItems(category);
    });
  });
}

function renderMenuItems(category) {
  const grid = document.getElementById('menuItemsGrid');
  grid.innerHTML = '';

  const categoriesToShow = category === 'all' ? Object.keys(MENU_DATA) : [category];

  categoriesToShow.forEach(cat => {
    MENU_DATA[cat].forEach(item => {
      const key = `${cat}-${item.name}`;
      const isVisible = menuVisibility[key] !== false;

      const card = document.createElement('div');
      card.className = `menu-card ${!isVisible ? 'hidden-item' : ''}`;
      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="menu-card-image" onerror="this.src='images/placeholder.jpg'">
        <div class="menu-card-body">
          <div class="menu-card-header">
            <div>
              <div class="menu-card-title">${item.name}</div>
              <div class="menu-card-category">${cat}</div>
            </div>
            <div class="menu-card-price">${item.price} L.E</div>
          </div>
          ${item.description ? `<div class="menu-card-description">${item.description}</div>` : ''}
          <div class="menu-card-toggle">
            <span class="toggle-label">${isVisible ? 'Visible' : 'Hidden'}</span>
            <label class="toggle-switch">
              <input type="checkbox" ${isVisible ? 'checked' : ''} onchange="toggleMenuItem('${key}')">
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  });
}

function toggleMenuItem(key) {
  menuVisibility[key] = !menuVisibility[key];
  saveMenuVisibility(); // Auto-save
  renderMenuItems(currentActiveCategory);
  showNotification('Menu item visibility updated', 'success', 2000);
}

function toggleAllItems(visible) {
  if (currentActiveCategory === 'all') {
    // Toggle all items across all categories
    Object.keys(MENU_DATA).forEach(category => {
      MENU_DATA[category].forEach(item => {
        const key = `${category}-${item.name}`;
        menuVisibility[key] = visible;
      });
    });
  } else {
    // Toggle only items in the current category
    MENU_DATA[currentActiveCategory].forEach(item => {
      const key = `${currentActiveCategory}-${item.name}`;
      menuVisibility[key] = visible;
    });
  }
  
  saveMenuVisibility(); // Auto-save
  renderMenuItems(currentActiveCategory);
  
  const categoryText = currentActiveCategory === 'all' ? 'all items' : `all ${currentActiveCategory} items`;
  showNotification(`${categoryText} ${visible ? 'shown' : 'hidden'}`, 'success', 2000);
}

function saveMenuChanges() {
  saveMenuVisibility();
  showNotification('Menu changes saved successfully!', 'success', 2000);
}

// ==========================================
// ROOM MANAGEMENT
// ==========================================
function loadRoomsData() {
  const saved = localStorage.getItem('roomsData');
  if (saved) {
    roomsData = JSON.parse(saved);
  } else {
    // Initialize with specific room numbers
    const roomNumbers = [401, 402, 403, 404, 405, 501, 502, 503, 504, 505, 506];
    roomNumbers.forEach(num => {
      roomsData[num] = 'vacant';
    });
    saveRoomsData();
  }
}

function saveRoomsData() {
  localStorage.setItem('roomsData', JSON.stringify(roomsData));
}

function loadRoomManagement() {
  renderRooms();
}

function renderRooms() {
  const grid = document.getElementById('roomsGrid');
  
  if (!grid) {
    return;
  }
  
  grid.innerHTML = '';

  const sortedRooms = Object.keys(roomsData).sort((a, b) => a - b);

  if (sortedRooms.length === 0) {
    // Re-initialize if empty with specific room numbers
    const roomNumbers = [401, 402, 403, 404, 405, 501, 502, 503, 504, 505, 506];
    roomNumbers.forEach(num => {
      roomsData[num] = 'vacant';
    });
    saveRoomsData();
    renderRooms();
    return;
  }

  sortedRooms.forEach(roomNumber => {
    const status = roomsData[roomNumber];
    const card = document.createElement('div');
    card.className = `room-card ${status}`;
    card.onclick = () => showRoomDetails(roomNumber);
    card.innerHTML = `
      <div class="room-number">${roomNumber}</div>
      <div class="room-status-selector" onclick="event.stopPropagation()">
        <button class="status-btn occupied ${status === 'occupied' ? 'active' : ''}" 
                onclick="setRoomStatus('${roomNumber}', 'occupied')" 
                title="Occupied"></button>
        <button class="status-btn vacant ${status === 'vacant' ? 'active' : ''}" 
                onclick="setRoomStatus('${roomNumber}', 'vacant')" 
                title="Vacant"></button>
        <button class="status-btn maybe ${status === 'maybe' ? 'active' : ''}" 
                onclick="setRoomStatus('${roomNumber}', 'maybe')" 
                title="Maybe"></button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function setRoomStatus(roomNumber, status) {
  roomsData[roomNumber] = status;
  saveRoomsData();
  renderRooms();
  showNotification(`Room ${roomNumber} status updated to ${status}`, 'success');
}

function showRoomDetails(roomNumber) {
  const modal = document.getElementById('roomDetailModal');
  document.getElementById('modalRoomNumber').textContent = roomNumber;
  
  const content = document.getElementById('roomDetailContent');
  content.innerHTML = '<p style="text-align: center; color: #6c757d;"><i class="fas fa-spinner fa-spin"></i> Loading bills...</p>';
  
  modal.style.display = 'block';
  
  // Filter bills for this room
  const roomBills = billsData.filter(bill => bill.roomNumber === roomNumber);
  
  if (roomBills.length === 0) {
    content.innerHTML = '<p style="text-align: center; color: #6c757d;">No bills found for this room.</p>';
  } else {
    let totalAmount = 0;
    let html = '';
    
    roomBills.forEach(bill => {
      totalAmount += parseFloat(bill.total || 0);
      html += `
        <div class="bill-order-item">
          <div class="order-date"><i class="fas fa-calendar"></i> ${bill.orderDate}</div>
          <div class="order-items"><strong>Items:</strong> ${bill.items}</div>
          <div class="order-total"><i class="fas fa-coins"></i> ${bill.total} L.E</div>
        </div>
      `;
    });
    
    content.innerHTML = `
      <div style="background: linear-gradient(135deg, #43a1c7 0%, #356980 100%); color: white; padding: 20px; border-radius: 12px; margin-bottom: 20px; text-align: center;">
        <h3 style="margin: 0 0 10px 0; font-size: 1.8rem;">${totalAmount.toFixed(2)} L.E</h3>
        <p style="margin: 0; opacity: 0.9;">Total Outstanding Balance</p>
      </div>
      ${html}
    `;
  }
}

function closeRoomModal() {
  document.getElementById('roomDetailModal').style.display = 'none';
}

// ==========================================
// BILLS MANAGEMENT
// ==========================================
function loadBillsManagement() {
  refreshBills();
}

async function refreshBills() {
  showNotification('Fetching bills from Google Sheets...', 'info');
  
  try {
    const response = await fetch(ADMIN_CONFIG.googleSheetsUrl);
    const text = await response.text();
    
    // Remove the callback wrapper from Google Sheets response
    const jsonString = text.match(/google\.visualization\.Query\.setResponse\((.*)\);/)[1];
    const data = JSON.parse(jsonString);
    
    // Parse the data
    const rows = data.table.rows;
    billsData = [];
    
rows.forEach((row, index) => {
      try {
        const cells = row.c;
        const status = cells[6]?.v || ''; // Column 7 (index 6) - Status
        
        // Only include unpaid bills
        if (status.toLowerCase() !== 'paid') {
          // Parse the date properly
          let orderDate = cells[4]?.v || cells[4]?.f || '';
          
          // If date is in format "Date(2025,10,16)", parse it
          if (typeof orderDate === 'string' && orderDate.includes('Date(')) {
            const dateMatch = orderDate.match(/Date\((\d+),(\d+),(\d+)\)/);
            if (dateMatch) {
              const year = dateMatch[1];
              const month = String(parseInt(dateMatch[2]) + 1).padStart(2, '0'); // Month is 0-indexed
              const day = String(dateMatch[3]).padStart(2, '0');
              orderDate = `${year}-${month}-${day}`;
            }
          }
          
          billsData.push({
            rowIndex: index + 2, // +2 because: +1 for header row, +1 for 0-based to 1-based
            type: cells[0]?.v || '',
            roomNumber: cells[1]?.v || '',
            items: cells[2]?.v || '',
            total: cells[3]?.v || '0',
            orderDate: orderDate,
            status: status
          });
        }
      } catch (e) {
        console.error('Error parsing row:', e);
      }
    });
    
    renderBills();
    showNotification('Bills loaded successfully!', 'success');
  } catch (error) {
    console.error('Error fetching bills:', error);
    showNotification('Failed to load bills. Please try again.', 'error');
  }
}

function renderBills() {
  // Calculate summary
  const totalBills = billsData.length;
  const totalAmount = billsData.reduce((sum, bill) => sum + parseFloat(bill.total || 0), 0);
  const uniqueRooms = new Set(billsData.map(bill => bill.roomNumber)).size;
  
  document.getElementById('totalUnpaidBills').textContent = totalBills;
  document.getElementById('totalUnpaidAmount').textContent = totalAmount.toFixed(2) + ' L.E';
  document.getElementById('roomsWithBills').textContent = uniqueRooms;
  
  // Group bills by room
  const billsByRoom = {};
  billsData.forEach(bill => {
    if (!billsByRoom[bill.roomNumber]) {
      billsByRoom[bill.roomNumber] = [];
    }
    billsByRoom[bill.roomNumber].push(bill);
  });
  
  // Render bills
  const grid = document.getElementById('billsGrid');
  grid.innerHTML = '';
  
  Object.keys(billsByRoom).sort((a, b) => a - b).forEach(roomNumber => {
    const roomBills = billsByRoom[roomNumber];
    const roomTotal = roomBills.reduce((sum, bill) => sum + parseFloat(bill.total || 0), 0);
    
    const card = document.createElement('div');
    card.className = 'bill-card';
    
    let ordersHtml = '';
    roomBills.forEach(bill => {
      ordersHtml += `
        <div class="bill-order-item">
          <div class="order-date"><i class="fas fa-calendar"></i> ${bill.orderDate} </div>
          <div class="order-items"><strong>${bill.type}:</strong> ${bill.items}</div>
          <div class="order-total"><i class="fas fa-coins"></i> ${bill.total} L.E</div>
          <div class="bill-actions">
            <button class="action-btn edit-btn" onclick="editBill(${bill.rowIndex})" title="Edit">
              <i class="fas fa-edit"></i> Edit
            </button>
            <button class="action-btn paid-btn" onclick="confirmPaid(${bill.rowIndex})" title="Mark as Paid">
              <i class="fas fa-check"></i> Paid
            </button>
            <button class="action-btn delete-btn" onclick="deleteBill(${bill.rowIndex})" title="Delete">
              <i class="fas fa-trash"></i> Delete
            </button>
          </div>
        </div>
      `;
    });
    
    card.innerHTML = `
      <div class="bill-header">
        <div class="bill-room"><i class="fas fa-door-open"></i> Room ${roomNumber}</div>
        <div class="bill-total"><i class="fas fa-coins"></i> ${roomTotal.toFixed(2)} L.E</div>
      </div>
      <div class="bill-orders">
        ${ordersHtml}
      </div>
    `;
    
    grid.appendChild(card);
  });
  
  if (Object.keys(billsByRoom).length === 0) {
    grid.innerHTML = '<p style="text-align: center; color: #6c757d; padding: 40px;">No unpaid bills found.</p>';
  }
}

// ==========================================
// BILL ACTIONS
// ==========================================
async function confirmPaid(rowIndex) {
  showConfirmModal(
    'Mark as Paid?',
    'Are you sure you want to mark this bill as PAID? This action will update the status in the system.',
    'warning',
    async () => {
      showNotification('Updating status...', 'info');
      
      try {
        const response = await fetch(ADMIN_CONFIG.appsScriptUrl, {
          method: 'POST',
          body: JSON.stringify({
            action: 'markPaid',
            rowIndex: rowIndex
          })
        });
        
        const result = await response.text();
        
        if (result === 'Success') {
          showNotification('Bill marked as paid successfully!', 'success');
          await refreshBills();
        } else {
          showNotification('Failed to update bill: ' + result, 'error');
        }
      } catch (error) {
        console.error('Error marking bill as paid:', error);
        showNotification('Error updating bill. Please try again.', 'error');
      }
    }
  );
}

async function deleteBill(rowIndex) {
  showConfirmModal(
    'Delete Bill?',
    'Are you sure you want to DELETE this bill? This action cannot be undone and will permanently remove the record.',
    'danger',
    async () => {
      showNotification('Deleting bill...', 'info');
      
      try {
        const response = await fetch(ADMIN_CONFIG.appsScriptUrl, {
          method: 'POST',
          body: JSON.stringify({
            action: 'deleteBill',
            rowIndex: rowIndex
          })
        });
        
        const result = await response.text();
        
        if (result === 'Success') {
          showNotification('Bill deleted successfully!', 'success');
          await refreshBills();
        } else {
          showNotification('Failed to delete bill: ' + result, 'error');
        }
      } catch (error) {
        console.error('Error deleting bill:', error);
        showNotification('Error deleting bill. Please try again.', 'error');
      }
    }
  );
}

function editBill(rowIndex) {
  const bill = billsData.find(b => b.rowIndex === rowIndex);
  
  if (!bill) {
    showNotification('Bill not found!', 'error');
    return;
  }
  
  // Populate edit modal
  document.getElementById('editRowIndex').value = rowIndex;
  document.getElementById('editRoomNumber').value = bill.roomNumber;
  document.getElementById('editItems').value = bill.items;
  document.getElementById('editTotal').value = bill.total.replace('L.E', '').trim();
  
  // Show modal
  document.getElementById('editBillModal').style.display = 'block';
}

function closeEditModal() {
  document.getElementById('editBillModal').style.display = 'none';
}

async function saveEditedBill() {
  const rowIndex = document.getElementById('editRowIndex').value;
  const roomNumber = document.getElementById('editRoomNumber').value;
  const items = document.getElementById('editItems').value;
  const total = document.getElementById('editTotal').value;
  
  if (!roomNumber || !items || !total) {
    showNotification('Please fill in all fields!', 'error');
    return;
  }
  
  showConfirmModal(
    'Save Changes?',
    'Are you sure you want to save these changes to the bill?',
    'warning',
    async () => {
      showNotification('Updating bill...', 'info');
      
      try {
        const response = await fetch(ADMIN_CONFIG.appsScriptUrl, {
          method: 'POST',
          body: JSON.stringify({
            action: 'editBill',
            rowIndex: parseInt(rowIndex),
            roomNumber: roomNumber,
            items: items,
            total: total
          })
        });
        
        const result = await response.text();
        
        if (result === 'Success') {
          showNotification('Bill updated successfully!', 'success');
          closeEditModal();
          await refreshBills();
        } else {
          showNotification('Failed to update bill: ' + result, 'error');
        }
      } catch (error) {
        console.error('Error updating bill:', error);
        showNotification('Error updating bill. Please try again.', 'error');
      }
    }
  );
}

// ==========================================
// NOTIFICATIONS
// ==========================================
function showNotification(message, type = 'info', duration = 4000) {
  const container = document.getElementById('notificationContainer');
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  
  let icon = 'fa-info-circle';
  if (type === 'success') icon = 'fa-check-circle';
  if (type === 'error') icon = 'fa-exclamation-circle';
  
  notification.innerHTML = `
    <i class="fas ${icon}"></i>
    <span>${message}</span>
  `;
  
  container.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, duration);
}

// ==========================================
// CONFIRMATION MODAL
// ==========================================
function showConfirmModal(title, message, type = 'warning', onConfirm) {
  const modal = document.getElementById('confirmModal');
  const iconContainer = document.getElementById('confirmIcon');
  const confirmButton = document.getElementById('confirmButton');
  
  // Set title and message
  document.getElementById('confirmTitle').textContent = title;
  document.getElementById('confirmMessage').textContent = message;
  
  // Set icon and style based on type
  iconContainer.className = `confirm-modal-icon ${type}`;
  
  if (type === 'danger') {
    iconContainer.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
    confirmButton.className = 'confirm-btn confirm-btn-danger';
    confirmButton.innerHTML = '<i class="fas fa-trash"></i> Delete';
  } else if (type === 'warning') {
    iconContainer.innerHTML = '<i class="fas fa-check-circle"></i>';
    confirmButton.className = 'confirm-btn confirm-btn-confirm';
    confirmButton.innerHTML = '<i class="fas fa-check"></i> Confirm';
  }
  
  // Set up confirm button handler
  confirmButton.onclick = () => {
    closeConfirmModal();
    if (onConfirm) onConfirm();
  };
  
  // Show modal
  modal.style.display = 'block';
}

function closeConfirmModal() {
  document.getElementById('confirmModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
  const confirmModal = document.getElementById('confirmModal');
  const editModal = document.getElementById('editBillModal');
  const roomModal = document.getElementById('roomDetailModal');
  
  if (event.target === confirmModal) {
    closeConfirmModal();
  }
  if (event.target === editModal) {
    closeEditModal();
  }
  if (event.target === roomModal) {
    closeRoomModal();
  }
}

// Make functions globally accessible
window.toggleMenuItem = toggleMenuItem;
window.toggleAllItems = toggleAllItems;
window.saveMenuChanges = saveMenuChanges;
window.setRoomStatus = setRoomStatus;
window.showRoomDetails = showRoomDetails;
window.closeRoomModal = closeRoomModal;
window.refreshBills = refreshBills;
window.logout = logout;
window.editBill = editBill;
window.confirmPaid = confirmPaid;
window.deleteBill = deleteBill;
window.closeEditModal = closeEditModal;
window.saveEditedBill = saveEditedBill;
window.closeConfirmModal = closeConfirmModal;