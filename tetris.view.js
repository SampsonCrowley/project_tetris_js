TETRIS = TETRIS || {}

TETRIS.View = {
  init: function init(cb) {
    this.setHTML();
    this.initCanvas();
    this.listeners(cb);
    this.renderBackground();
  },
  setHTML: function setHTML(){
    this.gameWrapper = document.getElementsByTagName('tetris')[0] || this.createWrapper();
    this.backgroundCanvas = this.gameWrapper.getElementsByClassName('tetris-background')[0] || this.createCanvas('tetris-background');
    this.tetrisCanvas = this.gameWrapper.getElementsByClassName('tetris-objects')[0] || this.createCanvas('tetris-objects');
  },
  createWrapper: function createWrapper() {
    var wrapper = document.createElement('TETRIS');
    document.body.appendChild(wrapper);

    return wrapper;
  },
  createCanvas: function createCanvas(className) {
    var canvas = document.createElement('CANVAS');
    canvas.classList.add(className);
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    this.gameWrapper.appendChild(canvas);

    return canvas;
  },
  initCanvas: function initCanvas() {
    this.bgContext = this.backgroundCanvas.getContext('2d');
    this.bgContext.fillStyle = "blue";
    this.tetrisContext = this.tetrisCanvas.getContext('2d');
    this.resize();
  },
  listeners: function listeners(cb){
    cb = cb || {};
    var _this = this;

    if(cb.keyDown){
      document.body.addEventListener("keydown", function(e) {
        cb.keyDown(e.which || e.keyCode || 0)
      });
      document.body.addEventListener("mousedown", function(e) {
        cb.keyDown("click")
      });
    }

    if(cb.keyUp){
      document.body.addEventListener("keyup", function(e) {
        cb.keyUp(e.which || e.keyCode || 0)
      });
      document.body.addEventListener("mouseup", function(e) {
        cb.keyUp("click")
      });
    }

    window.addEventListener('resize', function() {
      _this.resize();
      if(cb.resize){
        cb.resize(_this.width, _this.height);
      }
    });
  },
  resize: function resize() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.backgroundCanvas.height = this.height;
    this.backgroundCanvas.width = this.width;
    this.tetrisCanvas.height = this.height;
    this.tetrisCanvas.width = this.width;

    this.renderBackground();
  },
  renderBackground: function renderBackground() {
    this.bgContext.fillStyle = "#0000FF";
    this.bgContext.clearRect(0,0, this.width, this.height);
    this.bgContext.fillRect(0,0, this.backgroundCanvas.width, this.backgroundCanvas.height);
  },
  clearEntities: function clearEntities(){
    this.tetrisContext.clearRect(0,0, this.width, this.height);
  },
  renderEntities: function renderEntities(objects){
    this.clearEntities();
    this.renderShapes(objects.shapes);
  },
  renderShapes: function renderSquare(shapes){
    for(var i = 0; i < shapes.length; i++){
      this.renderMatrix(shapes[i])
    }
  },
  renderMatrix: function renderMatrix(shape){
    for(var i = 0; i < shape.matrix.length; i++){
      if(shape.matrix[i].filled){
        this.drawSquare(shape.matrix[i])
      }
    }
  },
  drawSquare: function drawSquare(square) {
    this.tetrisContext.fillStyle = "#FFFFFF";
    this.tetrisContext.fillRect(square.x, square.y, square.diameter, square.diameter)
  },
  gameOver: function gameOver(){
    this.tetrisContext.font="50vh Verdana";
    this.tetrisContext.fillStyle="white";
    this.tetrisContext.fillText("Game Over", this.width/4, this.height*.75, this.width/2)
  }
}