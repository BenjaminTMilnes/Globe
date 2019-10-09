
class Vector3DSpherical {
    constructor(r = 0, theta = 0, phi = 0) {
        this.r = r;
        this.theta = theta;
        this.phi = phi;
    }

    get magnitude() {
        return this.r;
    }

    get m() {
        return this.magnitude;
    }

    get unitVector() {
        return new Vector3DSpherical(1, this.theta, this.phi);
    }

    get u() {
        return this.unitVector;
    }

    rotate(dtheta = 0, dphi = 0) {
        var v = new Vector3DSpherical();

        v.r = this.r;
        v.theta = this.theta + dtheta;
        v.phi = this.phi + dphi;

        return v;
    }

    toCartesian() {
        var v = new Vector3D();

        v.x = this.r * sin(this.theta) * cos(this.phi);
        v.y = this.r * sin(this.theta) * sin(this.phi);
        v.z = this.r * cos(this.theta);

        return v;
    }
}