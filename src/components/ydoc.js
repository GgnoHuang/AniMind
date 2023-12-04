// import * as Y from 'yjs'

// import { WebsocketProvider } from 'y-websocket'

// const ydoc = new Y.Doc()

// // 【用websocket的注意了！】https下浏览器只允许使用wss协议,不允许使用ws协议！注意了！
// // const wsProvider = new WebsocketProvider('ws://localhost:1234', 'my-roomname', ydoc)

// // const wsProvider = new WebsocketProvider('ws://localhost:1234', 'my', ydoc)

// // const wsProvider = new WebsocketProvider(
// //   'wss://demos.yjs.dev', 'quill-demo-room', ydoc
// //   )
// // 這個可以連上

// // ~~~~~~~~~~~~~~~~~~~~`
// const wsProvider = new WebsocketProvider('ws://localhost:1234', 'my', ydoc);
// // 這個是去連線server.js，就是我自己node.js架設的
// // ~~~~~~~~~~~~~~~~~~~~`


// // wsProvider.on('status', event => {
// //   console.log(event.status) 
// // })

// wsProvider.on('status', event => {
//   if (event.status === 'connected') {
//     console.log('WebSocket connected');
//   } else if (event.status === 'disconnected') {
//     console.error('WebSocket disconnected');
//     // 可以在此處添加重連邏輯或錯誤處理代碼
//   }
// });





// export default ydoc;
// // 這個有connected

