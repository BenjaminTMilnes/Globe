class App extends Application {
    constructor(canvasId) {
        super(canvasId);

        this.resolutionFactor = 2;

        this.entities = [];

        this.time = 0;
    }

    initialise() {
        super.initialise();

        this.graphics2D = new GraphicsContext(this.context);
        this.graphics = new GraphicsContext3D(this.context, this.canvas.width, this.canvas.height);

        var globe = new Globe(new Vector3D(0, 0, 0), 100);

        this.globe = globe;

        this.entities.push(globe);
    }

    update(timeDelta) {
        super.update(timeDelta);
    }

    mouseDown(e) {
        var x = e.clientX - this.canvasLeft;
        var y = e.clientY - this.canvasTop;

        this.isDown = true;
        this.x = x;
        this.y = y;
    }

    mouseMove(e) {
        var x = e.clientX - this.canvasLeft;
        var y = e.clientY - this.canvasTop;

        if (this.isDown) {
            var dx = ((x - this.x) / this.canvas.width) * this.graphics.fieldOfView * 2;
            var dy = ((y - this.y) / this.canvas.height) * this.graphics.fieldOfView * 2;

            this.graphics.alpha += 2 * dy;
            this.globe.phiOffset += 5 * dx;

            this.x = x;
            this.y = y;
        }
    }

    mouseUp(e) {
        this.isDown = false;
    }

    scroll(e) {

           this.globe.radius += - e.deltaY / 10;

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
