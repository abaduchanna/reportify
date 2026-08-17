const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getTimestamp: () => ipcRenderer.invoke('get-timestamp'),
  logPunch: (punchData) => ipcRenderer.invoke('log-punch', punchData),
  openSettings: () => ipcRenderer.invoke('open-settings'),
  onPunchLogged: (callback) => ipcRenderer.on('punch-logged', callback),
});
