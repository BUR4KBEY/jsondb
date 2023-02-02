import { NonFunctionProperties } from '../utils/Typings';
import JsonDB from './JsonDB';

export default abstract class Item<T> {
    readonly _id = JsonDB.getInstance().store.getId();

    constructor(options?: Omit<NonFunctionProperties<T>, '_id'>) {
        if (options) Object.assign(this, options);
    }
}
