import type { FC } from 'react';
import { FileDoc } from '../../app/types';
import { CloseButton } from 'react-bootstrap';
interface ImagesProps {
    files: FileDoc[]
    deleteImage: (id:string) => void;
}

const Images: FC<ImagesProps> = ({files, deleteImage}) => {
    const handleDeleteImage = (id:string) => {
        deleteImage(id)
    }
    return (
    <div className='image-container'>
    
        {
    
                files.map((file) => (
                    <div className='image-list mb-2 border-bottom' key={file.id}>
                        <a href={file.data} target="_blank" rel="noopener noreferrer">
                            {file.name}
                        </a>
                        <CloseButton  onClick={()=>handleDeleteImage(file.id)}>

                        </CloseButton>
                    </div>
                ))
        }
    </div>
    );
}

export default Images;
