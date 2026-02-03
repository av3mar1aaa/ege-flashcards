/**
 * SVG Graph Generator for EGE Task 11
 * Renders function graphs with coordinate grids
 * @module EgeSvgGraph
 */
const EgeSvgGraph = {
    WIDTH: 420,
    HEIGHT: 320,
    PADDING: 45,

    /**
     * Generates an SVG string from a graph definition
     * @param {Object} graphDef - Graph definition from problem data
     * @returns {string} SVG markup
     */
    render(graphDef) {
        const { points, xRange, yRange, markers, showGrid = true } = graphDef;
        const [xMin, xMax] = xRange;
        const [yMin, yMax] = yRange;

        const plotW = this.WIDTH - 2 * this.PADDING;
        const plotH = this.HEIGHT - 2 * this.PADDING;
        const scaleX = plotW / (xMax - xMin);
        const scaleY = plotH / (yMax - yMin);

        const toSvgX = (x) => this.PADDING + (x - xMin) * scaleX;
        const toSvgY = (y) => this.HEIGHT - this.PADDING - (y - yMin) * scaleY;

        let svg = `<svg viewBox="0 0 ${this.WIDTH} ${this.HEIGHT}" class="ege-graph" xmlns="http://www.w3.org/2000/svg">`;

        if (showGrid) {
            svg += this._renderGrid(xMin, xMax, yMin, yMax, toSvgX, toSvgY);
        }

        svg += this._renderAxes(xMin, xMax, yMin, yMax, toSvgX, toSvgY);
        svg += this._renderTickLabels(xMin, xMax, yMin, yMax, toSvgX, toSvgY);
        svg += this._renderCurve(points, toSvgX, toSvgY);

        if (markers && markers.length > 0) {
            svg += this._renderMarkers(markers, toSvgX, toSvgY);
        }

        svg += '</svg>';
        return svg;
    },

    _renderGrid(xMin, xMax, yMin, yMax, toSvgX, toSvgY) {
        let g = '<g class="grid">';
        for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
            const sx = toSvgX(x);
            g += `<line class="grid-line" x1="${sx}" y1="${this.PADDING}" x2="${sx}" y2="${this.HEIGHT - this.PADDING}"/>`;
        }
        for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
            const sy = toSvgY(y);
            g += `<line class="grid-line" x1="${this.PADDING}" y1="${sy}" x2="${this.WIDTH - this.PADDING}" y2="${sy}"/>`;
        }
        g += '</g>';
        return g;
    },

    _renderAxes(xMin, xMax, yMin, yMax, toSvgX, toSvgY) {
        let g = '<g class="axes">';
        const originX = toSvgX(0);
        const originY = toSvgY(0);
        const left = this.PADDING;
        const right = this.WIDTH - this.PADDING;
        const top = this.PADDING;
        const bottom = this.HEIGHT - this.PADDING;

        // X axis
        if (yMin <= 0 && yMax >= 0) {
            g += `<line class="axis-line" x1="${left}" y1="${originY}" x2="${right}" y2="${originY}"/>`;
            g += `<polygon class="axis-arrow" points="${right},${originY} ${right - 8},${originY - 4} ${right - 8},${originY + 4}"/>`;
            g += `<text class="axis-label" x="${right - 2}" y="${originY - 8}" text-anchor="end">x</text>`;
        }

        // Y axis
        if (xMin <= 0 && xMax >= 0) {
            g += `<line class="axis-line" x1="${originX}" y1="${bottom}" x2="${originX}" y2="${top}"/>`;
            g += `<polygon class="axis-arrow" points="${originX},${top} ${originX - 4},${top + 8} ${originX + 4},${top + 8}"/>`;
            g += `<text class="axis-label" x="${originX + 10}" y="${top + 5}" text-anchor="start">y</text>`;
        }

        g += '</g>';
        return g;
    },

    _renderTickLabels(xMin, xMax, yMin, yMax, toSvgX, toSvgY) {
        let g = '<g class="ticks">';
        const originY = toSvgY(0);
        const originX = toSvgX(0);

        for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
            if (x === 0) continue;
            const sx = toSvgX(x);
            const ly = (yMin <= 0 && yMax >= 0) ? originY + 15 : this.HEIGHT - this.PADDING + 15;
            g += `<text class="tick-label" x="${sx}" y="${ly}" text-anchor="middle">${x}</text>`;
            if (yMin <= 0 && yMax >= 0) {
                g += `<line class="axis-line" x1="${sx}" y1="${originY - 3}" x2="${sx}" y2="${originY + 3}"/>`;
            }
        }

        for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
            if (y === 0) continue;
            const sy = toSvgY(y);
            const lx = (xMin <= 0 && xMax >= 0) ? originX - 10 : this.PADDING - 10;
            g += `<text class="tick-label" x="${lx}" y="${sy + 4}" text-anchor="end">${y}</text>`;
            if (xMin <= 0 && xMax >= 0) {
                g += `<line class="axis-line" x1="${originX - 3}" y1="${sy}" x2="${originX + 3}" y2="${sy}"/>`;
            }
        }

        g += '</g>';
        return g;
    },

    /**
     * Renders a smooth curve through the given points using Catmull-Rom spline
     */
    _renderCurve(points, toSvgX, toSvgY) {
        if (!points || points.length < 2) return '';

        // Sort points by x
        const sorted = [...points].sort((a, b) => a[0] - b[0]);

        if (sorted.length === 2) {
            const [x1, y1] = sorted[0];
            const [x2, y2] = sorted[1];
            return `<line class="function-line" x1="${toSvgX(x1)}" y1="${toSvgY(y1)}" x2="${toSvgX(x2)}" y2="${toSvgY(y2)}"/>`;
        }

        // Catmull-Rom to Cubic Bezier conversion
        const svgPoints = sorted.map(([x, y]) => [toSvgX(x), toSvgY(y)]);
        let d = `M ${svgPoints[0][0]} ${svgPoints[0][1]}`;

        for (let i = 0; i < svgPoints.length - 1; i++) {
            const p0 = svgPoints[Math.max(0, i - 1)];
            const p1 = svgPoints[i];
            const p2 = svgPoints[i + 1];
            const p3 = svgPoints[Math.min(svgPoints.length - 1, i + 2)];

            const tension = 6;
            const cp1x = p1[0] + (p2[0] - p0[0]) / tension;
            const cp1y = p1[1] + (p2[1] - p0[1]) / tension;
            const cp2x = p2[0] - (p3[0] - p1[0]) / tension;
            const cp2y = p2[1] - (p3[1] - p1[1]) / tension;

            d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2[0]} ${p2[1]}`;
        }

        return `<path class="function-line" d="${d}"/>`;
    },

    _renderMarkers(markers, toSvgX, toSvgY) {
        let g = '<g class="markers">';
        for (const m of markers) {
            const sx = toSvgX(m.x);
            const sy = toSvgY(m.y);
            g += `<circle class="point-marker" cx="${sx}" cy="${sy}" r="4"/>`;
            if (m.label) {
                g += `<text class="point-label" x="${sx + 8}" y="${sy - 8}">${m.label}</text>`;
            }
        }
        g += '</g>';
        return g;
    }
};
