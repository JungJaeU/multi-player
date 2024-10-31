import { HANDLER_IDS } from "../constants/handlerIds.js";


const handlers = {
    [HANDLER_IDS.INITIAL]: {    // 0번 handler
        protoType: 'initial.InitialPayload',
    },
};

export const getProtoTypeNameByHandlerId = (handlerId) => {     // client에서 받은 handlerId 에 맞는 protoType을 반환 
    if (!handlers[handlerId]) {     // 해당 handlerId 가 존재하지 않으면 error
        console.log(handlerId);
        throw Error();
    }

    return handlers[handlerId].protoType;
}