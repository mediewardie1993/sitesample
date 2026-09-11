# Google Sheets registration setup

Registrations no longer go to Supabase. Every "Request Access" submission on the
site now does two things:

1. Gets logged to a Google Sheet you own (via the script below).
2. Is held locally as a **pending** registration until an admin approves it
   from the Admin page ("Pending registrations" card at the top). Approving
   moves it into the real member list so that person can log in.

Because Google requires you (the account owner) to click through your own
authorization screen, I can write the code but you need to do the ~5 minutes
of clicking in your Google account. Steps:

## 1. Create the Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank sheet.
2. Rename it something like **JCCM Registrations**.
3. Rename the first tab (bottom-left) to `Registrations`.
4. In row 1, add these headers, one per column: `Timestamp`, `Full Name`, `Username`, `Birthday`, `Contact Number`, `Gender`.

## 2. Add the script

1. In the Sheet, go to **Extensions → Apps Script**.
2. Delete anything in the editor and paste this:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Registrations");
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.name || "",
    data.username || "",
    data.birthday || "",
    data.contactNumber || "",
    data.gender || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click the disk icon (or Ctrl+S) to save. Name the project anything, e.g. `JCCM Registration Logger`.

## 3. Deploy it as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set:
   - **Execute as:** Me (your account)
   - **Who has access:** Anyone
4. Click **Deploy**.
5. Google will ask you to authorize the script — click **Authorize access**,
   pick your account, and (since it's your own unpublished script) click
   **Advanced → Go to JCCM Registration Logger (unsafe)** → **Allow**. This
   warning is normal for personal scripts you wrote yourself.
6. Copy the **Web app URL** it gives you (ends in `/exec`).

## 4. Wire it into the site

Open [script.js](script.js) and paste the URL here (near the top of the file):

```javascript
const GOOGLE_SHEETS_REGISTRATION_URL = "PASTE_YOUR_URL_HERE";
```

Save, then commit and push:

```bash
git add script.js
git commit -m "Connect registration to Google Sheets"
git push
```

## Notes / limits

- **Passwords are not sent to the Sheet** — only name, username, birthday,
  contact number, and gender. The password stays local until an admin
  approves the registration (at which point it becomes that member's login).
- If you ever redeploy the script with code changes, choose **Deploy → Manage
  deployments → Edit → New version** rather than creating a brand-new
  deployment, so the URL doesn't change.
- The Sheet is a record/log, not the login database — actual accounts still
  live in the site's local storage (same as before, minus Supabase).
