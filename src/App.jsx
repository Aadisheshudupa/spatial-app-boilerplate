import { Canvas } from '@react-three/fiber';
import './App.css';
import CustomGizmoHelper from './CustomGizmoHelper.jsx';
import PerspectiveCameraWithHelper from './PerspectiveCameraWithHelper.jsx';
import { Stats } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import ColorPickerGrid from './ColorPicker.jsx';
import OrthographicCameraWithHelper from './OrthographicCameraWithHelper.jsx';
import CameraNamesList from './CameraNamesList.jsx';
import UiForFirebase from './uiForFirebase.jsx';
import BackgroundColorWithGrid from './BackgroundColorWithGrid.jsx';
import { globalShadow, modelPath } from './atoms.js';
import { useAtom } from 'jotai';
import LightControls from './LightControls.jsx';
import Lights from './Lights.jsx';
import { cameraNames } from './atoms.js';
import CameraManager from './CameraManager.jsx';
import AddCameraUI from './addCameraUI.jsx';
import LightNamesList from './lightNamesList.jsx';
import TransformControls from './TransformControls.jsx';
import KeyframesContainer from './KeyframesContainer.jsx';
import Model from './Model.jsx'
import playImage from './assets/cssIcons/playButtonWhite.png';
import pauseImage from './assets/cssIcons/pauseButtonWhite.png';
import loopActiveImage from './assets/cssIcons/loopActive.png';
import loopInactiveImage from './assets/cssIcons/loopInactive.svg';
import { ExportTrigger } from './atoms.js';

export default function App() {
    const [shadows,setSchadows] = useAtom(globalShadow);
    const [ModelPath,setModelPath] = useAtom(modelPath);
    const [exportTrigger, setExportTrigger] = useAtom(ExportTrigger);
    const [importFile, setImportFile] = useState(null);
    const [animationControl, setAnimationControl] = useState('pause');
    const [loop, setLoop] = useState(false);
    const [availableAnimations, setAvailableAnimations] = useState([]);
    const [selectedAnimations, setSelectedAnimations] = useState([]);
    const [customAnimations, setCustomAnimations] = useState({});
    const modelRef = useRef(null);
    const [selectedObject, setSelectedObject] = useState(null);
    const [selectedObjectState, setSelectedObjectState] = useState(null);
    const [showInfoPanel, setShowInfoPanel] = useState(false);
    const [showInfoPanel2D, setShowInfoPanel2D] = useState(false);
    const sceneRef = useRef();
    const selectedObjectRef = useRef(null);
    const [highlightedMesh, setHighlightedMesh] = useState(null);
    const [isExploding, setIsExploding] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    
  const togglePlayPause = () => {
      setAnimationControl(prev => (prev === 'play' ? 'pause' : 'play'));
  };

  const handleAnimationSelect = (animationName) => {
      setSelectedAnimations(prev => {
          if (prev.includes(animationName)) {
              return prev.filter(name => name !== animationName);
          } else {
              return [...prev, animationName];
          }
      });
  };
  useEffect(() => {
      if (selectedObject && selectedObject.material) {
          selectedObjectRef.current = selectedObject;
      }
  }, [selectedObject]);
  const handleAddNewAnimation = (newAnimation) => {
      setAvailableAnimations(prev => [...prev, newAnimation.name]);
      setCustomAnimations(prev => ({
          ...prev,
          [newAnimation.name]: newAnimation
      }));
  };

  useEffect(() => {
      if (selectedObject && selectedObject.material) {
          selectedObjectRef.current = selectedObject;
      }
  }, [selectedObject]);

  const handleObjectClick = (mesh) => {
      setSelectedObject(mesh);
      setSelectedObjectState(mesh.uuid);
      setShowInfoPanel(true);
      setShowInfoPanel2D(true);
  };





 
      
  return (
    <>
    <UiForFirebase/>
    <KeyframesContainer
                togglePlayPause={togglePlayPause}
                animationControl={animationControl}
                playImage={playImage}
                pauseImage={pauseImage}
                loop={loop}
                setLoop={setLoop}
                loopActiveImage={loopActiveImage}
                loopInactiveImage={loopInactiveImage}
                availableAnimations={availableAnimations}
                selectedAnimations={selectedAnimations}
                handleAnimationSelect={handleAnimationSelect}
                onAddNewAnimation={handleAddNewAnimation}
            />

    <TransformControls/>
      <ColorPickerGrid />
      <CameraNamesList position={'absolute'}/>
      <LightNamesList position={'absolute'}/>
      <Canvas camera={{ position: [0, 3, 10] }} shadows={shadows} >
        <Lights/>
        <Model
                        ref={modelRef}
                        setExportTrigger={setExportTrigger}
                        importFile={ModelPath}
                        animationControl={animationControl}
                        loop={loop}
                        selectedAnimations={selectedAnimations}
                        customAnimations={customAnimations}
                        setAvailableAnimations={setAvailableAnimations}
                        onObjectClick={handleObjectClick}
                        highlightedMesh={highlightedMesh}
                    />
      <ambientLight />
      <CustomGizmoHelper />
      <CameraManager/>
      <BackgroundColorWithGrid />
      <Stats />
      </Canvas>
    </>
  );
}