# Features


### **1. Login Feature**

<img src="https://github.com/GgnoHuang/AniMind/blob/main/public/readmeGifs/login.gif?raw=true" width="450" height="260">

- **Feature offers 2 login options:**
    - **Standard Registration and Login:** Based on **`Firebase`**'s authentication system, users register and log in using their email and password, ensuring a secure and efficient process.
    - **Google Login:** As an alternative, Firebase's **`GoogleAuthProvider`** facilitates Google account login. Users can swiftly log in with their Google account using **`getAuth`** and **`signInWithPopup`** methods. Additionally, the **`signOut`** method is available for logout management.
***

### **2. Drag-and-Drop Node Addition Feature**

<img src="https://github.com/GgnoHuang/AniMind/blob/main/public/readmeGifs/add.gif?raw=true" width="450" height="260">

In this project, I developed a feature enabling users to add new nodes via drag-and-drop. Each node is a unique React component with its own shape and functionality, defined as different node types using React Flow's **`nodeTypes`**. This feature leverages HTML's drag-and-drop API, specifically using **`onDragStart`**, **`onDrop`**, and **`onDragOver`** events to manage dragging actions and node placement. When a user drags a node to a position on the flowchart, these events are triggered. Additionally, I created a **`setNodes`** function in the state management tool provided by **`Zustand`**, which updates the node collection in the flow, including their count and data, whenever a new node is added, ensuring data consistency and real-time updates.
***

### **3. Node Customization and Interactivity Feature**

<img src="https://github.com/GgnoHuang/AniMind/blob/main/public/readmeGifs/nodetool.gif?raw=true" width="450" height="260">

Nodes in this project support zooming and scaling, as well as the ability to enlarge or reduce text size. Additionally, users can adjust text alignment and customize both the font and background colors of the nodes. All these node attributes are controlled through a state management tool provided by **`Zustand`**. When modifications to specific node properties are required, the system identifies and updates the selected node by comparing node IDs. This ensures a dynamic and user-friendly interface for node customization.
***

### **4. Image Upload and Rotation Feature**