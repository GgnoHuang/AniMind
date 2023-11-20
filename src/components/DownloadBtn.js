import React from 'react';
import { Panel, useReactFlow, getRectOfNodes,ReactFlowProvider } from 'reactflow';
import { toPng } from 'html-to-image';

function downloadImage(dataUrl) {
  const a = document.createElement('a');

  a.setAttribute('download', '未命名.png');
  a.setAttribute('href', dataUrl);
  a.click();
}


export default function DownloadBtn({initBgColor}) {
  const { getNodes } = useReactFlow();

  const onClick = () => {
    

    const nodesBounds = getRectOfNodes(getNodes());
    // getNodes返回一個陣列，就是你平常印出的那個一堆nodes的那個
    //  然後用getRectOfNodes去得到這些nodes的邊界
    const imageWidth = nodesBounds.width;
    const imageHeight = nodesBounds.height;

    // 在 React Flow 中，getRectOfNodes（已被 getNodesBounds 取代
    // ）的作用是返回一個邊界框，這個邊界框包含了給定的所有節
    // 點。這可以用於結合 getViewportForBounds 來計算正確的轉換，以便將給定的節點適當地放置在視圖中​​。
    // 舉例來說，假設您有兩個節點，分別位於 (x: 0, y: 0) 和 (x: 100, y: 100) 的位置
    // ，每個節點的寬度為 50，高度為 25。當您使用 getRectOfNodes 函數時
    // ，它會計算出一個包含這兩個節點的邊界框。這個邊界框的尺寸和位置將反映這兩個節點在空間上的佈局。
    // 例如，這個邊界框可能會有足夠的寬度和高度來包含從 (x: 0, y: 0) 到 (x: 150, y: 125) 的範圍（
    // 考慮到節點的寬度和高度）。這對於視圖轉換和確保所有節點在用戶的視窗中都可見特別有用。



    // const nodesBounds = getRectOfNodes(getNodes());
    // const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);

    toPng(document.querySelector('.react-flow__viewport'), {
      // backgroundColor: '#1a365d',
      backgroundColor: initBgColor,
      // width: imageWidth,這不需要
      // height: imageHeight,這不需要
      style: {
        width: imageWidth,
        height: imageHeight,
        // transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    })
    .then(downloadImage);
  };

  return (
 



      <button
      
      className="download-btn bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600  ml-1 mr-1"

 onClick={onClick}>
        輸出圖檔

      </button>
      



  


  );
  
}


