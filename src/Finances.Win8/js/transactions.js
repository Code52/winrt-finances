(function () {
    "use strict";
    
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;
    var items;

    ui.Pages.define("/html/transactions.html", {

        ready : function(element, options) {

            items = data.user.history;

            var listView = element.querySelector(".grouplist").winControl;
            ui.setOptions(listView, {
                itemDataSource: items,
                itemTemplate: element.querySelector(".itemtemplate"),
                oniteminvoked: this.itemInvoked.bind(this)
            });

            this.updateLayout(element, Windows.UI.ViewManagement.ApplicationView.value);
        },
    
        itemInvoked: function(eventObject) {
            var item = items.getAt(eventObject.detail.itemIndex);
            // TODO: what should happen when you select an item in the list? anything?
            // nav.navigate("/html/itemDetailPage.html", { item: item });
        },

        updateLayout: function(element, viewState) {
            var listView = element.querySelector(".grouplist").winControl;

            if (viewState === Windows.UI.ViewManagement.ApplicationViewState.snapped) {
                listView.layout = new ui.ListLayout();
            } else {
                listView.layout = new ui.GridLayout({ groupHeaderPosition: "left" });
            }
        }
    });
})();
