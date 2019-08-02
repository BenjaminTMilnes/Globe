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

        this.graphics = new GraphicsContext(this.context);
    }

    update(timeDelta) {
        this.time += timeDelta;
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






