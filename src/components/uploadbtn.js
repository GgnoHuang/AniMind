import React, {  useState } from 'react';
import {storage } from "../config" 


import {  ref as ref_storage, uploadBytes,getDownloadURL } from 'firebase/storage';


// 🚦🚦🚦🚦🚦🚦🚦🚦🚦取名
// import {getDatabase, ref as ref_database, set} from "firebase/database";
// import {getStorage, ref as ref_storage} from "firebase/storage";
// 🚦🚦🚦🚦🚦🚦🚦🚦🚦取名


function ImageUpload() {
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null); 


  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

const handleUpload = () => {
    if (image) {
      const storageRef = ref_storage(storage, 'images/' + image.name);
      uploadBytes(storageRef, image).then((snapshot) => {
        // 上傳成功後，獲取並更新圖片的 URL
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL); // 更新圖片 URL
        });
      });
    }
  };









  const onAdd = () => {
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
  
    // 計算瀏覽器視窗中心點的座標
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
  
    // 將視窗座標轉換為 React Flow 的畫布座標
    const canvasPosition = reactFlowInstance.project({
      x: centerX - reactFlowBounds.left,
      y: centerY - reactFlowBounds.top,
    });
    // const { x, y, zoom } = reactFlowInstance.getViewport();
    const newNode = {
      id: getNodeId(),
      type: 'textUpdater',
      data: {
        // inpupu: 'hello',
        // imgsrc: './fan.jpeg',
        // placeholder: '請輸入...',
        backgroundColor: selectedColor, // 使用所选颜色
      },
      position: canvasPosition,
  
    };
    // addNewNode(newNode);
  
    setNodes([...nodes, newNode]);
  
    //🥴🥴🥴🥴🥴 這邊好像可以用看看async await
    // setAddCount(count => count + 1);  // 增加计数
    setUpdateTrigger(trigger => !trigger);  // 触发 useEffect
  };



  return (
    <div>
    <input type="file" onChange={handleChange} />
    <button onClick={handleUpload}>Upload</button>
    {imageUrl && <img src={imageUrl} alt="Uploaded image" />} {/* 如果有 imageUrl，則顯示圖片 */}
    <p>Progress: {uploadProgress}%</p>
  </div>
  );
}

export default ImageUpload;
