const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  timeUp: () => ipcRenderer.send('time-up', null)
})