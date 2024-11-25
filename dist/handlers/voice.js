import createVoiceChannel from "../modules/temporaryChannel/createVoiceChannel.js";
export async function GuildVoiceStates(oldState, newState) {
    try {
        await createVoiceChannel.createVoiceTemporaryChannel(oldState, newState);
    }
    catch (error) {
        console.error(error);
    }
}
