import { createLocationPacket } from "../../utils/notification/game.notification.js";

class Game {
    constructor(id) {
        this.id = id;
        this.users = [];
    }

    addUser(user) {
        this.users.push(user);
    };

    getUser(userId) {
        return this.users.find((user) => user.id === userId);
    };

    removeUser(socket) {
        const index = this.users.findIndex((user) => user.socket === socket);
        if (index != -1) {
            return this.users.splice(index, 1)[0];
        }
    };

    getAllLocation(userId) { // 멀티플레이 시 유저들의 위치 정보를 주고 받기 위함

        const locationData = this.users.filter((user) => user.id !== userId) // 접속한 유저들의 위치 중 자신을 제외한
        .map((user) => { // 유저들의 정보를 배열로 새로 mapping
            return { id: user.id, playerId: user.playerId, x: user.x, y: user.y };
        });

        return createLocationPacket(locationData);
    };
}

export default Game;