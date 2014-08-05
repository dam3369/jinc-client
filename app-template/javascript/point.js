(function (window) {

    var hypot = function (x, y) {
        return Math.sqrt(Math.pow(Math.abs(x), 2) + Math.pow(Math.abs(y), 2));
    },

    computeAlpha = function (x, y) {
        var alpha = 0,
            xIsPos = (x === Math.abs(x)),
            yIsPos = (y === Math.abs(y)),
            h = hypot(x, y);

        if (x === y) {
            alpha = 45;
        } else if (x > y) {
            alpha = Math.asin(y/h);
            jQuery('#prompt #lat').val('x sup y');

            if ((xIsPos && yIsPos) || (!xIsPos && !yIsPos)) {
                alpha = 90 - alpha;
            }
        } else if (x < y) {
            jQuery('#prompt #lat').val('x inf y');
            alpha = Math.asin(x/h);

            if ((xIsPos && !yIsPos) || (!xIsPos && yIsPos)) {
                alpha = 90 - alpha;
            }
        }

        return alpha;
    },

    computeBeta = function (x, y, alpha) {
        var beta = 0,
            xIsPos = (x === Math.abs(x)),
            yIsPos = (y === Math.abs(y));

        if (xIsPos) {
            jQuery('#prompt #lng').val('x positif');
        } else {
            jQuery('#prompt #lng').val('x negatif');
        }
        if (yIsPos) {
            jQuery('#prompt #spd').val('y positif');
        } else {
            jQuery('#prompt #spd').val('y negatif');
        }

        if (x === 0 || y === 0) {
            if (x === 0 && yIsPos) {
                beta = 0;
            } else if (x === 0 && !yIsPos) {
                beta = 180;
            } else if (xIsPos && y === 0) {
                beta = 90;
            } else if (!xIsPos && y === 0) {
                beta = 270;
            } else {
                console.log('error');
            }
        } else {
            if (xIsPos && yIsPos) {
                beta = alpha;
            } else if (xIsPos && !yIsPos) {
                beta = 90 + alpha;
            } else if (!xIsPos && yIsPos) {
                beta = 270 + alpha;
            } else if (!xIsPos && !yIsPos) {
                beta = 180 + alpha;
            } else {
                console.log('error');
            }
        }

        return beta;
    },

    computeDelta = function (pointA, pointB, gamma) {
        var x = pointA.getX() - pointB.getX(),
            y = pointA.getY() - pointB.getY(),
            alpha = computeAlpha(x, y);
            beta = Math.abs(computeBeta(x, y, alpha));

        if (beta > gamma) {
            return -(beta - gamma);
        } else if (beta < gamma) {
            return (gamma - beta);
        } else {
            return 0;
        }
    },

    computeHypot = function (pointA, pointB) {
        var x = pointA.getX() - pointB.getX(),
            y = pointA.getY() - pointB.getY();

        return hypot(x, y);
    },

    Point = function () {
        return {
            lat: 0,
            lng: 0,
            setCoords: function (lat, lng) {
                this.lat = lat;
                this.lng = lng;
            },
            getX: function () {
                return this.lng;
            },
            getY: function () {
                return this.lat;
            },
            getDelta: function (point, gamma) {
                return computeDelta(this, point, gamma);
            },
            getDistance: function (point) {
                return computeHypot(this, point);
            }
        }
    },

    create = function (coords) {
        var point = new Point();
        if(Object.prototype.toString.call(coords) === '[object Array]') {
            point.setCoords(coords[0], coords[1]);
        } else {
            point.setCoords(coords.latitude, coords.longitude);
        }

        return point;
    };

    window.point = {};
    window.point.create = create;
} (window));