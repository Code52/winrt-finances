(function () {
    "use strict";

    var instance;

    var DropBoxDataSource = WinJS.Class.define(function () { }, {
        loadObject: function (fileName, def) {
            throw new Error("Not implemented");
        },
        saveObject: function (fileName, obj) {
            throw new Error("Not implemented");
        },
        listObjects: function () {
            throw new Error("Not implemented");
        }
    });
   
    WinJS.Namespace.define("Finances.Data", {
        dropbox: {
            get: function () {
                if (!instance) {
                    instance = new DropBoxDataSource();
                }
                return instance;
            }
        }
    });
})();