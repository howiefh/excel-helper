{
    "excel": {
        "name": "Excel助手",
        "tips": "Excel助手！",
        "noPage": false,
        "contentScript": false,
        "contentScriptCss": false,
        "menuConfig": [
            {
                "icon": "▤",
                "text": "Excel助手！",
                "onClick": function (info, tab) {
                    // alert("你好，我是sharding!");
                    chrome.DynamicToolRunner({
                        query: "tool=excel"
                    });
                }
            }
        ],
        "updateUrl": null
    }
}