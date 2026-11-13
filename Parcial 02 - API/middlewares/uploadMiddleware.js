import multer from 'multer';
import path from 'path';
import fs from 'fs';
// Directorio de trabajo
const uploadDirectory = 'uploads/profiles';
// Si no existe el directorio lo creamos
if( !fs.existsSync( uploadDirectory)){
    fs.mkdirSync( uploadDirectory, { recursive: true});
}

const storage = multer.diskStorage({
    destination: ( req, file, cb) => {
        cb(null, uploadDirectory)
    },
    filename: ( req, file, cb) => {


        const extension = path.extname( file.originalname );
        const { user } = req;
        const fileName =  `user-${user.id}-${Date.now()}${extension}`;     
        cb(null, fileName)
    }
});

const fileFilter = ( req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if(  allowedTypes.includes( file.mimetype)  ) {
        cb(null, true);
    } else {
        cb( new Error('Formato de archivo no permito') );
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2 Mb
    }
});

export default upload