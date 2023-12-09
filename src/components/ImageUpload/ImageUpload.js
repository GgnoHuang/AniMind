import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faImage } from '@fortawesome/free-solid-svg-icons';

import React, {  useState,useEffect } from 'react';
import {storage } from "../../config" 

import {  ref as ref_storage, uploadBytes,getDownloadURL,uploadBytesResumable } from 'firebase/storage';
import styles from "./ImageUpload.module.css";




// 🚦🚦🚦🚦🚦🚦🚦🚦🚦取名
// import {getDatabase, ref as ref_database, set} from "firebase/database";
// import {getStorage, ref as ref_storage} from "firebase/storage";
// 🚦🚦🚦🚦🚦🚦🚦🚦🚦取名


function ImageUpload( {onAdd}) {
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null); 



  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
  
    }

  };


  // useEffect(() => {
  //   if (image) {
  //     const storageRef = ref_storage(storage, 'images/' + image.name);
  //     uploadBytes(storageRef, image).then((snapshot) => {
  //       // 上傳成功後，獲取並更新圖片的 URL
  //       getDownloadURL(snapshot.ref).then((downloadURL) => {
  //         setImageUrl(downloadURL); 
  //         console.log(downloadURL)
  //         onAdd(downloadURL); 
  //       });
  //     });
  //   }
  // }, [image]);



  useEffect(() => {
    if (image) {
      const storageRef = ref_storage(storage, 'images/' + image.name);
      const uploadTask = uploadBytesResumable(storageRef, image);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // 監聽上傳進度
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
                    setUploadProgress(progress);
        },
        (error) => {// 處理任何錯誤
          console.log(error);},
        () => {// 上傳完成後的操作
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL);
            console.log(downloadURL);
            onAdd(downloadURL);
          });});}}, [image]);
  


  // 🟧這段直接融入到上面了 🟧
// const handleUpload = () => {
//   if (image) {
//     const storageRef = ref_storage(storage, 'images/' + image.name);
//     uploadBytes(storageRef, image).then((snapshot) => {
//       // 上傳成功後，獲取並更新圖片的 URL
//       getDownloadURL(snapshot.ref).then((downloadURL) => {
//         setImageUrl(downloadURL); // 更新圖片 URL
//         console.log(downloadURL)
//         onAdd(downloadURL); 
//       });
//     });
//   }
// };





  return (
    <div>
    {/* <input type="file" onChange={handleChange} /> */}

        <div className={styles.toolBtns}>
          <div className={styles.uploadBtnContainer}>
            <input type="file" 
              className={styles.uploadfileInput}
              
              onChange={handleChange} />
              <FontAwesomeIcon icon={faImage} 
                  className={styles.AwesomeIconBtn}
              />

            <p className={styles.progress}>
              Progress: {uploadProgress}%
            </p>
          </div>
        </div>

    {/* <button onClick={handleUpload}>上傳圖片</button> */}


{/* 
    {imageUrl && <img src={imageUrl} alt=" 等待上傳" />} 
     */}
    {/* 如果有 imageUrl，則顯示圖片 */}
  
  </div>
  );
}

export default ImageUpload;
