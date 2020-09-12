

class GraphicsContext3D {
    constructor(context, width, height) {
        this.context = context;

        this.width = width;
        this.height = height;

        this.fieldOfView = 72;
        this.cameraPosition = v3(0,0,0);
        this.cameraDirection = v3(0,90, 180);

            this.alpha = 90;
 }

    clear(width, height, fillColour = "white") {
        this.context.fillStyle = fillColour;
        this.context.fillRect(0, 0, width, height);
    }

    drawPath(vertices, fillColour = "none", lineColour = "black", lineWidth = 1, lineDashStyle = []) {
        if (vertices == undefined || vertices.length < 2) {
            return;
        }

        this.isometricProjectionMatrix = basicIsometricProjectionMatrix(this.alpha);

        var projectedVertices = vertices.map(v => this.isometricProjectionMatrix.timesVector(v).add(v2( this.width / 4, this.height / 4)));

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





