import { FileDoc } from "../app/types";
import { v4 as uuidv4 } from 'uuid';

export const searchByValue = (valueToSearch: string, options: {value: string, label: string}[]) => {
    const foundOption = options.find(option => option.value === valueToSearch);
    return foundOption ? foundOption.label : 'Опция не найдена';
};

export const searchByLabel = (labelToSearch: string, options: {value: string, label: string}[]) => {
    const foundOption = options.find(option => option.value === labelToSearch);
    return foundOption ? foundOption.value : 'Опция не найдена';
};

export const convertToWebP = (file: File) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            const img = new Image();
            img.src = reader.result as string;
    
            img.onload = () => {
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d');
              ctx?.drawImage(img, 0, 0);
    
              canvas.toBlob(
                (blob) => {
                  if (blob) {
                    // Создайте новый объект File с обновленным Blob
                    const webPFile: File = new File([blob], 'new-webp-image.webp', {
                      type: 'image/webp',
                    });
    
                    const newFileDoc: FileDoc = {
                      id: uuidv4(),
                      name: uuidv4(),
                      type: webPFile.type,
                      data: URL.createObjectURL(webPFile), // Создание предварительного просмотра
                    };
    
                    resolve(newFileDoc);
                  } else {
                    reject(new Error('Ошибка при конвертации в WebP: Blob is null'));
                  }
                },
                'image/webp',
                1 // Качество WebP изображения (от 0 до 1)
              );
            };
    
            img.onerror = () => {
              reject(new Error('Ошибка при загрузке изображения'));
            };
          };
    
          reader.onerror = () => {
            reject(new Error('Ошибка при чтении файла'));
          };
    
          reader.readAsDataURL(file);
    });
};
export const optimizePDF = () => {

}
 