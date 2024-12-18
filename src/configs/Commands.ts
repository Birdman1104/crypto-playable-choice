import { lego } from '@armathai/lego';
import { AdStatus } from '../models/AdModel';
import { GameState } from '../models/GameModel';
import Head from '../models/HeadModel';
import { HintState } from '../models/HintModel';
import { unMapCommands } from './EventCommandPairs';
import {
    ctaModelGuard,
    gameModelGuard,
    gameWaveStateGuard,
    hintModelGuard,
    hintParamGuard,
    soundParamGuard,
} from './Guards';

export const initAdModelCommand = (): void => Head.initializeADModel();

export const onMainViewReadyCommand = (): void => {
    lego.command
        //
        .execute(initAdModelCommand)

        .payload(AdStatus.Game)
        .execute(setAdStatusCommand);
};

const initializeGameModelCommand = (): void => Head.initializeGameModel();
const initializeCtaModelCommand = (): void => Head.ad?.initializeCtaModel();
const initializeSoundModelCommand = (): void => Head.ad?.initializeSoundModel();
const initializeHintModelCommand = (): void => Head.ad?.initializeHintModel();

const startIdleTimerCommand = (): void => Head.ad?.startIdleTimer();
const stopIdleTimerCommand = (): void => Head.ad?.stopIdleTimer();

const setHintStateCommand = (state: HintState): void => Head.ad?.hint?.setState(state);
export const startHintVisibilityTimerCommand = (): void => Head.ad?.hint?.startVisibilityTimer();
export const stopHintVisibilityTimerCommand = (): void => Head.ad?.hint?.stopVisibilityTimer();

const initializeModelsCommand = (): void => {
    lego.command

        .execute(initializeGameModelCommand)

        .execute(initializeCtaModelCommand)

        .guard(soundParamGuard)
        .execute(initializeSoundModelCommand)

        .guard(hintParamGuard)
        .execute(initializeHintModelCommand)

        .execute(startIdleTimerCommand);

    // .guard(hintParamGuard)
    // .execute(startHintVisibilityTimerCommand);
};

export const hideHintCommand = (): void => {
    lego.command.payload(false).execute(setHintVisibleCommand);
};

const setHintVisibleCommand = (value: boolean): void => {
    Head.ad?.hint?.setVisibility(value);
};

const destroyGameModelCommand = (): void => Head.destroyGameModel();
const destroyCtaModelCommand = (): void => Head.ad?.destroyCtaModel();
const destroySoundModelCommand = (): void => Head.ad?.destroySoundModel();
const destroyHintModelCommand = (): void => Head.ad?.destroyHintModel();
const setAdStatusCommand = (status: AdStatus): void => Head.ad?.setAdStatus(status);

const shutdownModelsCommand = (): void => {
    lego.command

        .guard(gameModelGuard)
        .execute(destroyGameModelCommand)

        .guard(ctaModelGuard)
        .execute(destroyCtaModelCommand)

        .guard(soundParamGuard)
        .execute(destroySoundModelCommand)

        .guard(hintModelGuard)
        .execute(destroyHintModelCommand);
};

export const onAdStatusUpdateCommand = (status: AdStatus): void => {
    switch (status) {
        case AdStatus.Game:
            lego.command
                //
                .execute(initializeModelsCommand);

            break;
        case AdStatus.PreCta:
            lego.command
                //
                .execute(unMapCommands)

                .guard(hintModelGuard)
                .execute(destroyHintModelCommand);
            break;
        case AdStatus.Cta:
            lego.command
                //
                .execute(takeToStoreCommand)
                .execute(showCtaCommand);

            break;
        default:
            break;
    }
};

export const setGameStateCommand = (state: GameState): void => Head.gameModel?.setState(state);
export const showCtaCommand = (): void => Head.ad?.cta?.show();

export const onGameOverUpdateCommand = (): void => {
    lego.command.execute(showCtaCommand);
};

export const resizeCommand = (): void => {
    lego.command.execute(restartHintCommand);
};

export const restartHintCommand = (): void => {
    lego.command
        //
        .guard(hintModelGuard, gameWaveStateGuard)
        .execute(hideHintCommand)

        .guard(hintModelGuard, gameWaveStateGuard)
        .execute(stopHintVisibilityTimerCommand)

        .guard(hintModelGuard, gameWaveStateGuard)
        .execute(startHintVisibilityTimerCommand);
};

export const takeToStoreCommand = (): void => {
    // if (!window.installCTA) {
    //     window.CTACallImitation && window.CTACallImitation();
    // } else {
    window.installCTA();
    // }
};
