/* eslint-disable no-use-before-define */
import Store from './Store';

export default class JsonDB {
    private static _instance: JsonDB;

    static getInstance(): JsonDB {
        return JsonDB._instance;
    }

    constructor(public readonly store: Store) {
        if (JsonDB._instance)
            throw new Error(`Use 'JsonDB.getInstance()' to get the instance.'`);
        JsonDB._instance = this;
    }
}
