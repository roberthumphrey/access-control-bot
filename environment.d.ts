declare global {
     namespace NodeJS {
          interface ProcessEnv {
               botToken: string;
               guildId: string;
               environment: "dev" | "prod" | "debug";
               daily: string;
               weekly: string;
               perma: string;
          }
     }
}

export {};