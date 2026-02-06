# Date and time

## Tags

{% hint style="info" %}
It is also possible to display a [Date Picker](../symphony-elements-1/date-picker.md) or [Time Picker](../symphony-elements-1/time-picker.md) in a chat.
{% endhint %}

| Tags                                                                           | Description                                                                       | Attributes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  `<dateTime value="2024-12-31T09:29:47Z" format="date \| time \| time_secs"/>` | Display a date or time to the user, taking into account the user locale timezone. | <p></p><ul><li>value (required): ISO-8601 or UTC timestamp.</li><li><p>format:</p><ul><li>date_time: date + time format based on user settings and user timezone. Default value if no format is provided</li><li>date : ddMMyyyy with format based on user settings (DD/MM/YYYY, MM/DD/YYYY, YYYY/MM/DD) and user timezone</li><li>time : hhmm with format based on user settings (12h / 24h) and user timezone</li><li>time_secs : hhmmss with format based on user settings (12h / 24h) and user timezone</li></ul></li></ul> |

## Versions and Compatibility

| Main features introduced | Agent needed to parse message sent by the bot |
| ------------------------ | --------------------------------------------- |
| Initial release          | Agent 25.6                                    |
