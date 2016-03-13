// URL of the backend server
var serverUrl = "http://027bfe49.ngrok.io";
//http://027bfe49.ngrok.io/URLShare/sendurl.php?groupname=brumhack&username=alex&url=http://facebook.com

chrome.contextMenus.create({
    'title': 'Share this URL',
    'contexts': ['all'],
    'onclick': onClickShareLinkHandler
});

function sendPostRequest(path, params, method) {
    /*
     * Will send a POST request to the backend server.
     */
    method = method || "post";

    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

function onClickShareLinkHandler(info) {
    /**
     *  Code will go here for sending a request to the backend server containing the URL.
     */
    // Sending message to the content script
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {getURL: "true"}, function (response) {
            console.log("Response: " + response);
        });
    });
}

