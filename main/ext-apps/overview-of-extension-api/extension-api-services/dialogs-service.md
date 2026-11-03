# Dialogs Service

Use the `dialogs` service to create modal windows (e.g. to open a modal window from a button registered at a room level).

The following methods are available on the `dialogs` service:

* show
* rerender
* hide

The following picture is an example of what you will be able to create with this service - this module will overlay onto the entire Symphony client window:

![](../../../.gitbook/assets/7bfc2c3-configuration.png)

## show()

Presents a modal dialog to the user:

```javascript
function show(id, serviceName, template, data, options)
```

<table data-header-hidden><thead><tr><th width="149.33333333333331">Parameter</th><th width="101">Type</th><th>Description</th></tr></thead><tbody><tr><td>Parameter</td><td>Type</td><td>Description</td></tr><tr><td>id</td><td>String</td><td>A unique id for the dialog.</td></tr><tr><td>serviceName</td><td>String</td><td>The name of a local application-implemented service implemented.</td></tr><tr><td>template</td><td>String</td><td>The extensionML for the dialog content.</td></tr><tr><td>data</td><td>String</td><td>The data for the extensionML.</td></tr><tr><td>options</td><td>Object</td><td>The data for the extensionML</td></tr></tbody></table>

```javascript
    const dialogsService = SYMPHONY.services.subscribe("dialogs");
    dialogsService.show(
        "my-dialog",
        "hello:controller",
        `<dialog>
            <div class="container">
                <div class="header">
                    <h1>Configuration</h1>
                    <br/>
                    <div class="headerError">                              
                        <text id="title"/>
                    </div>
                    <p class="value">Please check if the public and private
                    key files match and if they are correctly configured in 
                    Jira's application link section.</p>
                </div>
            </div>
        </dialog>`,
        "undefined",
        {
            title: "Application Configuration"
        }
    );
```

## rerender()

Changes the contents of the dialog. This is usually invoked when the user has performed some action:

```javascript
function rerender(id, template, data)
```

<table data-header-hidden><thead><tr><th width="131.33333333333331">Parameter</th><th width="82">Type</th><th>Description</th></tr></thead><tbody><tr><td>Parameter</td><td>Type</td><td>Description</td></tr><tr><td>id</td><td>String</td><td>The id of the dialog that should be updated.</td></tr><tr><td>template</td><td>String</td><td>The new extensionML content to display.</td></tr><tr><td>data</td><td>String</td><td>The data for the extensionML.</td></tr></tbody></table>

## close()

```javascript
function close(id)
```

<table data-header-hidden><thead><tr><th width="140.33333333333331">Parameters</th><th width="90">Type</th><th>Description</th></tr></thead><tbody><tr><td>Parameters</td><td>Type</td><td>Description</td></tr><tr><td>id</td><td>String</td><td>The id of the dialog to close.</td></tr></tbody></table>
