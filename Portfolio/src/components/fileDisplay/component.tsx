import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch } from '@src/store/hook';
import { FileInfo } from '@src/shared/interfaces/request/interface';
import { getMimeType } from '@src/shared';
import './style.css';
import { projectImageApi } from '@src/store';

interface FileDisplayProps {
    handleMediaChange: (mediaUrl: string, mediaType: 'video' | 'image') => void;
    mediaInfo: any;
}

const FileDisplay = ({ mediaInfo, handleMediaChange }: FileDisplayProps) => {
    const [fileUrl, setFileUrl] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileType, setFileType] = useState('');
    const dispatch = useAppDispatch();

    // Trigger the API call to get the project images on mount
    useEffect(() => {
        dispatch(projectImageApi({
            endpoint: `/api/projectImages/getAll`,
            method: 'GET',
            data: { info: null, file: null }
        }));
    }, [dispatch]);

    // Memoized function to handle the file display logic
    const displayFile = useCallback(async (file: FileInfo) => {
        try {
            if (file.filePath && typeof file.filePath === 'string') {
                const timestamp = new Date().getTime(); // Unique timestamp
                const url = `${import.meta.env.VITE_ENV_SERVER_URL}/api/file/getOne/${encodeURI(file.filePath.replace(/\\\\/g, '/'))}?t=${timestamp}`;
                const mimeType = await getMimeType(file.fileName as string);
                setFileUrl(url);
                setFileType(mimeType);
                setFileName(file.fileName as string);

            }
        } catch (error) {
            console.error('Error fetching file:', error);
            setFileUrl('');
            setFileType('');
        }
    }, []);

    // Effect to trigger displayFile when mediaInfo updates
    useEffect(() => {
        const file = mediaInfo.info.file as FileInfo;
        if (file) {
            displayFile(file);
        }
    }, [mediaInfo, displayFile]);

    // Function to determine how to display the file
    const renderFile = () => {
        if (RegExp(/image\/(jpeg|jpg|gif|png)$/).exec(fileType)) {
            return (
                <img
                    key={fileUrl} // Adding key to force re-render
                    onClick={() => handleMediaChange(fileUrl, 'image')}
                    src={fileUrl}
                    alt={fileName}
                    crossOrigin='anonymous'
                    className='imageElement'
                />
            );
        }

        if (RegExp(/video\/(mp4|webm|ogg)$/).exec(fileType)) {
            return (
                <video
                    key={fileUrl} // Adding key to force re-render
                    crossOrigin='anonymous'
                    className='videoElement'
                    onClick={() => handleMediaChange(fileUrl, 'video')}
                >
                    <track kind="captions" />
                    <source src={fileUrl} type={fileType} />
                    Your browser does not support the video tag.
                </video>
            );
        }

        return (
            <div key={mediaInfo?.id}>
                File type not supported for preview. <a href={fileUrl}>{fileName}</a>
            </div>
        );
    };

    return (
        <div className='displayBox'>
            {renderFile()}
        </div>
    );
};

export default FileDisplay;
