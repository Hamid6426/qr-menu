import multer from "multer";

// Configure multer for memory storage (stores file in memory as a Buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
