import { CellAlign } from '@armathai/pixi-grid';
import { lp } from '../../utils';

export const getUIGridConfig = () => {
    return lp(getUIGridLandscapeConfig, getUIGridPortraitConfig).call(null);
};

const getUIGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    const phoneX = 0.4;
    const phoneW = 1 - phoneX;
    return {
        name: 'ui',
        // debug: { color: 0xd950ff },
        bounds,
        cells: [
            {
                name: 'phone_show',
                bounds: { x: phoneX, y: 0.5, width: phoneW, height: 0.8 },
                align: CellAlign.centerBottom,
            },
            {
                name: 'phone_hide',
                bounds: { x: phoneX, y: 1, width: phoneW, height: 0.7 },
            },
            {
                name: 'money_bar',
                bounds: { x: 0, y: 0, width: 1, height: 0.2 },
            },
            {
                name: 'money_bar_hide',
                bounds: { x: 0, y: -0.4, width: 1, height: 0.2 },
            },
        ],
    };
};

const getUIGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    const phoneX = 0.3;
    const phoneW = 1 - phoneX;
    return {
        name: 'ui',
        // debug: { color: 0xd950ff },
        bounds,
        cells: [
            {
                name: 'phone_show',
                bounds: { x: phoneX, y: 0.5, width: phoneW, height: 0.7 },
                align: CellAlign.centerBottom,
            },
            {
                name: 'phone_hide',
                bounds: { x: phoneX, y: 1, width: phoneW, height: 1 },
            },
            {
                name: 'money_bar',
                bounds: { x: 0, y: 0, width: 1, height: 0.2 },
            },
            {
                name: 'money_bar_hide',
                bounds: { x: 0, y: -0.4, width: 1, height: 0.2 },
            },
        ],
    };
};
