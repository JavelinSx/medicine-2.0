import { useCallback, useEffect, useState } from 'react';
import type { FC } from 'react';
import {useDropzone} from 'react-dropzone';
import Images from '../Images/Images';
import { FileDoc } from '../../app/types';
import {convertToWebP} from '../../utils/utils'


interface DropboxMainProps {

}

const DropboxMain: FC<DropboxMainProps> = () => {
    const [files, setFiles] = useState<FileDoc[]>([]);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        // Обработка каждого загруженного файла
        const updatedFiles: FileDoc[] = [
            ...files,
            ...(await Promise.all(
                acceptedFiles.map(async (file: File) => {
                    try {
                        if (file.type !== 'pdf') {
                            const webPFileDoc = await convertToWebP(file);
                            return webPFileDoc;
                        }

                    } catch (error: unknown) {
                        console.error('Ошибка при конвертации в WebP:', error);
                    }
                    return null; // Возвращаем null для файлов, которые не были конвертированы
                })
            )).filter((fileDoc) => fileDoc !== null) as FileDoc[] // Фильтруем null значения
        ];
        setFiles(updatedFiles);
    }, [files]);
    

    const { isDragActive, getRootProps, getInputProps, isDragReject, acceptedFiles, fileRejections } = useDropzone({
        onDrop,
        multiple: true,
        accept: {
            'image/*': [],
            'application/pdf': [],
        },
        minSize: 0,
    });

    const deleteImage = useCallback((id:string) => {
        setFiles((prevImage) => prevImage.filter((image) => image.id!==id))
    },[])

  
    return (
        <div className="form-control dropbox">
            <div className='dropbox-label' {...getRootProps()}>
                <input {...getInputProps()} />
                {!isDragActive && 
                        <>
                            <span className='dropbox-label-text'>
                                Нажмите здесь или перетащите файл для загрузки!<br/>
                            </span>
                            
                            <span className='dropbox-label-text'>
                                .jpeg .png .pdf
                            </span>
                        </>
                }
                {isDragActive && !isDragReject && "Положите файлы сюда"}
                {isDragReject && "Тип файла не принят, извините!"}
            </div>
            <div className='dropbox-images '>
                <Images files={files} deleteImage={deleteImage}></Images>
            </div>
        </div>
    );
}

export default DropboxMain;
