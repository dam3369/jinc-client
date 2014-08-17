(function (window) {
    var element = {
            distance: document.getElementById('distance'),
            number: document.getElementById('number'),
            unit: document.getElementById('unit'),
            arrow: document.getElementById('arrow'),
            home: document.getElementById('home'),
            wallpaper: document.getElementById('wallpaper'),
            content: document.getElementById('content'),
            restore: document.getElementById('restore')
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

    window.ui = {
        printDistance: function (distance) {
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
            if (isNaN(distance)) {
                distance = 0;
            }
            element.number.innerHTML = distance;
        },
        changeUnit: function () {
            if (isMetricSytem()) {
                element.unit.innerHTML = 'yd';
                element.unit.dataset.unit = 'datum'
            } else {
                element.unit.innerHTML = 'm';
                element.unit.dataset.unit = 'metric'
            }
            ui.printDistance();
        },
        onResizeWindow: function () {
            var height = document.body.clientHeight,
                width = document.body.clientWidth,
                margintop = 0;

            if (height > width) {
                margintop = (height - ((width/100)*80)) / 2;
            } else {
                margintop = (height - ((height/100)*80)) / 2;
            }
            element.arrow.style.marginTop = margintop.toString() + 'px';
            element.home.style.marginTop = margintop.toString() + 'px';
        },
        setActivity: function (activ) {
            if (activ) {
                element.wallpaper.classList.remove('inactive');
                element.wallpaper.classList.add('active');
            } else {
                element.wallpaper.classList.remove('active');
                element.wallpaper.classList.add('inactive');
            }
        },
        printHome: function () {
            element.home.style.display = 'block';
            element.restore.style.display = 'block';
            element.arrow.style.display = 'none';
            element.distance.style.display = 'none';
        },
        printArrow: function () {
            element.home.style.display = 'none';
            element.restore.style.display = 'none';
            element.arrow.style.display = 'block';
            element.distance.style.display = 'block';
        },
        printLink: function (url) {
            document.getElementById('link').value = url;
        }
    };

    ui.arrow = element.arrow;
    ui.arrow.rotate = function (radiant) {
        element.arrow.style.transform = 'rotate(' + radiant + 'rad)';
    };
    ui.arrow.center = function () {
        rotateArrow(0);
    };
} (window));