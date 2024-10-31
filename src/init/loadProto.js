import fs from 'fs'; // 파일들을 읽어올 filesystem
import path from 'path'; // 경로를 찾기 위한 path
import { fileURLToPath } from 'url'; // 
import protobuf from 'protobufjs';
import { packetNames } from '../protobuf/packetNames.js';

const __filename = fileURLToPath(import.meta.url); // 현재 위치 찾기
const __dirname = path.dirname(__filename); // 현재 폴더 찾기
const protoDir = path.join(__dirname, '../protobuf'); // protobuf가 들어있는 폴더 위치 찾기 , 현재위치가 init 폴더 이므로 뒤로 한칸가고 protobuf 찾기

const getAllProtoFiles = (dir, fileList = []) => { // 완성된 protoMessages가 들어가기 전 파일이 필요함. 경로가 필요해서 dir 입력

    // 여러 폴더가 있으므로 동적으로 확인이 필요하기 때문에 재귀함수 사용
    const files = fs.readdirSync(dir); // 현재 경로를 읽음.

    files.forEach((file) => { // forEach문을 통해 반복문 생성
        const filePath = path.join(dir, file); // 파일의 배열에 들어있는 하나마다의 파일 경로를 읽음.
        
        if(fs.statSync(filePath).isDirectory()) { 
            getAllProtoFiles(filePath, fileList) // filePath의 경로를 읽었는데 폴더라면 getAllProtoFiles(filePath) 다시 호출하고 빈 배열인 fileList를 호출.
        } else if (path.extname(file) === '.proto') {
            fileList.push(filePath); // 확장자가 .proto 타입이라면 빈 배열인 fileList에 경로를 넣음.
        }
    });
    return fileList;
};

const protoFiles = getAllProtoFiles(protoDir); // protoFiles의 경로들의 리스트가 들어감 

const protoMessages = {}; // 완성된 내용이 들어감.

export const loadProtos = async () => { // 동기적 적용
    try {
        const root = new protobuf.Root(); // 완성되기 전 파일을 Root를 통해 읽는다.

        await Promise.all(protoFiles.map((file) => root.load(file))); // root.load로 읽어온 파일을 map을 통해 새로운 배열을 만들어 Promise.all에 넣어줌.

        for (const [packetName, types] of Object.entries(packetNames)){
            protoMessages[packetName] = {};
            for(const [type, typeName] of Object.entries(types)){
                protoMessages[packetName][type] = root.lookupType(typeName);
            }
        }

        console.log("Protobuf 파일이 로드되었습니다.");
    } catch (e) {
        console.error("Protobuf 파일 로드 중 오류가 발생했습니다.", e)
    }


}


// object freeze 내용물이 변하지 않게 하는 것
export const getProtoMessages = () => { // ProtoMessages를 밖으로 보냄.
    return {...protoMessages};
}