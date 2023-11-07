

import { Handle, Position } from 'reactflow';
import { useCallback, useState,useEffect } from 'react';


const sushiNode = ({ data }) => {
  return (
    <div style={{ width: '100px', height: '100px' }}>
      <img src='https://www.travel.taipei/d_upload_ttn/sceneadmin/image/A0/B0/C0/D878/E420/F173/04765739-d40f-4d13-b271-8d5f9e5f44bd.JPG' alt="Custom Node" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};
// https://lurl.cc/uq6Zw