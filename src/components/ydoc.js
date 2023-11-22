import { Doc } from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

const ydoc = new Doc();
new WebrtcProvider('REACTFLOW-COLLAB-EXAMPLE', ydoc);

export default ydoc;
