import { CLIENT_VERSION } from "../../constants/env.js";
import { getProtoTypeNameByHandlerId } from "../../handler/index.js";
import { getProtoMessages } from "../../init/loadProto.js";

export const packetParser = (data) => {
    const protoMessages = getProtoMessages(); // 현재 서버에서 읽은 proto 파일들을 가져온다.

    const commonPacket = protoMessages.common.Packet;
    let packet;
    try {
        packet = commonPacket.decode(data); // parsing이 끝난 data를 decode 하여 packet에 넣어준다.
    } catch(e) {
        console.error(e);
    }

    const handlerId = packet.handlerId;
    const userId = packet.userId;
    const clientVersion = packet.version;

    if (clientVersion !== CLIENT_VERSION) {
        throw Error();
    }

    const protoTypeName = getProtoTypeNameByHandlerId(handlerId);
    if(!protoTypeName) {
        throw Error();
    }

    const [namespace, typeName] = protoTypeName.split('.');
    const payloadType = protoMessages[namespace][typeName];
    let payload;

    try{
        payload = payloadType.decode(packet.payload); // packet에 들어있는 payload를 decode
    } catch (e) {
        console.error(e);
    }
    
    const expectedFields = Object.keys(payloadType.fields); // protoTpye에서의 payload 값
    const actualFields = Object.keys(payload); // parsing이 끝난 payload 값
    const missingFields = expectedFields.filter((field) => !actualFields.includes(field)); // parsing한 결과에서 원하는 값을 가지고 있는지 검증

    if (missingFields > 0) { // 한개라도 맞는게 있다면 error 반환
        throw Error();
    }

    return { handlerId, userId, payload };

};