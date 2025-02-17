const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let splashWindow;
let mainWindow;

function createSplashScreen() {
  const splashPath = path.resolve('C:/Users/zohan/Downloads/Writepad/splash.html');

  splashWindow = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,  // No default window controls
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  splashWindow.loadFile(splashPath);

  // Wait 5 seconds, then close splash and open main window
  setTimeout(() => {
    createMainWindow();
    if (splashWindow) {
      splashWindow.close();
    }
  }, 5000);
}

function createMainWindow() {
  const mainPath = path.resolve('C:/Users/zohan/Downloads/Writepad/index.html');
  const iconPath = path.resolve('C:/Users/zohan/Downloads/Writepad/icon.ico');  // Path to icon

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,  // No default window controls
    resizable: true,  
    icon: iconPath,  // Set the window icon
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile(mainPath);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Handle window control events from index.html
ipcMain.on('maximize-window', () => {
  if (mainWindow) {
    mainWindow.maximize();
  }
});

ipcMain.on('close-window', () => {
  if (mainWindow) {
    mainWindow.close();
  }
});

app.whenReady().then(() => {
  createSplashScreen();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createSplashScreen();
  }
});
