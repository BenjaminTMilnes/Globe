var app = new App("appCanvas");
var lastFrameTimestamp = 0;

window.addEventListener("keydown", function (e) {
    app.keyDown(e);
});

window.addEventListener("keyup", function (e) {
    app.keyUp(e);
});

window.addEventListener("mousedown", function (e) {
    app.mouseDown(e);
});

window.addEventListener("mousemove", function (e) {
    app.mouseMove(e);
});

window.addEventListener("mouseup", function (e) {
    app.mouseUp(e);
});

window.addEventListener("resize", function (e) {
  //  app.resize(e);
});

function startApp() {
    app.initialise();

    requestAnimationFrame(appLoop);
}

function appLoop(timestamp) {
    var timeDelta = timestamp - lastFrameTimestamp;

    if (timeDelta < 10) {
        requestAnimationFrame(appLoop);
        return;
    }

    app.update(timeDelta);
    app.draw();

    lastFrameTimestamp = timestamp;

    requestAnimationFrame(appLoop);
}

window.addEventListener("DOMContentLoaded", startApp);