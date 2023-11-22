import { Doc } from 'yjs';
import { WebsocketProvider } from 'y-websocket';

const ydoc = new Doc();
// 使用您 EC2 实例的 IP 地址和端口
const websocketProvider = new WebsocketProvider('wss://54.65.60.124:1234', 'hello', ydoc);

export default ydoc;





// import { Doc } from 'yjs';
// import { WebrtcProvider } from 'y-webrtc';

// const ydoc = new Doc();
// new WebrtcProvider('REACTFLOW-COLLAB-EXAMPLE', ydoc);

// export default ydoc;



// import { Doc } from 'yjs';
// import { WebsocketProvider } from 'y-websocket';

// const ydoc = new Doc();
// // 更改 WebSocket 服务器地址和房间名
// // const websocketProvider = new WebsocketProvider('wss://您的websocket服务器地址', '您的房间名', ydoc);
// const websocketProvider = new WebsocketProvider('wss://demo.yjs.dev', '您的房间名', ydoc);

// export default ydoc;