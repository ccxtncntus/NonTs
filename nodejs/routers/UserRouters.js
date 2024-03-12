import express from "express";
import multer from "multer";
import * as UsersController from "../controllers/UsersController.js";
const router = express();

router.use(express.json());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, path.join("../public/images"));
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });

router.post("/register", upload.single("image"), UsersController.register);
export default router;
