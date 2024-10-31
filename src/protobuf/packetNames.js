// 파일의 경로를 읽은 후, mapping을 하기 위해 packet names 에 대한 객체를 만들기.

export const packetNames = {
    common: { // packetName
        Packet: 'common.Packet', // type: typeName
        // common.Packet 은 protobuf를 사용할 때 사용, 앞의 Packet은 JS 로 mapping할 때 사용
    },
    initial: {
        InitialPayload: 'initial.InitialPayload',
    },
    game: {
        LocationUpdatePayload: 'game.LocationUpdatePayload',
    },
    response: {
        Response: 'response.Response',
    },
    gameNotification: {
        LocationUpdate: 'gameNotification.LocationUpdate',
    },
    
};