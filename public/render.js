const dialog = require('electron').remote.dialog;
const remote = require('electron').remote;

var child = require('child_process').execFile;

const fs = require("fs").promises;
const buff = Buffer.alloc(100);
const header = Buffer.from("mvhd");

const win = remote.getCurrentWindow(); 
const { session } = require('electron');
var ffprobe = require('ffprobe'),
ffprobeStatic = require('ffprobe-static');

let videopath = ""

const fileTypes = ['mp4', 'mkv', 'm4a']

let sessionIndex = 0

// ---------------------------- WINDOW CONTROLS -----------------------------------

document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        handleWindowControls();
    }
};

window.onbeforeunload = (event) => {
    win.removeAllListeners();
}

function handleWindowControls() {
    document.getElementById('min-button').addEventListener("click", event => {
        win.minimize();
    });

    document.getElementById('max-button').addEventListener("click", event => {
        win.maximize();
    });

    document.getElementById('restore-button').addEventListener("click", event => {
        win.unmaximize();
    });

    document.getElementById('close-button').addEventListener("click", event => {
        win.close();
    });

    toggleMaxRestoreButtons();
    win.on('maximize', toggleMaxRestoreButtons);
    win.on('unmaximize', toggleMaxRestoreButtons);

    function toggleMaxRestoreButtons() {
        if (win.isMaximized()) {
            document.body.classList.add('maximized');
        } else {
            document.body.classList.remove('maximized');
        }
    }
}
// ------------------------------------------------------------------------------

// ----------------------------- HELPER FUNCTIONS -------------------------------
async function getLength(vidPath) {
    ffprobe(vidPath, { path: ffprobeStatic.path }).then(function (info) {
        parseLength(info.streams[0].duration);
    })
    .catch(function (err) {
      console.error(err);
    })
}

function parseLength(length) {
    _seconds =  Math.trunc(length);
    minutes = Math.trunc(_seconds/60)
    seconds = _seconds % 60
    document.querySelector(".vid_duration").innerHTML = `${('0' + minutes ).slice(-2)}:${('0' + seconds).slice(-2)}`
}

function setPreviewVideo(path, vidElement, reload) {
    
    if(reload) {
        let source = vidElement.children[0]
        source.setAttribute('src', path);
        source.setAttribute('type', 'video/mp4');
        // vidElement.load();
        
    } else {
        
        let source = document.createElement("source")
        source.setAttribute('src', path);
        source.setAttribute('type', 'video/mp4');
        vidElement.appendChild(source)
    }

}

function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}

function validateFile(filename) {
    switch (getExtension(filename).toLowerCase()) {
        case 'mp4':
        case 'mkv':
        case 'm4a':
          return true;
      }
      return false;
}

async function getFileSize(path) {
    stats = await fs.stat(path);
    _megabytes = stats.size / (1024 * 1024)
    _kilobytes = stats.size / (1024)

    megabytes = _megabytes.toFixed(1);
    kilobytes = _kilobytes.toFixed(1);

    if(megabytes < 1) {
        return `${kilobytes} KiB`
    } else if (megabytes >= 1) {
        return `${megabytes} MiB`
    }
    return  `error`
}

async function handleVideo(path) {
    videopath = path
    filename = path.replace(/^.*[\\\/]/, ''); // regex

    if(!validateFile(filename)) return alert("Please choose a supported video type! (.mp4, .mkv, .m4a)")


    // ----- SHOW DATA ON PAGE ---------

    document.querySelector(".vid_title").innerHTML = filename;
    document.querySelector(".fg_vid_title").innerHTML = `${filename}_FG`;
    document.querySelector(".vid_type").innerHTML = getExtension(filename);
    document.querySelector(".fg_vid_type").innerHTML = getExtension(filename);
    document.querySelector(".vid_size").innerHTML = await getFileSize(path);
    

    getLength(path);

    let vidPreview = document.querySelector(".vid_preview")

    // set preview video
    if(vidPreview.children[0]) {
        setPreviewVideo(path, vidPreview, true)
    } else {
        setPreviewVideo(path, vidPreview, false)
    }
}


// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

document.getElementById("selectVid").addEventListener('click', () => {
    dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            { name: 'Videos', extensions: fileTypes },
          ]
    }).then(function (response) {
        if (!response.canceled) {
            handleVideo(response.filePaths[0])
        } else {
          console.log("no file selected");
        }
    });
})

// rendering 
document.querySelector("#export_silence").addEventListener('click', () => {
    document.getElementById("inP").style.display = "flex";

    if(videopath != '') {
        // render the video
        // ------------------ OPTIONS ------------------ 
        let margin = document.querySelector("#margin").value
    
    
        let fgPath = `auto-editor`
        let parameters = [videopath, `--margin`, `${margin}sec`]
        child(fgPath, parameters, function(err, data) {
            console.log(err)
            console.log(data.toString());
            // turn off loading screen, show dialog
            document.getElementById("inP").style.display = "none";

            let notif = document.createElement("div");
            notif.innerHTML = 
            `
            <div class="notification_box slow-fade-out">
                <span class="notification header">Processing Finished</span>
                <p>Video exported successfully at: <br>
                    <button class="notification_button" id="notificationButton_${sessionIndex}">${videopath.replace(".mp4", "") + '_ALTERED.mp4'}</button>
                </p>
            </div>
          `

          document.body.appendChild(notif);
          document.getElementById(`notificationButton_${sessionIndex}`).addEventListener('click', () => {
             
            child('explorer.exe', [`/select,${videopath.replace(".mp4", "") + '_ALTERED.mp4'}`], function(err, data) {
                console.log(err)
            });
            
          });
          sessionIndex += 1;

            
       });
    }
})

let dragparent = document.querySelector(".drag_region");
// let _drag = document.querySelector(".drag_background");

dragparent.addEventListener('drop', (event) => {
	event.preventDefault();
	event.stopPropagation();
	handleVideo(event.dataTransfer.files[0].path)
    // _drag.style.display = "none";
});

dragparent.addEventListener('dragover', (e) => {
    // _drag.style.display = "block";
	e.preventDefault();
	e.stopPropagation();
});

dragparent.addEventListener('dragenter', (e) => {
    e.preventDefault();
	e.stopPropagation();
    // _drag.style.display = "block";
});

dragparent.addEventListener('dragleave', (e) => {
    e.preventDefault();
	e.stopPropagation();
    // _drag.style.display = "none";
});
