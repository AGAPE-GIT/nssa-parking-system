# NSSA Parking System — Transfer & Setup Manual

This manual covers moving the parking system prototype from one Windows laptop to another and running it there.

- **Part A** is done on the **current laptop** (the one that already has the project).
- **Part B** is done on the **new laptop**.

---

## What you need

| Item | Where | Notes |
|------|-------|-------|
| Node.js 22.13 or newer (LTS recommended) | New laptop | Free download from https://nodejs.org. It also installs `npm`. |
| Internet connection | New laptop | Needed **once**, to download the project's packages. |
| A web browser (Chrome, Edge, Firefox) | New laptop | Already installed on most PCs. |
| VS Code | Optional | Only needed if you want to view or edit the code. |

You do **not** need to install a database. The system uses a built-in SQLite database file that Node.js handles on its own.

---

# PART A — On the current laptop: package the project

## A1. Stop the system if it is running

If the system is running in a terminal, click the terminal and press **Ctrl + C**, then type `Y` if asked.

## A2. Make a clean copy of the project folder

The project contains `node_modules` folders (about 52 MB of downloaded packages). They don't need to be sent because the new laptop downloads them again. Without them, the project is only about **0.5 MB**.

1. Open File Explorer and go to your **Desktop**.
2. Right-click the **`Parking System`** folder → **Copy**, then right-click on an empty area → **Paste**.
   You now have a folder named **`Parking System - Copy`**.
3. Open **`Parking System - Copy`** and **delete** these folders if they exist:
   - `node_modules` (in the main folder)
   - `backend\node_modules`
   - `frontend\node_modules`
   - `frontend\dist`
4. (Optional) Decide about the database file `backend\src\db\parking.db`:
   - **Keep it** to bring your current data (bookings, users you registered, etc.) to the new laptop.
   - **Delete it** to start fresh on the new laptop. It's recreated automatically with the demo accounts and 20 parking slots.

> Do **not** delete anything in the original `Parking System` folder. Only change the copy.

## A3. Zip the copy

1. Rename `Parking System - Copy` to **`Parking System`**.
   (Move it to another location first, e.g. `Documents`, so it doesn't clash with the original.)
2. Right-click the folder → **Send to** → **Compressed (zipped) folder**
   (on Windows 11: right-click → **Compress to ZIP file**).
3. You now have **`Parking System.zip`**.

## A4. Send the zip file

> ⚠️ **Important — Gmail blocks this file as an attachment.**
> Gmail (and Outlook.com) refuse attachments that contain `.js` files, **even inside a zip**, and this project is made of `.js` files. Attaching it directly will fail with *"Blocked for security reasons"*.

Use one of these instead:

- **Option 1 — Google Drive (recommended with Gmail):**
  Upload `Parking System.zip` to https://drive.google.com, right-click it → **Share** → **Copy link** (set access to *"Anyone with the link"*), and email that link.
- **Option 2 — OneDrive:**
  Put the zip in your OneDrive folder, right-click it → **Share** → **Copy link**, and email the link.
- **Option 3 — USB flash drive:**
  Copy the zip onto a flash drive and plug it into the new laptop.

---

# PART B — On the new laptop: install and run

## B1. Install Node.js

1. Go to **https://nodejs.org**.
2. Download the **LTS** version for Windows (the `.msi` installer).
3. Run the installer and click **Next** on every screen, keeping the default options. Make sure **"Add to PATH"** stays selected (it is by default).
4. When it finishes, **restart the laptop**. This makes sure Windows finds the newly installed `node` and `npm` commands.

### Check that Node.js installed correctly

1. Press the **Windows key**, type **`cmd`**, and open **Command Prompt**.
2. Type the following and press Enter after each line:
   ```
   node -v
   npm -v
   ```
3. You should see version numbers, e.g. `v24.x.x` and `11.x.x`.
   - The Node version must be **22.13 or higher**. If it's lower, install the latest LTS from nodejs.org.
   - If you see *"'node' is not recognized…"*, restart the laptop, or reinstall Node.js.

## B2. Get and extract the project

1. Download the zip from the link (or copy it from the flash drive).
2. Move `Parking System.zip` to the **Desktop**.
3. Right-click the zip → **Extract All…** → **Extract**.

> ⚠️ Don't open or run the project from **inside** the zip. Always use the extracted folder.

4. Open the extracted folder. Windows sometimes creates a folder inside a folder
   (`Parking System\Parking System\...`). Keep opening folders until you see these items together:
   ```
   backend
   frontend
   package.json
   README.md
   SETUP_MANUAL.md
   ```
   This is the **project folder**. All the commands below are run from here.

## B3. Open Command Prompt inside the project folder

1. While viewing the project folder in File Explorer, click the **address bar** at the top.
2. Type **`cmd`** and press **Enter**.
3. A black Command Prompt window opens, already pointing at the project folder.

> Use **Command Prompt** (`cmd`), not PowerShell. On a fresh Windows install, PowerShell often blocks `npm` with the error *"running scripts is disabled on this system"*. Command Prompt doesn't have this problem.

## B4. Create the settings file (first time only)

In Command Prompt, type:
```
copy backend\.env.example backend\.env
```
- If it says **"1 file(s) copied"**, that's done.
- If it asks **"Overwrite backend\.env?"**, a settings file already came in the zip. Type **`N`** and press Enter to keep it.

(Optional) Open `backend\.env` in Notepad and change the `JWT_SECRET` value to any long random text. This is the key used to secure logins.

## B5. Install the project's packages (first time only)

Make sure the laptop is **connected to the internet**, then type:
```
npm run setup
```
- This downloads everything the backend and frontend need. It takes about **1–5 minutes**, depending on your internet speed.
- Wait until you get your prompt back (the blinking cursor after `>`).
- Messages that start with `npm warn` are normal and can be ignored.
- If it ends with a line containing `ERR!`, see **Troubleshooting** below.

## B6. Start the system

Type:
```
npm run dev
```
Two services start in the same window:
- **`[backend]`** (blue): the API server on port **5000**
- **`[frontend]`** (green): the website on port **3000**

Wait until you see a line like:
```
[frontend]   ➜  Local:   http://localhost:3000/
```

If a **Windows Defender Firewall** pop-up appears, click **Allow access** (or **Cancel**; the system still works on this laptop either way).

> **Keep this Command Prompt window open** while you use the system. Closing it stops the system.

## B7. Open the system in the browser

1. Open Chrome, Edge, or Firefox.
2. Go to: **http://localhost:3000**
3. Log in with one of the demo accounts:

| Role      | Email                | Password     |
|-----------|----------------------|--------------|
| Admin     | admin@nssa.co.zw     | admin123     |
| Attendant | attendant@nssa.co.zw | attendant123 |
| Customer  | customer@nssa.co.zw  | customer123  |

You can also register a new customer account from the login page.

## B8. Stop the system

Click the Command Prompt window and press **Ctrl + C**. If it asks *"Terminate batch job (Y/N)?"*, type **`Y`** and press Enter.

---

# Running it again later

Steps B1–B5 are only needed **once**. After that, each time you want to use the system:

1. Open the project folder in File Explorer.
2. Click the address bar, type **`cmd`**, and press **Enter**.
3. Type `npm run dev` and wait for `http://localhost:3000`.
4. Open **http://localhost:3000** in the browser.

No internet connection is needed after the first setup.

---

# Troubleshooting

| Problem | Solution |
|---------|----------|
| `'node' is not recognized` or `'npm' is not recognized` | Node.js isn't installed or the laptop hasn't been restarted. Install it (B1) and restart. |
| `running scripts is disabled on this system` | You're in PowerShell. Use Command Prompt instead (B3), or in PowerShell run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` and type `Y`. |
| `Could not read package.json` / `ENOENT` | Command Prompt isn't in the project folder. Go back to B2 step 4 and open `cmd` from the folder that contains `package.json`. |
| `'concurrently' is not recognized` | The setup step didn't finish. Run `npm run setup` again. |
| `npm ERR! network` or the setup hangs | Check the internet connection and run `npm run setup` again. |
| `No such built-in module: node:sqlite` | Node.js is too old. Install the latest LTS from nodejs.org (must be 22.13 or newer). |
| `EADDRINUSE` / `Port 3000 (or 5000) is already in use` | The system is already running in another window, or another program is using the port. Close other Command Prompt windows and try again, or restart the laptop. |
| The browser shows a blank page | Make sure you opened **http://localhost:3000**. Don't double-click `frontend\index.html`, because that doesn't work. |
| The browser says "This site can't be reached" | The system isn't running. Check the Command Prompt window is still open and shows the `Local: http://localhost:3000/` line. |
| http://localhost:5000 shows "Cannot GET /" | This is normal. Port 5000 is only the backend API. Use http://localhost:3000 for the website. |
| Login fails with the demo accounts | Stop the system, delete `backend\src\db\parking.db`, and run `npm run dev` again. A fresh database is created with the demo accounts. **Note: this erases all saved data.** |

---

# Quick reference

**First time on a new laptop** (in Command Prompt, inside the project folder):
```
copy backend\.env.example backend\.env
npm run setup
npm run dev
```

**Every time after that:**
```
npm run dev
```

Then open **http://localhost:3000**.
