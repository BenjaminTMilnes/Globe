
function getPositioningDelta(positioning, width, height) {
    var delta = new Vector2D();

    if (positioning == "topcentre") {
        delta.x = - width / 2;
    }
    if (positioning == "topright") {
        delta.x = - width;
    }
    if (positioning == "middleleft") {
        delta.y = -height / 2;
    }
    if (positioning == "middlecentre") {
        delta.x = - width / 2;
        delta.y = -height / 2;
    }
    if (positioning == "middleright") {
        delta.x = - width;
        delta.y = -height / 2;
    }
    if (positioning == "bottomleft") {
        delta.y = -height;
    }
    if (positioning == "bottomcentre") {
        delta.x = - width / 2;
        delta.y = -height;
    }
    if (positioning == "bottomright") {
        delta.x = - width;
        delta.y = -height;
    }

    delta.y += height;

    return delta;
}

class GraphicsContext {
    constructor(context) {
        this.context = context;
    }

    clear(width, height, fillColour = "white") {
        this.context.fillStyle = fillColour;
        this.context.fillRect(0, 0, width, height);
    }

    drawCircle(centre, radius, fillColour = "none", lineColour = "black", lineWidth = 1, lineDashStyle = []) {
        this.context.fillStyle = fillColour;

        this.context.lineWidth = lineWidth;
        this.context.strokeStyle = lineColour;
        this.context.setLineDash(lineDashStyle);

        this.context.beginPath();
        this.context.arc(centre.x, centre.y, radius, 0, 2 * Math.PI);

        if (fillColour != "none") {
            this.context.fill();
        }

        if (lineColour != "none") {
            this.context.stroke();
        }

        this.context.setLineDash([]);
    }

    drawPath(vertices, fillColour = "none", lineColour = "black", lineWidth = 1, lineDashStyle = []) {
        if (vertices == undefined || vertices.length < 2) {
            return;
        }

        this.context.fillStyle = fillColour;

        this.context.strokeStyle = lineColour;
        this.context.lineWidth = lineWidth;
        this.context.setLineDash(lineDashStyle);

        this.context.beginPath();
        this.context.moveTo(vertices[0].x, vertices[0].y);

        for (var i = 1; i < vertices.length; i++) {
            var vertex = vertices[i];

            this.context.lineTo(vertex.x, vertex.y);
        }

        if (lineColour != "none") {
            this.context.stroke();
        }

        if (fillColour != "none") {
            this.context.fill();
        }

        this.context.setLineDash([]);
    }

    drawText(text, position, positioning = "middlecentre", fontFamily = "Times New Roman", fontSize = 20, fontColour = "black") {
        this.context.font = fontSize + "px " + fontFamily;
        this.context.fillStyle = fontColour;

        var size = this.measureText(text, fontFamily, fontSize);
        var delta = getPositioningDelta(positioning, size.width, fontSize * 0.7);

        var p = position.add(delta);

        this.context.fillText(text, p.x, p.y);
    }

    measureText(text, fontFamily, fontSize) {
        var currentFont = this.context.font;

        this.context.font = fontSize + "px " + fontFamily;

        var size = this.context.measureText(text);

        this.context.font = currentFont;

        return size;
    }
}

n = 0;

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

    projectVertex(vertex) {
        var v1 = vertex.subtract(this.cameraPosition.toCartesian());
        var v2 = v1.toSpherical().rotate(-90, 0);

        if (n == 0){
              console.log(v2);
        }

        var w = (this.width > this.height) ? this.width : this.height;
        var x = w * ((v2.phi ) / this.fieldOfView);
        var y = w * ((v2.theta ) / this.fieldOfView) - (w - this.height) / 2;

        return new Vector2D(x, y);
    }

    drawPath(vertices, fillColour = "none", lineColour = "black", lineWidth = 1, lineDashStyle = []) {
        if (vertices == undefined || vertices.length < 2) {
            return;
        }

        var projectedVertices = vertices.map(v => this.projectVertex(v));

        if (n == 0) {
            console.log(projectedVertices);
            n++;
        }

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





