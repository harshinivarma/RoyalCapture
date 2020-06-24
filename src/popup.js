const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow

var PoPup = document.getElementById('popup')
if (PoPup){
    PoPup.addEventListener('click', function(event) {
        const modalPath = path.join('file://', __dirname, 'popup.html')
        let wins = new BrowserWindow({
                    width: 600,
                    height: 480,
                    frame: false,
                    alwaysOnTop: true,
                    })
                    wins.on('close', function() { wins = null })
                    wins.loadURL(modalPath)
                    wins.show()
        
    })
}