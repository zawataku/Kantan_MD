const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

async function createWindow() {
  const isDev = (await import('electron-is-dev')).default;
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'src/main/preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, 'out/index.html')}`
  );

  ipcMain.handle('print-to-pdf', async (event, content) => {
    const pdfPath = path.join(app.getPath('documents'), 'output.pdf');
    const win = BrowserWindow.fromWebContents(event.sender);

    try {
      const data = await win.webContents.printToPDF({});
      require('fs').writeFileSync(pdfPath, data);
      return pdfPath;
    } catch (error) {
      console.error('Failed to save PDF:', error);
      throw error;
    }
  });
}

app.on('ready', createWindow);

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
