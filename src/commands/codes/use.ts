import { Command } from "../../structures/Command";

export default new Command({
     name: 'use',
     description: 'Use a code to get access to locked category',
     run: async ({ interaction }) => {
          interaction.reply('Pong');
     }
})