import { client } from "../..";
import { Command } from "../../structures/Command";

export default new Command({
     name: 'ping',
     description: 'Shows bot client\'s ping to discord',
     run: async ({ interaction }) => {
          const { relationship } = await client.twitterClient.v1.friendship({ source_screen_name: 'keanuispapi', target_screen_name: 'twitter' });

          if (relationship.source.following) {
               console.log('following');
          } else {
               console.log('not');
          }
          
          interaction.reply('Pong');
     }
})