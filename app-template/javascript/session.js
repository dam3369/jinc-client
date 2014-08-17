(function (window) {
    var alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        isNew = true,
        generateToken = function () {
            var token = [],
                rand;

            for (var i = 0; i < 10; i = i + 1) {
                rand = Math.floor(Math.random() * 36) + 1;
                token.push(alpha[rand]);
            }

            return token.join('');
        },
        newSession = function () {
            store(generateToken(), 1, 2);
        },
        loadSession = function (hash) {
            isNew = false;
            hash = hash.split('#');
            store(hash[1], 2, 1);
        },
        store = function (session, id, track) {
            if (window.sessionStorage.getItem('hash') && window.sessionStorage.getItem('hash') !== session) {
                window.sessionStorage.setItem('old_hash', window.sessionStorage.getItem('hash'));
                window.sessionStorage.setItem('old_track', window.sessionStorage.getItem('track'));
                window.sessionStorage.setItem('old_id', window.sessionStorage.getItem('id'));
            }
            window.sessionStorage.setItem('hash', session);
            window.sessionStorage.setItem('track', track);
            window.sessionStorage.setItem('id', id);
        };
    

    window.session = {
        start: function () {
            if (document.location.hash === '') {
                newSession();
            } else {
                loadSession(document.location.hash);
            }
        },

        getHash: function () {
            return window.sessionStorage.getItem('hash');
        },

        getTrakId: function () {
            return window.sessionStorage.getItem('track');
        },

        isNew: function () {
            return isNew;
        },

        isOldSession: function () {
            return (window.sessionStorage.getItem('old_hash') !== null);
        },

        restoreOldSession: function () {
            window.sessionStorage.setItem('hash', window.sessionStorage.getItem('old_hash'));
            window.sessionStorage.setItem('track', window.sessionStorage.getItem('old_track'));
            window.sessionStorage.setItem('id', window.sessionStorage.getItem('old_id'));
            
            window.sessionStorage.setItem('old_hash', null);
            window.sessionStorage.setItem('old_track', null);
            window.sessionStorage.setItem('old_id', null);
        }
    };
} (window));