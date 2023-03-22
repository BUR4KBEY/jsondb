import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

import Collection from './Collection';
import Item from './Item';

export default class Store {
    mainPath: string;

    constructor(options: Pick<Store, 'mainPath'>) {
        Object.assign(this, options);

        if (!existsSync(options.mainPath)) {
            mkdirSync(options.mainPath);
        }
    }

    fetch<T>(collection: Collection<Item<unknown>>): T {
        const filePath = join(this.mainPath, `${collection.name}.json`);

        if (!existsSync(filePath)) {
            writeFileSync(filePath, '[]');
        }

        const dataStr = readFileSync(filePath, 'utf-8');
        const data = JSON.parse(dataStr);
        return data;
    }

    save(collection: Collection<Item<unknown>>) {
        const dataStr = JSON.stringify(collection.items, null, 4);
        writeFileSync(join(this.mainPath, `${collection.name}.json`), dataStr);
    }

    getId(): string {
        return uuidv4();
    }
}
