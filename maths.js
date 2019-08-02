
class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    get magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    get m() {
        return this.magnitude;
    }

    get unitVector() {
        return this.scale(1 / this.m);
    }

    get u() {
        return this.unitVector;
    }

    get normalUnitVector() {
        return this.u.rotate(90);
    }

    get n() {
        return this.normalUnitVector;
    }

    get argument() {
        var theta = toDegrees(Math.atan(this.y / this.x));

        if (this.x < 0) {
            return 180 + theta;
        }

        if (this.x > 0 && this.y < 0) {
            return 360 + theta;
        }

        return theta;
    }

    get a() {
        return this.argument;
    }

    add(vector) {
        var v = new Vector2D();

        v.x = this.x + vector.x;
        v.y = this.y + vector.y;

        return v;
    }

    subtract(vector) {
        var v = new Vector2D();

        v.x = this.x - vector.x;
        v.y = this.y - vector.y;

        return v;
    }

    times(scalar) {
        return this.scale(scalar, scalar);
    }

    translate(dx = 0, dy = 0) {
        var v = new Vector2D();

        v.x = this.x + dx;
        v.y = this.y + dy;

        return v;
    }

    translateX(dx) {
        return this.translate(dx, 0);
    }

    translateY(dy) {
        return this.translate(0, dy);
    }

    scale(sfx = 1, sfy = 1) {
        var v = new Vector2D();

        v.x = this.x * sfx;
        v.y = this.y * sfy;

        return v;
    }

    scaleX(sfx) {
        return this.scale(sfx, 1);
    }

    scaleY(sfy) {
        return this.scale(1, sfy);
    }

    reflect() {
        return this.scale(-1, -1);
    }

    reflectX() {
        return this.scaleX(-1);
    }

    reflectY() {
        return this.scaleY(-1);
    }

    rotate(theta) {
        var r = new RotationMatrix2D(theta);

        return r.times(this);
    }

    rotateAboutPoint(theta, point) {
        var v = this.subtract(point);
        v = v.rotate(theta);
        v = v.add(point);

        return v;
    }
}

function ds(point1, point2) {
    return point1.subtract(point2).m;
}

function sin(degrees) {
    return Math.sin(toRadians(degrees));
}

function cos(degrees) {
    return Math.cos(toRadians(degrees));
}

function asin(x) {
    return toDegrees(Math.asin(x));
}

function acos(x) {
    return toDegrees(Math.acos(x));
}

function atan(x) {
    return toDegrees(Math.atan(x));
}

class Matrix2D {
    constructor(a11 = 0, a12 = 0, a21 = 0, a22 = 0) {
        this.a11 = a11;
        this.a12 = a12;
        this.a21 = a21;
        this.a22 = a22;
    }

    times(vector) {
        return new Vector2D(this.a11 * vector.x + this.a12 * vector.y, this.a21 * vector.x + this.a22 * vector.y);
    }
}

class RotationMatrix2D extends Matrix2D {
    constructor(theta = 0) {
        super(cos(theta), -  sin(theta), sin(theta), cos(theta));

        this.theta = theta;
        this.thetaR = toRadians(theta);
    }
}

function toRadians(degrees) {
    return (degrees / 360) * 2 * Math.PI;
}

function toDegrees(radians) {
    return (radians / (2 * Math.PI)) * 360;
}

class Vector3D {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    get magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
    }

    get m() {
        return this.magnitude;
    }

    get unitVector() {
        return this.scale(1 / this.m);
    }

    get u() {
        return this.unitVector;
    }

    add(vector) {
        var v = new Vector3D();

        v.x = this.x + vector.x;
        v.y = this.y + vector.y;
        v.z = this.z + vector.z;

        return v;
    }

    subtract(vector) {
        var v = new Vector3D();

        v.x = this.x - vector.x;
        v.y = this.y - vector.y;
        v.z = this.z - vector.z;

        return v;
    }

    times(scalar) {
        return this.scale(scalar, scalar, scalar);
    }

    translate(dx = 0, dy = 0, dz = 0) {
        var v = new Vector3D();

        v.x = this.x + dx;
        v.y = this.y + dy;
        v.z = this.z + dz;

        return v;
    }

    translateX(dx) {
        return this.translate(dx, 0, 0);
    }

    translateY(dy) {
        return this.translate(0, dy, 0);
    }

    translateZ(dz) {
        return this.translate(0, 0, dz);
    }

    scale(sfx = 1, sfy = 1, sfz = 1) {
        var v = new Vector3D();

        v.x = this.x * sfx;
        v.y = this.y * sfy;
        v.z = this.z * sfz;

        return v;
    }

    scaleX(sfx) {
        return this.scale(sfx, 1, 1);
    }

    scaleY(sfy) {
        return this.scale(1, sfy, 1);
    }

    scaleZ(sfz) {
        return this.scale(1, 1, sfz);
    }

    reflect() {
        return this.scale(-1, -1, -1);
    }

    reflectX() {
        return this.scaleX(-1);
    }

    reflectY() {
        return this.scaleY(-1);
    }

    reflectZ() {
        return this.scaleZ(-1);
    }

    toSpherical() {
        var v = new Vector3DSpherical();

        v.r = this.m;
        v.theta = acos(this.z / this.m);
        v.phi = atan(this.y / this.x);

        return v;
    }
}

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