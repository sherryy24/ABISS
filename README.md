

# 🛡️ABISS: Advanced Biometric Identification Security System
<img src="https://github.com/Khushii-Arora/ABISS-HTM3.0/blob/main/ABISS-Frontend/src/img/logo3.png" />

### 📚 Selected Theme
Open Innovation




## How to Use

**clone the repository:()**

```bash
git clone https://github.com/sherry24/ABISSS.git
```

**In the project directory, you can run:**

```bash
npm install --save
npm start
```

This will run app in development mode.

**Open [http://localhost:3000](http://localhost:3000) to view it in the browser.**

## 📜 Note:

- Remember to allow **permission** for camera in the browser and refresh.
- TestImages are given in a folder in the root folder of project for testing the ABISS web application.

## 🧰 Features:
 
- **Works on both Phones and Computers**
- **Contactless Identify Verification**
- **Can retrieve all data for a person belonging to our databse using face recognision**
- **Detects Multiple Faces at once.**
- **Security Alert Notification System via Email.**
- **People are Categoried into Categories to Counter All Kind of Situations.**
- **Screenshot of Detected Person is Send along with the Alert Notification to Security Team.**


## ⚙️ Technologies Used: 

- **HTML**
- **ReactJS**
- **CSS**
- **BOOTSTRAP**
- **[face-api.js](https://github.com/justadudewhohacks/face-api.js/) face detection API**
- **Other third party services like emailjs**

## How to create new database profile

- This App uses descriptors profile of known faces (facial feature vector of 128 array of number) stored in JSON format as reference for face recognition. A sample profile of a visitors is located in folder `src/database/face_database.json`
- Upload the photo for which you want to add record in database to be recognised at **Photo Input** page of this application.
- After the uploaded photo is detected by the app, we get an array of 128 number facial feature for the uploaded face(it is visible when we check the check button for **show discriptors**).
- Copy the array of 128 number facial feature and add it to our [database](https://github.com/Khushii-Arora/ABISS-MS-Engage22/blob/main/src/database/face_database.json) along with information like name, rollno,permission etc.

### JSON Profile

The JSON profile contains visitors' nickname and array of 5-10 facial feature vector generate per visitor from sample photos. We don't store sample photos in the app to save processing time and optimize application size. You can create new descriptor (feature vector) by uploading photo to the app and check `Show Descriptors` to see the descriptor. If there're multiple faces detected in one photo, app will show all descriptors.

[JSON File](https://github.com/Khushii-Arora/ABISS-HTM3.0/blob/main/ABISS-Frontend/src/database/face_database.json) Format:

```text
{
  "id1": {
	"rollno":id1
        "name": "nickname",
	"phone": "phone number",
	"email": "email id",
	"permission": permission status,
      "descriptors": [
      [Facial_Feature_Vector],...
    ]
  },
  "id2": {
	"rollno":id2
        "name": "nickname",
	"phone": "phone number",
	"email": "email id",
	"permission": permission status,
    "descriptors": [
      [Facial_Feature_Vector],...
    ]
  },
  ...
}
```

Note:

- `id1`, `id2` are object keys to be referred by the App
- `rollno` will be displayed when app recognizes the face
- `FEATURE_VECTOR` is array of 128 number facial feature known as `descriptor` in face-api.js
