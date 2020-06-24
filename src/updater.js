//modules 
const {autoUpdater} = require('electron-updater')

autoUpdater.logger = require('electron-log')
autoUpdater.logger.transports.file.level = 'info'
// check for update 

exports.check = () => {

    //
    autoUpdater.checkForUpdates()
    
}