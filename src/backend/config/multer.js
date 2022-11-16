const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3-v2');

aws.config.update({
    accessKeyId: 'AKIAYD3SMJWWV2NKMFUM',
    secretAccessKey: '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',
    region: 'us-east-1'
});

module.exports = {
    dest: path.resolve(__dirname, '..', 'uploads'),
    storage: multerS3({
        s3: new aws.S3(),
        bucket: 'recrutechawsbucket',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err);

                const fileName = `${hash.toString("hex")}-${file.originalname}`;

                cb(null, fileName);
            });
        },
    }),
    limits: {
        fileSize: 2 * 1024 * 1024, //limite de 2mega para upload de arquivos
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'application/pdf'
        ];

        if(allowedMimes.includes(file.mimetype)){
            cb(null, true);
        } else {
            cb(new Error('Tipo de arquivo inválido'));
        }
    },
};