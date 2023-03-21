import { Constructor } from '../utils/Typings';
import Item from './Item';
import JsonDB from './JsonDB';

export default class Collection<T extends Item<unknown>> {
    items: T[];

    constructor(private schema: Constructor<T>, public readonly name: string) {}

    private fetch() {
        this.items = JsonDB.getInstance()
            .store.fetch<T[]>(this)
            // eslint-disable-next-line new-cap
            .map(x => new this.schema(x));
    }

    find(predicate?: (value: T) => boolean): T[] {
        this.fetch();

        let data = this.items;

        if (predicate) {
            data = data.filter(predicate);
        }

        return data;
    }

    findOne(predicate: (value: T) => boolean): T | undefined {
        return this.find(predicate)[0];
    }

    delete(item: T) {
        this.fetch();
        const index = this.items.findIndex(x => x._id === item._id);

        if (index !== -1) {
            this.items.splice(this.items.indexOf(item), 1);
            JsonDB.getInstance().store.save(this);
        }
    }

    save(...item: T[]) {
        this.fetch();
        this.items.push(...item);
        JsonDB.getInstance().store.save(this);
    }

    update(item: T) {
        this.fetch();
        const index = this.items.findIndex(x => x._id === item._id);
        if (index !== -1) {
            this.items[index] = item;
            JsonDB.getInstance().store.save(this);
        }
    }
}
