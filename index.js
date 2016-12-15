// declaration and initiation
var photoUpload = document.getElementById("photoUpload");
var resultImg = document.getElementById("result");
var originImg = document.getElementById("origin");
var uploadLabel = document.getElementById("uploadLabel")
var actionSec = document.getElementById("actions");
var restartBtn = document.getElementById("restart");
var downloadBtn = document.getElementById("download");

var filterStr = '';

var Filter = function() {
    this.brightness = 0;
    this.contrast = 0;
    this.grayscale = 0;
    this.hue = 0;
    this.blur = 0;
    this.invert = 0;
    this.opacity = 100;
    this.saturate = 0;
    this.sepia = 0;
}

var filter = new Filter();
var gui = new dat.GUI();
gui.domElement.style.display = 'none';
var controller = [];
controller[0] = gui.add(filter, 'brightness', -100, 200);
controller[1] = gui.add(filter, 'contrast', -100, 200);
controller[2] = gui.add(filter, 'saturate', -100, 200);
controller[3] = gui.add(filter, 'grayscale', 0, 100);
controller[4] = gui.add(filter, 'hue', 0, 360);
controller[5] = gui.add(filter, 'sepia', 0, 100);
controller[6] = gui.add(filter, 'invert', 0, 100);
controller[7] = gui.add(filter, 'blur', 0, 100);
controller[8] = gui.add(filter, 'opacity', 0, 100);

// event listeners
for(var i in controller){
    controller[i].onChange(function(value){
        update(); 
    });
}

photoUpload.onchange = function () {
    var reader = new FileReader();

    reader.onload = function (e) {
        originImg.src = e.target.result;
        resultImg.src = e.target.result;
        resultImg.style.display = 'block';
    };
    
    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);
    uploadLabel.style.display = 'none';
    gui.domElement.style.display = 'block';
    actionSec.style.display = 'block';
};

// when press the image, show origin image
resultImg.addEventListener('mousedown', function(e){
    console.log('mouse down');
    resultImg.style.filter = '';
});
resultImg.addEventListener('mouseup', function(e){
    console.log('mouse up');
    resultImg.style.filter = filterStr;
});
resultImg.addEventListener('touchstart', function(e){
    console.log('mouse down');
    resultImg.style.filter = '';
});
resultImg.addEventListener('touchend', function(e){
    console.log('mouse up');
    resultImg.style.filter = filterStr;
});



// actions
function update(){
    filterStr = 'brightness(' + (filter.brightness+100)/100 + 
        ') contrast(' + (filter.contrast+100)/100 + 
        ') saturate(' + (filter.saturate+100)/100 + 
        ') grayscale(' + filter.grayscale/100 + 
        ') hue-rotate(' + filter.hue + 'deg' +
        ') blur(' + filter.blur/5 + 'px' +
        ') invert(' + filter.invert/100 +
        ') opacity(' + filter.opacity/100 +
        ') sepia(' + filter.sepia/100 + ')';
    resultImg.style.filter = filterStr;
    resultImg.style['-webkit-filter'] = filterStr;
}

function restart() {
    location.reload();
}

function save() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = originImg.width;
    canvas.height = originImg.height;
    ctx.filter = resultImg.style.filter;
    ctx.drawImage(resultImg, 0, 0);
    var link = document.createElement('a');
    link.download = 'photo';
    link.href = canvas.toDataURL();
    link.click();
}



