import { v5 as uuid } from 'uuid';


export function generateCode(type: string, discordId: string): string {
     const randomString: string = `access-control-${discordId}-${new Date().toString()}`
     const namespace: string = type === "daily" ? process.env.daily : type === "weekly" ? process.env.weekly : process.env.perma;
     const code: string = uuid(randomString, namespace);

     return code;
}