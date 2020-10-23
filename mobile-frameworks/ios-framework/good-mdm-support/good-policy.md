# Good Policy

All of the options available in [`BBApplicationLaunchParameters`](../classes/bbapplicationlaunchparameters.md) are available to be programmed through the Good Application Policy.

{% tabs %}
{% tab title="Application Policy" %}
```javascript
{  
    "advanced":{  
        "advancedAllows":[  
            "Analytics",
            "CrashReporting",
            "enableNetworkDebugging"
        ]
    },
    "basic":{
        "pod_domain":"my-pod.symphony.com",
        "sso_url":"https://my-pod.symphony.com",
        "basicAllows":[  
            "AddressBook",
            "Copy",
            "Sharing",
            "PhotoPicker",
            "WebView",
            "DisablePinCode",
            "DisableIntroduction",
            "BBAccess",
            "EnableFeedback",
            "EnableSendEmojis",
            "EnforcePinCode"
        ]
    },
    "custom_proxy" : {
      "custom_proxy2_domain" : "my_domain.com",
      "custom_proxy2_host" : "http://www.myproxy.com",
      "custom_proxy2_options": [ ],
      "custom_proxy2_port" : 2222,
      "custom_proxy3_domain" : "my_domain_3.com",
      "custom_proxy3_host" : "http://www.myproxy3.com",
      "custom_proxy3_options": [ ],
      "custom_proxy3_port" : 8888,
      "custom_proxy4_domain" : "my_domain_4.com",
      "custom_proxy4_host" : "http://www.myproxy4.com",
      "custom_proxy4_options": [ ],
      "custom_proxy4_port" : 8080
    }
}
```
{% endtab %}
{% endtabs %}

To disable a feature, remove the key from the `basicAllows` or the `advancedAllows` array.

