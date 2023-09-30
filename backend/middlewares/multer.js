const multer = require('multer');
const fs = require('fs');
const path = require('path');

const customStorage = multer.memoryStorage(); // Хранить файлы в памяти, можно выбрать другой способ хранения
const maxSize = 2 * 1024 * 1024;

const customUpload = multer({
    storage: customStorage,
    limits: {
      files: 5,
      fileSize: maxSize,
    },
    fileFilter: (req, file, cb) => {
        const allowedExtensions = ['.webp', '.pdf'];
        const ext = path.extname(file.originalname).toLowerCase();
    
        if (!allowedExtensions.includes(ext)) {
            const error = new Error('Only .webp and .pdf files are allowed');
            error.code = 'EXTENSION';
            return cb(error);
        }
    
        // Создание директории на сервере, если её ещё нет
        const patientDirectory = path.join(__dirname, 'uploads', req.params.patientId);

        // Получите список путей файлов
        const filePaths = req.files.map((file) => {
            const patientDirectory = path.join(__dirname, 'uploads', req.params.patientId);
            const filePath = path.join(patientDirectory, file.originalname);

            // Сохраните файл на сервере (если это необходимо)
            fs.writeFileSync(filePath, file.buffer); // Раскомментируйте, если нужно сохранять файлы

            return filePath;
        });
        req.body.filePaths = filePaths;
  
        if (!fs.existsSync(patientDirectory)) {
            fs.mkdirSync(patientDirectory, { recursive: true });
        }
    
        cb(null, true);
    },
  });

  const handleFileUpload = (req, res, next) => {
    customUpload(req, res, (err) => {
      if (err) {
        // Обработка ошибки, если есть
        return next(err);
      }
      // Вызываем next(), чтобы передать управление следующей middleware
      next();
    });
  };
  

  module.exports = handleFileUpload;