import { CellAlign } from '@armathai/pixi-grid';
import { lp } from '../../utils';

export const getUIGridConfig = () => {
    return lp(getUIGridLandscapeConfig, getUIGridPortraitConfig).call(null);
};

const getUIGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'ui',
        // debug: { color: 0xd950ff },
        bounds,
        cells: [
            {
                name: 'phone_show',
                bounds: { x: 0, y: 0.3, width: 1, height: 0.7 },
                align: CellAlign.centerBottom,
            },
            {
                name: 'phone_hide',
                bounds: { x: 0, y: 1, width: 1, height: 1 },
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
    return {
        name: 'ui',
        // debug: { color: 0xd950ff },
        bounds,
        cells: [
            {
                name: 'phone_show',
                bounds: { x: 0, y: 0.3, width: 1, height: 0.7 },
                align: CellAlign.centerBottom,
            },
            {
                name: 'phone_hide',
                bounds: { x: 0, y: 1, width: 1, height: 1 },
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
