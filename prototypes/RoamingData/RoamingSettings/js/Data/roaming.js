(function () {
    "use strict";

    var storageFolder = Windows.Storage.ApplicationData.current.roamingFolder;
    var roaming = WinJS.Application.roaming;    // Contains some nice wrappers around StorageFolder, but not enough, so we take what we can from each
    var instance;

    var RoamingDataSource = WinJS.Class.define(function () { }, {
        loadObject: function (fileName, def) {
            return roaming.readText(fileName, '{}')
                .then(function (json) {
                    return JSON.parse(json);
                });
        },
        saveObject: function (fileName, obj) {
            var json = JSON.stringify(obj);
            return roaming.writeText(fileName, json);
        },
        listObjects: function () {
            return storageFolder.getFilesAsync().then(function (fileList) {
                var results = [];
                for (var i = 0; i < fileList.size; i++) {
                    results.push(fileList[i].name);
                }
                return results;
            });
        }
    });

    WinJS.Namespace.define("Finances.Data", {
        roaming: {
            get: function () {
                if (!instance) {
                    instance = new RoamingDataSource();
                }
                return instance;
            }
        }
    });
})();