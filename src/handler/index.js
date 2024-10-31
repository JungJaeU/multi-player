import { HANDLER_IDS } from "../constants/handlerIds.js";
import locationUpdateHandler from "./game/locationUpdate.handler.js";
import initialHandler from "./user/initial.handler.js";


const handlers = {
    [HANDLER_IDS.INITIAL]: {    // 0번 handler
        handler: initialHandler,
        protoType: 'initial.InitialPayload',
    },

    [HANDLER_IDS.LOCATION_UPDATE]: {
        handler: locationUpdateHandler,
        protoType: 'game.LocationUpdatePayload',
    },
};


export const getHandlerById = (handlerId) => {     // client에서 받은 handlerId 에 맞는 protoType을 반환 
    if (!handlers[handlerId]) {     // 해당 handlerId 가 존재하지 않으면 error
        throw Error();
    }

    return handlers[handlerId].handler;
}

export const getProtoTypeNameByHandlerId = (handlerId) => {     // client에서 받은 handlerId 에 맞는 protoType을 반환 
    if (!handlers[handlerId]) {     // 해당 handlerId 가 존재하지 않으면 error
        throw Error();
    }

    return handlers[handlerId].protoType;
}