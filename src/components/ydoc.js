import * as Y from 'yjs'

import { WebsocketProvider } from 'y-websocket'

const ydoc = new Y.Doc()

// 【用websocket的注意了！】https下浏览器只允许使用wss协议,不允许使用ws协议！注意了！
// const wsProvider = new WebsocketProvider('ws://localhost:1234', 'my-roomname', ydoc)

const wsProvider = new WebsocketProvider('ws://localhost:1234', 'my', ydoc)

// const wsProvider = new WebsocketProvider(
//   'wss://demos.yjs.dev', 'quill-demo-room', ydoc
//   )
// 這個可以連上

wsProvider.on('status', event => {
  console.log(event.status) // logs "connected" or "disconnected"
})
export default ydoc;
// 這個有connected

