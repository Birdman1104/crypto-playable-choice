import { AdStatus } from '../models/AdModel';
import { GameState } from '../models/GameModel';
import Head from '../models/HeadModel';
import { GAME_CONFIG } from './GameConfig';

export const hintParamGuard = (): boolean => {
    return GAME_CONFIG.Hint;
};

export const hintModelGuard = (): boolean => {
    return !!Head.ad?.hint;
};

export const gameWaveStateGuard = (): boolean => {
    return (
        Head.gameModel?.state === GameState.Wave1 ||
        Head.gameModel?.state === GameState.Wave2 ||
        Head.gameModel?.state === GameState.Wave3 ||
        Head.gameModel?.state === GameState.Wave4
    );
};

export const soundParamGuard = (): boolean => {
    return GAME_CONFIG.Sound;
};

export const soundModelGuard = (): boolean => {
    return !!Head.ad?.sound;
};

export const ctaModelGuard = (): boolean => {
    return !!Head.ad?.cta;
};

export const ctaVisibleGuard = (): boolean => {
    return !!Head.ad?.cta?.visible;
};

export const adStatusCtaGuard = (): boolean => {
    return Head.ad?.status === AdStatus.Cta;
};

export const gameModelGuard = (): boolean => {
    return !!Head.gameModel;
};

export const reachedFinalWaveGuard = (): boolean => {
    if (Head.gameModel && Head.gameModel.board) {
        return Head.gameModel?.board?.currentLevelNumber + 1 === GAME_CONFIG.waveToStore;
    } else {
        return false;
    }
};
