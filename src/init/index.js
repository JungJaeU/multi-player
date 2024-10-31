import { loadProtos } from "./loadProto.js";
import { addGameSession } from "../sessions/game.session.js";
import { v4 as uuidv4 } from 'uuid'; // uuid 라이브러리 : 문자열로 이루어진 것을 만들어줌.

const initServer = async () => {
    try {
        await loadProtos();
        const gameId = uuidv4();
        const gameSession = addGameSession(gameId);
        
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

export default initServer;