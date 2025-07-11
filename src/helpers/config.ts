import 'dotenv/config';

export function config(key: string){
    if(key in process.env){
        return process.env[key]
    }
    
    return null
}