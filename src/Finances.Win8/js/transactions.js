(function () {
    "use strict";

    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;
    var items;

    ui.Pages.define("/html/transactions.html", {

        ready: function (element, options) {
            items = Finances.Data.groupedHistory;

            var listView = element.querySelector(".grouplist").winControl;
            ui.setOptions(listView, {
                itemDataSource: items.dataSource,
                itemTemplate: element.querySelector(".itemtemplate"),
                oniteminvoked: this.itemInvoked.bind(this)
            });

            var flyout = element.querySelector("#addTransactionFlyout");
            element.querySelector("#addTransaction").onclick = function () {
                flyout.winControl.show(listView);
            };

            var categories = Finances.Data.data.categories;
            var select = element.querySelector("#transaction-flyout-category");
            categories.forEach(function (item) {
                var option = document.createElement("option");
                option.text = item.title;
                option.value = item.key;
                select.appendChild(option);
            });

            element.querySelector("#transaction-flyout-submit").onclick = function () {
                Finances.Data.addTransaction(
                select.options[select.selectedIndex].value,
                element.querySelector("#transaction-flyout-amount").value,
                element.querySelector("#transaction-flyout-content").value
            );
                flyout.winControl.hide();
            };

            element.querySelector("#transaction-flyout-cancel").onclick = function () { flyout.winControl.hide(); };

            this.updateLayout(element, Windows.UI.ViewManagement.ApplicationView.value);
        },

        itemInvoked: function (eventObject) {
            var item = items.getAt(eventObject.detail.itemIndex);
            console.log('Selected item: ' + JSON.stringify(item));
            // TODO: what should happen when you select an item in the list? anything?
            // nav.navigate("/html/itemDetailPage.html", { item: item });
        },

        updateLayout: function (element, viewState) {
            var listView = element.querySelector(".grouplist").winControl;

            if (viewState === Windows.UI.ViewManagement.ApplicationViewState.snapped) {
                listView.layout = new ui.ListLayout();
            } else {
                listView.layout = new ui.GridLayout({ groupHeaderPosition: "left" });
            }
        }
    });
})();