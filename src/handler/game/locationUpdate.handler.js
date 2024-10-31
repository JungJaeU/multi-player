import { getGameSession } from "../../sessions/game.session.js";

const locationUpdateHandler = ({socket, userId, payload}) => { // 접속한 유저의 위치정보를 받아옴
    try {
        const { x, y } = payload;
        const gameSession = getGameSession();

        if(!gameSession){
            console.error('Game session not found');
        }
        console.log(gameSession);

        const user = gameSession.getUser(userId);
        if(!user){
            console.error('User not found');
        }

        user.updataPosition(x, y); // 본인의 위치를 업데이트

        const locationData = gameSession.getAllLocation(userId); // 유저들의 위치를 업데이트

        socket.write(locationData);

    } catch(e) {
        console.error(e);
    }

};

export default locationUpdateHandler;