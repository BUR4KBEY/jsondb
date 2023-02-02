import { Snowflake } from 'nodejs-snowflake';

const snowflake = new Snowflake();

export function generateSnowflake() {
    return snowflake.getUniqueID().toString();
}
