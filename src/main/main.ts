import { app, BrowserWindow, session, ipcMain } from 'electron';
import * as path from 'path';

async function clearCache() {
  const ses = session.defaultSession;
  try {
    await ses.clearCache();
    await ses.clearStorageData({
      storages: ['shadercache', 'cachestorage', 'localstorage', 'cookies']
    });
    console.log('Cache cleared successfully');
  } catch (err) {
    console.error('Error clearing cache:', err);
  }
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    },
    // Frameless window settings
    frame: false,
    transparent: false,
    backgroundColor: '#f0f7ff',
    title: '🎯 Alphabet Learning Game',
    icon: path.join(__dirname, '../assets/icon/icon.ico'),
    fullscreen: true, // Start in fullscreen
    kiosk: true // Prevent leaving fullscreen
  });

  // In development, use the file protocol
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  } else {
    // In production (packaged app), use the correct path
    mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'));
  }

  // Handle window controls
  ipcMain.on('window-minimize', () => {
    // Disabled in fullscreen mode
  });

  ipcMain.on('window-maximize', () => {
    // Always keep fullscreen
    if (!mainWindow.isFullScreen()) {
      mainWindow.setFullScreen(true);
    }
  });

  ipcMain.on('window-close', () => {
    mainWindow.close();
  });

  // Prevent leaving fullscreen
  mainWindow.on('leave-full-screen', () => {
    mainWindow.setFullScreen(true);
  });

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(async () => {
  await clearCache();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('clear-cache', async () => {
  await clearCache();
  return true;
});
