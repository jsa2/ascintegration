module.exports= function (facts,alert,SASURL) {
    
    return {
        "@type": "MessageCard",
        "@context": "http://schema.org/extensions",
        "themeColor": "0076D7",
        "summary": 'test',
        "sections": [{
            "activityTitle": 'test',
            "activitySubtitle": 'test',
            "activityImage": "https://publicblobs2.blob.core.windows.net/image/alert.png?sp=r&st=2020-07-19T12:03:33Z&se=2099-07-19T20:03:33Z&spr=https&sv=2019-10-10&sr=b&sig=mZq0R57KSaxz%2FS5ZrEQq5i6c92pbK%2BFOJSGqrqLw2no%3D",
            "markdown": true ,
            facts
        }],
        "potentialAction": [
            {
                "@type": "ActionCard",
                "name": "Triage",
                "actions": [{
                    "@type": "OpenUri",
                    "name": "Triage",
                    "target": alert,
                    "targets": [
                        { "os": "default", "uri": alert },
                        { "os": "iOS", "uri": alert },
                        { "os": "android", "uri": alert },
                        { "os": "windows", "uri": alert }
                    ]
                },
            ],
        },
        /* {
            "@type": "ActionCard",
            "name": "Add a comment",
            "inputs": [{
                "@type": "TextInput",
                "id": "comment",
                "isMultiline": false,
                "title": "Add a comment here for this task"
            }],
            "actions": [{
                "@type": "HttpPOST",
                "name": "Save",
                "body": "Hello!",
                "target": "https://az.dewi.red/messages"
            }]
        }, */
        {
            "@type": "ActionCard",
            "name": "Export to JSON",
            "actions": [{
                "@type": "OpenUri",
                "name": "Export to JSON (available for five days)",
                "target": SASURL,
                "targets": [
                    { "os": "default", "uri": SASURL },
                    { "os": "iOS", "uri": SASURL },
                    { "os": "android", "uri": SASURL },
                    { "os": "windows", "uri": SASURL }
                ]
            },
        ],
    },
    ]
}


}