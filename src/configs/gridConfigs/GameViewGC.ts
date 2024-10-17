import { CellAlign, CellScale } from '@armathai/pixi-grid';
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
                name: 'board',
                scale: CellScale.showAll,
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
            {
                name: 'sentence',
                // scale: CellScale.showAll,
                bounds: { x: 0, y: 0, width: 1, height: 0.35 },
            },
            {
                name: 'question',
                // scale: CellScale.showAll,
                bounds: { x: 0, y: 0.43, width: 1, height: 0.15 },
            },
            {
                name: 'question_bkg',
                scale: CellScale.envelop,
                align: CellAlign.centerTop,
                bounds: { x: 0, y: 0.36, width: 1, height: 0.6 },
            },
            {
                name: 'keyboard',
                // scale: CellScale.showAll,
                bounds: { x: 0, y: 0.61, width: 1, height: 0.38 },
            },
            {
                name: 'keyboard_bkg',
                scale: CellScale.fill,
                bounds: { x: 0, y: 0.6, width: 1, height: 0.4 },
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
                name: 'board',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
            {
                name: 'sentence',
                // scale: CellScale.showAll,
                bounds: { x: 0, y: 0, width: 1, height: 0.4 },
            },
            {
                name: 'question',
                // scale: CellScale.showAll,
                bounds: { x: 0, y: 0.4, width: 1, height: 0.3 },
            },
            {
                name: 'question_bkg',
                scale: CellScale.envelop,
                align: CellAlign.centerTop,
                bounds: { x: 0, y: 0.42, width: 1, height: 0.6 },
            },
            {
                name: 'keyboard',
                // scale: CellScale.showAll,
                bounds: { x: 0, y: 0.71, width: 1, height: 0.28 },
            },
            {
                name: 'keyboard_bkg',
                scale: CellScale.fill,
                bounds: { x: 0, y: 0.7, width: 1, height: 0.3 },
            },
        ],
    };
};
