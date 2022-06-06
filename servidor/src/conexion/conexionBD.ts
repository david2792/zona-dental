import key from './bdconfig';
import { createPool, Pool } from 'promise-mysql'


export async function connect(): Promise<Pool> {
            const connection = await createPool(key.database);
            return connection;
}




