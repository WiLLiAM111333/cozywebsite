# Discord yeBan Route

# /

The slash route returns all bans in the server. Some of these objects will have the fields "moderatorID" and banID. These fields are optional since they don't exist on the Discord API's base, but comes from the internal database which may not have all bans registered. A response could look like below:

```json
{
  "userID": "107424723050180608",
  "bannedAt": "2020-12-14 17:21",
  "reason": "Some reason set by the moderator",
  "moderatorID": "107424723050180608",
  "banID": "a03aba2b-24e2-4192-98e5-4e95b34ac19d"
}
```

---

# /:id?type=\<idType>

This is the more advanced route and is mostly used internally for ***very*** specific usage.

The query parameter `idType` is the type of ID you want to look for in the database of bans. Valid `idTypes` below:
  - user
  - moderator
  - ban

Example request with response below:

```js
// Pretend like this is inside some async function, please :(

const fetch = require('node-fetch');

const userID = '107424723050180608';
const idType = 'user';

const url = `${API_BASE_URL}/v${API_VERSION}/discord/bans/${userID}?type=${idType}`;

// No authentication or header usage in the example for simplicity.
const res = await fetch(url);
const json = await res.json();
```

This returned all bans that have been added to the user by the ID of `107424723050180608`. Response:

```json
{
  "userID": "107424723050180608",
  "bannedAt": "2020-12-14 17:21",
  "reason": "Some reason set by the moderator",
  "moderatorID": "107424723050180608",
  "banID": "a03aba2b-24e2-4192-98e5-4e95b34ac19d"
}
```

The uppercase variables you see in the example are explained below:

### **API_BASE_URL**
This is the url to the base API route: `https://www.thecozyhangout.com/api`

### **API_VERSION** 
The version of the API, explains itself and can be found in the documentation.

---
