(function () {
    "use strict";

    var appView = Windows.UI.ViewManagement.ApplicationView;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;

    ui.Pages.define("/html/groupedItemsPage.html", {

        // This function is used in updateLayout to select the data to display
        // from an item's group.
        groupDataSelector: function (item) {
            return {
                title: item.group.title,
                click: function () {
                    nav.navigate("/html/groupDetailPage.html", { group: item.group });
                }
            }
        },

        // This function is used in updateLayout to select an item's group key.
        groupKeySelector: function (item) {
            return item.group.key;
        },

        itemInvoked: function (eventObject) {
            if (appView.value === appViewState.snapped) {
                // If the page is snapped, the user invoked a group.
                var group = data.groups.getAt(eventObject.detail.itemIndex);
                nav.navigate("/html/groupDetailPage.html", { group: group });
            } else {
                // If the page is not snapped, the user invoked an item.
                var item = data.items.getAt(eventObject.detail.itemIndex);
                nav.navigate("/html/itemDetailPage.html", { item: item });
            }
        },

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            element.querySelector("#expenses").onclick = function () { nav.navigate("/html/expenses.html"); };
            element.querySelector("#goals").onclick = function () { nav.navigate("/html/expenses.html"); }; // TODO: new page
            element.querySelector("#dashboard").onclick = function () { nav.navigate("/html/expenses.html"); }; // TODO: new page
        },

        // This function updates the page layout in response to viewState changes.
        updateLayout: function (element, viewState) {
            var listView = element.querySelector(".groupeditemslist").winControl;
            if (viewState === appViewState.snapped) {
                // If the page is snapped, display a list of groups.
                ui.setOptions(listView, {
                    itemDataSource: data.groups.dataSource,
                    groupDataSource: null,
                    layout: new ui.ListLayout()
                });
            } else {
                // If the page is not snapped, display a grid of grouped items.
                var groupDataSource = data.items.createGrouped(this.groupKeySelector, this.groupDataSelector).groups;

                ui.setOptions(listView, {
                    itemDataSource: data.items.dataSource,
                    groupDataSource: groupDataSource.dataSource,
                    layout: new ui.GridLayout({ groupHeaderPosition: "top" })
                });
            }
        },

    });
})();
