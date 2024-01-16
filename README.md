## 🟠 [Ani-M-ind](https://ani-mind.vercel.app/)

> Ani-M-ind is a mind mapping website, and it transforms your ideas into visual masterpieces, enabling effortless organization and creative exploration.

- Extensive personalization options, such as node colors and sizes, node shapes, background colors, font colors and sizes, and more.
- Utilizes **`Firebase`** for database functionality and authentication, along with Firebase Storage for image uploading capabilities.
- Employs the state management tool **`Zustand`** for handling a multitude of variables and functions.
- Integrates various third-party libraries like **`React Flow`**, **`Dagre`**, **`D3`**, and **`html-to-image`** to facilitate features like canvas, node arrangement, export, and more.
- Utilized **`Next.js`** dynamic routing in conjunction with Firebase Realtime Database to implement a multi-save feature.


<img width="1000" alt="截圖 2024-01-14 下午6 50 05" src="https://github.com/GgnoHuang/AniMind/assets/132812902/8c666bbe-0c30-4c33-a376-54258cea5e7d">
<img width="400" alt="截圖 2024-01-11 下午6 02 20" src="https://github.com/GgnoHuang/AniMind/assets/132812902/4d3cd64a-a443-4506-b902-9e457dbd5d02">
<img width="1280" alt="截圖 2024-01-15 上午12 10 29" src="https://github.com/GgnoHuang/AniMind/assets/132812902/a780a905-d96a-4251-b6e8-c97671b509cf">

---
## 🟠 Try it!

Link: [Ani-M-ind](https://ani-mind.vercel.app/)

👇🏻 Test account and password

| Account          | Password |
| ---------------- | -------- |
| `test@test.com` | `123456` |


---
## 🟠 Features and Technical Intro (Gif載入中，謝謝你耐心等待😊)

### **🔸 Login Feature**

<img src="https://github.com/GgnoHuang/AniMind/blob/main/public/readmeGifs/login.gif?raw=true" width="700">

- **Feature offers 2 login options:**
    - **Standard Registration and Login:** Based on **`Firebase`**'s authentication system, users register and log in using their email and password, ensuring a secure and efficient process.
    - **Google Login:** As an alternative, Firebase's **`GoogleAuthProvider`** facilitates Google account login. Users can swiftly log in with their Google account using **`getAuth`** and **`signInWithPopup`** methods. Additionally, the **`signOut`** method is available for logout management.
#
### **🔸 Drag-and-Drop Node Addition Feature**

<img src="https://github.com/GgnoHuang/AniMind/blob/main/public/readmeGifs/add.gif?raw=true" width="700">

- Feature Development: Developed a feature that allows users to add new nodes via **`drag-and-drop`**.
- Node Customization: Each node is a unique React component, characterized by its own shape and functionality. Different node types are defined using React Flow's **`nodeTypes`**.
- Drag-and-Drop API Utilization: Implemented HTML's drag-and-drop API. This involves using **`onDragStart`**, **`onDrop`**, and **`onDragOver`** events for managing dragging actions and node placement.
- Event Triggering: When a user drags a node to a position on the flowchart, these specific events are triggered.
- State Management: Created a **`setNodes`** function within the state management tool provided by **`Zustand`**.
- Data Consistency and Real-Time Updates: This function updates the node collection in the flow, including their count and data, whenever a new node is added, ensuring data consistency and real-time updates.






#
### **🔸 Node Customization and Interactivity Feature**

<img src="https://github.com/GgnoHuang/AniMind/blob/main/public/readmeGifs/nodetool.gif?raw=true" width="700">

Nodes in this project support zooming and scaling, as well as the ability to enlarge or reduce text size. Additionally, users can adjust text alignment and customize both the font and background colors of the nodes. All these node attributes are controlled through a state management tool provided by **`Zustand`**. When modifications to specific node properties are required, the system identifies and updates the selected node by comparing node IDs. This ensures a dynamic and user-friendly interface for node customization.
#
### **🔸 Image Upload and Rotation Feature**

<img src="https://github.com/GgnoHuang/AniMind/blob/main/public/readmeGifs/upload.gif?raw=true" width="700">

In this project, I utilized Firebase's Storage feature to **`store images`**. These images are saved in Storage in the form of **`URLs`**. To enhance user experience, I implemented an image rotation feature using the **`D3`** library. Whenever a user uploads an image, the system identifies it by comparing a unique ID, and then assigns the corresponding image URL to the relevant node. This approach simplifies image management and ensures each node displays the correct image.
#
### **🔸 Auto Layout Feature**

<img src="https://github.com/GgnoHuang/AniMind/blob/main/public/readmeGifs/layout.gif?raw=true" width="700">

This project offers two automatic node layout options: **`vertical and horizontal`**, realized through the integration of React Flow with the **`dagre`** library. By customizing the **`getLayoutedElements`** function, I set the direction of the dagre graph and configured relevant attributes for each node and edge. The dagre library is responsible for computing the layout and determining node positions. This approach enables nodes to automatically align based on predefined rules, streamlining the process of creating flowcharts. Additionally, by using the **`source`** and **`target`** attributes of the connections (corresponding to the **`green`** and **`purple`** handles), the correct hierarchical order of the mind map is maintained.
#
### **🔸 Node Copying Feature**

<img src="https://github.com/GgnoHuang/AniMind/blob/main/public/readmeGifs/clone.gif?raw=true" width="700">

Users have the option to copy nodes in four different directions, and the copied nodes automatically establish connections with the original nodes. This functionality is achieved by capturing the IDs of the nodes and their connection points (**`handles`**), which allows the system to automatically set up connections between the new nodes. This feature enhances the efficiency of flowchart editing.
#
### **🔸 Download Feature**

<img src="https://github.com/GgnoHuang/AniMind/blob/main/public/readmeGifs/download.gif?raw=true" width="700">

The feature of the output screen is that I use the **`html-to-image`** library to capture the mind map created with **`React Flow`** as a JPEG image. I utilize the **`getRectOfNodes`** function of React Flow to calculate the width and height of the screen, thus determining the size of the image. Then, it captures the content within the React Flow view, including the specified background color, and presents it to the user as an image.

***
## Contact

Name: 黃駿宏 Jyun-Hung Huang

Email: Lshapeddesk@icloud.com

Resume: [Click](https://drive.google.com/file/d/1TOtMhhBgRccJ2dvz7alIzB939q3zRSIe/view?usp=sharing)


