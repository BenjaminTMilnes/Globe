class App {
    constructor(canvasId) {
        this.canvasId = canvasId;
        this.entities = [];

        this.time = 0;
    }

    initialise() {
        this.canvas = document.getElementById(this.canvasId);
        this.canvasLeft = this.canvas.getBoundingClientRect().left;
        this.canvasTop = this.canvas.getBoundingClientRect().top;

        this.resolutionFactor = 3;

        this.canvas.width = window.innerWidth * this.resolutionFactor;
        this.canvas.height = window.innerHeight * this.resolutionFactor;

        this.canvas.style.width = window.innerWidth + "px";
        this.canvas.style.height = window.innerHeight + "px";

        this.areaWidth = window.innerWidth;
        this.areaHeight = window.innerHeight;

        this.context = this.canvas.getContext("2d");
        this.context.scale(this.resolutionFactor, this.resolutionFactor);
        this.context.imageSmoothingQuality = "high";

        this.graphics = new GraphicsContext3D(this.context, this.canvas.width, this.canvas.height);

        var globe = new Globe(new Vector3D(0, 0, 0), 100);

        this.entities.push(globe);
    }

    update(timeDelta) {
        this.time += timeDelta;
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
            var dx = x - this.x;
            var dy = y - this.y;



            //  this.graphics.cameraDirection =     this.graphics.cameraDirection.rotate(dy / 10, dx / 10);
            this.graphics.cameraPosition = this.graphics.cameraPosition.rotate(-dy / 10, -dx / 10);
            this.graphics.cameraDirection = this.graphics.cameraDirection.rotate(dy / 10, dx / 10);

            this.x = x;
            this.y = y;

            console.log(this.graphics.cameraDirection);
        }
    }

    mouseUp(e) {

        this.isDown = false;
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






