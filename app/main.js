const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    title: "Presentation App",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Load the presentation HTML file directly into the native app window
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  
  // Remove default menu bar for a cleaner native app look
  mainWindow.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});