

class GraphicsContext3D {
    constructor(context, width, height) {
        this.context = context;

        this.width = width;
        this.height = height;

        this.fieldOfView = 72;
        this.cameraPosition = new Vector3DSpherical(200, 90, 0);
        this.cameraDirection = new Vector3DSpherical(1, 90, 180);
 }

    clear(width, height, fillColour = "white") {
        this.context.fillStyle = fillColour;
        this.context.fillRect(0, 0, width, height);
    }

    drawPath(vertices, fillColour = "none", lineColour = "black", lineWidth = 1, lineDashStyle = []) {
        if (vertices == undefined || vertices.length < 2) {
            return;
        }

        var projectedVertices = vertices.map(v => perspectiveProjectPoint(v, v3(10, 0, 0), v3(70, 10, 0), v3(0, 0, 3)));

        this.context.fillStyle = fillColour;

        this.context.strokeStyle = lineColour;
        this.context.lineWidth = lineWidth;
        this.context.setLineDash(lineDashStyle);

        this.context.beginPath();
        this.context.moveTo(projectedVertices[0].x, projectedVertices[0].y);

        for (let pv of projectedVertices) {
            this.context.lineTo(pv.x, pv.y);
        }

        if (lineColour != "none") {
            this.context.stroke();
        }

        if (fillColour != "none") {
            this.context.fill();
        }

        this.context.setLineDash([]);
    }
}





