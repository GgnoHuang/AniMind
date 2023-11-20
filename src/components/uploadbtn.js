import React, {  useState,useEffect } from 'react';
import {storage } from "../config" 


import {  ref as ref_storage, uploadBytes,getDownloadURL } from 'firebase/storage';


// 🚦🚦🚦🚦🚦🚦🚦🚦🚦取名
// import {getDatabase, ref as ref_database, set} from "firebase/database";
// import {getStorage, ref as ref_storage} from "firebase/storage";
// 🚦🚦🚦🚦🚦🚦🚦🚦🚦取名


function ImageUpload( {sayhi,onAdd}) {
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null); 

  sayhi()

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  useEffect(() => {
    if (image) {
      const storageRef = ref_storage(storage, 'images/' + image.name);
      uploadBytes(storageRef, image).then((snapshot) => {
        // 上傳成功後，獲取並更新圖片的 URL
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL); // 更新圖片 URL
          console.log(downloadURL);
          onAdd(downloadURL); 
        });
      });
    }
  }, [image])

const handleUpload = () => {
  if (image) {
    const storageRef = ref_storage(storage, 'images/' + image.name);
    uploadBytes(storageRef, image).then((snapshot) => {
      // 上傳成功後，獲取並更新圖片的 URL
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setImageUrl(downloadURL); // 更新圖片 URL
        console.log(downloadURL)
        onAdd(downloadURL); 
      });
    });
  }
};


  return (
    <div>
    <input type="file" onChange={handleChange} />
    <button onClick={handleUpload}>上傳圖片</button>

    {/* <button onClick={() => 
      { handleUpload();
        onAdd(imageUrl)}  }>
      上傳圖片
      </button> */}
{/* 
    {imageUrl && <img src={imageUrl} alt=" 等待上傳" />} 
     */}
    {/* 如果有 imageUrl，則顯示圖片 */}
    <p>Progress: {uploadProgress}%</p>
  </div>
  );
}

export default ImageUpload;
