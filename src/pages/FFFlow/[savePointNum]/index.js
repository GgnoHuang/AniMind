//⚪️   layout
import Head from "next/head"

import dagre from "dagre"
const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))
// 為圖形中的所有邊設定預設標籤。在此，標籤被設定為一個空對象。

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR"
  dagreGraph.setGraph({ rankdir: direction })

  nodes.forEach((node) => {
    // 👇🏻用node.width解決了
    dagreGraph.setNode(node.id, { width: node.width, height: node.height })
    // 👆🏻用node.width解決了
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    node.targetPosition = isHorizontal ? "left" : "top"
    node.sourcePosition = isHorizontal ? "right" : "bottom"

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - node.width / 2,
      y: nodeWithPosition.y - node.height / 2,
    }

    return node
  })

  return { nodes, edges }
}
// ⚪️ layout

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faWindowMinimize,
  faSitemap,
  faCircleChevronRight,
  faCircleChevronLeft,
  faClockRotateLeft,
  faFloppyDisk,
  faFolderOpen,
  faCircle,
  faSquare,
  faStar,
  faDiamond,
  faCertificate,
  faHeart,
  faPalette,
  faPlay,
  faUser,
  faT,
} from "@fortawesome/free-solid-svg-icons"

import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback, useState, useEffect, useRef } from "react"
import { db } from "../../../config"
import { ref, set, get } from "firebase/database"

import ReactFlow, {
  ReactFlowProvider,
  useReactFlow,
  Panel,
  Controls,
  Background,
  MiniMap,
  ControlButton,
} from "reactflow"
import "reactflow/dist/style.css"
import styles from "../ffflow.module.css"

// node👇🏻
import TextUpdaterNode from "../../../nodes/TextUpdaterNode/TextUpdaterNode.js"
import ImgNode from "../../../nodes/ImgNode/ImgNode.js"
import CircleNode from "../../../nodes/CircleNode/CircleNode.js"
import CertificateNode from "../../../nodes/CertificateNode/CertificateNode.js"
import Diamond from "../../../nodes/Diamond/Diamond.js"
import Heart from "../../../nodes/Heart/Heart.js"
import Star from "../../../nodes/Star/Star.js"
import PureText from "../../../nodes/PureText/PureText.js"
import Triangle from "../../../nodes/Triangle/Triangle.js"
import CloudNode from "../../../nodes/CloudNode/CloudNode.js"
// node👆🏻

import AuthCheck from "../AuthCheck.js"

import DownloadBtn from "../../../components/DownloadBtn/DownloadBtn.js"
import ImageUpload from "../../../components/ImageUpload/ImageUpload.js"

const proOptions = { account: "paid-pro", hideAttribution: true }

import { shallow } from "zustand/shallow"
import useStore from "../../../store.js"
import { index } from "d3"

const nodeTypes = {
  textUpdater: TextUpdaterNode,
  // gg: OmgNode,
  CertificateNode: CertificateNode,
  circleNode: CircleNode,
  // proCircleNode:proCircleNode,
  ImgNode: ImgNode,
  Diamond: Diamond,
  Heart: Heart,
  Star: Star,
  PureText: PureText,
  Triangle: Triangle,
  CloudNode: CloudNode,
}

function Flow({
  treeWidth = 230,
  treeHeight = 120,
  animationDuration = 200,
} = {}) {
  const [localUserData, setLocalUserData] = useState(null)

  const [reactFlowInstance, setReactFlowInstance] = useState(null)

  // console.log('組件炫染')
  const router = useRouter()
  const queryNum = router.query["savePointNum"]
  // console.log('查詢參數～～:', queryNum);
  useEffect(() => {
    if (router.isReady) {
      const queryNum = router.query["savePointNum"]
      onRestore(queryNum)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query])

  const [initBgColor, setInitBgColor] = useState("#373737")
  // const [initBgColor,setInitBgColor]= useState( '#373737')
  function handleBgColorChange(event) {
    const newBgColor = event.target.value
    setInitBgColor(newBgColor)
  }

  const [selectedColor, setSelectedColor] = useState("#ffffff")
  const [updateTrigger, setUpdateTrigger] = useState(false)

  const getNodeId = () => `randomnode_${+new Date()}`
  // const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setNodes,
    setEdges,

    hideToolbar,
    toggleToolbar,
  } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    addNewNode: state.addNewNode,
    setNodes: state.setNodes,
    setEdges: state.setEdges,
    howManyNodes: state.howManyNodes,
    updateEdgeStyle: state.updateEdgeStyle,
    toggleToolbar: state.toggleToolbar,
    hideToolbar: state.hideToolbar,
  }))
  //為了等等使用useeffect偵測node數量變化

  // ==========複製功能=======================

  const onNodeClick = (event, node) => {}
  const onEdgeClick = (event, edge) => {}

  //👇🏻dnd的部分
  // 這是 onDragStart 函數的定義，
  // 它接收兩個參數：event（拖曳事件對象）和 nodeType（被拖曳的節點類型）。
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  // －－－－－
  const reactFlowWrapper = useRef(null)
  // const [reactFlowInstance, setReactFlowInstance] = useState(null);
  // 這段往上移了

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])
  // －－－－

  const onDrop = (event) => {
    event.preventDefault()

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
    const type = event.dataTransfer.getData("application/reactflow")

    if (typeof type === "undefined" || !type) {
      return
    }

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    })
    const newNode = {
      id: getNodeId(),
      type,
      position,
      data: {
        placeholder: "請輸入...",
        backgroundColor: selectedColor,
        // label: `${type} node`
      },
    }
    setNodes([...nodes, newNode])
    setUpdateTrigger((trigger) => !trigger) // 觸發 useEffect
  }
  // dnd的部分

  // 🔻
  // const [rfInstance, setRfInstance] = useState(null);
  const [variant, setVariant] = useState("dots")
  const { setViewport } = useReactFlow()
  // 🔺

  const onSave = (query) => {
    if (reactFlowInstance) {
      // console.log(reactFlowInstance.toObject())
      const flow = reactFlowInstance.toObject()
      // localStorage.setItem(flowKey, JSON.stringify(flow));
      const localUUID = localStorage.getItem("userUUID")
      if (localUUID) {
        const databaseRef = ref(
          db,
          `users/${localUUID}/reactflow/FFFlow/${query}`
        )
        // console.log(flow)
        set(databaseRef, JSON.stringify(flow))
          .then(() => {
            console.log("成功存到資料庫")
          })
          .catch((error) => {
            console.error("儲存發生錯誤：", error)
          })
      } else {
        console.log("沒抓到localstorage的會員id")
      }
    } else {
    }
  }

  const [alreadyRestore, setAlreadyRestore] = useState(false)
  const onRestore = (query) => {
    const restoreFlow = async () => {
      const localUUID = localStorage.getItem("userUUID")
      if (localUUID) {
        const databaseRef = ref(
          db,
          `users/${localUUID}/reactflow/FFFlow/${query}`
        )
        try {
          const snapshot = await get(databaseRef)
          if (snapshot.exists()) {
            const data = snapshot.val()
            const parsedData = JSON.parse(data)
            if (parsedData) {
              // const { x = 0, y = 0, zoom = 1 } = parsedData.viewport;
              setNodes(parsedData.nodes || [])
              setEdges(parsedData.edges || [])

              setAlreadyRestore(true)
              // setViewport({ x, y, zoom });
              // setNodes(flow.nodes || []) 用於更新節點狀態，flow.nodes
              // 如果沒有從儲存中找到節點數據，保持為空數組[]
            }
          } else {
            setNodes([])
            setEdges([])
            setViewport({ x: 0, y: 0, zoom: 1 })
            // setViewport({ x, y, zoom });
          }
        } catch (error) {
          setNodes([])
          setEdges([])
          setViewport({ x: 0, y: 0, zoom: 1 })
          console.log("獲取資料發生錯誤!")
          console.error("獲取資料發生錯誤", error)
        }
      } else {
        console.log("未找到用户 ID")
        setNodes([])
        setEdges([])
        setViewport({ x: 0, y: 0, zoom: 1 })
      }
    }
    restoreFlow()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  useEffect(() => {
    if (setAlreadyRestore && reactFlowInstance) {
      // 要有reactFlowInstance才能用fitView
      reactFlowInstance.fitView({
        padding: 1,
      })
      setAlreadyRestore(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alreadyRestore])

  // const [addCount, setAddCount] = useState(0);
  // const addNewNode = useStore((state) => state.addNewNode);
  const onAdd = (imageUrl) => {
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()

    // 計算瀏覽器視窗中心點的座標
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    // 將視窗座標轉換為 React Flow 的畫布座標
    const canvasPosition = reactFlowInstance.project({
      x: centerX - reactFlowBounds.left,
      y: centerY - reactFlowBounds.top,
    })

    const newNode = {
      id: getNodeId(),
      type: "ImgNode",
      data: {
        pokemonpng: imageUrl,
      },
      position: canvasPosition,
    }

    setNodes([...nodes, newNode])

    //這邊好像可以試試async await

    setUpdateTrigger((trigger) => !trigger)
  }

  // ⚪️

  const [layoutUpdated, setLayoutUpdated] = useState(false)

  const handleLayoutChangeV = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(
          // 120,180,nodes, edges, direction
          nodes,
          edges,
          direction
        )
      // setEdges(layoutedEdges);
      // setNodes(layoutedNodes);不會馬上更新，因為沒有創建一個新的arr
      setNodes([...layoutedNodes]) //會馬上更新，因為這邊已經是一個新的arr，就算內容一樣
      setEdges([...layoutedEdges])
      setLayoutUpdated(true)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [nodes, edges, setEdges, getLayoutedElements]
  )

  const handleLayoutChangeH = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(
          // 180,120,nodes, edges, direction
          nodes,
          edges,
          direction
        )
      // setEdges(layoutedEdges);
      // setNodes(layoutedNodes);不會馬上更新，因為沒有創建一個新的arr
      setNodes([...layoutedNodes]) //會馬上更新，因為這邊已經是一個新的arr，就算內容一樣
      setEdges([...layoutedEdges])
      // setViewport({ x: 150, y: 150, zoom: 0.7 });
      setLayoutUpdated(true)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [nodes, edges, setEdges, getLayoutedElements]
  )

  useEffect(() => {
    if (layoutUpdated) {
      reactFlowInstance.fitView({
        padding: 1,
      })
      setLayoutUpdated(false)
    }
  }, [layoutUpdated, reactFlowInstance])

  // ⚪️

  return (
    <div
      className="bg-teal-100"
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <Head>
        <title>𝑨𝒏𝒊-𝑴-𝒊𝒏𝒅</title>
        <link rel="icon" href="/AniMindLogo.png" />
      </Head>

      <div className={styles.navbody}>
        <Link href="/">
          <div className={styles.logo} style={{ zIndex: "1999" }}>
            <img src="/AniMindLogo.png" className={styles.logopng} />
            <span className={styles.logospan}>Ani-M-ind</span>
          </div>
        </Link>

        <div className={styles.nav}>
          <button
            onClick={() => {
              onSave(queryNum)
            }}
            className={styles.dwBtn}
          >
            <FontAwesomeIcon
              icon={faFloppyDisk}
              className={styles.awesomeNavIconBtnS}
            />
            <div className={styles.NavBtnHint}>Save</div>
          </button>

          {/* <button onClick={onRestore}  */}
          <button
            onClick={() => {
              onRestore(queryNum)
            }}
            className={styles.dwBtn}
          >
            <FontAwesomeIcon
              icon={faClockRotateLeft}
              className={styles.awesomeNavIconBtnS}
            />
            <div className={styles.NavBtnHint}>Restore</div>
          </button>

          {/* <button onClick={onAdd}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
          >add node</button> */}
          <button className={styles.dwBtn}>
            <Link href="/" style={{ display: "flex" }}>
              <FontAwesomeIcon
                icon={faFolderOpen}
                className={styles.awesomeNavIconBtnS}
              />
            </Link>
            <div className={styles.NavBtnHint}>Folder</div>
          </button>

          <DownloadBtn initBgColor={initBgColor} />

          <p className={styles.welcome} style={{ zIndex: "1999" }}>
            <FontAwesomeIcon icon={faUser} className={styles.usericon} />
            {/* Welcome！ */}
            <span style={{ zIndex: "1999" }}>
              {localUserData != null && localUserData.username}
            </span>
          </p>
        </div>
      </div>

      <AuthCheck setLocalUserData={setLocalUserData} />

      <ReactFlow
        proOptions={proOptions}
        style={{ background: initBgColor }}
        zoomOnDoubleClick={false}
        // connectionMode="loose"
        // 或 "strict"
        connectionMode="loose" // 或 "strict"
        ref={reactFlowWrapper}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        // edgeTypes={edgeTypes}
        fitView={false} // 沒有設定的話會重新載入就fitView導致變很大
        // onEdgeClick={onEdgeClick}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        minZoom={0.1}
        maxZoom={7}
        // style={{ background: bgColor }}
        onDrop={onDrop} // 拖曳新增用的
        onDragOver={onDragOver} // 拖曳新增用的
        onInit={setReactFlowInstance}
      >
        <Background variant={variant} />

        <Controls
          fitViewOptions={{
            duration: 100,
            padding: 0.3,
          }} // 传递自定义的 FitViewOptions
          // position={'bottom-right'}
          position={"bottom-left"}
        ></Controls>

        <Panel className={styles.layoutPanel} position={"bottom-left"}>
          <div
            onClick={() => handleLayoutChangeV("TB")}
            className={styles.TBlayoutBtnsW}
          >
            <FontAwesomeIcon icon={faSitemap} className={styles.layoutBtns} />
            <div className={styles.layoutBtnHint}>Horizontal Auto Layout</div>
          </div>
          <div
            onClick={() => handleLayoutChangeH("LR")}
            className={styles.LRlayoutBtnsW}
          >
            <FontAwesomeIcon
              icon={faSitemap}
              className={`${styles.layoutBtns}  ${styles.sitemapRotate}`}
            />

            {/* {`${ styles.awesomeNavIconBtnS} ${ styles.sitemapRotate}`}/> */}
            <div className={styles.layoutBtnHint}>Vertical Auto Layout</div>
          </div>
        </Panel>

        <Panel className={styles.patternStylePanel} position={"bottom-right"}>
          <div className={styles.canvasBgBar}>
            <div
              className={styles.canvasBgBtns}
              onClick={() => setVariant("lines")}
            >
              <img src="/crossBackground.png" alt="Picture" />
            </div>

            <div
              className={styles.canvasBgBtns}
              onClick={() => setVariant("cross")}
            >
              <img src="/cross.png" alt="Picture" />
            </div>
            <div
              onClick={() => setVariant("dots")}
              className={styles.canvasBgBtns}
            >
              <img src="/dotbtn.png" alt="Picture" />
            </div>
            <div className={styles.wper}>
              <input
                className={`nodrag canvasBackgroundColor ${styles.inputPalette}`}
                type="color"
                onChange={handleBgColorChange}
              />
              <FontAwesomeIcon
                icon={faPalette}
                className={styles.faPaletteicon}
                style={{ color: "white", fontSize: "20px" }}
              />
            </div>
          </div>
          {/* defaultValue= */}
        </Panel>

        <MiniMap
          className="custom-minimap"
          pannable={true}
          style={{ cursor: "move" }}
          position={"bottom-right"}
          // nodeColor='#373737'
          // nodeStrokeColor="#00ffccab"
          // nodeStrokeWidth={1}
          maskColor="#666666"
          nodeColor="#00ffccab"
        />

        {/* 這邊是dnd🔥 */}

        <div
          className={`${styles.toolbarBody}  ${
            hideToolbar ? styles.toolbarBodyHidden : ""
          }`}
        >
          {/* <div className={styles.toolbarBody}> */}
          <div className={styles.toggleBtn} onClick={toggleToolbar}>
            <FontAwesomeIcon
              icon={faCircleChevronLeft}
              className={styles.iconToggle}
            />
            <FontAwesomeIcon
              icon={faWindowMinimize}
              className={styles.iconLine}
            />
            <FontAwesomeIcon
              icon={faCircleChevronRight}
              className={styles.iconShowToggle}
            />
          </div>

          <div
            className={styles.toolBtns}
            // className="dndnode"
            onDragStart={(event) => onDragStart(event, "textUpdater")}
            draggable
          >
            <FontAwesomeIcon
              icon={faSquare}
              className={styles.SidebarIconBtnS}
            />
            <div className={styles.toolBtnHint}>Drag to Add Shape</div>
          </div>

          <div
            className={styles.toolBtns}
            // className="dndnode input"
            onDragStart={(event) => onDragStart(event, "circleNode")}
            draggable
          >
            <FontAwesomeIcon
              icon={faCircle}
              className={styles.SidebarIconBtnS}
            />
            <div className={styles.toolBtnHint}>Drag to Add Shape</div>
          </div>

          {/* <div className={styles.toolBtns}>ok</div> */}

          <div
            className={styles.toolBtns}
            onDragStart={(event) => onDragStart(event, "CertificateNode")}
            draggable
          >
            <FontAwesomeIcon
              icon={faCertificate}
              className={styles.SidebarIconBtnS}
            />
            <div className={styles.toolBtnHint}>Drag to Add Shape</div>
          </div>

          <div
            className={styles.toolBtns}
            onDragStart={(event) => onDragStart(event, "Triangle")}
            draggable
          >
            <FontAwesomeIcon
              icon={faPlay}
              className={styles.SidebarIconBtnStriangle}
            />
            <div className={styles.toolBtnHint}>Drag to Add Shape</div>
          </div>

          <div
            className={`${styles.toolBtns} ${styles.toolBtnsCute}`}
            onDragStart={(event) => onDragStart(event, "CloudNode")}
            draggable
          >
            <img
              src="/cloudNodeIcon.png"
              alt="Picture"
              className={styles.SidebarIconBtnScute}
            />

            <div className={styles.toolBtnHint}>Drag to Add Shape</div>
          </div>

          <div
            className={styles.toolBtns}
            onDragStart={(event) => onDragStart(event, "Diamond")}
            draggable
          >
            <FontAwesomeIcon
              icon={faDiamond}
              className={styles.SidebarIconBtnS}
            />
            <div className={styles.toolBtnHint}>Drag to Add Shape</div>
          </div>
          <div
            className={styles.toolBtns}
            onDragStart={(event) => onDragStart(event, "Star")}
            draggable
          >
            <FontAwesomeIcon icon={faStar} className={styles.SidebarIconBtnS} />
            <div className={styles.toolBtnHint}>Drag to Add Shape</div>
          </div>

          <div
            className={styles.toolBtns}
            onDragStart={(event) => onDragStart(event, "Heart")}
            draggable
          >
            <FontAwesomeIcon
              icon={faHeart}
              className={styles.SidebarIconBtnS}
            />
            <div className={styles.toolBtnHint}>Drag to Add Shape</div>
          </div>

          <div
            className={styles.toolBtns}
            onDragStart={(event) => onDragStart(event, "PureText")}
            draggable
          >
            <FontAwesomeIcon icon={faT} className={styles.SidebarIconBtnS} />
            <div className={styles.toolBtnHint}>Drag to Add Text</div>
          </div>

          {/* <div className={styles.toolBtns}>  */}
          <div className={`${styles.toolBtns} ${styles.toolBtnsPurple}`}>
            <ImageUpload onAdd={onAdd} />
            <div className={styles.toolBtnHint}>Image Upload</div>
          </div>

          {/* <div onClick={() => handleLayoutChangeV('TB')}  className={styles.dwBtn}>
                <FontAwesomeIcon icon={faSitemap} className={styles.awesomeNavIconBtnS}/>
              </div> */}
          {/* <div onClick={() => handleLayoutChangeH('LR')} className={styles.dwBtn}>
                <FontAwesomeIcon icon={faSitemap} className=
                {`${ styles.awesomeNavIconBtnS} ${ styles.sitemapRotate}`}/>
              </div> */}
        </div>
      </ReactFlow>
    </div>
  )
}

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
)
