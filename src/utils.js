
class Utils {
    null2EmptyString(value) {
        return value == null ? "" : value;
    }
    null2Zero() {
        return value == null ? 0 : value;
    }
    null2NewObject(value) {
        return value == null ? {} : value;
    }
}

const utils = new Utils();

module.exports = utils;