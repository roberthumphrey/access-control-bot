require('dotenv').config();
import { ACClient } from "./structures/Client";

export const client = new ACClient();

client.start();