# Mobile Services Web Application

A beautiful, responsive mobile web application that provides four main services with automatic email integration for seamless communication.

## Features

### 🍽️ Order Food
- Interactive menu with categories (Main Dishes, Appetizers, Drinks, Desserts)
- Shopping cart functionality with quantity controls
- Real-time price calculation
- Automatic email integration for order placement

### 🗺️ Tour Organization
- Comprehensive tour request form
- Destination, date, time, and duration selection
- Participant count and special requests
- Automatic email integration for tour booking

### 🚗 Transportation
- Multiple transport type options (Taxi, Bus, Private Car, Van, Motorcycle)
- Pickup and destination location input
- Date, time, and passenger count selection
- Automatic email integration for transport booking

### 🏠 Housekeeping
- Various service types (Regular, Deep, Window, Carpet, Kitchen, Bathroom cleaning)
- Property size and address input
- Flexible scheduling options
- Frequency selection (One-time, Weekly, Bi-weekly, Monthly)
- Automatic email integration for service booking

## Technology Stack

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)** - Interactive functionality and form handling
- **Font Awesome** - Beautiful icons
- **EmailJS** - Automatic email sending integration

## Setup Instructions

### 1. Download Files
Download all three files to the same directory:
- `index.html`
- `styles.css`
- `script.js`

### 2. Configure Email Settings
Edit the `script.js` file and update the email configuration:

```javascript
const EMAIL_CONFIG = {
    service: 'gmail', // Email service provider
    user: 'your-email@gmail.com', // Your email address
    password: 'your-app-password', // Your app password (not regular password)
    recipients: {
        food: 'food-service@yourcompany.com', // Food service email
        tour: 'tour-service@yourcompany.com', // Tour service email
        transport: 'transport-service@yourcompany.com', // Transport service email
        housekeeping: 'housekeeping-service@yourcompany.com' // Housekeeping service email
    }
};
```

### 3. Setup EmailJS (Recommended)
For automatic email sending, set up EmailJS:

1. Go to [EmailJS.com](https://www.emailjs.com/) and create a free account
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Update the following in your files:

**In `index.html`:**
```javascript
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
```

**In `script.js`:**
```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailData)
```

### 4. Customize Menu Items
In the `index.html` file, you can customize the menu items by editing the menu sections:

```html
<div class="menu-item">
    <div class="item-info">
        <h4>Your Item Name</h4>
        <p>Item description</p>
    </div>
    <div class="item-price">$XX.XX</div>
    <button class="add-btn" data-name="Your Item Name" data-price="XX.XX">
        <i class="fas fa-plus"></i>
    </button>
</div>
```

### 5. Deploy
You can deploy this application in several ways:

#### Option A: Local Development
- Simply open `index.html` in a web browser
- For mobile testing, use a local server or deploy to a web hosting service

#### Option B: Web Hosting
- Upload all files to your web hosting service
- Ensure the files are accessible via HTTPS for EmailJS integration

#### Option C: GitHub Pages
- Create a GitHub repository
- Upload the files
- Enable GitHub Pages in repository settings

## Mobile Optimization

The application is specifically designed for mobile devices with:
- Touch-friendly interface
- Responsive design that adapts to different screen sizes
- Smooth animations and transitions
- Optimized for portrait orientation
- Fast loading and smooth scrolling

## Browser Compatibility

- Chrome (recommended)
- Safari
- Firefox
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Colors and Branding
Edit the CSS variables in `styles.css` to match your brand:
- Primary gradient: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- WhatsApp green: `#25D366`
- Text colors and backgrounds

### Adding New Menu Categories
1. Add a new category button in the menu categories section
2. Create a corresponding menu category div with items
3. Update the JavaScript category switching logic if needed

### Form Fields
You can easily add or modify form fields in any of the service forms by:
1. Adding new form groups in the HTML
2. Updating the corresponding message generation function in JavaScript

## Email Integration

The application uses EmailJS for automatic email sending. When users submit forms or place orders:

1. **With EmailJS Setup:** Emails are sent automatically in the background
2. **Fallback Method:** If EmailJS fails, the user's email client opens with pre-filled details
3. **No User Action Required:** Users just click submit and the email is sent automatically

### EmailJS Setup Steps:
1. Create free account at [EmailJS.com](https://www.emailjs.com/)
2. Connect your email service (Gmail, Outlook, etc.)
3. Create email templates for each service type
4. Get your Service ID, Template ID, and Public Key
5. Update the configuration in the code

### Fallback Method:
If EmailJS is not configured, the application will open the user's default email client with pre-filled subject and message content.

## Support

For technical support or customization requests, please refer to the code comments or contact your developer.

## License

This project is open source and available under the MIT License.
