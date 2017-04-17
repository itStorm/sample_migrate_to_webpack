/**
 * @param form jQueryObject
 * @returns Object
 */
function formToJson(form) {
    var result = {};
    if (!form) {
        return result;
    }

    form.serializeArray().forEach(function (el) {
        var arraySymbols = el.name.search(/\[\]/);

        if (arraySymbols != -1) {
            var name = el.name.substring(0, arraySymbols);
            if (!result[name]) {
                result[name] = [];
            }
            result[name].push(el.value);
        } else {
            result[el.name] = el.value;
        }
    });

    return result;
}

module.exports = formToJson;