import { generateSnowflake } from '../utils/Helpers';
import { NonFunctionProperties } from '../utils/Typings';

export default abstract class Item<T> {
    readonly _id = generateSnowflake();

    constructor(options?: Omit<NonFunctionProperties<T>, '_id'>) {
        if (options) Object.assign(this, options);
    }
}
