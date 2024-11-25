import { VoiceState } from "discord.js";
import createVoiceChannel from "../modules/temporaryChannel/createVoiceChannel.js";


export async function GuildVoiceStates(oldState: VoiceState, newState: VoiceState) {
    try {
      await createVoiceChannel.createVoiceTemporaryChannel(oldState, newState)      
    } catch (error) {
        console.error(error)
    }
}