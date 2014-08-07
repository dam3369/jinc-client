(function (window) {

    var hypot = function (x, y) {
        return Math.sqrt(Math.pow(Math.abs(x), 2) + Math.pow(Math.abs(y), 2));
    },

    computeAlpha = function (x, y) {
        var alpha = 0,
            h = hypot(x, y);

            jQuery('#prompt #hyp').val(Math.round(Math.abs(x) * 100000) + ' / ' + Math.round(h * 100000));

        if (x === y) {
            alpha = 45;
        } else {
            alpha = (Math.acos(Math.abs(x)/h) * 180 / Math.PI);
        }

        return alpha;
    },

    computeBeta = function (x, y, alpha) {
        var beta = 0,
            xIsPos = (x === Math.abs(x)),
            yIsPos = (y === Math.abs(y));

        if (x === 0 || y === 0) {
            if (x === 0 && yIsPos) {
                beta = 0;
            } else if (x === 0 && !yIsPos) {
                beta = 180;
            } else if (xIsPos && y === 0) {
                beta = 90;
            } else if (!xIsPos && y === 0) {
                beta = 270;
            }
        } else {
            if (xIsPos && yIsPos) {
                beta = 90 - alpha;
            } else if (xIsPos && !yIsPos) {
                beta = 90 + alpha;
            } else if (!xIsPos && yIsPos) {
                beta = 270 + alpha;
            } else if (!xIsPos && !yIsPos) {
                beta = 270 - alpha;
            }
        }

        return beta;
    },

    computeDelta = function (pointA, pointB, gamma) {
        var x = pointB.getX() - pointA.getX(),
            y = pointB.getY() - pointA.getY(),
            alpha = computeAlpha(x, y),
            beta = computeBeta(x, y, alpha);

        jQuery('#prompt #lat').val(gamma);
        jQuery('#prompt #lng').val(beta);
        jQuery('#prompt #spd').val(alpha);

        return (beta - gamma);
    },

    computeHypot = function (pointA, pointB) {
        var x = pointB.getX() - pointA.getX(),
            y = pointB.getY() - pointA.getY();

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