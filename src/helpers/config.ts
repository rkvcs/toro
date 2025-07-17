import 'dotenv/config';
import { env } from 'node:process';

export function config(key: string){
    if(key in env){
        return env[key]
    }

    return null
}
