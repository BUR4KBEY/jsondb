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

```js
// data/users.json

[];
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
user.username = 'user-updated';
UserCollection.update(user);

// Delete user
const user = UserCollection.findOne(x => x.username === 'user-updated');
UserCollection.delete(user);
```
