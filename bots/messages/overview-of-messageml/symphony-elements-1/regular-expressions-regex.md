---
description: Elements input validation.  Available from Symphony v20.6 and above
---

# Regular Expressions - Regex

Input validation is your first line of defense when creating a secure application.&#x20;

Symphony Elements supports input validation using **regular expressions (regex)** for the `text field` and `text area` elements.

{% hint style="info" %}
The regular expression pattern is validated on the front end by the Client. It is therefore critical to also validate the input in your code as well.
{% endhint %}

## Regular expression Denial of Service - ReDoS

Regular expressions can cause performance issues in the Client if the validation of the regular expression is very complex. Poorly designed regular expressions can even cause denial of service (ReDoS). Please verify that your regular expressions are safe, using the following service: [https://redos-checker.surge.sh/](https://redos-checker.surge.sh/).

{% hint style="info" %}
To prevent performance issues on the Client, a validation mechanism checks regular expressions to ensure they are safe. If the regular expression is unsafe, it is automatically disable&#x64;**. In that situation, the user input will not be validated.**
{% endhint %}

For more information, refer to [Regular expression Denial of Service - ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS).

## Validation examples

The following code snippets assumes that both `<text-field>` and `<textarea>` elements are placed within the right messageML context : `<messageML>` + `<form>` including an action `<button>`.

{% hint style="info" %}
Note that the content of the regex has to be checked again on the bot side.
{% endhint %}

### Text field

{% tabs %}
{% tab title="messageML" %}
```markup
<!-- Validates a login -->
<text-field name="login" pattern="^[a-zA-Z]{3,}$" pattern-error-message="Login must contain at least 3 letters."></text-field>

<!-- Validates a decimal value, hint is not defined -->
<text-field name="price" pattern="^\d+,\d+$" pattern-error-message="This is an incorrect value."></text-field>

<!-- Validates a password -->
<text-field name="password" masked="true" pattern="^[a-zA-Z]\w{3,14}$" pattern-error-message="Your password is not strong enough."></text-field>
```
{% endtab %}
{% endtabs %}

### Text area

{% tabs %}
{% tab title="messageML" %}
```markup
<!-- Validates that a line does not contain the word "badword" -->
<textarea name="justification" pattern="^((?!badword).)*$" pattern-error-message="Justification text must not contain the word 'badword'"></textarea>
```
{% endtab %}
{% endtabs %}
