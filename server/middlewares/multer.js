// import multer, { diskStorage } from "multer";

// const storage = diskStorage({
//     filename: function (req, file, cb) {
//         // console.log('file===',file);
        
//         cb(null, file.originalname);
//     },
// });

// export const upload = multer({ storage: storage });
import multer, { diskStorage } from "multer";
//import path from "path";


const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});


export const upload = multer({ storage });
