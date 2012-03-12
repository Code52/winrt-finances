(function () {
    "use strict";

    var dataStore = Finances.Data.localStore;
    var list = new WinJS.Binding.List();
    var groupedItems = list.createGrouped(groupKeySelector, groupDataSelector);
    WinJS.Namespace.define("Finances.Data", {
        data: {},
        groupedHistory: groupedItems,
        categories: function () {
            return Finances.Data.data.categories;
        },
        save: function () {
            return dataStore.saveObject('finances.json', Finances.Data.data);
        },
        getCategory: function(key) {
            var match = Finances.Data.data.categories.filter(function (val) { return key == val.key; });
            return match.length > 0 ? match[0] : null;
        },
        addTransaction: function (category, amount, content) {
            var category = this.getCategory(category);
            if (category == null) return;
            var newItem = { category: category, amount: amount, content: content };
            Finances.Data.data.history.push(newItem);
            Finances.Data.save();
            list.push(newItem);
        }
    });

    function groupKeySelector(item) {
        return item.category.key;
    }

    function groupDataSelector(item) {
        return item.category;
    }

    dataStore.loadObject('finances.json', generateDefaultData()).then(function (data) {
        Finances.Data.data = data;
        data.history.forEach(function (item) {
            list.push(item);
        });
        
        // Create some new data and save it. This gives us a quick test of the save, and then later load of the data
        if (data.categories.length == 2) {
            var newCat = { key: "car", title: "Car expenses", backgroundImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY7h4+cp/AAhpA3h+ANDKAAAAAElFTkSuQmCC", };
            var newItem = { category: newCat, amount: 45.00, content: "Fuel" };
            data.categories.push(newCat);
            data.history.push(newItem);
            list.push(newItem);
            Finances.Data.save().then(function () { console.log('Data saved!'); });
        }
    });

    function generateDefaultData() {
        // These three strings encode placeholder images. You will want to set the
        // backgroundImage property in your real data to be URLs to images.
        var lightGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY7h4+cp/AAhpA3h+ANDKAAAAAElFTkSuQmCC";
        var darkGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY3B0cPoPAANMAcOba1BlAAAAAElFTkSuQmCC";

        // Each of these sample groups must have a unique key to be displayed
        // separately.
        var categories = [
            { key: "groceries", title: "Groceries", backgroundImage: darkGray, },
            { key: "salary", title: "Salary", backgroundImage: lightGray, },
        ];
        
        // Each of these sample items should have a reference to a particular
        // group.
        var data = [
            { category: categories[0], amount: 17.55, content: "Picked up some groceries for dinner" },
            { category: categories[0], amount: 35.90, content: "" },
            { category: categories[0], amount: 98.63, content: "Weekly shop" },
            { category: categories[1], amount: 1235.37, content: "" },
            { category: categories[1], amount: 1235.37, content: "" },
            { category: categories[0], amount: 65.84, content: "Weekly shop" },
            { category: categories[1], amount: 1235.37, content: "" },
            { category: categories[0], amount: 56.25, content: "" },
            { category: categories[1], amount: 1235.37, content: "" },
            { category: categories[0], amount: 84.95, content: "Weekly shop" },
            { category: categories[1], amount: 1235.37, content: "" },
        ];

        return {
            user: {
                firstName: "Tommy",
                lastName: "Tutone"
            },
            categories: categories,
            history: data,
            notifications: []
        };
    }
})();