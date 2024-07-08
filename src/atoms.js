import { atom } from "jotai";
import { exp } from "three/examples/jsm/nodes/Nodes.js";

export const backgroundColor = atom('#3b3b3b');

export const gridColor = atom('#ffffff');

export const cameraNames = atom({});

export const activeCamera = atom('defaults');

export const selectedCamera = atom('defaults');

export const modelPath = atom(null);

export const exports = atom(false);

export const toCloud = atom(false);

export const inputModelUrl = atom('');

export const modelUrls = atom([]);

export const light = atom([]);

export const expandedLight = atom(null);

export const globalExposures = atom(1);

export const globalShadow = atom(true);

export const newCamera = atom(false);

export const selectedLight = atom(null);

export const dropdownCam = atom(false);

export const dropdownLight = atom(false);

export const newLight = atom(false);

export const transformControlsAtom = atom('translate');