class App extends Application {
    constructor(canvasId) {
        super(canvasId);

        this.resolutionFactor = 2;

        this.toolSet = new ToolSet(this);
        this.entities = [];

        this.time = 0;
    }

    initialise() {
        super.initialise();

        this.graphics2D = new GraphicsContext(this.context);
        this.graphics = new GraphicsContext3D(this.context, this.canvas.width, this.canvas.height);

        var globe = new Globe(new Vector3D(0, 0, 0), 300);

        this.globe = globe;

        this.entities.push(globe);
    }

    update(timeDelta) {
        super.update(timeDelta);

        this.toolSet.update(this.time, timeDelta);
    }

    mouseDown(e) {
        var x = e.clientX - this.canvasLeft;
        var y = e.clientY - this.canvasTop;

        this.isDown = true;

        this.toolSet.mouseDown({"x":x, "y":y, "e":e});
    
    }

    mouseMove(e) {
        var x = e.clientX - this.canvasLeft;
        var y = e.clientY - this.canvasTop;

        this.toolSet.mouseMove({"x":x, "y":y, "e":e});
      
    }

    mouseUp(e) {
        var x = e.clientX - this.canvasLeft;
        var y = e.clientY - this.canvasTop;

        this.isDown = false;

        this.toolSet.mouseUp({"x":x, "y":y, "e":e});
    }

    scroll(e) {

           this.graphics.alpha +=  e.deltaY / 5;
           this.globe.phiOffset +=  e.deltaX / 5;

           e.preventDefault();
    }

    keyDown(e) {
    }

    keyUp(e) {
    }

    draw() {
        this.graphics.clear(this.canvas.width, this.canvas.height, "white");

        for (let e of this.entities) {
            e.draw(this.graphics);
        }
    }
}

var app = new App("appCanvas");
