import React, { useState, useCallback,useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { auth,db } from "../config" 
// import { onAuthStateChanged ,ref,set,get} from "firebase/auth"
import { onAuthStateChanged } from "firebase/auth"
import { getDatabase, ref, set ,get} from "firebase/database"



const flowKey = 'example-flow';
const getNodeId = () => `randomnode_${+new Date()}`;
const initialNodes = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const SaveRestore = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // setUserAuth(authUser)
        console.log("有登入")
        const localUUID = localStorage.getItem("userUUID")
        if (localUUID) {
          // const parsedData = JSON.parse(localUUID)
          // setLocalUuid(localUUID)
          console.log(localUUID)
          console.log('抓到資料')
        }
      } else {
        // setUserAuth(null)
        console.log("沒登入")
      }
    })
    return () => unsubscribe()
  }, [])


  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]);

      // 👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻
  const onSave = useCallback(() => {
              if (rfInstance) {
                    const flow = rfInstance.toObject();
                    // localStorage.setItem(flowKey, JSON.stringify(flow));
                    const localUUID = localStorage.getItem("userUUID")
                  if (localUUID) {
                        const databaseRef = ref(db, `users/${localUUID}/reactflow/SSSave`);
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
              }
  }, [rfInstance]);
          // 👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻

          // 👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻
  const onRestore = useCallback(() => {
              const restoreFlow = async () => {
              // 關鍵就是存這個💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥
                // const flow = JSON.parse(localStorage.getItem(flowKey));
                // console.log('本地抓到的：')
                // console.log( flow)
                // if (flow) {        }
              // 關鍵就是存這個💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥
      
                const localUUID = localStorage.getItem("userUUID");
                
                let parsedData;
                if (localUUID) {
                  const databaseRef = ref(db, `users/${localUUID}/reactflow/SSSave`);

                  try {
                    const snapshot = await get(databaseRef);
                    if (snapshot.exists()) {
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
                      console.log('沒從資料庫get到資料')
                    }
                  } catch (error) {
                    console.error("獲取資料發生錯誤", error);
                  }

                  // get(databaseRef)
                  //   .then((snapshot) => {
                  //     if (snapshot.exists()) {
                  //       const data = snapshot.val();
                  //       console.log('成功從資料庫抓到的：')
                  //       console.log( JSON.parse(data))
                  //       parsedData =JSON.parse(data)
                  //       if (parsedData){
                  //         // 這邊要if因為非同步🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
                  //         const { x = 0, y = 0, zoom = 1 } = parsedData.viewport;
                  //         setNodes(parsedData.nodes || []);
                  //         setEdges(parsedData.edges || []);
                  //         setViewport({ x, y, zoom });
                  //         // setNodes(flow.nodes || []) 用于更新节点状态，flow.nodes
                  //         //  包含了从本地存储中还原的节点数据。
                  //         // 如果没有从存储中找到节点数据，它将保持为空数组 []。
                  //       }
                  //     }
                  //   })
                  //   .catch((error) => {
                  //     console.error("獲取資料發生錯誤", error);
                  //   });
                } else {
                  console.log("未找到用户 ID");
                }
              };
              restoreFlow();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setNodes, setViewport]);


    
    useEffect(()=>{
      onRestore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

          // 👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻
          // 👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻👆🏻
          // ~~
  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: 'Added node' },
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  return (
    <div className='flow-wrapper bg-teal-100' style={{ width: '100%', height: '100vh' }}>

    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={setRfInstance}
    >
      <Panel position="top-right">
        <button onClick={onSave}
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
        >保存</button>

        <button onClick={onRestore}
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
        >回到紀錄狀態</button>

        <button onClick={onAdd}
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
        >add node</button>
      </Panel>
    </ReactFlow>
    </div>

  );
};

// eslint-disable-next-line react/display-name, import/no-anonymous-default-export
export default () => (
  <ReactFlowProvider>
    <SaveRestore />
  </ReactFlowProvider>
);


