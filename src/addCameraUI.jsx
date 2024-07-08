// CameraControls.jsx
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { cameraNames } from './atoms.js';
import { newCamera } from './atoms.js';
export default function AddCameraUI() {
  const [cameras, setCameras] = useAtom(cameraNames);
 const [newCam,setNewCam] = useAtom(newCamera);
  const addPerspectiveCamera = () => {
    const name = `Camera${Object.keys(cameras).length + 1}`;
    const newCameras = { ...cameras, [name]: [true, 'perspective', name] };
    setCameras(newCameras);
    setNewCam(false);
  };

  const addOrthographicCamera = () => {
    const name = `Camera${Object.keys(cameras).length + 1}`;
    const newCameras = { ...cameras, [name]: [true, 'ortho', name] };
    setCameras(newCameras);
    setNewCam(false);

  };

  const deleteCamera = (id) => {
    const newCameras = { ...cameras };
    delete newCameras[id];
    setCameras(newCameras);
  };

  useEffect(() => {
    Object.keys(cameras).forEach((camera) => {
      console.log(cameras[camera][1]);
    });
  }, [cameras]);

  return (
    <div style={{position:'absolute',zIndex:1,top:'40%',left:'40%',border:'10px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'}}>
      <button onClick={addPerspectiveCamera}>Add Perspective Camera</button>
      <button onClick={addOrthographicCamera}>Add Orthographic Camera</button>
    </div>
  );
}
