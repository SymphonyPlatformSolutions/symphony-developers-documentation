# Style Attributes

## Attributes supported in messageML tags

Tags support the following `style` attributes where applicable:

```bash
background
background-attachment
background-blend-mode
background-clip
background-color
background-image
background-position
background-repeat
background-size
border
border-bottom
border-bottom-color
border-bottom-left-radius
border-bottom-right-radius
border-bottom-style
border-bottom-width
border-collapse
border-color
border-image
border-image-outset
border-image-repeat
border-image-slice
border-image-source
border-image-width
border-left
border-left-color
border-left-style
border-left-width
border-radius
border-right
border-right-color
border-right-style
border-right-width
border-spacing
border-style
border-top
border-top-color
border-top-left-radius
border-top-right-radius
border-top-style
border-top-width
border-width
box-shadow
box-sizing
caption-side
clear
color
content
counter-increment
counter-reset
display
empty-cells
font
font-family
font-kerning
font-size
font-size-adjust
font-stretch
font-style
font-variant
font-weight
height
letter-spacing
line-height
list-style
list-style-image
list-style-position
list-style-type
margin
margin-bottom
margin-left
margin-right
margin-top
max-height
max-width
min-height
min-width
opacity
outline
outline-color
outline-offset
outline-style
outline-width
overflow
overflow-x
overflow-y
padding
padding-bottom
padding-left
padding-right
padding-top
table-layout
text-align
text-align-last
text-decoration
text-decoration-color
text-decoration-line
text-decoration-style
text-indent
text-justify
text-overflow
text-shadow
text-transform
visibility
white-space
width
word-break
word-spacing
word-wrap
```

## Examples

The following shows an example of using styles for an HTML table:

{% tabs %}
{% tab title="table using style attributes" %}
![](../../../../.gitbook/assets/mml\_style\_attributes.png)
{% endtab %}

{% tab title="messageML structure" %}
```markup
<table style="border-collapse:collapse;border:2px solid black;table-layout:auto;width:100%;background-color:#f2f2f2;box-shadow: 5px 5px">
    <thead>
        <tr style="background-color:#4D94FF;color:#ffffff;font-size:1rem" class="tempo-text-color-white tempo-bg-color-black\">
            <td style='text-shadow: 2px 2px black;border:1px solid blue;border-bottom: double blue;width:15%;text-align:center'>
                SUBJECT
            </td>
        </tr>
    </thead>
</table>
```
{% endtab %}
{% endtabs %}

## Go further...

To learn more about Symphony's built in styles, continue here:

{% content-ref url="../../../../developer-tools/developer-tools/ui-style-guide/" %}
[ui-style-guide](../../../../developer-tools/developer-tools/ui-style-guide/)
{% endcontent-ref %}

