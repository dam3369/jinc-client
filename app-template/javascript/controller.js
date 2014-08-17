(function (window) {
    var completeRequest = function (position) {
        retrun {
            position: position,
            session: session.getHash(),
            track: session.getTrakId()
        }
    };

    window.controller = {
        url: 'https://io.jink.12.gy',

        send: function (position, callback) {
            var url = this.url,
            ajaxCall = jQuery.ajax({
                url: url,
                data: completeRequest(position);
                success: callback(data),
                dataType: 'json',
                type: 'POST'
            });
        }
    };
} (window));