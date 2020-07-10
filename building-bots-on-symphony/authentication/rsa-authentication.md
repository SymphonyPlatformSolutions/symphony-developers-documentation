# RSA Authentication Workflow

This pages describes the implementation of RSA Authentication. For the API reference of RSA Session Authenticate and Key Manager Authenticate, see the following API endpoints:

* Session Auth: [https://developers.symphony.com/restapi/reference\#rsa-session-authenticate](https://developers.symphony.com/restapi/reference#rsa-session-authenticate)
* Key Manager Auth: [https://developers.symphony.com/restapi/reference\#rsa-key-manager-authenticate](https://developers.symphony.com/restapi/reference#rsa-key-manager-authenticate)

## Summary

The Authentication process requires the following steps:

1. The user creates a public/private RSA key pair.
2. The admin imports the public key into the pod using the **Admin Console** or public APIs.
3. The user creates a short-lived JWT \(JSON Web Token\) and signs it with their private key.
4. The Bot makes a call the the authentication endpoints.  Here, the server checks the signature of the JWT against the public key and returns an authentication token.

## 1.  Create an RSA Key Pair

The public/private key pair for signing authentication requests requires the following:

* A JWT payload has to be signed with RS512 \([https://tools.ietf.org/html/rfc7518\#section-3.1](https://tools.ietf.org/html/rfc7518#section-3.1)\)"
* A X.509 format for public keys and PKCS\#1 or PKCS\#8 for private keys
* PEM-encoded keys

{% hint style="info" %}
Note: This script requires the openssl package.
{% endhint %}

Generate the PKCS\#1 keys manually using the following commands:

```bash
$ openssl genrsa -out mykey.pem 4096
$ openssl rsa -in mykey.pem -pubout -out pubkey.pem
```

Generate the PKCS\#8 keys manually using the following commands. You can provide the Service Account's username as the Common Name \(CN\) but it is not a mandatory requirement.

```bash
$ openssl genrsa -out privatekey.pem 4096
$ openssl req -newkey rsa:4096 -x509 -key privatekey.pem -out publickey.cer
$ openssl pkcs8 -topk8 -nocrypt -in privatekey.pem -out privatekey.pkcs8
$ openssl x509 -pubkey -noout -in publickey.cer > publickey.pem
```

Sign the authentication request using either `privatekey.pkcs8` or `privatekey.pem`, depending on the support available in the JWT library.

The file publickey.pem is the public key. This is the key you will import into the pod in step 2.

## 2. Import Public Key into the Pod

Navigate to the Admin Console and create a new Service Account. Copy the contents of the pubkey.pem file you just created and paste into the textbox under the Authentication section:

![](../../.gitbook/assets/screen-shot-2020-07-07-at-1.28.22-pm.png)

Add your Bot's basic information:

![](../../.gitbook/assets/screen-shot-2020-07-07-at-1.29.20-pm.png)

If successful, you should see the following:

![](../../.gitbook/assets/screen-shot-2020-07-07-at-1.29.59-pm.png)

## 3. Generate a signed JWT Token

To authenticate on the Pod and the Key Manager, the Bot must call the authentication endpoints, passing a short-lived JWT token in the body of the request. The JWT token must contain the following:

* a _subject_ matching the username of the user to authenticate
* an _expiration time_ of no more than 5 minutes from the current timestamp \(needed to prevent replay attacks\)
* a signature by a private RSA key matching a public key stored for the user in the Pod

The following script generates the authentication request:

{% tabs %}
{% tab title="Java" %}
```java
package com.symphony.util.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.bouncycastle.asn1.pkcs.RSAPrivateKey;
import org.bouncycastle.crypto.params.RSAPrivateCrtKeyParameters;
import org.bouncycastle.crypto.util.PrivateKeyInfoFactory;
import org.bouncycastle.openssl.jcajce.JcaPEMKeyConverter;
import org.bouncycastle.util.io.pem.PemObject;
import org.bouncycastle.util.io.pem.PemReader;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.StringReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;
import java.security.Key;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Base64;
import java.util.Date;
import java.util.stream.Stream;


/**
 * Class used to generate JWT tokens signed by a specified private RSA key.
 * Libraries needed as dependencies:
 *  - BouncyCastle (org.bouncycastle.bcpkix-jdk15on) version 1.59.
 *  - JJWT (io.jsonwebtoken.jjwt) version 0.9.1.
 * 
 * 
 */
public class JwtHelper {

  // PKCS#8 format
  private static final String PEM_PRIVATE_START = "-----BEGIN PRIVATE KEY-----";
  private static final String PEM_PRIVATE_END = "-----END PRIVATE KEY-----";

  // PKCS#1 format
  private static final String PEM_RSA_PRIVATE_START = "-----BEGIN RSA PRIVATE KEY-----";
  private static final String PEM_RSA_PRIVATE_END = "-----END RSA PRIVATE KEY-----";


  /**
   * Get file as string without spaces
   * @param filePath: filepath for the desired file.
   * @return
   */
  public static String getFileAsString(String filePath) throws IOException {
    StringBuilder message = new StringBuilder();
    String newline = System.getProperty("line.separator");

    if (!Files.exists(Paths.get(filePath))) {
      throw new FileNotFoundException("File " + filePath + " was not found.");
    }

    try (Stream<String> stream = Files.lines(Paths.get(filePath))) {

      stream.forEach(line -> message
          .append(line)
          .append(newline));

      // Remove last new line.
      message.deleteCharAt(message.length() -1);
    } catch (IOException e) {
      System.out.println(String.format("Could not load content from file: %s due to %s",filePath, e));
      System.exit(1);
    }

    return message.toString();
  }

  /**
   * Creates a JWT with the provided user name and expiration date, signed with the provided private key.
   * @param user the username to authenticate; will be verified by the pod
   * @param expiration of the authentication request in milliseconds; cannot be longer than the value defined on the pod
   * @param privateKey the private RSA key to be used to sign the authentication request; will be checked on the pod against
   * the public key stored for the user
   */
  private static String createSignedJwt(String user, long expiration, Key privateKey) {

    return Jwts.builder()
        .setSubject(user)
        .setExpiration(new Date(System.currentTimeMillis() + expiration))
        .signWith(SignatureAlgorithm.RS512, privateKey)
        .compact();
  }

  /**
   * Create a RSA Private Key from a PEM String. It supports PKCS#1 and PKCS#8 string formats
   */
  private static PrivateKey parseRSAPrivateKey(String privateKeyFilePath) throws GeneralSecurityException, IOException {
    String pemPrivateKey = getFileAsString(privateKeyFilePath);
    try {

      if (pemPrivateKey.contains(PEM_PRIVATE_START)) {              // PKCS#8 format

        String privateKeyString = pemPrivateKey
            .replace(PEM_PRIVATE_START, "")
            .replace(PEM_PRIVATE_END, "")
            .replace("\\n", "\n")
            .replaceAll("\\s", "");
        byte[] keyBytes = Base64.getDecoder().decode(privateKeyString.getBytes(StandardCharsets.UTF_8));
        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(keyBytes);
        KeyFactory fact = KeyFactory.getInstance("RSA");
        return fact.generatePrivate(keySpec);

      } else if (pemPrivateKey.contains(PEM_RSA_PRIVATE_START)) {   // PKCS#1 format

        try (PemReader pemReader = new PemReader(new StringReader(pemPrivateKey))) {
          PemObject privateKeyObject = pemReader.readPemObject();
          RSAPrivateKey rsa = RSAPrivateKey.getInstance(privateKeyObject.getContent());
          RSAPrivateCrtKeyParameters privateKeyParameter = new RSAPrivateCrtKeyParameters(
              rsa.getModulus(),
              rsa.getPublicExponent(),
              rsa.getPrivateExponent(),
              rsa.getPrime1(),
              rsa.getPrime2(),
              rsa.getExponent1(),
              rsa.getExponent2(),
              rsa.getCoefficient()
          );

          return new JcaPEMKeyConverter().getPrivateKey(PrivateKeyInfoFactory.createPrivateKeyInfo(privateKeyParameter));
        } catch (IOException e) {
          throw new GeneralSecurityException("Invalid private key.");
        }

      } else {
        throw new GeneralSecurityException("Invalid private key.");
      }
    } catch (Exception e) {
      throw new GeneralSecurityException(e);
    }
  }

  public static String createJwt(String username, String privateKeyFilePath) throws IOException, GeneralSecurityException {
    final long expiration = 300000L;
    final PrivateKey privateKey = parseRSAPrivateKey(privateKeyFilePath);
    return createSignedJwt(username, expiration, privateKey);
  }

  public static void main(String[] args) throws IOException, GeneralSecurityException {
    final String username = System.getProperty("user");
    final String privateKeyFile = System.getProperty("key");

    final String jwt = createJwt(username, privateKeyFile);
    System.out.println(jwt);
  }
}
```
{% endtab %}

{% tab title="Python" %}
```python
"""
0) Use python 3

1) Install python dependency required to run this script by:
    pip install python-jose

2) The .pem file used in this script was generated from the previous step of this tutorial.

3) Create a create_jwt.py file, copy and paste the content you see here. Place your private key .pem file in the same directory as this script.

4) Change the value of \'sub\' to your Symphony service account username. Change the filename of the .pem file to the filename of your .pem file.

5) Generate jwt token simply by:
    python create_jwt.py

6) You will see the jwt token in terminal output.
"""

from jose import jwt
import datetime as dt


def create_jwt():
    private_key = get_key()
    expiration_date = int(dt.datetime.now(dt.timezone.utc).timestamp() + (5 * 58))
    payload = {
        'sub': "username_of_service_account",
        'exp': expiration_date
    }
    encoded = jwt.encode(payload, private_key, algorithm='RS512')
    print(encoded)


def get_key():
    with open('filename_of_private_key.pem', 'r') as f:
        content =f.readlines()
        key = ''.join(content)
        return key


if __name__ == '__main__':
    create_jwt()
```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
// Based on https://github.com/jwtk/njwt
'use strict';

let crypto = require('crypto');

function nowEpochSeconds() {
    return Math.floor(new Date().getTime() / 1000);
}

function base64urlEncode(str) {
    return new Buffer(str)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

function Jwt(username, signingKey) {

    this.header = {};
    this.body = {};
    this.header.alg = 'RS512';
    this.body.sub = username
    this.body.exp = (nowEpochSeconds() + (5 * 60)); // five minutes in seconds
    this.signingKey = signingKey;

    return this;
}

Jwt.prototype.sign = function sign(payload, cryptoInput) {
    let buffer = crypto.createSign('RSA-SHA512').update(payload).sign(cryptoInput);

    return base64urlEncode(buffer);
};

Jwt.prototype.compact = function compact() {

    let segments = [];
    segments.push(base64urlEncode(JSON.stringify(this.header)));
    segments.push(base64urlEncode(JSON.stringify(this.body)));
console.log("segments ", segments);
console.log("segments join ", segments.join('.'));
console.log("Signing key ", this.signingKey);
    this.signature = this.sign(segments.join('.'), this.signingKey);
    segments.push(this.signature);

    return segments.join('.');
};

const secret = "-----BEGIN RSA PRIVATE KEY-----\n" +
"...REDACTED..."
"-----END RSA PRIVATE KEY-----";

const user = 'bot.user1';
const jwt = new Jwt(user, secret);
const jws = jwt.compact();

console.log("========== JWS ==========")
console.log(jws);
```
{% endtab %}

{% tab title="C\#" %}
```csharp
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.OpenSsl;
using System;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security;
using System.Security.Claims;
using System.Security.Cryptography;

namespace Symphony.Util.Jwt
{
    /// <summary>
    /// Class used to generate JWT tokens signed by a specified private RSA key.
    /// Libraries needed as dependencies:
    ///     - BouncyCastle version >= 1.8.5
    ///     - System.IdentityModel.Tokens.Jwt version >= 5.4.0
    /// </summary>
    public class JwtHelper
    {
        /// <summary>
        /// Creates a JWT with the provided user name and expiration date, signed with the provided private key.
        /// </summary>
        /// <param name="user">The username to authenticate; will be verified by the pod.</param>
        /// <param name="expiration">Expiration of the authentication request in milliseconds; cannot be longer than the value defined on the pod.</param>
        /// <param name="privateKey">The private RSA key to be used to sign the authentication request; will be checked on the pod against the public key stored for the user.</param>
        public static string CreateSignedJwt(string user, double expiration, SecurityKey privateKey)
        {
            var handler = new JwtSecurityTokenHandler
            {
                SetDefaultTimesOnTokenCreation = false
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = DateTime.Now.AddMilliseconds(expiration),
                Subject = new ClaimsIdentity(new[] {
                    new Claim("sub", user)
                }),

                SigningCredentials = new SigningCredentials(privateKey, SecurityAlgorithms.RsaSha512, SecurityAlgorithms.Sha512Digest)
            };
            SecurityToken token = handler.CreateToken(tokenDescriptor);
            return handler.WriteToken(token);
        }

        /// <summary>
        /// Create a RSA Private Key from a PEM String. It supports PKCS#1 and PKCS#8 string formats.
        /// </summary>
        public static SecurityKey ParseRSAPrivateKey(String privateKeyFilePath)
        {
            if (!File.Exists(privateKeyFilePath))
            {
                throw new FileNotFoundException($"File {privateKeyFilePath} was not found");
            }

            var cryptoServiceProvider = new RSACryptoServiceProvider();
            using (var privateKeyTextReader = new StringReader(File.ReadAllText(privateKeyFilePath)))
            {
                object rsaKey = null;
                try
                {
                    rsaKey = new PemReader(privateKeyTextReader).ReadObject();
                }
                catch (Exception)
                {
                    throw new SecurityException("Invalid private key.");
                }


                RsaPrivateCrtKeyParameters privateKeyParams = null;
                // PKCS#8 format.
                if (rsaKey is RsaPrivateCrtKeyParameters)
                {
                    privateKeyParams = (RsaPrivateCrtKeyParameters)rsaKey;
                }
                // PKCS#1 format
                else if (rsaKey is AsymmetricCipherKeyPair)
                {
                    AsymmetricCipherKeyPair readKeyPair = rsaKey as AsymmetricCipherKeyPair;
                    privateKeyParams = ((RsaPrivateCrtKeyParameters)readKeyPair.Private);
                }
                else
                {
                    throw new SecurityException("Invalid private key.");
                }

                var parms = new RSAParameters
                {
                    Modulus = privateKeyParams.Modulus.ToByteArrayUnsigned(),
                    P = privateKeyParams.P.ToByteArrayUnsigned(),
                    Q = privateKeyParams.Q.ToByteArrayUnsigned(),
                    DP = privateKeyParams.DP.ToByteArrayUnsigned(),
                    DQ = privateKeyParams.DQ.ToByteArrayUnsigned(),
                    InverseQ = privateKeyParams.QInv.ToByteArrayUnsigned(),
                    D = privateKeyParams.Exponent.ToByteArrayUnsigned(),
                    Exponent = privateKeyParams.PublicExponent.ToByteArrayUnsigned()
                };

                cryptoServiceProvider.ImportParameters(parms);
            }

            return new RsaSecurityKey(cryptoServiceProvider.ExportParameters(true));
        }

        public static string CreateJwt(string username, string privateKeyFilePath)
        {
            double expiration = 300000; // 5 minutes = 5*60*1000
            SecurityKey privateKey = ParseRSAPrivateKey(privateKeyFilePath);
            return CreateSignedJwt(username, expiration, privateKey);
        }

        static void Main(string[] args)
        {
            string username = ConfigurationManager.AppSettings.Get("user");
            string privateKeyFile = ConfigurationManager.AppSettings.Get("key");

            string jwt = CreateJwt(username, privateKeyFile);
            Console.WriteLine(jwt);
            Console.WriteLine("Press enter to exit...");
            Console.ReadLine();
        }
    }
}
```
{% endtab %}
{% endtabs %}

The output of the script is a JWT:

```bash
eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiJib3QudXNlcjEiLCJleHAiOjMwNDMwOTY0ODV9.X9vZReZigFtJ8NDsaJ9viUp2jtc-_ktVFLm17ubEzmSJbHXS_LNy5nL6E6R8GY71g8Vuonb8qSIwy8zoR_TcUvuPAQLxCAlvQn96jFnjg4aFO3kWkFMLFgwJWWR4hn2UocdTS_pu7ROafn6rjvLJdKGEWDOHKw6JX2_Qj3uzU3LeAFhUVU8Tmop3A2OTVUkPlWJwJimIas66kFgq61uGps8RT9YMs74bxGvOJvInidK2N_dqJMDPgb4ySOBHewlhe1ziUWM-21HDq1RvmadTWoPRKRXdt4oPRoxr4KRgmluaQpz8njL7Em9Sh1bCKJWuIjlXQPOcF3SFibbAcLwr40UnT2sM2LMJtkj0BHIU_5Ans0fN1x8hKtfWX_ArzLJTCBCCqswmq8Q3vxo0-SHe33Idy99TfkrY-C8G-fgPFvs9L7695MOcYAq8SpbZQlX-anpcqLQfsw6V-V0ZEAUeSHpnZrHvwmQjEmU9wXWzvAgCpF9kEt_I4Hpu8DTx2VzVj7CRU1Lu5NPHoESjI6VKJWcCH68TvkBB88jJqflXcQfbLUdK1sjDwDKl3BurmGBZSlD0ymuBXaQe4yol4zxXzSuWo6VCy5ykXee0mZm5t9-9wJujcjnGyKjNNSVLhajrmo6BRDN86I_xgV33SHgdrJKyQCO8LzUK4ArEMYlEY0I
```

The authentication token can be inspected on [https://jwt.io/](https://jwt.io/) or [https://www.jsonwebtoken.io/](https://www.jsonwebtoken.io/).

## 4. Authenticate

Obtain a valid Session Token by making a POST request to your company's Session Auth endpoint:

{% tabs %}
{% tab title="Session Auth" %}
```bash
$ curl -d '{"token":"eyJhbGciOiJSUzUxMiJ9...ik0iV6K9FrEhTAf71cFs"}' https://${symphony.url}:443/login/pubkey/authenticate
```
{% endtab %}
{% endtabs %}

A successful response:

{% tabs %}
{% tab title="200" %}
```bash
{"token":"eyJhbGciOiJSUzUxMiJ9...7oqG1Kd28l1FpQ","name":"sessionToken"}
```
{% endtab %}
{% endtabs %}

Obtain a valid Key Manager Token by making a POST request to your company's Key Manager Auth endpoint:

{% tabs %}
{% tab title="Key Manager Auth" %}
```bash
$ curl -d '{"token":"eyJhbGciOiJSUzUxMiJ9...ik0iV6K9FrEhTAf71cFs"}' https://${symphony.url}:443/relay/pubkey/authenticate
```
{% endtab %}
{% endtabs %}

A successful response:

{% tabs %}
{% tab title="200" %}
```bash
{"token":"0100e4fe...REDACTED...f729d1866f","name":"keyManagerToken"}
```
{% endtab %}
{% endtabs %}

## Replace/Revoke Key

You can **replace** the public key _pubkeyA_ for a user with a new key, _pubkeyB_ \(for example, as part of an organization's key rotation schedule\). Note the following outcomes:

* When a key is replaced, the key _pubkeyA_ becomes the user's previous key, and the newly uploaded _pubkeyB_ becomes the current key.
* The previous key is valid for 72 hours, but you can extend that period indefinitely in intervals of 72 hours.
* While the previous key is valid, both keys can be used for authentication. When it expires, it can no longer be used to authenticate the user.
* A user can have at most one previous key.

Alternatively, you can **revoke** a user key \(current or previous\), for example, if the key is compromised. Note the following outcomes:

* When a key is revoked, it can no longer be used for authentication.
* If a user has a non-expired previous key and their current key is revoked, the previous key becomes the new current key.
* When a key is revoked, the user's sessions initiated with RSA authentication are invalidated.

To replace/revoke a key, navigate to the Bot's account in the admin portal &gt; RSA &gt; Replace or Revoke:

![](../../.gitbook/assets/screen-shot-2020-07-07-at-1.53.41-pm.png)

You can also use the following REST API call to programmatically **replace** a public key:

```bash
curl -H 'sessionToken: eyJhbGciOiJSUzUxMiJ9...O3iq8OEkcnvvMFKg' -d '{

  {
    "currentKey": {
      "key": "-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhki...WMCAwEAAQ==\n-----END PUBLIC KEY-----",
      "action": "SAVE"
    }
  }
}' https://${symphony.url}:443/pod/v2/admin/user/68719476742/update
```

{% tabs %}
{% tab title="200" %}
```bash
{
  "userAttributes": {
    "emailAddress": "demo-bot1@symphony.com",
    "userName": "demo-bot1",
    "displayName": "DemoBot1",
    "companyName": "pod1",
    "accountType": "SYSTEM",
    "currentKey": {
      "key": "-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhk...ghUGWMCAwEAAQ==\n-----END PUBLIC KEY-----"
    },
    "previousKey": {
      "key": "-----BEGIN PUBLIC KEY-----MIICIjANBgkqhki...hUGWMCAwEAAQ==-----END PUBLIC KEY-----",
      "expirationDate": 1522675669714
    }
  },
  "userSystemInfo": {
    "id": 68719476742,
    "status": "ENABLED",
    "createdDate": 1522318499000,
    "createdBy": "68719476737",
    "lastUpdatedDate": 1522416469717,
    "lastLoginDate": 1522416465367
  },
  "roles": [
    "INDIVIDUAL"
  ]
}
```
{% endtab %}
{% endtabs %}

Additionally you can programmatically revoke a public key using either **currentKey** or **previousKey.** Use the following REST request to programmatically revoke a public key using **currentKey**:

```bash
curl -H 'sessionToken: eyJhbGciOiJSUzUxMiJ9...O3iq8OEkcnvvMFKg' -d '{
  {
    "currentKey": {"action":"REVOKE"}
  }
}' https://localhost.symphony.com:443/pod/v2/admin/user/68719476742/update
```

{% tabs %}
{% tab title="200" %}
```bash
{
  "userAttributes": {
    "emailAddress": "bot.user1@localhost.symphony.com",
    "userName": "bot.user1",
    "displayName": "Local Bot01",
    "companyName": "pod1",
    "accountType": "SYSTEM"
  },
  "userSystemInfo": {
    "id": 68719476742,
    "status": "ENABLED",
    "createdDate": 1522318499000,
    "createdBy": "68719476737",
    "lastUpdatedDate": 1522416469717,
    "lastLoginDate": 1522416465367
  },
  "roles": [
    "INDIVIDUAL"
  ]
}
```
{% endtab %}
{% endtabs %}

Use the following REST request to programmatically revoke a public key using **previousKey**:

```bash
curl -H 'sessionToken: eyJhbGciOiJSUzUxMiJ9...O3iq8OEkcnvvMFKg' -d '{
  {
    "previousKey": {"action":"REVOKE"} 
  }
}' https://localhost.symphony.com:443/pod/v2/admin/user/68719476742/update
```

{% tabs %}
{% tab title="200" %}
```bash
{
  "userAttributes": {
    "emailAddress": "demo-bot1@symphony.com",
    "userName": "demo-bot1",
    "displayName": "DemoBot1",
    "companyName": "pod1",
    "accountType": "SYSTEM",
    "currentKey": {
      "key": "-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhk...ghUGWMCAwEAAQ==\n-----END PUBLIC KEY-----"
    }
  },
  "userSystemInfo": {
    "id": 68719476742,
    "status": "ENABLED",
    "createdDate": 1522318499000,
    "createdBy": "68719476737",
    "lastUpdatedDate": 1522416469717,
    "lastLoginDate": 1522416465367
  },
  "roles": [
    "INDIVIDUAL"
  ]
}
```
{% endtab %}
{% endtabs %}

## Extending a Public Key

Use the following REST request to programmatically extend a public key:

```bash
curl -H 'sessionToken: eyJhbGciOiJSUzUxMiJ9...O3iq8OEkcnvvMFKg' -d '{
  {
    "previousKey": { "action": "EXTEND" } 
  }
}' https://localhost.symphony.com:443/pod/v2/admin/user/68719476742/update
```

{% tabs %}
{% tab title="200" %}
```bash
{
  "userAttributes": {
    "emailAddress": "demo-bot1symphony.com",
    "userName": "demo-bot1",
    "displayName": "DemoBot1",
    "companyName": "pod1",
    "accountType": "SYSTEM",
    "currentKey": {
      "key": "-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhk...ghUGWMCAwEAAQ==\n-----END PUBLIC KEY-----"
    },
    "previousKey": {
      "key": "-----BEGIN PUBLIC KEY-----MIICIjANBgkqhki...hUGWMCAwEAAQ==-----END PUBLIC KEY-----",
      "expirationDate": 1522675669714
    }
  },
  "userSystemInfo": {
    "id": 68719476742,
    "status": "ENABLED",
    "createdDate": 1522318499000,
    "createdBy": "68719476737",
    "lastUpdatedDate": 1522416469717,
    "lastLoginDate": 1522416465367
  },
  "roles": [
    "INDIVIDUAL"
  ]
}
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
### Restricted Key Operations:

You CANNOT perform the following actions:

* EXTEND on the current active key
* EXTEND over an expired key
* EXTEND over the previous key when no previous key is set for the user
* EXTEND when no expiration date is set for the user's previous key
* REVOKE over the previous key when no previous key is set for the user
* REVOKE over a current key when no current key is set for the user
* SAVE when the user already has a valid current and previous key set
* SAVE over an old key

**Note:** When performing a SAVE, the key must be different from your current key.
{% endhint %}

