(function (window) {
    var element = {
            distance: document.getElementById('distance'),
            number: document.getElementById('number'),
            unit: document.getElementById('unit'),
            arrow: document.getElementById('arrow'),
            wallpaper: document.getElementById('wallpaper')
        },

        isMetricSytem = function () {
            if (element.unit.dataset.unit === 'metric') {
                return true;
            }
            return false;
        },

        convertToMilles = function (number) {
            return Math.round(number * 1.0936);
        },

        upgradeUnit = function (number) {
            if (isMetricSytem()) {
                element.unit.innerHTML = 'km';
                number = (Math.round(element.number.dataset.value / 100) / 10);
            } else {
                element.unit.innerHTML = 'mi';
                number = (Math.round(element.number.dataset.value * 0.0006213 * 10) / 10);
            }
            return number;
        };

    window.printDistance = function (distance) {
        distance = Math.round(distance);

        if (distance === undefined && element.number.dataset.value !== undefined) {
            distance = element.number.dataset.value
        } else if (distance === undefined) {
            distance = 0;
        }
        element.number.dataset.value = distance;

        if (!isMetricSytem()) {
            distance = convertToMilles(distance);
        }
        if (distance > 999) {
            distance = upgradeUnit(distance);
        }
        element.number.innerHTML = distance;
    };

    window.arrow = element.arrow;

    window.arrow.rotate = function (radiant) {
        element.arrow.style.transform = 'rotate(' + radiant + 'rad)';
    };

    window.arrow.center = function () {
        rotateArrow(0);
    };

    window.changeUnit = function () {
        if (isMetricSytem()) {
            element.unit.innerHTML = 'yd';
            element.unit.dataset.unit = 'datum'
        } else {
            element.unit.innerHTML = 'm';
            element.unit.dataset.unit = 'metric'
        }
        printDistance();
    };
} (window));