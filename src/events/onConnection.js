import { onData } from "./onData.js";
import { onEnd } from "./onEnd.js";
import { onError } from "./onError.js";

export const onConnection = (socket) => {
    console.log(`Client connected from : ${socket.remoteAddress}: ${socket.remotePort}`);
    
    socket.buffer = Buffer.alloc(0); // socket에는 client 정보가 들어있다. 이 socket에 아무 크기가 없는 buffer 객체를 만들어준다. 데이터를 쉽게 읽을 수 있게 한다.

    socket.on('data', onData(socket));
    socket.on('end', onEnd(socket));
    socket.on('error', onError(socket));

}