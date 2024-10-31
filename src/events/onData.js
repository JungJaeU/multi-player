import { TOTAL_LENGTH, PACKET_TYPE_LENGTH, PACKET_TYPE} from "../constants/header.js";
import { getHandlerById } from "../handler/index.js";
import { packetParser } from "../utils/parser/packetParser.js";

export const onData = (socket) => (data) => {
    socket.buffer = Buffer.concat([socket.buffer, data]) // 빈 buffer 객체에 기존에 있던 buffer에 data를 넣어주기

    const totalHeaderLength = TOTAL_LENGTH + PACKET_TYPE_LENGTH;
    
    while(socket.buffer.length > totalHeaderLength) { // socket.buffer.length가 totalHeaderLength의 크기보다 크면 
        const length = socket.buffer.readUInt32BE(0); // 0번째 부터 읽는다.
        const packetType = socket.buffer.readUInt8(TOTAL_LENGTH); // TOTAL_LEGNTH(4바이트) 지난 다음부터 읽는다.
        
        if(socket.buffer.length >= length) { // socket.buffer.length가 받아야할 전체 length보다 크면
            const packet = socket.buffer.subarray(totalHeaderLength, length); // 앞의 헤더 부분 자르기
            socket.buffer = socket.buffer.subarray(length); // 헤더를 자르고 나머지 부분
            try{
                switch (packetType) {
                    case PACKET_TYPE.NORMAL:{
                        const { handlerId, userId, payload } = packetParser(packet);// 패킷 파서 추가
                        const handler = getHandlerById(handlerId);

                        handler({ socket, userId, payload });
                    }
                }

            } catch (e) {
                console.error(e);
            }

        } else {
            break;
        }
    }


};