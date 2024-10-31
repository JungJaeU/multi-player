class User {
    constructor(socket, id, playerId, latency) {
        this.id = id;
        this.socket = socket;
        this.playerId = playerId;
        this.latency = latency;
        this.x = 0;
        this.y = 0;
        this.lastUpdataTime = Date.now(); // 업데이트 된 시간을 지속적으로 나타냄.
    }

    updataPosition(x, y) {
        this.x = x;
        this.y = y;
        this.lastUpdataTime = Date.now();
    }
}

export default User;