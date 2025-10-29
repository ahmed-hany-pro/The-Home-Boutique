// Email Configuration
const EMAIL_CONFIG = {
    service: 'gmail', // Email service provider
    user: 'ahhasa842@gmail.com', // Your email address
    password: 'your-app-password', // Your app password (not regular password)
    recipients: {
        food: 'ahmedhany40w@gmail.com', // Food service email
        tour: 'ahmedhany40w@gmail.com', // Tour service email
        transport: 'ahmedhany40w@gmail.com', // Transport service email
        housekeeping: 'ahmedhany40w@gmail.com' // Housekeeping service email
    }
};

// Google Sheets Configuration
const GOOGLE_SHEETS_CONFIG = {
    webAppUrl: 'https://script.google.com/macros/s/AKfycbzA5nHOgb44S_ivrnDz2G3vLDYppNKSLdZwGjCUSTyGrd5Q1vR0z14GljwKm8Orf19k/exec', // Replace with your Web App URL
    enableLogging: true // Set to false to disable logging
};

// Global Variables
let cart = [];
let currentTab = 'food';

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeSplashScreen();
    initializeTabs();
    initializeMenu();
    initializeForms();
    updateCartDisplay();
    initializeHousekeepingCheckbox();
});

// Splash Screen functionality
function initializeSplashScreen() {
    const splashScreen = document.getElementById('splashScreen');
    
    // Show splash screen for 3 seconds, then fade out
    setTimeout(() => {
        splashScreen.classList.add('fade-out');
        
        // Remove splash screen from DOM after fade animation completes
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 800); // Match the CSS transition duration
    }, 3000); // Show for 3 seconds
}

// Tab Navigation
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
}

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update tab panels
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');

    currentTab = tabName;
}

// Menu Functionality
function initializeMenu() {
    // Category buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            switchCategory(category);
        });
    });

    // Add to cart buttons
    const addButtons = document.querySelectorAll('.add-btn');
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            addToCart(name, price);
        });
    });
}

function switchCategory(category) {
    // Update category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');

    // Update category panels
    document.querySelectorAll('.menu-category').forEach(panel => {
        panel.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"].menu-category`).classList.add('active');
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showSuccessMessage(`${name} added to cart!`);
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartDisplay();
}

function updateQuantity(name, change) {
    const item = cart.find(item => item.name === name);
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
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    const placeOrderBtn = document.getElementById('placeOrderBtn');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        totalPrice.textContent = '0.00';
        placeOrderBtn.disabled = true;
        return;
    }

    let cartHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
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
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    placeOrderBtn.addEventListener('click', handleFoodOrder);

    // Tour form
    const tourForm = document.getElementById('tourForm');
    tourForm.addEventListener('submit', handleTourForm);

    // Transport form
    const transportForm = document.getElementById('transportForm');
    transportForm.addEventListener('submit', handleTransportForm);

    // Housekeeping form
    const housekeepingForm = document.getElementById('housekeepingForm');
    housekeepingForm.addEventListener('submit', handleHousekeepingForm);
}

// Housekeeping immediate service checkbox functionality
function initializeHousekeepingCheckbox() {
    const immediateServiceCheckbox = document.getElementById('immediateService');
    const dateTimeFields = document.getElementById('dateTimeFields');
    const timeField = document.getElementById('timeField');
    const cleaningDate = document.getElementById('cleaningDate');
    const cleaningTime = document.getElementById('cleaningTime');
    const checkboxLabel = document.querySelector('.checkbox-label');

    if (immediateServiceCheckbox) {
        immediateServiceCheckbox.addEventListener('change', function() {
            if (this.checked) {
                // Add checked class for styling
                checkboxLabel.classList.add('checked');
                
                // Hide date and time fields when immediate service is selected
                dateTimeFields.style.display = 'none';
                timeField.style.display = 'none';
                
                // Remove required attribute from date and time fields
                cleaningDate.removeAttribute('required');
                cleaningTime.removeAttribute('required');
            } else {
                // Remove checked class
                checkboxLabel.classList.remove('checked');
                
                // Show date and time fields when immediate service is not selected
                dateTimeFields.style.display = 'block';
                timeField.style.display = 'block';
                
                // Add required attribute back to date and time fields
                cleaningDate.setAttribute('required', 'required');
                cleaningTime.setAttribute('required', 'required');
            }
        });
    }
}

function handleFoodOrder(e) {
    e.preventDefault();
    
    if (cart.length === 0) {
        showErrorMessage('Your cart is empty!');
        return;
    }

    const customerName = document.getElementById('customerName').value.trim();
    const roomNumber = document.getElementById('roomNumber').value.trim();
    
    if (!customerName) {
        showErrorMessage('Please enter your name!');
        return;
    }
    
    if (!roomNumber) {
        showErrorMessage('Please enter your room number!');
        return;
    }

    const orderDetails = generateFoodOrderMessage(customerName, roomNumber);
    const confirmationContent = generateFoodConfirmationContent(customerName, roomNumber);
    
    // Prepare Google Sheets data
    let orderTotal = 0;
    let orderItems = [];
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        orderTotal += itemTotal;
        orderItems.push(`${item.name} x${item.quantity}`);
    });
    
    const orderData = {
        type: 'Food Order',
        customerName: customerName,
        roomNumber: roomNumber,
        items: orderItems.join(', '),
        total: orderTotal.toFixed(2),
        orderDate: new Date().toISOString().split('T')[0],
        orderTime: new Date().toLocaleTimeString()
    };
    
    const emailData = {
        message: orderDetails,
        recipient: EMAIL_CONFIG.recipients.food,
        subject: `Room ${roomNumber} - Food Order Request`,
        roomNumber: roomNumber,
        orderData: orderData
    };
    
    showConfirmationModal(confirmationContent, emailData);
}

function handleTourForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const customerName = formData.get('tourCustomerName');
    const roomNumber = formData.get('tourRoomNumber');
    
    if (!customerName || !customerName.trim()) {
        showErrorMessage('Please enter your name!');
        return;
    }
    
    if (!roomNumber || !roomNumber.trim()) {
        showErrorMessage('Please enter your room number!');
        return;
    }
    
    const tourDetails = generateTourMessage(formData);
    const confirmationContent = generateTourConfirmationContent(formData);
    
    // Prepare Google Sheets data
    const orderData = {
        type: 'Tour Organization',
        customerName: formData.get('tourCustomerName'),
        roomNumber: formData.get('tourRoomNumber'),
        destination: formData.get('tourDestination'),
        date: formData.get('tourDate'),
        time: formData.get('tourTime'),
        duration: formData.get('tourDuration'),
        participants: formData.get('tourParticipants'),
        specialRequests: formData.get('tourSpecialRequests') || '',
        orderDate: new Date().toISOString().split('T')[0],
        orderTime: new Date().toLocaleTimeString()
    };
    
    const emailData = {
        message: tourDetails,
        recipient: EMAIL_CONFIG.recipients.tour,
        subject: `Room ${roomNumber} - Tour Organization Request`,
        roomNumber: roomNumber,
        orderData: orderData
    };
    
    showConfirmationModal(confirmationContent, emailData);
}

function handleTransportForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const customerName = formData.get('transportCustomerName');
    const roomNumber = formData.get('transportRoomNumber');
    
    if (!customerName || !customerName.trim()) {
        showErrorMessage('Please enter your name!');
        return;
    }
    
    if (!roomNumber || !roomNumber.trim()) {
        showErrorMessage('Please enter your room number!');
        return;
    }
    
    const transportDetails = generateTransportMessage(formData);
    const confirmationContent = generateTransportConfirmationContent(formData);
    
    // Prepare Google Sheets data
    const orderData = {
        type: 'Transportation',
        customerName: formData.get('transportCustomerName'),
        roomNumber: formData.get('transportRoomNumber'),
        transportType: formData.get('transportType'),
        pickupLocation: formData.get('pickupLocation'),
        destination: formData.get('destination'),
        date: formData.get('transportDate'),
        time: formData.get('transportTime'),
        passengers: formData.get('passengers'),
        specialRequests: formData.get('transportSpecialRequests') || '',
        orderDate: new Date().toISOString().split('T')[0],
        orderTime: new Date().toLocaleTimeString()
    };
    
    const emailData = {
        message: transportDetails,
        recipient: EMAIL_CONFIG.recipients.transport,
        subject: `Room ${roomNumber} - Transportation Request`,
        roomNumber: roomNumber,
        orderData: orderData
    };
    
    showConfirmationModal(confirmationContent, emailData);
}

function handleHousekeepingForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const customerName = formData.get('housekeepingCustomerName');
    const roomNumber = formData.get('housekeepingRoomNumber');
    
    if (!customerName || !customerName.trim()) {
        showErrorMessage('Please enter your name!');
        return;
    }
    
    if (!roomNumber || !roomNumber.trim()) {
        showErrorMessage('Please enter your room number!');
        return;
    }
    
    const housekeepingDetails = generateHousekeepingMessage(formData);
    const confirmationContent = generateHousekeepingConfirmationContent(formData);
    const emailData = {
        message: housekeepingDetails,
        recipient: EMAIL_CONFIG.recipients.housekeeping,
        subject: `Room ${roomNumber} - Housekeeping Request`,
        roomNumber: roomNumber
    };
    
    showConfirmationModal(confirmationContent, emailData);
}

// Message Generation
function generateFoodOrderMessage(customerName, roomNumber) {
    let message = '🍽️ FOOD ORDER REQUEST\n\n';
    message += `👤 Guest Name: ${customerName}\n`;
    message += `🏨 Room Number: ${roomNumber}\n\n`;
    message += '📋 Order Details:\n';
    
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += ` x${item.quantity} ${item.name} -> ${itemTotal.toFixed(2)}$\n`;
    });
    
    message += `\n💰 Total: ${total.toFixed(2)}$\n`;
    message += `\n📅 Order Date: ${new Date().toLocaleDateString()}\n`;
    message += `🕐 Order Time: ${new Date().toLocaleTimeString()}\n`;
    
    return message;
}

function generateTourMessage(formData) {
    let message = '🗺️ TOUR ORGANIZATION REQUEST\n\n';
    message += `👤 Guest Name: ${formData.get('tourCustomerName')}\n`;
    message += `🏨 Room Number: ${formData.get('tourRoomNumber')}\n\n`;
    message += '📍 Destination: ' + formData.get('tourDestination') + '\n';
    message += '📅 Date: ' + formData.get('tourDate') + '\n';
    message += '🕐 Time: ' + formData.get('tourTime') + '\n';
    message += '⏱️ Duration: ' + formData.get('tourDuration') + '\n';
    message += '👥 Participants: ' + formData.get('tourParticipants') + '\n';
    
    if (formData.get('tourSpecialRequests')) {
        message += '📝 Special Requests: ' + formData.get('tourSpecialRequests') + '\n';
    }
    
    message += `\n📅 Request Date: ${new Date().toLocaleDateString()}\n`;
    message += `🕐 Request Time: ${new Date().toLocaleTimeString()}\n`;
    
    return message;
}

function generateTransportMessage(formData) {
    let message = '🚗 TRANSPORTATION REQUEST\n\n';
    message += `👤 Guest Name: ${formData.get('transportCustomerName')}\n`;
    message += `🏨 Room Number: ${formData.get('transportRoomNumber')}\n\n`;
    message += '🚙 Transport Type: ' + formData.get('transportType') + '\n';
    message += '📍 Pickup Location: ' + formData.get('pickupLocation') + '\n';
    message += '🎯 Destination: ' + formData.get('destination') + '\n';
    message += '📅 Date: ' + formData.get('transportDate') + '\n';
    message += '🕐 Time: ' + formData.get('transportTime') + '\n';
    message += '👥 Passengers: ' + formData.get('passengers') + '\n';
    
    if (formData.get('transportSpecialRequests')) {
        message += '📝 Special Requests: ' + formData.get('transportSpecialRequests') + '\n';
    }
    
    message += `\n📅 Request Date: ${new Date().toLocaleDateString()}\n`;
    message += `🕐 Request Time: ${new Date().toLocaleTimeString()}\n`;
    
    return message;
}

function generateHousekeepingMessage(formData) {
    let message = '🏠 HOUSEKEEPING REQUEST\n\n';
    message += `👤 Guest Name: ${formData.get('housekeepingCustomerName')}\n`;
    message += `🏨 Room Number: ${formData.get('housekeepingRoomNumber')}\n\n`;
    
    // Check if immediate service is requested
    const immediateService = document.getElementById('immediateService').checked;
    if (immediateService) {
        message += '⚡ SERVICE TYPE: IMMEDIATE SERVICE REQUESTED\n';
        message += '🕐 Requested Time: ASAP (As Soon As Possible)\n';
    } else {
        message += '📅 Preferred Date: ' + formData.get('cleaningDate') + '\n';
        message += '🕐 Preferred Time: ' + formData.get('cleaningTime') + '\n';
    }
    
    if (formData.get('housekeepingSpecialRequests')) {
        message += '📝 *Special Requests:* ' + formData.get('housekeepingSpecialRequests') + '\n';
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
    if (!GOOGLE_SHEETS_CONFIG.webAppUrl || GOOGLE_SHEETS_CONFIG.webAppUrl === 'https://script.google.com/macros/s/YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL/exec') {
        console.log('Google Sheets URL not configured. Skipping data save.');
        return;
    }
    
    // Send data to Google Sheets (one URL handles all tabs)
    fetch(GOOGLE_SHEETS_CONFIG.webAppUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
    }).then(() => {
        console.log(orderData.type + ' saved to Google Sheets');
    }).catch(error => {
        console.error('Error saving to Google Sheets:', error);
    });
}

// Email Integration using EmailJS
function sendEmail(message, recipient, subject, roomNumber, orderData = null) {
    // Show loading state
    showInfoMessage('Sending your request...');
    
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
        reply_to: EMAIL_CONFIG.user
    };
    
    // Send email using EmailJS
    emailjs.send('service_eh9ii0d', 'template_wh5vo5k', emailData)
        .then(function(response) {
            console.log('Your request sent successfully!', response.status, response.text);
            showSuccessMessage('Your request sent successfully!');
            
            // Clear cart if it's a food order
            if (currentTab === 'food') {
                cart = [];
                updateCartDisplay();
                document.getElementById('customerName').value = '';
                document.getElementById('roomNumber').value = '';
            } else {
                // Reset forms for other services
                const forms = document.querySelectorAll('.service-form');
                forms.forEach(form => form.reset());
            }
        })
        .catch(function(error) {
            console.error('Error sending request:', error);
            showErrorMessage('Failed to send request automatically. Please try again.');
        });
}

// Confirmation Content Generators
function generateFoodConfirmationContent(customerName, roomNumber) {
    let total = 0;
    let itemsHtml = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        itemsHtml += `
            <div class="order-item">
                <span>${item.name} x${item.quantity}</span>
                <span>$${itemTotal.toFixed(2)}</span>
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
                <div class="total">Total: $${total.toFixed(2)}</div>
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
                <i class="fas fa-user"></i> Your Name: ${formData.get('tourCustomerName')}
            </div>
            <div class="room-number">
                <i class="fas fa-door-open"></i> Room Number: ${formData.get('tourRoomNumber')}
            </div>
            <h4><i class="fas fa-map-marked-alt"></i> Tour Request Details</h4>
            <p><strong>Destination:</strong> ${formData.get('tourDestination')}</p>
            <p><strong>Date:</strong> ${formData.get('tourDate')}</p>
            <p><strong>Time:</strong> ${formData.get('tourTime')}</p>
            <p><strong>Duration:</strong> ${formData.get('tourDuration')}</p>
            <p><strong>Participants:</strong> ${formData.get('tourParticipants')}</p>
            ${formData.get('tourSpecialRequests') ? `<p><strong>Special Requests:</strong> ${formData.get('tourSpecialRequests')}</p>` : ''}
            <p><strong>Request Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
    `;
}

function generateTransportConfirmationContent(formData) {
    return `
        <div class="confirmation-content">
            <div class="room-number">
                <i class="fas fa-user"></i> Your Name: ${formData.get('transportCustomerName')}
            </div>
            <div class="room-number">
                <i class="fas fa-door-open"></i> Room Number: ${formData.get('transportRoomNumber')}
            </div>
            <h4><i class="fas fa-car"></i> Transportation Request Details</h4>
            <p><strong>Transport Type:</strong> ${formData.get('transportType')}</p>
            <p><strong>Pickup Location:</strong> ${formData.get('pickupLocation')}</p>
            <p><strong>Destination:</strong> ${formData.get('destination')}</p>
            <p><strong>Date:</strong> ${formData.get('transportDate')}</p>
            <p><strong>Time:</strong> ${formData.get('transportTime')}</p>
            <p><strong>Passengers:</strong> ${formData.get('passengers')}</p>
            ${formData.get('transportSpecialRequests') ? `<p><strong>Special Requests:</strong> ${formData.get('transportSpecialRequests')}</p>` : ''}
            <p><strong>Request Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
    `;
}

function generateHousekeepingConfirmationContent(formData) {
    const immediateService = document.getElementById('immediateService').checked;
    
    let serviceDetails = '';
    if (immediateService) {
        serviceDetails = `
            <p><strong>Service Type:</strong> <span style="color: #43a1c7; font-weight: 600;">⚡ IMMEDIATE SERVICE</span></p>
            <p><strong>Requested Time:</strong> ASAP (As Soon As Possible)</p>
        `;
    } else {
        serviceDetails = `
            <p><strong>Preferred Date:</strong> ${formData.get('cleaningDate')}</p>
            <p><strong>Preferred Time:</strong> ${formData.get('cleaningTime')}</p>
        `;
    }
    
    return `
        <div class="confirmation-content">
            <div class="room-number">
                <i class="fas fa-user"></i> Your Name: ${formData.get('housekeepingCustomerName')}
            </div>
            <div class="room-number">
                <i class="fas fa-door-open"></i> Room Number: ${formData.get('housekeepingRoomNumber')}
            </div>
            <h4><i class="fas fa-home"></i> Housekeeping Request Details</h4>
            ${serviceDetails}
            ${formData.get('housekeepingSpecialRequests') ? `<p><strong>Special Requests:</strong> ${formData.get('housekeepingSpecialRequests')}</p>` : ''}
            <p><strong>Request Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
    `;
}

// Confirmation Modal Functions
let pendingEmailData = null;

function showConfirmationModal(content, emailData) {
    pendingEmailData = emailData;
    document.getElementById('confirmationContent').innerHTML = content;
    document.getElementById('confirmationModal').style.display = 'block';
    
    // Set up confirm button event listener
    const confirmBtn = document.getElementById('confirmSendBtn');
    confirmBtn.onclick = function() {
        sendEmail(emailData.message, emailData.recipient, emailData.subject, emailData.roomNumber, emailData.orderData);
        closeConfirmationModal();
    };
}

function closeConfirmationModal() {
    document.getElementById('confirmationModal').style.display = 'none';
    pendingEmailData = null;
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('confirmationModal');
    if (event.target === modal) {
        closeConfirmationModal();
    }
}

// Fixed Notification System
function showNotification(message, type = 'info', duration = 4000) {
    const container = document.getElementById('notificationContainer');
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Set icon based on type
    let icon = 'fas fa-info-circle';
    if (type === 'success') icon = 'fas fa-check-circle';
    if (type === 'error') icon = 'fas fa-exclamation-circle';
    if (type === 'info') icon = 'fas fa-info-circle';
    
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
            removeNotification(notification.querySelector('.notification-close'));
        }, duration);
    }
    
    return notification;
}

function removeNotification(closeBtn) {
    const notification = closeBtn.closest('.notification');
    if (notification) {
        notification.classList.add('removing');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// Utility Functions
function showSuccessMessage(text) {
    showNotification(text, 'success', 3000);
}

function showErrorMessage(text) {
    showNotification(text, 'error', 5000);
}

function showInfoMessage(text) {
    showNotification(text, 'info', 4000);
}

// Set minimum date to today for date inputs
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.min = today;
    });
});

// Add loading state to forms
function addLoadingState(form) {
    form.classList.add('loading');
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        form.classList.remove('loading');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Enhanced form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            field.style.borderColor = '#e9ecef';
        }
    });
    
    return isValid;
}

// Note: Form validation is handled individually in each form handler
// (handleTourForm, handleTransportForm, handleHousekeepingForm)
