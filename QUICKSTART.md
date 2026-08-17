# 🚀 Reportify Punch Tracker - Quick Start Guide

Get up and running in 5 minutes!

## Step 1: Prepare Your Machine

### Required Software
- [ ] Node.js 16+ from https://nodejs.org/
- [ ] Git from https://git-scm.com/download/win
- [ ] Windows 10 or higher

### Verify Installation
Open Command Prompt and run:
```bash
node --version
npm --version
git --version
```

## Step 2: Clone/Setup Repository

### Option A: First Time Setup
```bash
# Navigate to your GitHub folder
cd "C:\Users\AbadUmairChanna\OneDrive - Verge Mobile\Documents\GitHub"

# Copy the files from this package into a folder called "reportify"
mkdir reportify
cd reportify

# Initialize git
git init
git remote add origin https://github.com/abaduchanna/reportify.git
```

### Option B: Pull Existing Repository
```bash
cd "C:\Users\AbadUmairChanna\OneDrive - Verge Mobile\Documents\GitHub"
git clone https://github.com/abaduchanna/reportify.git
cd reportify
```

## Step 3: Build the Application

### Using build.bat (Recommended)
```bash
build.bat
```

The script will:
1. ✅ Check Node.js and npm
2. ✅ Install dependencies
3. ✅ Build the Electron app
4. ✅ Place executable in: `C:\Users\AbadUmairChanna\Downloads\GitHub`

### Manual Build
```bash
npm install
npm run build-win
```

**Build time**: ~5-10 minutes (first time) or ~2-3 minutes (subsequent)

## Step 4: First Run

1. Navigate to: `C:\Users\AbadUmairChanna\Downloads\GitHub`
2. Double-click: `Reportify-Punch-Tracker-*.exe`
3. Run the installer (one-time only)
4. Launch from Start Menu or Desktop

## Step 5: Configure Firebase

### Get Firebase Config
1. Go to https://console.firebase.google.com/
2. Select your project
3. Click ⚙️ Settings (top-left)
4. Go to "Your apps" section
5. Copy the entire Firebase config object

### Configure in App
1. Click ⚙️ Settings in the app
2. Fill in:
   - **Employee Name**: Your full name
   - **Employee ID**: Your unique ID
   - **Department**: Your department
   - **Firebase Config**: Paste your Firebase config
3. Click **Save Settings**

**Example Firebase Config:**
```json
{
  "apiKey": "AIzaSyD...",
  "authDomain": "myproject.firebaseapp.com",
  "databaseURL": "https://myproject.firebaseio.com",
  "projectId": "myproject",
  "storageBucket": "myproject.appspot.com",
  "messagingSenderId": "123456789",
  "appId": "1:123456789:web:abc123"
}
```

## Step 6: Start Punching!

| Button | Action |
|--------|--------|
| 📍 **Clock In** | Start your workday |
| 🚪 **Clock Out** | End your workday |
| ☕ **Break In** | Start a break |
| 💼 **Break Out** | Resume work |

All punches are:
- ✅ Logged locally
- ✅ Synced to Firebase
- ✅ Timestamped automatically
- ✅ Visible in Today's Punches

## Step 7: Push to GitHub (Optional)

### First Time
```bash
cd "C:\Users\AbadUmairChanna\OneDrive - Verge Mobile\Documents\GitHub\reportify"

git add .
git commit -m "Initial commit: Reportify Punch Tracker v1.0.0"
git branch -M main
git push -u origin main
```

When prompted:
- **Username**: `abaduchanna`
- **Password**: Your GitHub PAT

### Future Updates
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

## Troubleshooting

### Build Fails: "npm: command not found"
```bash
# Reinstall Node.js from https://nodejs.org/
# Restart Command Prompt after installation
```

### Build Fails: "Cannot find module"
```bash
cd "C:\Users\AbadUmairChanna\OneDrive - Verge Mobile\Documents\GitHub\reportify"
npm install
npm run build-win
```

### App Won't Start
- Run as Administrator
- Check Windows Defender doesn't block it
- Verify Firebase config is valid JSON

### Punches Not Syncing to Firebase
1. Click Settings
2. Verify Firebase config is correct
3. Check database has read/write permissions
4. Ensure Employee ID is filled in

## Daily Usage

### Starting the App
```bash
# From Windows Start Menu
# Or double-click: "Reportify Punch Tracker"
# Or from: C:\Users\AbadUmairChanna\Downloads\GitHub\Reportify-Punch-Tracker.exe
```

### Making Changes
If you modify code:
```bash
cd "C:\Users\AbadUmairChanna\OneDrive - Verge Mobile\Documents\GitHub\reportify"

# Make your changes...

git add .
git commit -m "Description of changes"
git push origin main

# Rebuild
build.bat
```

## File Locations

| Purpose | Location |
|---------|----------|
| **Source Code** | `C:\Users\AbadUmairChanna\OneDrive - Verge Mobile\Documents\GitHub\reportify` |
| **Built Executable** | `C:\Users\AbadUmairChanna\Downloads\GitHub` |
| **GitHub Repository** | https://github.com/abaduchanna/reportify |

## Key Commands Reference

```bash
# Navigate to project
cd "C:\Users\AbadUmairChanna\OneDrive - Verge Mobile\Documents\GitHub\reportify"

# Install dependencies
npm install

# Build application
npm run build-win

# Or use the batch file
build.bat

# Push to GitHub
git push origin main

# Check status
git status

# View recent commits
git log --oneline -5
```

## Support

### Check These First
1. ✅ Is your Firebase config valid? (Use JSON validator)
2. ✅ Is Employee ID filled in?
3. ✅ Is Firebase database rule set to allow public read/write? (for testing)
4. ✅ Do you have internet connection?

### Common Issues

| Issue | Solution |
|-------|----------|
| Firebase config error | Copy entire config including `{}` - use JSON validator |
| Punches not syncing | Check Firebase rules and Employee ID |
| App won't build | Run `npm install` then `npm run build-win` |
| App won't start | Run as Admin, disable antivirus temporarily |
| PAT authentication fails | Regenerate PAT from GitHub settings |

## Next Steps

1. ✅ Configure Firebase
2. ✅ Set employee information
3. ✅ Test a punch (Clock In)
4. ✅ Verify it appears in Firebase
5. ✅ Share the `.exe` with team members
6. ✅ Help them configure their settings

## Version Info

- **App**: Reportify Punch Tracker v1.0.0
- **Built with**: Electron + Firebase
- **Platform**: Windows 64-bit
- **Database**: Firebase Realtime Database

## Important Notes

⚠️ **Do NOT commit Firebase credentials to GitHub**
- Keep `firebaseConfig.json` in `.gitignore`
- Use environment variables for production
- Review `.gitignore` before pushing code

🔒 **Your GitHub PAT is sensitive**
- Never share it publicly
- Use Git Credential Manager to store safely
- Rotate it periodically

---

**You're all set! Start punching! 🎉**

Questions? Check the full README.md
