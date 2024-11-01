import { PACKET_TYPE, PACKET_TYPE_LENGTH, TOTAL_LENGTH } from "../../constants/header.js";
import { getProtoMessages } from "../../init/loadProto.js";

const serializer = (message, type) => {
    const packetLength = Buffer.alloc(TOTAL_LENGTH);
    packetLength.writeUInt32BE(message.length + TOTAL_LENGTH + PACKET_TYPE_LENGTH, 0); // 보낼 메세지의 길이 + 총 헤더 길이

    const packetType = Buffer.alloc(PACKET_TYPE_LENGTH);
    packetType.writeUInt8(type, 0);
    
    return Buffer.concat([packetLength, packetType, message]);
}


export const createLocationPacket = ( users ) => {
    const protoMessages = getProtoMessages();
    const location = protoMessages.gameNotification.LocationUpdate;

    const payload = { users };
    const message = location.create(payload); // 바이트 배열을 만들기
    const locationPacket = location.encode(message).finish();
    return serializer(locationPacket, PACKET_TYPE.LOCATION);
};