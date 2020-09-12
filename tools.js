
class Tool {
    constructor(app) {
        this.app = app;
        this.name = "";
        this.isActive = false;
    }

    mouseDown(e) { }

    mouseMove(e) { }

    mouseUp(e) { }

    update(time, timeDelta) { }

    draw(graphics) { }
}

class ToolSet {
    constructor(app) {

        this.pencilTool = new PencilTool(app);

        this.pencilTool.isActive = true;

        this.tools = [this.pencilTool];
    }

    deactivateAllTools() {
        this.tools.forEach(t => { t.isActive = false; });
    }

    mouseDown(e) { this.tools.forEach(t => t.mouseDown(e)); }
    mouseMove(e) { this.tools.forEach(t => t.mouseMove(e)); }
    mouseUp(e) { this.tools.forEach(t => t.mouseUp(e)); }

    update(time, timeDelta) { this.tools.forEach(t => t.update(time, timeDelta)); }

    draw(graphics) { this.tools.forEach(t => t.draw(graphics)); }
}

class PencilTool extends Tool {
    constructor(app) {
        super(app);

        this.isDown = false;

        this.currentPath = null;

        this.alpha = 90;
        this.beta = 0;

        this.isometricProjectionMatrix = isometricProjectionMatrix(this.alpha, this.beta);
    }

    getPointOnGlobe(x, y) {


        var onScreenGlobeCentre = this.isometricProjectionMatrix.timesVector(this.app.globe.centre).add(v2(this.app.graphics.width / 4, this.app.graphics.height / 4));
        var onScreenGlobeRadius = this.app.globe.radius;
        var r = Math.sqrt(Math.pow(x - onScreenGlobeCentre.x, 2) + Math.pow(y - onScreenGlobeCentre.y, 2));

        if (r < onScreenGlobeRadius) {
            var theta1 = acos((y - onScreenGlobeCentre.y) / onScreenGlobeRadius);
            var phi1 = acos((x - onScreenGlobeCentre.x) / onScreenGlobeRadius) - this.app.globe.phiOffset;

            console.log(x);

            return new Vector3DSpherical(this.app.globe.radius, theta1, phi1);

        }
        else {
            return null;
        }
    }

    mouseDown(e) {
        if (this.isActive) {
            this.isDown = true;
            this.currentPath = [];
            this.app.globe.paths.push(this.currentPath);

            var p = this.getPointOnGlobe(e.x, e.y);

            if (p !== null) {
                this.currentPath.push(p);
            }
        }
    }

    mouseMove(e) {
        if (this.isActive && this.isDown && this.currentPath !== null) {

            var p = this.getPointOnGlobe(e.x, e.y);

            if (p !== null) {
                this.currentPath.push(p);
                console.log(this.app.globe);
            }
        }
    }

    mouseUp(e) { 
        this.isDown = false;
    }

}