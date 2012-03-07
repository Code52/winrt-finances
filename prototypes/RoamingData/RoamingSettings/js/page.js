(function () {

    var dataStore = Finances.Data.roaming;
    var fileCounter = 0;
    var fileList = new WinJS.Binding.List();
    var ui = WinJS.UI;
    
    function id(elementId) {
        return document.getElementById(elementId);
    }

    function readFile() {
        dataStore.loadObject("1.json").then(function (obj) {
            console.log(JSON.stringify(obj));
        });
    }

    function createFile() {
        fileCounter += 1;
        dataStore.saveObject(fileCounter + ".json", { id: fileCounter, caption: 'test' }).then(function() {
            console.log('Object ' + fileCounter + ' saved');
            listFiles();
        });
    }
    
    function listFiles() {
        return dataStore.listObjects().then(function (list) {
            for (var i = 0; i < list.length; i++) {
                if (fileList.some(function (item) { return item === list[i]; })) { continue; }
                fileList.push(list[i]);
            }
        });
    }

    function buildDataSourceList() {
        var select = id('chooseDataSource');
        for (var source in Finances.Data) {
            var el = document.createElement('option');
            el.innerText = source;
            select.options.add(el);
        }
    }

    function init() {
        buildDataSourceList();

        WinJS.UI.processAll();
        id('readFile').addEventListener('click', readFile);
        id('createFile').addEventListener('click', createFile);
        id('listFiles').addEventListener('click', listFiles);
        
        var fileListView = id('FileList').winControl;
        ui.setOptions(fileListView, {
            itemDataSource: fileList.dataSource
        });
        listFiles().then(function () {;
            fileCounter = fileList.length;
        });
    }

    document.addEventListener("DOMContentLoaded", init, false);
})();