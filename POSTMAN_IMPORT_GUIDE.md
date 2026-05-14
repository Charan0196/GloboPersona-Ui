# How to Import and Use the Postman Collection

## 📥 Step-by-Step Import Guide

### Method 1: Import from File (Recommended)

#### Step 1: Open Postman
- Launch the Postman application on your computer
- If you don't have Postman, download it from: https://www.postman.com/downloads/

#### Step 2: Click Import
- Look for the **"Import"** button in the top-left corner
- Click on it to open the import dialog

#### Step 3: Select the File
- Click **"Upload Files"** or drag and drop
- Navigate to your project folder: `/Users/charan/Desktop/charan/vn/`
- Select the file: `postman_collection.json`
- Click **"Open"**

#### Step 4: Confirm Import
- Postman will show a preview of the collection
- You should see: "Email Engagement System API"
- Click **"Import"** to confirm

#### Step 5: Collection Imported! ✅
- The collection will appear in your left sidebar
- You should see 4 folders:
  - Accounts
  - Activity
  - Analytics
  - Logs

---

### Method 2: Import from GitHub (Alternative)

#### Step 1: Get the Raw File URL
```
https://raw.githubusercontent.com/Charan0196/Email-Engagement-Activity-Distribution-System-/main/postman_collection.json
```

#### Step 2: Import from Link
- Open Postman
- Click **"Import"**
- Select **"Link"** tab
- Paste the URL above
- Click **"Continue"**
- Click **"Import"**

---

## ⚙️ Configure the Collection

### Set the Base URL Variable

After importing, you need to set the base URL:

#### Option 1: Collection Variables (Recommended)
1. Click on the collection name: "Email Engagement System API"
2. Go to the **"Variables"** tab
3. Find the `base_url` variable
4. Set the **"Current Value"** to: `http://localhost:3000/api`
5. Click **"Save"**

#### Option 2: Environment Variables
1. Click the **"Environments"** icon (eye icon) in top-right
2. Click **"Add"** to create a new environment
3. Name it: "Local Development"
4. Add a variable:
   - Variable: `base_url`
   - Initial Value: `http://localhost:3000/api`
   - Current Value: `http://localhost:3000/api`
5. Click **"Save"**
6. Select "Local Development" from the environment dropdown

---

## 🚀 Using the Collection

### 1. Start Your Server First
Before testing the API, make sure your server is running:

```bash
cd /Users/charan/Desktop/charan/vn
npm start
```

You should see:
```
🚀 Server is running on port 3000
✨ Ready to accept requests!
```

### 2. Test the Health Check
1. Expand the collection in Postman
2. Click on **"Health Check"** request
3. Click the blue **"Send"** button
4. You should see a 200 OK response:
```json
{
    "success": true,
    "status": "healthy",
    "timestamp": "2026-05-11T..."
}
```

### 3. Create Accounts
1. Expand the **"Accounts"** folder
2. Click **"Create Account"**
3. The request body is already filled:
```json
{
  "email": "alice@example.com",
  "name": "Alice Johnson"
}
```
4. Click **"Send"**
5. You should get a 201 Created response

**Tip**: Change the email and name to create multiple accounts!

### 4. Get All Accounts
1. Click **"Get All Accounts"**
2. Click **"Send"**
3. You'll see all created accounts

### 5. Start the Activity Engine
1. Expand the **"Activity"** folder
2. Click **"Start Activity Engine"**
3. Click **"Send"**
4. The engine will start automatically sending emails!

### 6. View Analytics
1. Expand the **"Analytics"** folder
2. Click **"Get System Analytics"**
3. Click **"Send"**
4. See real-time statistics!

---

## 📋 Collection Structure

```
Email Engagement System API
│
├── 📁 Accounts (6 requests)
│   ├── Create Account
│   ├── Get All Accounts
│   ├── Get Account Details
│   ├── Get Account Statistics
│   ├── Enable Account
│   └── Disable Account
│
├── 📁 Activity (5 requests)
│   ├── Start Activity Engine
│   ├── Pause Activity Engine
│   ├── Resume Activity Engine
│   ├── Get Engine Status
│   └── Run Manual Cycle
│
├── 📁 Analytics (5 requests)
│   ├── Get Reputation Growth
│   ├── Get Activity Statistics
│   ├── Get Interaction Trends
│   ├── Get Daily Statistics
│   └── Get System Analytics
│
├── 📁 Logs (5 requests)
│   ├── Get Email Logs
│   ├── Get Daily Activity
│   ├── Get Engagement History
│   ├── Get Activity Logs
│   └── Get Interaction Details
│
└── Health Check
```

---

## 🎯 Recommended Testing Flow

Follow this order for the best experience:

### 1. Setup Phase
```
1. Health Check          → Verify server is running
2. Create Account (×3)   → Create 3-5 test accounts
3. Get All Accounts      → Verify accounts created
```

### 2. Activity Phase
```
4. Start Activity Engine → Begin automation
5. Get Engine Status     → Check it's running
6. Wait 1-2 minutes      → Let it generate activity
```

### 3. Monitoring Phase
```
7. Get System Analytics  → See overall stats
8. Get Email Logs        → View recent emails
9. Get Reputation Growth → Check account scores
10. Get Activity Statistics → Detailed breakdown
```

### 4. Control Phase
```
11. Pause Activity Engine  → Stop automation
12. Run Manual Cycle       → Trigger single cycle
13. Resume Activity Engine → Restart automation
```

---

## 🔧 Troubleshooting

### Issue: "Could not get any response"
**Solution**: 
- Make sure your server is running (`npm start`)
- Check the base URL is set to `http://localhost:3000/api`
- Verify port 3000 is not blocked

### Issue: "404 Not Found"
**Solution**:
- Check the base URL doesn't have a trailing slash
- Correct: `http://localhost:3000/api`
- Wrong: `http://localhost:3000/api/`

### Issue: Variables not working
**Solution**:
1. Click on the collection name
2. Go to Variables tab
3. Make sure `base_url` has a "Current Value"
4. Click Save

### Issue: "Account already exists"
**Solution**:
- Change the email address in the request body
- Or use "Get All Accounts" to see existing accounts

---

## 💡 Pro Tips

### 1. Use Variables for IDs
After creating an account, copy the ID and save it as a variable:
1. Click the collection
2. Go to Variables
3. Add a new variable: `account_id`
4. Paste the ID as the value
5. Use `{{account_id}}` in requests

### 2. Save Responses
Right-click on a response → Save Response → Save as Example

### 3. Use Tests
Add tests to automatically verify responses:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has success field", function () {
    pm.expect(pm.response.json()).to.have.property('success');
});
```

### 4. Create a Test Suite
1. Click the collection
2. Click "Run" (runner icon)
3. Select all requests
4. Click "Run Email Engagement System API"
5. Watch all tests execute automatically!

---

## 📸 Visual Guide

### Import Screen
```
┌─────────────────────────────────────┐
│  Import                         ✕   │
├─────────────────────────────────────┤
│                                     │
│  📁 Upload Files                    │
│                                     │
│  🔗 Link                            │
│                                     │
│  📋 Raw text                        │
│                                     │
│  💾 Code repository                 │
│                                     │
└─────────────────────────────────────┘
```

### After Import
```
Collections
├── 📚 Email Engagement System API
    ├── 📁 Accounts (6)
    ├── 📁 Activity (5)
    ├── 📁 Analytics (5)
    ├── 📁 Logs (5)
    └── 🏥 Health Check
```

---

## 🎥 Video Tutorial

If you prefer a video guide, here's what to do:

1. **Open Postman**
2. **Click Import** (top-left)
3. **Drag and drop** `postman_collection.json`
4. **Click Import** to confirm
5. **Set base_url** variable to `http://localhost:3000/api`
6. **Start testing!**

---

## ✅ Verification Checklist

After importing, verify:

- [ ] Collection appears in left sidebar
- [ ] Collection name: "Email Engagement System API"
- [ ] 4 folders visible (Accounts, Activity, Analytics, Logs)
- [ ] 21 total requests (20 API + 1 health check)
- [ ] `base_url` variable is set
- [ ] Health Check request works
- [ ] Can create an account successfully

---

## 📞 Need Help?

If you encounter issues:

1. **Check the server is running**:
   ```bash
   curl http://localhost:3000/health
   ```

2. **Verify the collection file**:
   ```bash
   cat postman_collection.json | head -20
   ```

3. **Check Postman console**:
   - View → Show Postman Console
   - See detailed request/response logs

---

## 🎉 You're Ready!

Once imported and configured, you can:
- ✅ Test all 20+ API endpoints
- ✅ Create and manage accounts
- ✅ Control the activity engine
- ✅ View real-time analytics
- ✅ Monitor email interactions
- ✅ Track reputation scores

**Happy Testing!** 🚀

---

## 📦 Quick Reference

**Collection File**: `postman_collection.json`  
**Base URL**: `http://localhost:3000/api`  
**Total Endpoints**: 20+ endpoints  
**Categories**: 4 (Accounts, Activity, Analytics, Logs)  

**Import Steps**:
1. Open Postman
2. Click Import
3. Select `postman_collection.json`
4. Set `base_url` to `http://localhost:3000/api`
5. Start testing!
