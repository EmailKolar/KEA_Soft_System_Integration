import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send({data: 'Hello World!'});
});

app.post('/form', (req, res) => {
    console.log(req.body);
    delete req.body.password;
    res.send(req.body);

});

import multer from 'multer';
//const upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(undefined, "./uploads");
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        const sanitizedFilename = `${Date.now()}-${Math.round(Math.random()*1E9)}-${file.originalname}`;

        cb(undefined, sanitizedFilename);
    }
});

function fileFilter(req, file, cb) {
    const validTypes = ["image/jpeg", "image/png", "image/gif"];

    if (!validTypes.includes(file.mimetype)) {
        cb(new Error(" file type not allowed"), false);
    }else{
        cb(null, true);
    }
}

const upload = multer({
    storage,
    limits:{
        fileSize: 1024 * 1024 * 5 // 5MB
    },
    fileFilter
});

app.post('/fileform', upload.single("file"), (req, res) => {
    console.log(req.body);
    res.send({});
}
);


const PORT = 8080 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
