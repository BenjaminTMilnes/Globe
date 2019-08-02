

class Globe {
    constructor(centre, radius) {
        this.centre = centre;
        this.radius = radius;
    }

    get top() {
        return this.centre.add((new Vector3DSpherical(this.radius, 0, 0).toCartesian()));
    }

    get bottom() {
        return this.centre.add((new Vector3DSpherical(this.radius, 180, 0).toCartesian()));
    }

    get left() {
        return this.centre.add((new Vector3DSpherical(this.radius, 90, 0).toCartesian()));
    }

    get right() {
        return this.centre.add((new Vector3DSpherical(this.radius, 90, 180).toCartesian()));
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

        for (var i = -180; i <= 180; i += dtheta) {
            var p1 = new Vector3DSpherical(this.radius, i, phi);

            p1 = p1.toCartesian();
            p1 = p1.add(this.centre);

            p.push(p1);
        }

        return p;
    }

    draw(graphics) {
        for (var i = 10; i < 180; i += 10) {
            var p = this.getLatitudeCircle(i);

            graphics.drawPath(p);
        }

        for (var i = 0; i <= 90; i += 30) {
            var p = this.getLongitudeCircle(i);

            graphics.drawPath(p);
        }

        graphics.drawPath([this.top, this.bottom]);
        graphics.drawPath([this.left, this.right]);
    }
}