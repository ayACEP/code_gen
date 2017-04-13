
var callbacks = [];

if (window.onbeforeunload == null) {
    window.onbeforeunload = function () {
        for (var i in callbacks) {
            try {
                callbacks[i].callback();
            } catch (e) {
                console.warn(e);
            }
        }
        callbacks = null;
        window.onbeforeunload = null;
    };
}

var ge = {
    onWindowUnload(callback, thiz) {
        callbacks.push({ callback, thiz });
    }
};

module.exports = ge;