(function (window) {
    var Controller = {

        url: 'https://io.tou.12.gy',

        send: function (postion, callback) {
            var url = this.url,
            ajaxCall = jQuery.ajax({
                url: url,
                success: callback(data),
                dataType: 'json',
                type: 'POST'
            })
        }
    }
} (window));