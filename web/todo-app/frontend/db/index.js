/**
 * DB object
 * @constructor
 */
function DB() {

    // Initialization
    var events = {};
    var types = ['tasks'];
    var DBdata = {};

    if (window.localStorage.getItem('db')) {
        DBdata = JSON.parse(window.localStorage.getItem('db'));
    }

    types.forEach(function (type) {
        if (!DBdata[type]) {
            DBdata[type] = [];
        }
    });
    window.localStorage.setItem('db', JSON.stringify(DBdata));
    // End init


    // Bind callback to event
    this.on = function (event, callback) {
        if (typeof callback != 'function') {
            return;
        }

        event.replace(/ {2,}/, ' ').split(' ').forEach(function (e) {
            if (!events[e]) {
                events[e] = [];
            }
            events[e].push(callback);
        });
    };

    // Trigger event
    this.trigger = function (event, type, record) {
        if (!events[event]) {
            return;
        }
        events[event].forEach(function (callback) {
            callback.apply(null, [type, record]);
        });
    };

    // Check that type is legal
    this.check = function (type) {
        if (type != 'tasks') {
            console.error('This type of object is not defined');
            return false;
        }
        return true;
    };

    // Find all records
    this.findAll = function (type) {
        var records = [];

        if (!this.check(type)) {
            return records;
        }

        DBdata[type].forEach(function (row) {
            if (row) {
                records.push(row);
            }
        });

        return records;
    };

    // Find by real id
    this.findById = function (type, id) {
        if (!this.check(type)) {
            return null;
        }

        var records = DBdata[type],
            key = id - 1;

        return records[key] ? records[key] : null;
    };

    // Insert new or update
    this.insert = function (type, data) {
        var event = 'insert';

        if (!this.check(type)) {
            return false;
        }
        if (typeof data != 'object') {
            console.error('Data have to be an object');
            return false;
        }

        if (data.id && (typeof data.id != 'number' || data.id < 1 || data.id % 1 != 0)) {
            console.error('Id must be a positive integer');
            return false;
        } else if (data.id) {
            DBdata[type][data.id - 1] = data;
            event = 'update';

        } else {
            data.id = DBdata[type].length + 1;
            DBdata[type].push(data);
        }

        localStorage.setItem('db', JSON.stringify(DBdata));
        this.trigger(event, type, data);

        return true;
    };

    // Delete record
    this.delete = function (type, id) {
        var key = id - 1;
        var data;

        if (!this.check(type) || !DBdata[type][key]) {
            return false;
        }

        data = DBdata[type][key];
        delete DBdata[type][key];

        localStorage.setItem('db', JSON.stringify(DBdata));
        this.trigger('delete', type, data);

        return true;
    };
}

var db = new DB();