let welcomePage =
`<div id="overlay"> 
        <h1>Welcome To CreativeNGA</h1> 
        <br>
        <h3>Being creative can be hard. We all have this <br>
        amazing image in our head just waiting to <br>
        come to life, yet we find outselves suddenly <br>
        lacking imagination. <br><br>
        
        In that case, why not let yourself be inspired by someone else?</h3>
            <div class="buttonHolder">
            <button id="buttonred" class="button" type="button" onclick='displayTool(1)'>Create</button>
            <button id="buttonwhite" class="button" type="button" onclick="displayGallery()">Gallery</button>
            </div>
        <div id="overlayfooter">
        <hr> 
             <h1><p>CreativeNGA | <img class="footerimg" src="images/ngalogo.png"> </p></h1> 
            
            <div id="socialmedia"> 
                <a href="https://www.facebook.com/NationalGalleryofAustralia"> <img class="thumbnail" src="images/fblogo.png"> </a>
                <a href="https://twitter.com/natgalleryaus"> <img class="thumbnail" src="images/twitterlogo.png"> </a>
                <a href="https://www.instagram.com/nationalgalleryaus/"> <img class="thumbnail" src="images//instagramlogo.png"> </a>
                <a href="https://www.youtube.com/user/NationalGalleryAus"> <img class="thumbnail" src="images/youtubelogo.png"> </a>
                <a href="https://plus.google.com/103195795213966381192"> <img class="thumbnail" src="images/googlelogo.png"> </a>
            </div>
        </div>
    </div>
` 
let galleryPage = `<section class='gallery'>
<h1> Choose your Inspiration </h1>
<br>
<h3> The National Gallery of Australia has a huge selection of exhibits <br>
Please choose one as your inspiration
</h3>
<div class="imagelist">
</div>
</section>`
function displayWelcome(){
    window.sketcher = null
    changeBackground('welcome')
    let [el] = document.getElementsByClassName('app')
    el.innerHTML = ''
    el.insertAdjacentHTML('beforeend',welcomePage)
}
function displayGallery(){
    window.sketcher = null
    changeBackground('gallery')
    let [el] = document.getElementsByClassName('app')
    el.innerHTML = ''
    el.insertAdjacentHTML('beforeend',galleryPage)                
    let [parent] = document.getElementsByClassName('imagelist')
    data.forEach((art,i) =>{
        let child = 
        `<div onclick="displayTool('${i+1}')" style="background: url(images/${art.filename}); background-repeat: no-repeat; background-size: cover; " class="galimg">
            <div class="desctext"> 
                <div>
                Name: ${art.Image}
                </div>
                <div>
                Artist: ${art.Artist}
                </div>
                <div>
                Date: ${art.Year} 
                </div>
            </div>
        </div>`
        parent.insertAdjacentHTML('beforeend',child)
    })
} 
function displayTool(artNumber){
    changeBackground('app')
    let toolWrap = `<section class='tool'></section>`
    let [el] = document.getElementsByClassName('app')
    el.innerHTML = ''
    el.insertAdjacentHTML('beforeend',toolWrap)    
    let toolPage =`<h1>Create your masterpiece</h1>
    <section class='app'>
        <div class='left'>
            <h2>Please feel free to recreate the artwork as you like, as this is meant to be your expression of art.</h2>
            <img  class="appImage" crossOrigin="Anonymous" src="https://s3.amazonaws.com/uccsswork/${artNumber}.jpg" alt="" class='art' id='art' onload="drawArtOnCanvas()">
            <p>Title: ${data[artNumber-1].Image}</p>
            <p>Artist: ${data[artNumber-1].Artist}</p>
            <p>Year: ${data[artNumber-1].Year}</p>
          </div>
          <div class='right'>
            <div class='contorls'>
              <div class='brush'>
                <div class="fas fa-pencil-alt fa-5x" onclick="pencil()"></div>
                <div class="fas fa-paint-brush fa-5x" onclick="brush()"></div>
                <div class="fas fa-eraser fa-5x" onclick="eraser()"></div>
                <input type='color' onchange="changeColor()" id='colorPicker'/>
                <input type="range"  id="brushWidth" min='1' max='80' value='5' step='1' onchange="brushWidth()">
                <button class="saved" onclick="saveImage() " id='buttonred'>Save</button>
              </div>
            </div>
            <canvas id="userArt" width="500px" height="500px" ></canvas>
          </div>
    </section>
`
    let [parent] = document.getElementsByClassName('tool')
    parent.insertAdjacentHTML('beforeend',toolPage)
    window.sketcher = atrament('#userArt', 500, 500);                    
}


function addImages(){
    for (var i = 0; i < localStorage.length; i++){
        let el = `<img src="${localStorage.getItem(localStorage.key(i))}" crossOrigin="Anonymous" class="contain">`
        let [parent] = document.getElementsByClassName('savedArt')
        parent.insertAdjacentHTML('beforeend',el)
    }
}

function displaySavedArt(){
    changeBackground('app')
    let savedArtPage = `<section class='savedArt'></section>`
    let [el] = document.getElementsByClassName('app')
    el.innerHTML = ''
    el.insertAdjacentHTML('beforeend',savedArtPage)
    addImages()    
}
