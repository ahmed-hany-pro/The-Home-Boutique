# Google Sheets Setup Instructions

This guide will help you set up Google Sheets integration to save Food Orders, Tour Organization, and Transportation requests automatically.

## Step 1: Create One Google Sheet with Three Tabs

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Hotel Orders" or any name you prefer
4. You'll have one sheet with a default tab at the bottom

### Create Tab 1: Food Orders

1. Rename the first tab to "Food Orders" (or keep it as default)
2. Add the following column headers in Row 1:
   - Customer Name
   - Room Number
   - Items
   - Total
   - Order Date
   - Order Time

### Create Tab 2: Tour Orders

1. Click the "+" button at the bottom to add a new sheet
2. Right-click on the new tab and select "Rename"
3. Name it "Tour Orders"
4. Add the following column headers in Row 1:
   - Customer Name
   - Room Number
   - Destination
   - Date
   - Time
   - Duration
   - Participants
   - Special Requests
   - Order Date
   - Order Time

### Create Tab 3: Transportation Orders

1. Click the "+" button at the bottom to add another new sheet
2. Right-click on the new tab and select "Rename"
3. Name it "Transportation Orders"
4. Add the following column headers in Row 1:
   - Customer Name
   - Room Number
   - Transport Type
   - Pickup Location
   - Destination
   - Date
   - Time
   - Passengers
   - Special Requests
   - Order Date
   - Order Time

**You should now have one spreadsheet with 3 tabs at the bottom: Food Orders, Tour Orders, and Transportation Orders**

## Step 2: Create Google Apps Script

You only need to create ONE Apps Script that handles all three tabs.

1. In your Google Sheet (with the 3 tabs), click on **Extensions** → **Apps Script**
2. Delete any existing code and paste the following:

```javascript
function doPost(e) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const data = JSON.parse(e.postData.contents);
    
    // Determine which tab to use based on order type
    let sheet;
    let rowData = [];
    
    if (data.type === 'Food Order') {
      sheet = spreadsheet.getSheetByName('Food Orders');
      if (!sheet) sheet = spreadsheet.getActiveSheet();
      
      rowData = [
        data.customerName,
        data.roomNumber,
        data.items,
        '$' + data.total,
        data.orderDate,
        data.orderTime
      ];
    } else if (data.type === 'Tour Organization') {
      sheet = spreadsheet.getSheetByName('Tour Orders');
      if (!sheet) {
        sheet = spreadsheet.insertSheet('Tour Orders');
        sheet.appendRow(['Customer Name', 'Room Number', 'Destination', 'Date', 'Time', 'Duration', 'Participants', 'Special Requests', 'Order Date', 'Order Time']);
      }
      
      rowData = [
        data.customerName,
        data.roomNumber,
        data.destination,
        data.date,
        data.time,
        data.duration,
        data.participants,
        data.specialRequests || '',
        data.orderDate,
        data.orderTime
      ];
    } else if (data.type === 'Transportation') {
      sheet = spreadsheet.getSheetByName('Transportation Orders');
      if (!sheet) {
        sheet = spreadsheet.insertSheet('Transportation Orders');
        sheet.appendRow(['Customer Name', 'Room Number', 'Transport Type', 'Pickup Location', 'Destination', 'Date', 'Time', 'Passengers', 'Special Requests', 'Order Date', 'Order Time']);
      }
      
      rowData = [
        data.customerName,
        data.roomNumber,
        data.transportType,
        data.pickupLocation,
        data.destination,
        data.date,
        data.time,
        data.passengers,
        data.specialRequests || '',
        data.orderDate,
        data.orderTime
      ];
    }
    
    if (sheet && rowData.length > 0) {
      sheet.appendRow(rowData);
      return ContentService.createTextOutput('Success').setMimeType(ContentService.MimeType.TEXT);
    }
    
    return ContentService.createTextOutput('Error: Invalid order type').setMimeType(ContentService.MimeType.TEXT);
  } catch (error) {
    Logger.log('Error: ' + error);
    return ContentService.createTextOutput('Error: ' + error).setMimeType(ContentService.MimeType.TEXT);
  }
}
```

**Important:** This ONE script will automatically route orders to the correct tab based on the order type!

## Step 3: Deploy as Web App

You only need to deploy ONCE since it's one script handling all tabs.

1. In the Apps Script editor, click on **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Set the following:
   - Description: "Hotel Orders Web App"
   - Execute as: "Me (your email)"
   - Who has access: "Anyone"
4. Click **Deploy**
5. Copy the **Web App URL** that appears

**Important:** You only get ONE Web App URL that handles all three tabs automatically!

## Step 4: Update the JavaScript Configuration

1. Open `script.js` in your project
2. Find the `GOOGLE_SHEETS_CONFIG` section:
```javascript
const GOOGLE_SHEETS_CONFIG = {
    webAppUrl: 'https://script.google.com/macros/s/YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL/exec', // Replace with your Web App URL
    enableLogging: true // Set to false to disable logging
};
```

3. Replace `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL` with the ONE Web App URL you copied

4. Example:
```javascript
const GOOGLE_SHEETS_CONFIG = {
    webAppUrl: 'https://script.google.com/macros/s/AKfycb.../exec',
    enableLogging: true
};
```

## Step 5: Test the Integration

1. Open your website in a browser
2. Make a test order (Food, Tour, or Transportation)
3. Submit the order
4. Check the ONE Google Spreadsheet - the data should appear in the correct tab!

**Test each service type separately:**
- Submit a food order → Check "Food Orders" tab in your spreadsheet
- Submit a tour request → Check "Tour Orders" tab in your spreadsheet
- Submit a transportation request → Check "Transportation Orders" tab in your spreadsheet

All data goes to ONE spreadsheet, but each order type automatically goes to the correct tab!

## Features

✅ **One Spreadsheet**: All data in one place for easy management

✅ **Three Separate Tabs**: Each service type has its own tab for better organization

✅ **Automatic Routing**: Orders automatically go to the correct tab based on type

✅ **Real-time Updates**: Orders appear in their respective tabs immediately

✅ **Comprehensive Data**: Each tab includes relevant customer name, room number, order details, and timestamps

✅ **Easy Export**: Download the entire spreadsheet as Excel or CSV for analysis

✅ **No Housekeeping Orders**: Housekeeping orders are NOT saved (as requested)

✅ **Organized**: Food orders in one tab, Tour orders in another tab, Transportation orders in a third tab

## Notes

- Make sure `enableLogging` is set to `true` in the configuration
- The data is saved automatically when users confirm their orders
- You will have ONE Google Spreadsheet with 3 tabs
- All tabs are in one spreadsheet for easy management
- You can share the entire spreadsheet or individual tabs with your team
- You can access the Google Sheet from anywhere
- Data is stored securely in your Google account
- Each order type automatically goes to the correct tab based on order type

## Troubleshooting

If orders are not appearing in your spreadsheet:

1. Check the browser console for any errors
2. Verify the Web App URL is correct in `script.js`
3. Make sure the Apps Script deployment is set to "Anyone" access
4. Check that the spreadsheet has write permissions
5. Verify that `enableLogging` is set to `true` in `script.js`
6. Check that the tab names match exactly: "Food Orders", "Tour Orders", "Transportation Orders"
7. Make sure the column headers are set correctly in each tab

## Security

- The Web App URL should be kept private
- Only authorized personnel should have access to the Google Sheet
- Consider using Google Sheets API with authentication for production use

