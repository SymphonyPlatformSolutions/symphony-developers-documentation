---
description: List of Bot Permissions
---

# Bot Permissions

This page lists the available roles and the associated privileges that may be required for certain endpoints:

## Role: Administrator

<table>
  <thead>
    <tr>
      <th style="text-align:left">Privileges</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">
        <p>ACCESS_ADMIN_API</p>
        <p>ACTIVATE_END_USER_ACCOUNT</p>
        <p>BULK_MANAGE_USERS</p>
        <p>CREATE_END_USER_ACCOUNT</p>
        <p>DEACTIVATE_END_USER_ACCOUNT</p>
        <p>LOGIN_WITH_PASSWORD</p>
        <p>MODIFY_END_USER_ACCOUNT</p>
        <p>MODIFY_END_USER_ENTITLEMENTS</p>
        <p>MODIFY_SERVICE_ACCOUNT</p>
        <p>MODIFY_SERVICE_USER_ENTITLEMENTS</p>
        <p>MODIFY_USER_APPS_ENTITLEMENTS</p>
        <p>MODIFY_USER_DISCLAIMERS</p>
        <p>REBUILD_INDEX</p>
        <p>VIEW_DISCLAIMER_AUDIT_TRAIL</p>
        <p>VIEW_POD_DISCLAIMERS</p>
        <p>VIEW_USER_APPS_ENTITLEMENTS</p>
        <p>VIEW_USAGE_POLICY_DETAILS</p>
        <p>VIEW_USER_AUDIT_TRAIL</p>
        <p>VIEW_USER_DETAIL</p>
      </td>
    </tr>
  </tbody>
</table>

## Role: Agent

<table>
  <thead>
    <tr>
      <th style="text-align:left">Privileges</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">
        <p>GET_SESSION_ON_USER_BEHALF</p>
        <p>VIEW_APPS</p>
      </td>
    </tr>
  </tbody>
</table>

## Role: Audit Trail Management

<table>
  <thead>
    <tr>
      <th style="text-align:left">Privileges</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">
        <p>VIEW_PRIVILEGED_USER_AUDIT_TRAIL</p>
        <p>ACCESS_ADMIN_API</p>
      </td>
    </tr>
  </tbody>
</table>

## Role: CEP Visibility Group Management

| Privileges |
| :--- |
| MANAGE\_CEP\_VISIBILITY\_GROUPS |

## Role: Compliance Officer

<table>
  <thead>
    <tr>
      <th style="text-align:left">Privileges</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">
        <p>ACCESS_ADMIN_API</p>
        <p>ACTIVATE_AND_DEACTIVATE_ANY_ROOM</p>
        <p>ADD_AND_REMOVE_USERS_IN_ANY_ROOM</p>
        <p>ADMIN_SEARCH_ROOMS</p>
        <p>BAN_AND_UNBAN_ROOM_MEMBER</p>
        <p>LOCK_AND_UNLOCK_ROOM</p>
        <p>MONITOR_ROOMS</p>
        <p>MONITOR_WALL_POSTS</p>
        <p>PROMOTE_AND_DEMOTE_OWNERS_IN_ANY_ROOM</p>
        <p>RTC_VIEW_RECORDINGS</p>
        <p>VIEW_ANY_STREAM_DETAILS</p>
        <p>VIEW_ANY_STREAM_MEMBERSHIP</p>
        <p>VIEW_COMPLIANCE_PORTAL</p>
        <p>VIEW_CONVERSATION_AUDIT_TRAIL</p>
        <p>VIEW_DISCLAIMER_AUDIT_TRAIL VIEW_INFO_BARRIERS</p>
        <p>VIEW_PAST_STREAM_MEMBERS VIEW_POD_DISCLAIMERS VIEW_USER_DETAIL</p>
      </td>
    </tr>
  </tbody>
</table>

## Role: Content Export Service

<table>
  <thead>
    <tr>
      <th style="text-align:left">Privileges</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">
        <p>ACCESS_DECRYPTION_KEYS</p>
        <p>ACCESS_EXPORTED_MESSAGE_CONTENT</p>
        <p>DLP_CRYPTO_KEY</p>
        <p>LOGIN_WITH_SHARED_SECRET</p>
        <p>VIEW_DLP_VIOLATION VIEW_EXPRESSION_FILTERS</p>
        <p>VIEW_USER_ENTITLEABLE_ACTIONS</p>
      </td>
    </tr>
  </tbody>
</table>

## Role: Content Management

<table>
  <thead>
    <tr>
      <th style="text-align:left">Privileges</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">
        <p>ACCESS_ADMIN_API</p>
        <p>IMPORT_MESSAGES</p>
        <p>LOGIN_WITH_SHARED_SECRET SUPPRESS_MESSAGE</p>
        <p>VIEW_MANAGE_MESSAGES</p>
        <p>VIEW_USER_DETAIL</p>
      </td>
    </tr>
  </tbody>
</table>

## Role: EF Policy Management

<table>
  <thead>
    <tr>
      <th style="text-align:left">Privileges</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">
        <p>ACCESS_ADMIN_API</p>
        <p>DLP_CRYPTO_KEY</p>
        <p>MANAGE_EXPRESSION_FILTERS</p>
        <p>VIEW_DLP_VIOLATION</p>
        <p>VIEW_PROFANITY_ENFORCEMENT_AUDIT_TRAIL</p>
        <p>VIEW_EXPRESSION_FILTERS</p>
        <p>VIEW_USER_DETAIL</p>
      </td>
    </tr>
  </tbody>
</table>

## Role: Individual

| Privileges |
| :--- |
| LOGIN\_WITH\_PASSWORD |

## Role: Key Manager

<table>
  <thead>
    <tr>
      <th style="text-align:left">Privileges</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">
        <p>ACCESS_ADMIN_API</p>
        <p>ACCESS_DECRYPTION_KEYS</p>
        <p>ACCESS_KSALT_KHPASSWORD</p>
        <p>CREATE_KEYS_IN_KEYSTORE</p>
        <p>KEYMANAGER_REGISTRATION</p>
        <p>LOGIN_WITH_SHARED_SECRET</p>
        <p>REQUEST_ONE_TIME_TOKEN</p>
        <p>SET_KEYMANAGER_USER_PREKEY</p>
        <p>UPDATE_CRYPTO_ROTATION_INFO</p>
        <p>VIEW_USER_DETAIL</p>
      </td>
    </tr>
  </tbody>
</table>

## Role: L1 Support

<table>
  <thead>
    <tr>
      <th style="text-align:left">Privileges</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">
        <p>ACCESS_ADMIN_API ACTIVATE_END_USER_ACCOUNT</p>
        <p>ADMIN_RESET_USER_PASSWORD</p>
        <p>BULK_MANAGE_USERS</p>
        <p>CREATE_END_USER_ACCOUNT</p>
        <p>DEACTIVATE_END_USER_ACCOUNT</p>
        <p>LOGIN_WITH_PASSWORD</p>
        <p>MODIFY_USER_APPS_ENTITLEMENTS</p>
        <p>MODIFY_END_USER_ACCOUNT</p>
        <p>VIEW_DISCLAIMER_AUDIT_TRAIL</p>
        <p>VIEW_POD_DISCLAIMERS</p>
        <p>VIEW_USAGE_POLICY_DETAILS</p>
        <p>VIEW_USER_APPS_ENTITLEMENTS</p>
        <p>VIEW_USER_AUDIT_TRAIL</p>
        <p>VIEW_USER_DETAIL</p>
      </td>
    </tr>
  </tbody>
</table>

## Role: L2 Support

<table>
  <thead>
    <tr>
      <th style="text-align:left">Privileges</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">
        <p>ACCESS_ADMIN_API</p>
        <p>ACTIVATE_END_USER_ACCOUNT</p>
        <p>ADMIN_RESET_USER_PASSWORD</p>
        <p>BULK_MANAGE_USERS</p>
        <p>CREATE_END_USER_ACCOUNT
          <br />DEACTIVATE_END_USER_ACCOUNT</p>
        <p>LOGIN_WITH_PASSWORD</p>
        <p>MODIFY_USER_APPS_ENTITLEMENTS</p>
        <p>MODIFY_END_USER_ACCOUNT
          <br />MODIFY_END_USER_ENTITLEMENTS</p>
        <p>MODIFY_USER_DISCLAIMERS</p>
        <p>VIEW_BLACKLIST VIEW_DISCLAIMER_AUDIT_TRAIL</p>
        <p>VIEW_POD_DISCLAIMERS VIEW_USAGE_POLICY_DETAILS</p>
        <p>VIEW_USER_APPS_ENTITLEMENTS</p>
        <p>VIEW_USER_AUDIT_TRAIL</p>
        <p>VIEW_USER_DETAIL</p>
      </td>
    </tr>
  </tbody>
</table>

## Role: Scope Management

<table>
  <thead>
    <tr>
      <th style="text-align:left">Privileges</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">
        <p>ACCESS_ADMIN_API</p>
        <p>VIEW_USER_AUDIT_TRAIL</p>
        <p>MANAGE_ROLE_SCOPES</p>
        <p>VIEW_ROLE_SCOPES</p>
        <p>VIEW_USER_DETAIL</p>
      </td>
    </tr>
  </tbody>
</table>

## Role: Super Administrator

<table>
  <thead>
    <tr>
      <th style="text-align:left">Privileges</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">
        <p>ACCESS_ADMIN_API</p>
        <p>ACCESS_CERT_PROVISIONING_API</p>
        <p>ACTIVATE_END_USER_ACCOUNT</p>
        <p>ACTIVATE_SERVICE_ACCOUNT</p>
        <p>ADMIN_RESET_USER_PASSWORD</p>
        <p>BULK_MANAGE_USERS</p>
        <p>CREATE_APPS CREATE_END_USER_ACCOUNT</p>
        <p>CREATE_SERVICE_ACCOUNT</p>
        <p>DEACTIVATE_END_USER_ACCOUNT</p>
        <p>DEACTIVATE_SERVICE_ACCOUNT</p>
        <p>DISABLE_POD_EXTERNAL_COMMUNICATION</p>
        <p>DISABLE_POD_SEND_FILE_EXTERNAL DISABLE_REQUIRE_WARNING_EXTERNAL_COMMUNICATION</p>
        <p>DLP_CRYPTO_KEY</p>
        <p>DOWNLOAD_DESKTOP_CLIENT</p>
        <p>DOWNLOAD_CONTENT_EXPORT_CLIENT</p>
        <p>DOWNLOAD_LDAP_SYNC_CLIENT</p>
        <p>DOWNLOAD_UNBOUND_ID_SYNC_CLIENT</p>
        <p>EDIT_KM_ADDRESS</p>
        <p>ENABLE_POD_EXTERNAL_COMMUNICATION</p>
        <p>ENABLE_POD_SEND_FILE_EXTERNAL ENABLE_REQUIRE_WARNING_EXTERNAL_COMMUNICATION</p>
        <p>EDIT_PUBNUB_PUB_SUB_KEYS</p>
        <p>LOGIN_WITH_PASSWORD</p>
        <p>MANAGE_AVAILABLE_UPDATES</p>
        <p>MANAGE_BLACKLIST</p>
        <p>MANAGE_CONTENT_EXPORT</p>
        <p>MANAGE_EXPRESSION_FILTERS</p>
        <p>MANAGE_INFO_BARRIERS</p>
        <p>MODIFY_APPS MODIFY_END_USER_ENTITLEMENTS</p>
        <p>MODIFY_USER_APPS_ENTITLEMENTS</p>
        <p>MODIFY_USER_DISCLAIMERS</p>
        <p>MANAGE_USAGE_POLICY</p>
        <p>MANAGE_POD_DISCLAIMERS</p>
        <p>MODIFY_APPS_ENTITLEMENTS</p>
        <p>MODIFY_POD_ENTITLEMENTS</p>
        <p>MODIFY_SERVICE_USER_ENTITLEMENTS</p>
        <p>MANAGE_SSO_FOR_POD</p>
        <p>MODIFY_END_USER_ACCOUNT</p>
        <p>MODIFY_SERVICE_ACCOUNT</p>
        <p>REBUILD_INDEX</p>
        <p>RESET_SERVICE_ACCOUNT_KEY</p>
        <p>VIEW_APPS</p>
        <p>VIEW_APPS_ENTITLEMENTS</p>
        <p>VIEW_BLACKLIST</p>
        <p>VIEW_DISCLAIMER_AUDIT_TRAIL</p>
        <p>VIEW_EXPRESSION_FILTERS</p>
        <p>VIEW_INFO_BARRIERS</p>
        <p>VIEW_KM_ADDRESS</p>
        <p>VIEW_KM_CONFIG_AUDIT_TRAIL</p>
        <p>VIEW_POD_DISCLAIMERS</p>
        <p>VIEW_PROFANITY_ENFORCEMENT_AUDIT_TRAIL</p>
        <p>VIEW_USAGE_POLICY_DETAILS</p>
        <p>UPDATE_CRYPTO_ROTATION_INFO</p>
        <p>VIEW_USAGE_STATISTICS</p>
        <p>VIEW_USER_APPS_ENTITLEMENTS</p>
        <p>VIEW_USER_AUDIT_TRAIL</p>
        <p>VIEW_USER_ENTITLEABLE_ACTIONS</p>
        <p>VIEW_USER_DETAIL</p>
      </td>
    </tr>
  </tbody>
</table>

## Role: Super Compliance Officer

<table>
  <thead>
    <tr>
      <th style="text-align:left">Privileges</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">
        <p>ACCESS_ADMIN_API</p>
        <p>ACCESS_DECRYPTION_KEYS</p>
        <p>ACTIVATE_AND_DEACTIVATE_ANY_ROOM</p>
        <p>ADD_AND_REMOVE_USERS_IN_ANY_ROOM</p>
        <p>ADMIN_SEARCH_ROOMS</p>
        <p>BAN_AND_UNBAN_ROOM_MEMBER</p>
        <p>DLP_CRYPTO_KEY LOCK_AND_UNLOCK_ROOM</p>
        <p>MANAGE_EXPRESSION_FILTERS</p>
        <p>MANAGE_INFO_BARRIERS</p>
        <p>MODIFY_APPS MONITOR_ROOMS</p>
        <p>MONITOR_WALL_POSTS</p>
        <p>PROMOTE_AND_DEMOTE_OWNERS_IN_ANY_ROOM</p>
        <p>RTC_VIEW_RECORDINGS</p>
        <p>SUPPRESS_MESSAGE</p>
        <p>VIEW_ANY_STREAM_DETAILS</p>
        <p>VIEW_ANY_STREAM_MEMBERSHIP</p>
        <p>VIEW_APPS VIEW_COMPLIANCE_PORTAL</p>
        <p>VIEW_CONVERSATION_AUDIT_TRAIL</p>
        <p>VIEW_DISCLAIMER_AUDIT_TRAIL VIEW_EXPRESSION_FILTERS</p>
        <p>VIEW_INFO_BARRIERS VIEW_PAST_STREAM_MEMBERS</p>
        <p>VIEW_POD_DISCLAIMERS</p>
        <p>VIEW_PROFANITY_ENFORCEMENT_AUDIT_TRAIL</p>
        <p>VIEW_SURVEILLANCE_SESSION_DETAILS</p>
        <p>VIEW_USAGE_POLICY_DETAILS</p>
        <p>VIEW_USER_DETAIL</p>
      </td>
    </tr>
  </tbody>
</table>

## Role: Symphony Admin

<table>
  <thead>
    <tr>
      <th style="text-align:left">Privileges</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">
        <p>ACCESS_ADMIN_API</p>
        <p>ACTIVATE_END_USER_ACCOUNT</p>
        <p>ADMIN_RESET_USER_PASSWORD</p>
        <p>DEACTIVATE_END_USER_ACCOUNT</p>
        <p>LOGIN_WITH_PASSWORD</p>
        <p>MODIFY_END_USER_ACCOUNT</p>
        <p>MODIFY_END_USER_ENTITLEMENTS</p>
        <p>VIEW_CONVERSATION_AUDIT_TRAIL</p>
        <p>VIEW_DIRECTORY_PROFILE</p>
        <p>VIEW_USAGE_STATISTICS</p>
        <p>VIEW_USER_AUDIT_TRAIL</p>
        <p>VIEW_USER_DETAIL</p>
      </td>
    </tr>
  </tbody>
</table>

## Role: User Provisioning

<table>
  <thead>
    <tr>
      <th style="text-align:left">Privileges</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">
        <p>ACCESS_ADMIN_API</p>
        <p>ACCESS_CERT_PROVISIONING_API</p>
        <p>ACCESS_USER_PROVISIONING_API</p>
        <p>ACTIVATE_AND_DEACTIVATE_ANY_ROOM</p>
        <p>ACTIVATE_SERVICE_ACCOUNT</p>
        <p>ADD_AND_REMOVE_USERS_IN_ANY_ROOM</p>
        <p>ADMIN_PRESENCE_UPDATE</p>
        <p>ADMIN_RESET_USER_PASSWORD</p>
        <p>BULK_MANAGE_USERS</p>
        <p>CREATE_APPS</p>
        <p>CREATE_END_USER_ACCOUNT</p>
        <p>CREATE_SERVICE_ACCOUNT</p>
        <p>DEACTIVATE_END_USER_ACCOUNT</p>
        <p>DEACTIVATE_SERVICE_ACCOUNT</p>
        <p>LOGIN_WITH_SHARED_SECRET</p>
        <p>MODIFY_APPS MODIFY_APPS_ENTITLEMENTS</p>
        <p>MODIFY_END_USER_ACCOUNT</p>
        <p>MANAGE_BLACKLIST</p>
        <p>MANAGE_USER_DELEGATES</p>
        <p>MANAGE_INFO_BARRIERS</p>
        <p>MODIFY_END_USER_ENTITLEMENTS</p>
        <p>MODIFY_USER_APPS_ENTITLEMENTS</p>
        <p>MODIFY_USER_DISCLAIMERS</p>
        <p>MODIFY_SERVICE_ACCOUNT</p>
        <p>MODIFY_SERVICE_USER_ENTITLEMENTS</p>
        <p>PROMOTE_AND_DEMOTE_OWNERS_IN_ANY_ROOM</p>
        <p>VIEW_ANY_STREAM_DETAILS</p>
        <p>VIEW_ANY_STREAM_MEMBERSHIP</p>
        <p>VIEW_APPS VIEW_APPS_ENTITLEMENTS</p>
        <p>VIEW_BLACKLIST VIEW_DISCLAIMER_AUDIT_TRAIL</p>
        <p>VIEW_INFO_BARRIERS</p>
        <p>VIEW_PAST_STREAM_MEMBERS</p>
        <p>VIEW_POD_DISCLAIMERS</p>
        <p>VIEW_PROFANITY_ENFORCEMENT_AUDIT_TRAIL</p>
        <p>VIEW_USAGE_POLICY_DETAILS</p>
        <p>VIEW_USER_APPS_ENTITLEMENTS</p>
        <p>VIEW_USER_AUDIT_TRAIL VIEW_USER_DETAIL</p>
      </td>
    </tr>
  </tbody>
</table>

