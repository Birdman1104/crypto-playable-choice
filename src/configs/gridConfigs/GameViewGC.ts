import { CellScale } from '@armathai/pixi-grid';
import { lp } from '../../utils';

export const getGameViewGridConfig = () => {
    return lp(getGameViewGridLandscapeConfig, getGameViewGridPortraitConfig).call(null);
};

const getGameViewGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };

    return {
        name: 'game',
        // debug: { color: 0xd9ff27 },
        bounds,
        cells: [
            {
                name: 'sky',
                scale: CellScale.fill,
                bounds: { x: 0, y: 1, width: 1, height: 0.5 },
            },
            {
                name: 'ground',
                scale: CellScale.fill,
                bounds: { x: 0, y: 1, width: 1, height: 0.5 },
            },
            {
                name: 'preaction',
                scale: CellScale.showAll,
                bounds: { x: -0.1, y: -0.05, width: 1.2, height: 1.2 },
            },
            {
                name: 'wave1action',
                scale: CellScale.showAll,
                bounds: { x: -0.1, y: -0.05, width: 1.25, height: 1.2 },
            },
            {
                name: 'wave2action',
                scale: CellScale.showAll,
                bounds: { x: -0.1, y: -0.05, width: 1.25, height: 1.2 },
            },
            {
                name: 'wave3action',
                scale: CellScale.showAll,
                bounds: { x: -0.1, y: -0.1, width: 1.2, height: 1.4 },
            },
        ],
    };
};

const getGameViewGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };

    return {
        name: 'game',
        // debug: { color: 0xd9ff27 },
        bounds,
        cells: [
            {
                name: 'sky',
                scale: CellScale.fill,
                bounds: { x: 0, y: 0, width: 1, height: 0.5 },
            },
            {
                name: 'ground',
                scale: CellScale.fill,
                bounds: { x: 0, y: 0.5, width: 1, height: 0.5 },
            },
            {
                name: 'preaction',
                scale: CellScale.showAll,
                bounds: { x: -0.1, y: 0, width: 1.2, height: 1 },
            },
            {
                name: 'wave1action',
                scale: CellScale.showAll,
                bounds: { x: -0.1, y: 0, width: 1.5, height: 1 },
            },
            {
                name: 'wave2action',
                scale: CellScale.showAll,
                bounds: { x: -0.1, y: 0, width: 1.5, height: 1 },
            },
            {
                name: 'wave3action',
                scale: CellScale.showAll,
                bounds: { x: -0.2, y: 0, width: 1.4, height: 1 },
            },
        ],
    };
};
