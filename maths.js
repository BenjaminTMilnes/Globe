
function basicIsometricProjectionMatrix(alpha){
    return  new Matrix3D(1, 0, 0, 0, cos(alpha), sin(alpha), 0, -sin(alpha), cos(alpha));
}

function inverseBasicIsometricProjectionMatrix(alpha){
    return  new Matrix3D(1, 0, 0, 0, cos(alpha), - sin(alpha), 0, sin(alpha), cos(alpha));
}

class Vector3DSpherical {
    constructor(r = 0, theta = 0, phi = 0) {
        this.r = r; // radius, r >= 0
        this.theta = theta; // polar angle, 0 <= theta <= 180
        this.phi = phi; // azimuthal angle, 0 <= phi < 360
    }

    get magnitude() {
        return this.r;
    }

    get m() {
        return this.magnitude;
    }

    get unitVector() {
        return (new Vector3DSpherical(Math.sign(this.r), this.theta, this.phi)).normalise();
    }

    get u() {
        return this.unitVector;
    }

    normalise() {
        var r = this.r;
        var theta = this.theta;
        var phi = this.phi;

        // First, if phi is less than 0, add a multiple of 360 to make it larger than 0 without changing the angle.
        if (phi < 0) {
            var a = - Math.floor(phi / 360) * 360;

            phi += a;
        }

        // Second, do the same with theta.
        if (theta < 0) {
            var b = - Math.floor(theta / 360) * 360;

            theta += b;
        }

        // Third, if theta is larger than 360, cut it down by a multiple of 360. Theta should now be between 0 and 360.
        theta = theta % 360;

        // Allowed values for theta are between 0 and 180. If theta is between 180 and 360, mirror it.
        if (theta > 180) {
            theta = 360 - theta;
            phi += 180;
        }

        // r must be greater than or equal to zero. If it's less than zero, mirror it.
        if (r < 0) {
            r = - r;
            theta = 180 - theta;
            phi += 180;
        }

        // By this point, phi may be above 360, so cut it down by multiples of 360.
        phi = phi % 360;

        return new Vector3DSpherical(r, theta, phi);
    }

    add(vector) {
        return Vector3DSpherical.fromCartesian(this.toCartesian().add(vector.toCartesian()));
    }

    subtract(vector) {
        return Vector3DSpherical.fromCartesian(this.toCartesian().subtract(vector.toCartesian()));
    }

    times(scalar) {
        return this.scale(scalar);
    }

    scale(sfr = 1) {
        return new Vector3DSpherical(this.r * sfr, this.theta, this.phi);
    }

    reflect() {
        return this.scale(-1).normalise();
    }

    rotate(dtheta = 0, dphi = 0) {
        return (new Vector3DSpherical(this.r, this.theta + dtheta, this.phi + dphi)).normalise();
    }

    static fromCartesian(vector) {
        var r = vector.m;
        var theta = (r == 0) ? 0 : acos(vector.z / r);
        var phi = v2(vector.x, vector.y).a;

        return (new Vector3DSpherical(r, theta, phi)).normalise();
    }

    toCartesian() {
        var va = this.normalise();

        var vb = new Vector3D();

        vb.x = va.r * sin(va.theta) * cos(va.phi);
        vb.y = va.r * sin(va.theta) * sin(va.phi);
        vb.z = va.r * cos(va.theta);

        return vb;
    }
}