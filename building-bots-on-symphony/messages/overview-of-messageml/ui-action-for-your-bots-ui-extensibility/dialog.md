# Dialog

Do you want to grab the attention of chat users to some important information in a message? Or do you want them to interact with very long forms or to read long pieces of information without polluting the chat with long messages? With the Dialog action, Symphony users can trigger a pop-up containing messageML formatted information or even interactive forms.

## MessageML tag

The Dialog element is structured in two sections:

* the `<ui-action>` tag, associated with the **`action='open-dialog'` **attribute as you can see in the examples at the bottom of the page. This tag must wrap a [button](../symphony-elements-1/buttons.md), through which the Symphony user will be able to trigger the action specified, in this case the pop-up Dialog functionality;
* and the `<dialog>` tag that will contain the content of the dialog that will pop up when the user will trigger the action by clicking on the button.

_Please note that some attributes are general to the ui-action tag and can therefore be used in different contexts. However, some attributes are really specific to the Dialog functionality of the ui-action and can be used only in the context of action='open-dialog'._

## Design

Dialogs are divided into 3 areas and the `<dialog>` tag therefore accepts 3 specific children tags:

* `<title>` - mandatory: specifies the title of the dialog and is always displayed at the top of it in a fixed and non scrollable position.
* `<body>` - mandatory: specifies the content of the dialog that is displayed in the middle of it and can be scrollable when the content is too big to be contained in the view height.
* `<footer>` - optional: specifies the footer of the dialog and is always displayed at the bottom in a fixed and non scrollable position.

## Attributes for the \<ui-action> tag



| Attribute       | Type   | Required? | Description                                                                                                                                                                                                                                                                                                                      |
| --------------- | ------ | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`action`**    | String | Yes       | <p><em>General to <code>ui-action </code>tag</em></p><p>Identifies the action.<br><em>For the Dialog functionality, it must be set to <code>action='open-dialog'</code></em></p>                                                                                                                                                 |
| **`trigger`**   | String | No        | <p><em>General to <code>ui-action</code> tag</em></p><p>Specifies the way the action will be triggered by the Symphony user.<br></p><p><em>NB: It is not a mandatory attribute and the default value will be 'click' for the tags where it is not specified. Currently, only <code>trigger='click' </code>is supported.</em></p> |
| **`target-id`** | String | Yes       | <p><em>Specific to the <code>open-dialog</code> action</em></p><p>Id of the dialog that must be opened when user will trigger this ui-action.</p><p>See <em><code>id</code></em> in the &#x3C;dialog> tag.</p>                                                                                                                   |

## Attributes for the \<dialog> tag



| Attribute   | Type   | Required?                         | Description                                                                                                                           |
| ----------- | ------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **`id`**    | String | Yes                               | Id of the dialog that will be triggered thanks to the ui-action it is associated to. See _`target-id` attribute in \<ui-action> tag._ |
| **`width`** | String | <p>No</p><p>Default to medium</p> | <p>Specifies the width of the dialog.<br></p><p><em>NB: values can be: small, medium, large, or full-width.</em></p>                  |



## Rules and Limitations

* The **max length** of any ui-action or dialog attribute is 256.
* Please note that the attribute `type` of the button is not supported when wrapped by a `<ui-action>` tag.
* The dialog and ui-action tags must be both present in the same message, at the same nesting level, and they must share the same and unique **id** / **target-id**. _Please note it is possible to have several dialogs in the same message as soon as each dialog has a different id._
* The dialog feature is supported in **popped-out mode**. The dialog will open in the popped-out window.
* The dialog functionality supports [**Interactive Elements Forms**](../symphony-elements-1/) in the following way:
  * Dialogs can be contained inside forms. However, if contained in a form, the dialog cannot contain any interactive Element (such as button, text-area, etc.)
  * Dialogs can contain a form. The `<form>` tag should wrap the entire content of the dialog, including the `<title>` ,`<body>` and `<footer>` tags, as you can see in the examples below. _This is useful when you want the submit button not to be hidden and always appear in the footer of the dialog whereas the rest of the form content is contained in the scrollable body area._
  * Please also note that users can close the dialog thanks to the cross (x) displayed at the top-right corner of it, as well as with a new type of [button](../symphony-elements-1/buttons.md) that has been created for that purpose: \<button type="cancel">. You can also specify the class attribute of the button which is by default set to "tertiary" for this new button.
* A dialog cannot be embedded in another dialog.

{% hint style="success" %}
#### Best Practice for using dialogs

Please limit yourself to using only up to 1 form when inclosed in the dialog.
{% endhint %}

## Examples

The following examples show the Dialog functionality being used as follows:

* The first dialog shows how to **embed a dialog in a form**. You will notice that the button used to trigger the dialog is positioned where the `<ui-action>` tag is coded.
  * As soon as the associated `<dialog>` is at its same nesting level, it can be placed anywhere before or after the ui-action.
  * You can also notice that users can interact with the form as well as submit it.
  * However, the dialog only contains text as it cannot contain any interactive Form Elements. Please note that the button type cancel can be included in the dialog as it is not considered as an interactive Form Element: you can use it to offer another option for the user to close the dialog.
  * Please note as well that the `width` attribute has not been defined and is therefore set to "medium".
  * Please note the scrolling behaviour of the body whereas both title and footer are placed in a fixed position.
* The second dialog shows how to **embed a form in a dialog**.
  * After having started to fill-in the form, if the user closes the dialog and opens it back, the values of the fields will not reset to their original values, as long as the user does not refresh the page.
  * Also, when submitting a form that is in a dialog, the dialog will automatically close after a certain delay. If the user opens back the dialog without refreshing the page, then the values of the form and its state are persisted.

_Please note that this example is quite complex, therefore two simpler examples have been specified with their messageML only to show you how to declare a dialog in a form and how to enclose a form in a dialog. Please use the tabs to reach these two examples._

![](../../../../.gitbook/assets/dialog.gif)

{% tabs %}
{% tab title="MessageML" %}
```markup
<messageML>
  <form id="wrapping_dialog">
    <h4>First part: form wrapping a dialog</h4>
    <p>Here is the beginning of the form containing the dialog hiding some large text</p>
    <text-field name="input1" label="This is an interactive Element in the form but outside of the dialog" />
    <p>Please click on the following button in order to open the dialog and see the hidden information</p>
    <ui-action action="open-dialog" target-id="dialog_in_form">
      <button class="secondary">Open the dialog contained in the form</button>
    </ui-action>
    <text-field name="input2" label="This is an interactive Element in the form but outside of the dialog" />
    <button name="wrapping_dialog">Submit Button of the Form</button>
    <dialog id="dialog_in_form">
      <title>
        This is a title
      </title>
      <body>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam congue viverra interdum. Integer quam odio, gravida ultricies pharetra ac, tempor eget leo. Duis vitae arcu sed turpis faucibus feugiat a at ipsum. Nulla facilisi. Phasellus egestas, leo et malesuada porttitor, felis turpis viverra tortor, quis suscipit orci nibh at augue. Curabitur erat libero, accumsan vitae ipsum eleifend, tincidunt bibendum purus. Curabitur ultricies lorem tincidunt rutrum viverra. Sed mattis dui at suscipit auctor. In rutrum neque urna, vitae lacinia turpis blandit eget. Nullam eu dignissim purus. Sed ut ante lorem. Duis quis mi nec enim imperdiet consectetur. Phasellus aliquet accumsan ipsum non ullamcorper.<br/><br/>
Praesent convallis odio tortor, sit amet vulputate nulla tincidunt vitae. Donec ultrices eros suscipit mauris condimentum iaculis. Ut posuere finibus quam a consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam aliquet dapibus vehicula. Nunc vel lectus congue, finibus felis ut, laoreet est. Maecenas eleifend gravida metus, nec viverra mi egestas eu. Pellentesque scelerisque mattis nibh, eu condimentum nulla finibus ut.<br/><br/>
Ut dignissim varius libero ac volutpat. Sed hendrerit nec libero ut ullamcorper. Nunc et risus sed purus luctus faucibus nec eu est. Praesent id justo ante. Sed sed enim velit. Ut ac mauris magna. Fusce bibendum ullamcorper diam quis semper. Aenean mattis auctor ultricies. Mauris dui enim, vehicula sit amet finibus non, consectetur eu ante. Fusce at mi a ipsum gravida rhoncus.<br/><br/>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam congue viverra interdum. Integer quam odio, gravida ultricies pharetra ac, tempor eget leo. Duis vitae arcu sed turpis faucibus feugiat a at ipsum. Nulla facilisi. Phasellus egestas, leo et malesuada porttitor, felis turpis viverra tortor, quis suscipit orci nibh at augue. Curabitur erat libero, accumsan vitae ipsum eleifend, tincidunt bibendum purus. Curabitur ultricies lorem tincidunt rutrum viverra. Sed mattis dui at suscipit auctor. In rutrum neque urna, vitae lacinia turpis blandit eget. Nullam eu dignissim purus. Sed ut ante lorem. Duis quis mi nec enim imperdiet consectetur. Phasellus aliquet accumsan ipsum non ullamcorper.<br/><br/>
Praesent convallis odio tortor, sit amet vulputate nulla tincidunt vitae. Donec ultrices eros suscipit mauris condimentum iaculis. Ut posuere finibus quam a consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam aliquet dapibus vehicula. Nunc vel lectus congue, finibus felis ut, laoreet est. Maecenas eleifend gravida metus, nec viverra mi egestas eu. Pellentesque scelerisque mattis nibh, eu condimentum nulla finibus ut.<br/><br/>
Ut dignissim varius libero ac volutpat. Sed hendrerit nec libero ut ullamcorper. Nunc et risus sed purus luctus faucibus nec eu est. Praesent id justo ante. Sed sed enim velit. Ut ac mauris magna. Fusce bibendum ullamcorper diam quis semper. Aenean mattis auctor ultricies. Mauris dui enim, vehicula sit amet finibus non, consectetur eu ante. Fusce at mi a ipsum gravida rhoncus.
      </body>
      <footer>
        This is a footer
        <button name="cancel1" type="cancel">Close</button>
      </footer>
    </dialog>
  </form>
  <br/>
  <br/>
  <h4>Second part: message with a dialog hiding a form</h4>
  <p>Here is the beginning of the message containing the dialog hiding some large form</p>
  <dialog id="dialog_containing_form" width="large">
    <form id="wrapped_in_dialog">
      <title>
        This is a title
      </title>
      <body>
        <text-field name="input3" label="This is an interactive Element in the form which is contained in the dialog" />
        <textarea name="textarea" label="Other interactive Element in the dialog" />
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam congue viverra interdum. Integer quam odio, gravida ultricies pharetra ac, tempor eget leo. Duis vitae arcu sed turpis faucibus feugiat a at ipsum. Nulla facilisi. Phasellus egestas, leo et malesuada porttitor, felis turpis viverra tortor, quis suscipit orci nibh at augue. Curabitur erat libero, accumsan vitae ipsum eleifend, tincidunt bibendum purus. Curabitur ultricies lorem tincidunt rutrum viverra. Sed mattis dui at suscipit auctor. In rutrum neque urna, vitae lacinia turpis blandit eget. Nullam eu dignissim purus. Sed ut ante lorem. Duis quis mi nec enim imperdiet consectetur. Phasellus aliquet accumsan ipsum non ullamcorper.<br/><br/>
Praesent convallis odio tortor, sit amet vulputate nulla tincidunt vitae. Donec ultrices eros suscipit mauris condimentum iaculis. Ut posuere finibus quam a consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam aliquet dapibus vehicula. Nunc vel lectus congue, finibus felis ut, laoreet est. Maecenas eleifend gravida metus, nec viverra mi egestas eu. Pellentesque scelerisque mattis nibh, eu condimentum nulla finibus ut.<br/><br/>
Ut dignissim varius libero ac volutpat. Sed hendrerit nec libero ut ullamcorper. Nunc et risus sed purus luctus faucibus nec eu est. Praesent id justo ante. Sed sed enim velit. Ut ac mauris magna. Fusce bibendum ullamcorper diam quis semper. Aenean mattis auctor ultricies. Mauris dui enim, vehicula sit amet finibus non, consectetur eu ante. Fusce at mi a ipsum gravida rhoncus.<br/><br/>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam congue viverra interdum. Integer quam odio, gravida ultricies pharetra ac, tempor eget leo. Duis vitae arcu sed turpis faucibus feugiat a at ipsum. Nulla facilisi. Phasellus egestas, leo et malesuada porttitor, felis turpis viverra tortor, quis suscipit orci nibh at augue. Curabitur erat libero, accumsan vitae ipsum eleifend, tincidunt bibendum purus. Curabitur ultricies lorem tincidunt rutrum viverra. Sed mattis dui at suscipit auctor. In rutrum neque urna, vitae lacinia turpis blandit eget. Nullam eu dignissim purus. Sed ut ante lorem. Duis quis mi nec enim imperdiet consectetur. Phasellus aliquet accumsan ipsum non ullamcorper.<br/><br/>
Praesent convallis odio tortor, sit amet vulputate nulla tincidunt vitae. Donec ultrices eros suscipit mauris condimentum iaculis. Ut posuere finibus quam a consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam aliquet dapibus vehicula. Nunc vel lectus congue, finibus felis ut, laoreet est. Maecenas eleifend gravida metus, nec viverra mi egestas eu. Pellentesque scelerisque mattis nibh, eu condimentum nulla finibus ut.<br/><br/>
Ut dignissim varius libero ac volutpat. Sed hendrerit nec libero ut ullamcorper. Nunc et risus sed purus luctus faucibus nec eu est. Praesent id justo ante. Sed sed enim velit. Ut ac mauris magna. Fusce bibendum ullamcorper diam quis semper. Aenean mattis auctor ultricies. Mauris dui enim, vehicula sit amet finibus non, consectetur eu ante. Fusce at mi a ipsum gravida rhoncus.
      </body>
      <footer>
        <button name="cancel2" type="cancel">Close</button>
        <button name="wrapping_dialog">Submit Button of the Form</button>
      </footer>
    </form>
  </dialog>
  <ui-action action="open-dialog" target-id="dialog_containing_form">
    <button class="secondary">Open the dialog containing the form</button>
  </ui-action>
</messageML>
```
{% endtab %}

{% tab title="Simple messageML for a form in a dialog" %}
```html
<messageML>
    <ui-action trigger="click" action="open-dialog" target-id="dialogId">
        <button>Open the Dialog</button>
    </ui-action>
    <dialog id="dialogId">
        <form id="formId">
            <title>My Form in a Dialog</title>
            <body>
                <text-field name="input" />
            </body>
            <footer>
                <button type="action" name="send-form">Submit</button>
                <button type="reset">Reset</button>
                <button type="cancel" name="cancel-form">Close</button>
            </footer>
        </form>
    </dialog>
</messageML>
```
{% endtab %}

{% tab title="Simple messageML for a dialog in a form" %}
```html
<messageML>
    <form id="formId">
        <text-field name="input" />
        <ui-action trigger="click" action="open-dialog" target-id="dialogId">
            <button>Open the Dialog</button>
        </ui-action>
        <dialog id="dialogId" width="small">
            <title>A Dialog</title>
            <body>
                <expandable-card state="expanded">
                    <header>Dialog can include any other messageML component except Interactive Elements Forms</header>
                    <body>This does not contain any interactive element</body>
                </expandable-card>
            </body>
            <footer>
                Some text in the footer
                <button type="cancel" name="cancel-form">Close</button>
            </footer>
        </dialog>
        <h3>Actions</h3>
        <button name="send-answers" type="action">Submit</button>
        <button type="reset">Reset Data</button>
    </form>
</messageML>
```
{% endtab %}
{% endtabs %}

## Versions and Compatibility <a href="versions-and-compatibility" id="versions-and-compatibility"></a>



| Main features introduced | Agent needed to parse message sent by the bot | Client 2.0 release | Backward client-compatibility behavior (e.g. external rooms) | Client 1.5 release |
| ------------------------ | --------------------------------------------- | ------------------ | ------------------------------------------------------------ | ------------------ |
| Initial release          | 20.12.2                                       | 21.10              | Not working - entire message is not rendered                 | Not supported      |
