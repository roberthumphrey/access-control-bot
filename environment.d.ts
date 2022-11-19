declare global {
     namespace NodeJS {
          interface ProcessEnv {
               botToken: string;
               guildId: string;
               environment: "dev" | "prod" | "debug";

               daily: string;
               weekly: string;
               perma: string;

               db_user: string;
               db_pass: string;
               db: string;
               db_uri: string;
          }
     }
}

export {};