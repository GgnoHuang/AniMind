// import 'reactflow/dist/base.css';


// const initialEdges = [
//   { id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' },
//   { id: 'edge-2', source: 'node-1', target: 'node-3', sourceHandle: 'b' },
//   { id: 'edge-3', source: 'node-1', target: 'node-3', sourceHandle: 'a' },
// ];

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const [inpupu, setInpupu] = useState('');
// const onInpupu = (event) => {
//   console.log('當前輸入：', event.target.value);
//   console.log(555555);
//   setInpupu(event.target.value);
//   console.log('更新後的 inpupu 值：', inpupu);
// };

// const initialNodes = [
//   {
//     id: 'node-1',
//     type: 'textUpdater',
//     position: { x: 150, y: 0 },
//     data: { placeholder: '是怎樣啊', hello:666,setInpupu, inpupu },
//   },
//   {
//     id: 'node-2',
//     type: 'textUpdater',
//     position: { x: 0, y: 100 },
//     data: { placeholder:'傻眼', hello:666,setInpupu,inpupu },
//   },
//   {
//     id: 'node-55',
//     type: 'textUpdater',
//     position: { x: 222, y: 100 },
//     data: { placeholder: '喔', hello:666,setInpupu,inpupu },
//   },

//   {
//     id: 'node-3',
//     type: 'output',
//     targetPosition: 'left',
//     position: { x: 200, y: 200 },
//     data: { label: 'node 3' },
//   },

// ];

// const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
// const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
          const flow = reactFlowInstance.toObject();
          // localStorage.setItem(flowKey, JSON.stringify(flow));
          const localUUID = localStorage.getItem("userUUID")
        if (localUUID) {
              const databaseRef = ref(db, `users/${localUUID}/reactflow/FFFlow`);
              set(databaseRef, JSON.stringify(flow))
              .then(() => {
                console.log("成功存到資料庫");
              })
              .catch((error) => {
                console.error("儲存發生錯誤：", error);
              });
        }else{
          console.log('沒抓到localstorage的會員id')
        }
    }else{
      console.log(22222)
    }
}, [reactFlowInstance]);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~`

const onRestore = useCallback(() => {
  const restoreFlow = async () => {
  // 關鍵就是存這個💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥
    // const flow = JSON.parse(localStorage.getItem(flowKey));
    // console.log('本地抓到的：')
    // console.log( flow)
    // if (flow) {        }
  // 關鍵就是存這個💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥

    const localUUID = localStorage.getItem("userUUID");
    if (localUUID) {
      const databaseRef = ref(db, `users/${localUUID}/reactflow/FFFlow`);
      try {
        const snapshot = await get(databaseRef);
        if (snapshot.exists()) {
        // if (false) {
          const data = snapshot.val();
          console.log('成功從資料庫抓到的：');
          console.log(JSON.parse(data));
          const parsedData = JSON.parse(data);
          if (parsedData) {
            const { x = 0, y = 0, zoom = 1 } = parsedData.viewport;
            setNodes(parsedData.nodes || []);
            setEdges(parsedData.edges || []);
            setViewport({ x, y, zoom });
           // setNodes(flow.nodes || []) 用于更新节点状态，flow.nodes
            //  包含了从本地存储中还原的节点数据。
            // 如果没有从存储中找到节点数据，它将保持为空数组 []。
          }
        }else{
          console.log(1111)
        }
      } catch (error) {
        console.error("獲取資料發生錯誤", error);
      }
    } else {
      console.log("未找到用户 ID");
    }
  };
  restoreFlow();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [setNodes, setViewport]);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
const onAdd = () => {
  const newNode = {
    id: getNodeId(),
    type: 'textUpdater',
    data: {name: '🔥🔥🔥', job: '測試', emoji: '🔥🔥🔥',
    inpupu:'好',
    imgsrc:'./fan.jpeg',
    placeholder:'預設'} ,

    position: {
      x: Math.random() * window.innerWidth - 100,
      y: Math.random() * window.innerHeight,
    },
  };
  console.log(nodes[0].data)

  nodes[0].data['placeholder']='！！！！！！！！！！！！！！！！！！！！！！！！！！！！'
  console.log(nodes[0].data)

  setNodes((prevNodes) => [...prevNodes, newNode]);
  setAddCount(count => count + 1);  // 增加计数
//🥴🥴🥴🥴🥴 這邊好像可以用看看async await
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~`






















































