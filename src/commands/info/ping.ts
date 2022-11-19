import { Command } from "../../structures/Command";

export default new Command({
     name: 'ping',
     description: 'Shows bot client\'s ping to discord',
     run: async ({ interaction }) => {
          interaction.reply('Pong');
     }
})