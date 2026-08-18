const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs');
const os = require('os');

let mainWindow;

// Autostart functionality
function createStartupShortcut() {
  try {
    const exePath = app.getPath('exe');
    const startupFolder = path.join(
      os.homedir(),
      'AppData/Roaming/Microsoft/Windows/Start Menu/Programs/Startup'
    );
    const batchPath = path.join(startupFolder, 'Reportify Punch Tracker.bat');
    
    const batchContent = `@echo off\nstart "" "${exePath}"\n`;
    fs.writeFileSync(batchPath, batchContent);
    console.log('✅ Autostart enabled');
    return true;
  } catch (error) {
    console.error('❌ Autostart failed:', error);
    return false;
  }
}

function removeStartupShortcut() {
  try {
    const startupFolder = path.join(
      os.homedir(),
      'AppData/Roaming/Microsoft/Windows/Start Menu/Programs/Startup'
    );
    const batchPath = path.join(startupFolder, 'Reportify Punch Tracker.bat');
    
    if (fs.existsSync(batchPath)) {
      fs.unlinkSync(batchPath);
      console.log('✅ Autostart disabled');
    }
    return true;
  } catch (error) {
    console.error('❌ Error removing autostart:', error);
    return false;
  }
}

function isAutostartEnabled() {
  try {
    const startupFolder = path.join(
      os.homedir(),
      'AppData/Roaming/Microsoft/Windows/Start Menu/Programs/Startup'
    );
    const batchPath = path.join(startupFolder, 'Reportify Punch Tracker.bat');
    return fs.existsSync(batchPath);
  } catch (error) {
    return false;
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    minWidth: 600,
    minHeight: 500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.ico'),
    show: false,
  });

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC Handlers
ipcMain.handle('get-timestamp', () => {
  return new Date().toISOString();
});

ipcMain.handle('log-punch', async (event, punchData) => {
  console.log('Punch logged:', punchData);
  return { success: true, timestamp: new Date().toISOString() };
});

ipcMain.handle('open-settings', async () => {
  const result = await dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: 'Settings',
    message: 'Settings Panel',
    buttons: ['Close'],
  });
  return result;
});

// Autostart handlers
ipcMain.handle('enable-autostart', async () => {
  return createStartupShortcut();
});

ipcMain.handle('disable-autostart', async () => {
  return removeStartupShortcut();
});

ipcMain.handle('check-autostart', async () => {
  return isAutostartEnabled();
});

// Create app menu
const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Exit',
        accelerator: 'CmdOrCtrl+Q',
        click: () => {
          app.quit();
        },
      },
    ],
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: () => {
          if (mainWindow) mainWindow.webContents.reload();
        },
      },
      {
        label: 'Developer Tools',
        accelerator: 'CmdOrCtrl+Shift+I',
        click: () => {
          if (mainWindow) mainWindow.webContents.toggleDevTools();
        },
      },
    ],
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'About',
        click: () => {
          dialog.showMessageBox(mainWindow, {
            type: 'info',
            title: 'About Reportify Punch',
            message: 'Reportify Punch Tracker v1.0.0',
            detail: 'Enterprise punch tracking system by Reportify Solutions',
          });
        },
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
