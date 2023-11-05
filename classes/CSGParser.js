class CSGParser {
    tokenize(expression) {
        return expression.split(/(\(|\)|\||\n)/).filter(token => token.trim() !== '');
    }

    parseSphere(tokens) {
        tokens.shift(); // (
        const radius = parseFloat(tokens[0]);
        tokens.shift(); // radius
        tokens.shift(); // )
        return new Sphere(radius);
    }

    parseCylinder(tokens) {        
        tokens.shift(); // (
        const radius = parseFloat(tokens[0]);
        tokens.shift(); // radius
        tokens.shift(); // |
        const height = parseFloat(tokens[0]);
        tokens.shift(); // height
        tokens.shift(); // )
        return new Cylinder(radius, height);
    }

    parseTranslation(tokens) {
        tokens.shift(); // (
        const x = parseFloat(tokens[0]);
        tokens.shift(); // x
        tokens.shift(); // |
        const y = parseFloat(tokens[0]);
        tokens.shift(); // y
        tokens.shift(); // |
        const z = parseFloat(tokens[0]);
        tokens.shift(); // z
        tokens.shift(); // |
        const shape = this.parseShape(tokens);
        tokens.shift(); // )
        return new CSGTranslation(shape, x, y, z);
    }

    parseRotation(tokens) {
        tokens.shift(); // (
        const x = parseFloat(tokens[0]);
        tokens.shift(); // x
        tokens.shift(); // |
        const y = parseFloat(tokens[0]);
        tokens.shift(); // y
        tokens.shift(); // |
        const z = parseFloat(tokens[0]);
        tokens.shift(); // z
        tokens.shift(); // |
        const shape = this.parseShape(tokens);
        tokens.shift(); // )
        return new CSGRotation(shape, x, y, z);
    }

    parseUnion(tokens) {
        tokens.shift(); // (
        const shape1 = this.parseShape(tokens);
        tokens.shift(); // |
        const shape2 = this.parseShape(tokens);
        tokens.shift(); // )
        if (shape1 && shape2) {
            return new CSGUnion(shape1, shape2);
        }
    }

    parseIntersection(tokens) {
        tokens.shift(); // (
        const shape1 = this.parseShape(tokens);
        tokens.shift(); // |
        const shape2 = this.parseShape(tokens);
        tokens.shift(); // )
        if (shape1 && shape2) {
            return new CSGIntersection(shape1, shape2);
        }
    }

    parseDifference(tokens) {
        tokens.shift(); // (
        const shape1 = this.parseShape(tokens);
        tokens.shift(); // |
        const shape2 = this.parseShape(tokens);
        tokens.shift(); // )
        if (shape1 && shape2) {
            return new CSGDifference(shape1, shape2);
        }
    }

    parseShape(tokens) {
        let type = tokens[0];
        tokens.shift();
        if (type === "SPHERE") {
            return this.parseSphere(tokens);
        } else if (type === "CYLINDER") {
            return this.parseCylinder(tokens);
        } else if (type === "UNION") {
            return this.parseUnion(tokens);
        } else if (type === "INTERSECTION") {
            return this.parseIntersection(tokens);
        } else if (type === "DIFFERENCE") {
            return this.parseDifference(tokens);
        } else if (type === "TRANSLATION") {
            return this.parseTranslation(tokens);
        } else if (type === "ROTATION") {
            return this.parseRotation(tokens);
        }
        return null;
    }

    parseExpression(expression) {
        const tokens = this.tokenize(expression.replace(/[\n\s]/g, ''));
        const shape = this.parseShape(tokens);
        if (tokens.length === 0) {
            return shape;
        } else {
            throw new Error("Invalid expression");
        }
    }
}