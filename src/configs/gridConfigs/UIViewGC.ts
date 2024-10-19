import { lp } from '../../utils';

export const getUIGridConfig = () => {
    return lp(getUIGridLandscapeConfig, getUIGridPortraitConfig).call(null);
};

const getUIGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'ui',
        debug: { color: 0xd950ff },
        bounds,
        cells: [
            {
                name: 'phone_show',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
            {
                name: 'phone_hide',
                bounds: { x: 0, y: 1, width: 1, height: 1 },
            },
        ],
    };
};

const getUIGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'ui',
        debug: { color: 0xd950ff },
        bounds,
        cells: [
            {
                name: 'phone_show',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
            {
                name: 'phone_hide',
                bounds: { x: 0, y: 1, width: 1, height: 1 },
            },
        ],
    };
};
