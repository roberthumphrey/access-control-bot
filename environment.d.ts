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

               twitter_api_consumer_key: string;
               twitter_api_consumer_secret: string;
          }
     }
}

export {};