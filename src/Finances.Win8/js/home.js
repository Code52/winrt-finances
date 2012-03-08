(function () {
    "use strict";

    var ui = WinJS.UI;
    var nav = WinJS.Navigation;
    
    ui.Pages.define("/html/home.html", {
        ready: function (element, options) {
            element.querySelector("#transactions").onclick = function () { nav.navigate("/html/transactions.html"); };
            element.querySelector("#goals").onclick = function () { nav.navigate("/html/transactions.html"); }; // TODO: new page
            element.querySelector("#dashboard").onclick = function () { nav.navigate("/html/transactions.html"); }; // TODO: new page
        },
    });
})();
