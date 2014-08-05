(function (window) {
    var Arrow = {

        img: document.getElementById('arrow'),

        rotate: function (radiant) {
            this.img.style.transform = 'rotate(' + radiant + 'rad)';
        },

        center: function () {
            Arrow.rotate(0);
        }
    };

    window.arrow = Arrow;
} (window));
