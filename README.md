# Reportify Punch Tracker

Enterprise-grade punch tracking system built with Electron and Firebase. Track employee attendance with Clock In/Out and Break In/Out functionality.

## Features

✅ **Real-time Punch Tracking** - Instantly log employee punches
✅ **Firebase Integration** - Sync all punch records to Firebase Realtime Database
✅ **Admin Settings** - Configure employee info and Firebase connection
✅ **Multiple Punch Types** - Clock In, Clock Out, Break In, Break Out
✅ **Today's History** - View punch records from the current day
✅ **Dark/Light Theme** - Toggle between light and dark modes
✅ **Offline Support** - Punches are logged locally and synced when connected
✅ **Reportify Branding** - Professional enterprise styling

## System Requirements

- Windows 10 or higher (64-bit)
- Node.js 14+ (for local development)
- npm 6+ (for local development)
- Firebase account with Realtime Database setup

## Installation

### For End Users

1. Download the latest `Reportify-Punch-Tracker-*.exe` from the releases
2. Run the installer
3. Follow the on-screen instructions
4. Launch the application from Start Menu or Desktop shortcut

### For Developers

1. Clone the repository:
```bash
git clone https://github.com/abaduchanna/reportify.git
cd reportify
```

2. Install dependencies:
```bash
npm install
```

3. Start in development mode:
```bash
npm start
```

## Build Instructions

### Windows Build (Using build.bat)

1. Ensure you have Node.js and npm installed
2. Place repository in: `C:\Users\AbadUmairChanna\OneDrive - Verge Mobile\Documents\GitHub\reportify`
3. Run the build script:
```bash
build.bat
```
4. Built executables will be placed in: `C:\Users\AbadUmairChanna\Downloads\GitHub`

### Manual Build

```bash
npm install
npm run build-win
```

Outputs will be in the `dist/` folder.

## Configuration

### Initial Setup

1. **Open Settings** - Click the ⚙️ Settings button
2. **Enter Employee Details**:
   - Employee Name
   - Employee ID
   - Department
3. **Configure Firebase**:
   - Get your Firebase config from your Firebase Console
   - Copy the entire config object
   - Paste into the Firebase Config field
4. **Save** - Click "Save Settings"

### Firebase Configuration

Your Firebase config should look like:
```json
{
  "apiKey": "YOUR_API_KEY",
  "authDomain": "YOUR_PROJECT.firebaseapp.com",
  "databaseURL": "https://YOUR_PROJECT.firebaseio.com",
  "projectId": "YOUR_PROJECT_ID",
  "storageBucket": "YOUR_PROJECT.appspot.com",
  "messagingSenderId": "YOUR_SENDER_ID",
  "appId": "YOUR_APP_ID"
}
```

**⚠️ Important**: Never commit your Firebase config with real credentials to public repositories. Use environment variables in production.

## Usage

### Punch Operations

- **Clock In** 📍 - Start your workday
- **Clock Out** 🚪 - End your workday
- **Break In** ☕ - Start your break
- **Break Out** 💼 - End your break

All punches are automatically:
- Logged with timestamp
- Sent to Firebase (if configured)
- Displayed in the Today's Punches section
- Saved to local storage

### Status Display

The app shows your current status:
- **Clocked Out** - You're not working
- **Clocked In** - You're currently working
- **On Break** - You're on break
- **Back to Work** - You've returned from break

## Data Storage

### Local Storage

Punch history and settings are stored in browser localStorage:
- `punchSettings` - Employee info and Firebase config
- Punch history is kept in memory during the session

### Firebase Storage

Punches are stored in this structure:
```
database
└── punches
    └── {employeeId}
        └── {timestamp}
            ├── type: "Clock In" | "Clock Out" | "Break In" | "Break Out"
            ├── timestamp: ISO 8601 datetime
            ├── employeeName: string
            ├── employeeId: string
            ├── department: string
            ├── time: HH:MM:SS
            └── date: MM/DD/YYYY
```

## GitHub Deployment

### Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add remote
git remote add origin https://github.com/abaduchanna/reportify.git

# Make repository private on GitHub first, then:
git branch -M main
git push -u origin main
```

### Using Personal Access Token

Your GitHub token is configured for this repository. The PAT allows secure pushes without entering password each time.

## Troubleshooting

### "Firebase config is invalid"
- Copy the entire Firebase config object including curly braces
- Ensure it's valid JSON (check with a JSON validator)
- Check for special characters that may not have been properly escaped

### "Firebase connection failed"
- Verify your Firebase project is active
- Check database rules allow read/write operations
- Ensure internet connection is stable
- Verify the database URL is correct

### Application won't start
- Ensure you have administrative privileges
- Check Windows Defender/antivirus isn't blocking the app
- Try running as Administrator
- Reinstall the application

### Punches not syncing to Firebase
- Check Firebase configuration is correct
- Verify database rules permit writes
- Check employee ID is filled in settings
- Look for error messages in the app footer

## Performance Tips

- Keep the app running in the background for best performance
- Periodically check settings to ensure Firebase connection is active
- Clear browser data/cache if the app becomes unresponsive

## Security Notes

🔒 **Never share your Firebase config publicly**
- Keep API keys private
- Don't commit credentials to version control
- Use Firebase Security Rules to restrict data access
- Enable authentication if required

## Updates

To update to the latest version:
1. Download the latest `.exe` file
2. Run the installer (it will update the existing installation)
3. Your settings will be preserved

## Support

For issues or questions:
1. Check this README's Troubleshooting section
2. Review Firebase console for any errors
3. Check local storage in browser dev tools

## License

MIT License - See LICENSE file for details

## Version History

### v1.0.0 (Initial Release)
- Core punch tracking functionality
- Firebase integration
- Admin settings panel
- Dark/Light theme support
- Today's punch history
- Offline local logging

---

**Built with ❤️ by Reportify Solutions**

*Enterprise Punch Tracking System*
