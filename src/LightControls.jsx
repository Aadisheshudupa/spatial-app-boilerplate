
import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import Draggable from 'react-draggable';
import { expandedLight} from './atoms';
import {light} from './atoms';
import { globalExposures } from './atoms';   
import { globalShadow } from './atoms';
import { useAtom } from 'jotai';
import { newLight } from './atoms';


const LightControls = () => {
    const [lights,setLights] = useAtom(light);
    const [expandedLights,setExpandedLight] = useAtom(expandedLight);
    const [globalShadows,setGlobalShadows] = useAtom(globalShadow);
    const [globalExposure,setGlobalExposure] = useAtom(globalExposures);
    const [newlight, setNewlight] = useAtom(newLight);

    const addLight = (type) => {
        const newLight = {
          id: Object.keys(lights).length+'',
          name: 'light.'+ Object.keys(lights).length,
          type: type,
          color: '#ffffff',
          intensity: 1,
          position: [0, 5, 0],
          exposure: 1,
          shadows: true,
          shadowIntensity: 1,
          ...(type === 'spot' && { angle: Math.PI / 4, penumbra: 0.1, distance: 10 }),
          ...(type === 'point' && { distance: 10 }),
          active:true,
        };
        setLights([...lights, newLight]);
        console.log(lights);
        setNewlight(false);

      };

    const updateLight = (id, property, value) => {
        const updatedLights = lights.map(light =>
          light.id === id ? { ...light, [property]: value } : light
        );
        setLights(updatedLights);
      };
    
      const deleteLight = (id) => {
        setLights(lights.filter(light => light.id !== id));
      };
    
      const resetLights = () => {
        setLights([]);
      };
    
      const toggleGlobalShadows = () => {
        const newGlobalShadows = !globalShadows;
        setGlobalShadows(newGlobalShadows);
        const updatedLights = lights.map(light => ({
          ...light,
          shadows: newGlobalShadows,
        }));
        setLights(updatedLights);
      };
    
      const updateGlobalExposure = (value) => {
        setGlobalExposure(value);
        const updatedLights = lights.map(light => ({
          ...light,
          exposure: value,
        }));
        setLights(updatedLights);
      };

    const [expanded, setExpanded] = useState(null);

  const toggleExpand = (id) => {
    const newExpanded = expanded === id ? null : id;
    setExpanded(newExpanded);
    setExpandedLight(newExpanded);
  };

  const handlePositionChange = (id, axis, value) => {
    const newValue = parseFloat(value);
    const light = lights.find(light => light.id === id);
    const newPosition = [...light.position];
    newPosition[axis] = newValue;
    updateLight(id, 'position', newPosition);
  };

 

  return (
      <div style={{position:'absolute',zIndex:1,top:'40%',left:'40%',border:'10px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'}}>
          <button onClick={() => addLight('directional')}>Add Directional Light</button>
          <button onClick={() => addLight('point')}>Add Point Light</button>
          <button onClick={() => addLight('spot')}>Add Spot Light</button>
      </div>
  );
};

export default LightControls;