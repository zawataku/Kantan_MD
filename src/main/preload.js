const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  printToPDF: (content) => ipcRenderer.invoke('print-to-pdf', content),
});