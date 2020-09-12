

class Globe {
    constructor(centre, radius) {
        this.centre = centre;
        this.radius = radius;

        this.phiOffset = 0;
        this.thetaOffset = 0;

        this.paths = [];
 }

    get top() {
        return this.centre.add((new Vector3DSpherical(this.radius, 0, 0).toCartesian()));
    }

    get bottom() {
        return this.centre.add((new Vector3DSpherical(this.radius, 180, 0).toCartesian()));
    }

    get left() {
        return this.centre.add((new Vector3DSpherical(this.radius, 90, 270 + this.phiOffset).toCartesian()));
    }

    get right() {
        return this.centre.add((new Vector3DSpherical(this.radius, 90, 90 + this.phiOffset).toCartesian()));
    }

    get front() {
        return this.centre.add((new Vector3DSpherical(this.radius, 90, 0 + this.phiOffset).toCartesian()));
    }

    get rear() {
        return this.centre.add((new Vector3DSpherical(this.radius, 90, 180 + this.phiOffset).toCartesian()));
    }

    getLatitudeCircle(theta) {
        var p = [];

        var dphi = 5;

        for (var i = 0; i <= 360; i += dphi) {
            var p1 = new Vector3DSpherical(this.radius, theta, i);

            p1 = p1.toCartesian();
            p1 = p1.add(this.centre);

            p.push(p1);
        }

        return p;
    }

    getLongitudeCircle(phi) {
        var p = [];

        var dtheta = 5;

        for (var i = 0; i <= 180; i += dtheta) {
            var p1 = new Vector3DSpherical(this.radius, i, phi + this.phiOffset);

            p1 = p1.toCartesian();
            p1 = p1.add(this.centre);

            p.push(p1);
        }

        return p;
    }

    draw(graphics) {
        for (var i = 10; i < 180; i += 10) {
            var p = this.getLatitudeCircle(i);

            graphics.drawPath(p, "none", "grey");
        }

        for (var i = 0; i < 360; i += 10) {
            var p = this.getLongitudeCircle(i);

            graphics.drawPath(p, "none", "grey");
        }

        graphics.drawPath([this.left, this.right], "none", "hsla(350, 80%, 60%)");
        graphics.drawPath([this.front, this.rear], "none", "hsla(110, 80%, 60%)");
        graphics.drawPath([this.top, this.bottom], "none", "hsla(220, 80%, 60%)");

        this.paths.forEach(p => {
            graphics.drawPath(p.map(v => v.rotate(0, this.phiOffset).toCartesian()), "none", "magenta");
        });
    }
}