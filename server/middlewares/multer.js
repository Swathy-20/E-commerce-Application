
import multer, { diskStorage } from "multer";
//import path from "path";


const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    //console.log("📸 Multer filename hit");
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});


export const upload = multer({ storage });
