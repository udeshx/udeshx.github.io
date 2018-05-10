function changeBackground(background){
    var html = document.getElementsByTagName('html')[0];
    html.setAttribute("style", `--bg:var(--${background})`);
}

var fitImageOn = function(canvas, imageObj) {
	var imageAspectRatio = imageObj.width / imageObj.height;
	var canvasAspectRatio = canvas.width / canvas.height;
	var renderableHeight, renderableWidth, xStart, yStart;

	// If image's aspect ratio is less than canvas's we fit on height
	// and place the image centrally along width
	if(imageAspectRatio < canvasAspectRatio) {
		renderableHeight = canvas.height;
		renderableWidth = imageObj.width * (renderableHeight / imageObj.height);
		xStart = (canvas.width - renderableWidth) / 2;
		yStart = 0;
	}

	// If image's aspect ratio is greater than canvas's we fit on width
	// and place the image centrally along height
	else if(imageAspectRatio > canvasAspectRatio) {
		renderableWidth = canvas.width
		renderableHeight = imageObj.height * (renderableWidth / imageObj.width);
		xStart = 0;
		yStart = (canvas.height - renderableHeight) / 2;
	}

	// Happy path - keep aspect ratio
	else {
		renderableHeight = canvas.height;
		renderableWidth = canvas.width;
		xStart = 0;
		yStart = 0;
	}
	context.drawImage(imageObj, xStart, yStart, renderableWidth, renderableHeight);
};

function drawArtOnCanvas(){
  var canvas = document.getElementById('userArt');
  window.context = canvas.getContext('2d');
  var image = document.getElementById('art');
  fitImageOn(canvas, image)
}  

function changeImage(name){
  let [object] = data.filter(obj => obj.Image === name)
  let image = object.filename
  let url = `https://s3.amazonaws.com/uccsswork/${image}`
  document.getElementById('art').src = url    
}

function changeColor(){
    let newColor = document.getElementById('colorPicker').value
    sketcher.color = newColor
  }
  function eraser(){
    sketcher.mode = 'erase'
  }
  function brush(){
    sketcher.mode = 'draw'
    sketcher.weight = 20
    document.getElementById('brushWidth').value = 20
  }
  function pencil(){
    sketcher.mode = 'draw'
    sketcher.weight = 5
    document.getElementById('brushWidth').value = 5
  }
  function brushWidth(){
    let newWidth = Number(document.getElementById('brushWidth').value)
    sketcher.weight = newWidth    
  }
  function saveImage(){
    let canvas = document.getElementById('userArt')
    let image = canvas.toDataURL("image/png")
    localStorage.setItem(`${localStorage.length}`, image)
    alert("Your artwork was saved")
  }