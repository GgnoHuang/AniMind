import * as Y from 'yjs'
// import { Doc } from 'yjs';

import { WebsocketProvider } from 'y-websocket'

const ydoc = new Y.Doc()
// const ydoc = new Doc();

const wsProvider = new WebsocketProvider('ws://localhost:1234', 'my-roomname', ydoc)

wsProvider.on('status', event => {
  console.log(event.status) // logs "connected" or "disconnected"
})

export default ydoc;

// 這個有connected


// import * as Y from 'yjs';
// import { WebrtcProvider } from 'y-webrtc';
// import { WebsocketProvider } from 'y-websocket';

// const ydoc = new Y.Doc();
// const webrtcProvider = new WebrtcProvider('count-demo', ydoc);

// const websocketProvider = new WebsocketProvider('wss://demos.yjs.dev', 'count-demo', ydoc);





// observe changes of the sum

// add 1 to the sum


// import { Doc } from 'yjs';
// import { WebsocketProvider } from 'y-websocket';

// import * as Y from 'yjs';
// const ydoc = new Y.Doc();


// // const ydoc = new Doc();
// // 使用您 EC2 实例的 IP 地址和端口
// // const websocketProvider = new WebsocketProvider('wss://54.65.60.124:8080', 'hello', ydoc);
// // const websocketProvider = new WebsocketProvider('wss://localhost:1234', 'hello', ydoc);
// const websocketProvider = new WebsocketProvider('wss://demos.yjs.dev', 'count-demo', ydoc);


// websocketProvider.on('status', event => {
//   console.log(event.status) // logs "connected" or "disconnected"
// })
// export default ydoc;


// import * as Y from 'yjs'
// import { WebsocketProvider } from 'y-websocket'

// const doc = new Y.Doc()
// const wsProvider = new WebsocketProvider('wss://54.65.60.124:1234', 'my-roomname', doc)



// export default doc;

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