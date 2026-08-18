const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getTimestamp: () => ipcRenderer.invoke('get-timestamp'),
  logPunch: (punchData) => ipcRenderer.invoke('log-punch', punchData),
  openSettings: () => ipcRenderer.invoke('open-settings'),
  onPunchLogged: (callback) => ipcRenderer.on('punch-logged', callback),
  enableAutostart: () => ipcRenderer.invoke('enable-autostart'),
  disableAutostart: () => ipcRenderer.invoke('disable-autostart'),
  checkAutostart: () => ipcRenderer.invoke('check-autostart'),
});
