# JsonDB

Simple library for storing datas on JSON files using models.

## Installation

Using `npm`:

```
npm install @burakbey/jsondb
```

Using `yarn`:

```
yarn add @burakbey/jsondb
```

## Initialization

Create `data` folder on root path.

```ts
// src/index.ts

import { join } from 'path';
import { JsonDB, Store } from '@burakbey/jsondb';

const store = new Store({
    mainPath: join(__dirname, '../data')
});
new JsonDB(store);
```

## Creating a new model

Create `users.json` in `data` folder with `[]` content.

```json
// data/users.json

[]
```

```ts
// src/models/User.ts

/* eslint-disable no-use-before-define */
import { Collection, Item } from '@burakbey/jsondb';

export class User extends Item<User> {
    username: string;

    password: string;
}

export const UserCollection = new Collection<User>(User, 'users');
```

## Using the methods

```ts
// src/index.ts

import { User, UserCollection } from './models/User';

// Create new users
const admin = new User({
    username: 'admin',
    password: 'password'
});

const user = new User({
    username: 'user',
    password: 'password'
});

UserCollection.save(admin, user);

// Get all users
const users = UserCollection.find();

// Get all users with filter
const users = UserCollection.find(x => x.password === 'password');

// Get one user
const user = UserCollection.findOne(x => x.username === 'user');

// Update user
const user = UserCollection.findOne(x => x.username === 'user');
if (user) {
    user.username = 'user-updated';
    UserCollection.update(user);
}

// Delete user
const user = UserCollection.findOne(x => x.username === 'user-updated');
if (user) {
    UserCollection.delete(user);
}
```

## Usage for FiveM

Create `data` folder on root path.

```ts
// server/index.ts

import { JsonDB, Store } from '@burakbey/jsondb';

const store = new Store({
    mainPath: 'data',
    fetch(collection) {
        const dataStr = LoadResourceFile(
            GetCurrentResourceName(),
            `${this.mainPath}/${collection.name}.json`
        );
        const data = JSON.parse(dataStr);
        return data;
    },
    save(collection) {
        SaveResourceFile(
            GetCurrentResourceName(),
            `${this.mainPath}/${collection.name}.json`,
            JSON.stringify(collection.items, null, 4),
            -1
        );
    }
});
new JsonDB(store);

...
```

## Change unique id generator

JsonDB uses `uuid` package for generating unique ids. If you want to change this to something else, you can use this example:

```ts
// src/index.ts

import { randomBytes } from 'crypto';
import { JsonDB, Store } from '@burakbey/jsondb';

const store = new Store({
    mainPath: 'somePathHere',
    getId() {
        const ms = new Date().getTime().toString();
        const id = crypto.randomBytes(8).toString('hex');

        return `${ms}-${id}`;
    }
});
new JsonDB(store);

...
```

## ☕ Support

If you find this project useful and would like to support [me](https://github.com/BUR4KBEY), you can do so by visiting [my website](https://burakbey.dev).

<a href="https://burakbey.dev" target="_blank"><img src="https://burakbey.dev/github_support_snippet.png" style="height: 56px !important;width: 200px !important;" alt="Buy me a coffee"></img></a>