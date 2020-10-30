---
description: Elements input validation.  Available from Symphony v20.6 and above
---

# Regular Expressions - Regex

Input validation is your first line of defense when creating a secure application. Thinking on how to help bot developers to securely validate input data, Symphony has added regular expressions \(shortened as regex\) validation to `text field` and `text area` elements.

Regex is a sequence of characters that defines a search pattern. Such patterns are used by the front-end for input validation, being processed by the browser Javascript engine.

## Regular expression Denial of Service - ReDoS

It is important to keep in mind that even with all the security that Symphony has designed to protect against malicious regex, developers must verify that the regex they are using is valid and offers no risk of ReDos \(Regular expression Denial of Service\).

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

