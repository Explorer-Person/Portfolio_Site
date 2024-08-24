import React, { useEffect } from 'react';
import './style.css';
import { HandleMediaHook, StyleProps } from '@src/shared';
import { CustomButton } from '../customButton';
import { useAppDispatch, useAppSelector } from '@src/store/hook';
import { projectImageApi, setProjectImageInfo } from '@src/store';
import { RootState } from '@src/store/store';
import { ConfButtons } from '../confButtons';
import { FileDisplay } from '../fileDisplay';

interface MyComponentProps {
  onClose: () => void;
}

const DetailBox: React.FC<MyComponentProps> = ({ onClose }) => {
  const { projectImageInfo, projectImageArray } = useAppSelector((state: RootState) => state.info.infos);
  const { projectBoxInfo } = useAppSelector((state: RootState) => state.pageActions.projectDetail);
  const { mediaType, mediaUrl } = useAppSelector((state: RootState) => state.pageActions.mainMedia);
  const dispatch = useAppDispatch();

  const handleMediaChange = HandleMediaHook();
  useEffect(() => {
    if (projectBoxInfo) {
      if (projectImageArray.length === 0) {
        dispatch(projectImageApi({
          endpoint: `/api/projectImages/getSelected/${projectBoxInfo.id}`,
          method: 'GET',
          data: { info: null, file: null }
        }));
      }
      if (projectImageInfo.fk === '') {
        dispatch(setProjectImageInfo({
          ...projectImageInfo,
          fk: projectBoxInfo.id
        }));
      }
    }

  }, [])

  if (projectBoxInfo) {


    const styleButton: StyleProps = {
      width: `100%`,
      height: `100%`,
      backgroundColor: `#4d94ff`,
      padding: `1px 20px`,
      fontSize: `100%`,
      color: `white`
    }
    return (
      <div className="dark-overlay">
        <div className="centered-box">
          <button className="exit-button" onClick={onClose}>X</button>
          <div className="video-section">
            {mediaType === 'video' ? (
              <video crossOrigin='anonymous' className="main-video" src={mediaUrl} controls />
            ) : (
              <img src={mediaUrl} crossOrigin='anonymous' alt="Selected media" className="main-image" />
            )}
          </div>
          <div className="media-thumbnails">
            {projectImageArray.map((projectImage) => (
                <div className='thumbnail projectImageBox' key={projectImage.id}>
                  <FileDisplay key={projectImage.id} handleMediaChange={handleMediaChange} mediaInfo={projectImage} />
                  <div className='confButtons'>
                    <ConfButtons id={projectImage.id} inheritor="projectImages" />
                  </div>
                </div>
            ))}
            <div className='thumbnail projectImageBox'>
            <FileDisplay key={projectBoxInfo.id} handleMediaChange={handleMediaChange} mediaInfo={projectBoxInfo} />
            </div>

            <CustomButton type='action' process='+' id={projectBoxInfo.id} style={styleButton} inheritor='projectImages' />
          </div>
          <div className="title-section">
            <h2>{projectBoxInfo.info.title}</h2>
          </div>
          <div className="explanation-section">
            <p>{projectBoxInfo.info.detail}</p>
          </div>
        </div>
      </div>
    );

  }
};

export default DetailBox;
