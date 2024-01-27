## 🟠 [Ani-M-ind](https://ani-mind.vercel.app/)

> Ani-M-ind is a mind mapping website, and it transforms your ideas into visual masterpieces, enabling effortless organization and creative exploration.

- Extensive personalization options, such as node colors and sizes, node shapes, background colors, font colors and sizes, and more.
- Utilizes **`Firebase`** for database functionality and authentication, along with Firebase Storage for image uploading capabilities.
- Employs the state management tool **`Zustand`** for handling a multitude of variables and functions.
- Integrates various third-party libraries like **`React Flow`**, **`Dagre`**, **`D3`**, and **`html-to-image`** to facilitate features like canvas, node arrangement, export, and more.
- Utilized **`Next.js`** dynamic routing in conjunction with Firebase Realtime Database to implement a multi-save feature.

<img width="400" alt="截圖 2024-01-11 下午6 02 20" src="https://github.com/GgnoHuang/AniMind/assets/132812902/4d3cd64a-a443-4506-b902-9e457dbd5d02">
<img width="1000" alt="截圖 2024-01-14 下午6 50 05" src="https://github.com/GgnoHuang/AniMind/assets/132812902/8c666bbe-0c30-4c33-a376-54258cea5e7d">

---
## 🟠 Try it!

Link: [Ani-M-ind](https://ani-mind.vercel.app/)

👇🏻 Test account and password

| Account          | Password |
| ---------------- | -------- |
| `test@test.com` | `123456` |


---
## 🟠 Features and Technical Intro (Gif載入中，謝謝你耐心等待😊)

### **🔸 Concept of switching between input functionality ＆ node selection functionality**

<img src="https://github.com/GgnoHuang/AniMind/assets/132812902/a030a862-93bd-49f0-8357-86f7688f327a" width="700">

> Users can simply use clicks to toggle between input functionality and node selection functionality.

<img src="https://github.com/GgnoHuang/AniMind/assets/132812902/31963a74-5ae1-43ca-8f2e-6d7ce323ef5f" width="1000">

- **How was this feature created?**
    - The feature was created with a **`two-layer structure`** within the node's element. The top layer is an **`input field`**, and the bottom layer is the **`node itself`**.
    - The top element (input field) has been assigned the **`'pointer-events'`** property. When this property is set to **`'auto'`**, the input field becomes interactive and can be manipulated. If the property is set to **`'none'`**, the input field becomes non-interactive, causing interactions to affect the bottom layer, which is the node itself.
    - The state of the 'pointer-events' property for the upper element (input field) is determined by a **`boolean variable`**, toggling between **`'auto' and 'none'`**.
    - Both the top and bottom layers have their **`own toggle mechanism`**. When clicked, these toggles invert the boolean variable, causing the 'pointer-events' property to alternate between 'auto' and 'none'. This results in the functionality **`switching between being active and inactive upon each click`**.

- **我是怎麼製作這個功能的？**
    - 節點的element有 **`雙層結構`**，上層是輸入欄位，下層是節點本身。
    - 上層元素(輸入欄)設置了 **`pointer-events`** 的屬性，此屬性會導致，當此屬性的值為 **`'auto'`**，上層元素(輸入欄)將可以被操作。若值為 **`'none'`** 時這個元素將無法被操作，也就導致點擊時所操作的會是下層元素(節點本身)。
    - 上層元素(輸入欄)的pointer-events的屬性，**`是由一個變數的boolean決定其值為'auto'或是'none'`**。
    - 上層元素和下層元素都各設置了一個 **`toggle`**，這些toggle在點擊後可以反轉此變數的boolean，所以重複點擊時，**`會導致pointerevents的值在auto和none之間切換`**，也就實現了功能切換。
#
### **🔸 Concept of Node Text Field Design**

<img src="https://github.com/GgnoHuang/AniMind/assets/132812902/10d5c380-5903-497c-9ce7-3902e0e24d24" width="800">

- **To enhance user experience during input:**
    - **The visual size of nodes dynamically adjusts to the text content.**
    - **This ensures all text content is fully displayed on the screen.**

For this purpose, I've implemented a solution using a div element with the attribute **`contenteditable="true"`** instead of using input or textarea. This is because input or textarea dimensions are constrained by CSS settings, and when entering text, line breaks can cause content to be hidden, necessitating scrolling to view all content.

After implementing **`contenteditable="true"`**, clicking on the element enables it to become **`editable`**. During user input, each time they hit enter (to create a new line), a new element is added within the parent (node element). Consequently, the width and height of the parent element expand, achieving a **`responsive visual effect`**.
#
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

Resume: [Click](https://drive.google.com/file/d/1R11DuC79E_qCuWbIUjdDqQ90j8pBKuax/view?usp=sharing)


