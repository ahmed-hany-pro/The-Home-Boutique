# EmailJS Setup Instructions

## Quick Setup for Automatic Email Sending

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (since you're using Gmail)
4. Connect your Gmail account (ahhasa842@gmail.com)
5. Note down your **Service ID** (e.g., service_xxxxxxx)

### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template content:

**Template ID:** `template_requests`

**Subject:** `{{subject}}`

**Content:**
```
From: {{from_name}}
Reply To: {{reply_to}}

{{message}}
```

4. Save the template and note down your **Template ID**

### Step 4: Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key** (e.g., user_xxxxxxxxxxxxx)

### Step 5: Update Your Files

**In `index.html`, replace:**
```javascript
emailjs.init("YOUR_PUBLIC_KEY");
```
**With:**
```javascript
emailjs.init("your_actual_public_key_here");
```

**In `script.js`, replace:**
```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailData)
```
**With:**
```javascript
emailjs.send('your_service_id_here', 'template_requests', emailData)
```

### Step 6: Test
1. Open your application
2. Fill out any form and click submit
3. Check if email is sent automatically to ahmedhany40w@gmail.com

## Important Notes:
- **No Gmail will open** - emails are sent automatically in the background
- **Free tier allows 200 emails per month**
- **All emails will be sent from ahhasa842@gmail.com to ahmedhany40w@gmail.com**
- **No user interaction required** - completely automatic

## Troubleshooting:
- If emails don't send, check browser console for errors
- Make sure all IDs are copied correctly
- Verify Gmail account is properly connected in EmailJS
- Check spam folder for test emails
