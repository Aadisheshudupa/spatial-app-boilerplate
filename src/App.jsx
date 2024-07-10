import { Canvas } from '@react-three/fiber';
import './App.css';
import CustomGizmoHelper from './CustomGizmoHelper.jsx';
import PerspectiveCameraWithHelper from './PerspectiveCameraWithHelper.jsx';
import { Stats } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import ColorPickerGrid from './ColorPicker.jsx';
import OrthographicCameraWithHelper from './OrthographicCameraWithHelper.jsx';
import CameraNamesList from './CameraNamesList.jsx';
import TraverseForCamera from './TraverseforCamera.jsx';
import Compression from './Compression.jsx';
import UiForFirebase from './uiForFirebase.jsx';
import BackgroundColorWithGrid from './BackgroundColorWithGrid.jsx';
import { globalShadow } from './atoms.js';
import { useAtom } from 'jotai';
import LightControls from './LightControls.jsx';
import Lights from './Lights.jsx';
import { cameraNames } from './atoms.js';
import CameraManager from './CameraManager.jsx';
import AddCameraUI from './addCameraUI.jsx';
import LightNamesList from './lightNamesList.jsx';
import TransformControls from './TransformControls.jsx';

export default function App() {
    const [shadows,setSchadows] = useAtom(globalShadow);
    
      
  return (
    <>
    <UiForFirebase/>
    <TransformControls/>
      <ColorPickerGrid />
      <CameraNamesList position={'absolute'}/>
      <LightNamesList position={'absolute'}/>
      <Canvas camera={{ position: [0, 3, 10] }} shadows={shadows} >
        <Lights/>
      <ambientLight />
      <CustomGizmoHelper />
      <Compression /> 
      <CameraManager/>
      <BackgroundColorWithGrid />
      <Stats />
      </Canvas>
    </>
  );
}