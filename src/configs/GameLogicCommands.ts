import { lego } from '@armathai/lego';
import { GameState } from '../models/GameModel';
import Head from '../models/HeadModel';
import { setGameStateCommand, showCtaCommand, takeToStoreCommand } from './Commands';
import { isRightChoiceGuard, isWrongChoiceGuard } from './GameLogicGuards';
import { reachedFinalWaveGuard } from './Guards';

export const onChoiceClickCommand = (name: string): void => {
    lego.command
        .guard(reachedFinalWaveGuard)
        .execute(takeToStoreCommand)

        .guard(lego.not(reachedFinalWaveGuard))
        .payload(name)
        .execute(setChoiceToClickedCommand);
};

export const onChoiceClickAnimationCommand = (name: string): void => {
    lego.command
        .payload(name)
        .guard(isRightChoiceGuard)
        .execute(onRightChoiceCommand)

        .payload(name)
        .guard(isWrongChoiceGuard)
        .execute(onWrongChoiceCommand);
};

const setChoiceToClickedCommand = (name: string): void => {
    const choice = Head.gameModel?.board?.getAnswerByName(name);
    if (!choice) return;

    choice.isClicked = true;
};

const onRightChoiceCommand = () => {
    const currentState = Head.gameModel?.state;
    const currentWaveNumber = Head.gameModel?.board?.currentLevelNumber;
    if (currentState === null || currentState === undefined) return;
    if (currentWaveNumber === null || currentWaveNumber === undefined) return;

    let nextState = GameState.Fail;

    lego.command.execute(updateBalanceCommand);

    switch (currentState) {
        case GameState.Wave1:
            nextState = GameState.Wave1Actions;
            break;
        case GameState.Wave2:
            nextState = GameState.Wave2Actions;
            break;
        case GameState.Wave3:
            nextState = GameState.Wave3Actions;
            break;
        case GameState.Wave4:
            nextState = GameState.Wave4Actions;
            break;

        default:
            break;
    }

    lego.command.payload(nextState).execute(setGameStateCommand);
};

const onWrongChoiceCommand = () => {
    lego.command.payload(GameState.Fail).execute(setGameStateCommand);
};

export const onPreActionsCompleteCommand = (): void => {
    lego.command.payload(GameState.Wave1).execute(setGameStateCommand);
};

export const onWave1ActionsCompleteCommand = (): void => {
    lego.command.payload(GameState.Wave2).execute(setGameStateCommand);
};
export const onWave2ActionsCompleteCommand = (): void => {
    lego.command.payload(GameState.Wave3).execute(setGameStateCommand);
};
export const onWave3ActionsCompleteCommand = (): void => {
    lego.command.payload(GameState.Wave4).execute(setGameStateCommand);
};
export const onWave4ActionsCompleteCommand = (): void => {
    // lego.command.payload(GameState.Wave4).execute(setGameStateCommand);
};

const startNextWaveCommand = (): void => {
    Head.gameModel?.board?.startNextWave();
};

const updateBalanceCommand = (): void => {
    const currentWave = Head.gameModel?.board?.currentWave;
    if (!currentWave) return;
    const rightChoice = currentWave.rightAnswer;
    Head.gameModel?.board?.updateBalance(rightChoice.reward);
};

export const onGameStateUpdateCommand = (state: GameState): void => {
    switch (state) {
        case GameState.Wave1:
        case GameState.Wave2:
        case GameState.Wave3:
        case GameState.Wave4:
            lego.command.execute(startNextWaveCommand);
            break;
        case GameState.Fail:
            lego.command.execute(showCtaCommand);
            break;
        default:
            break;
    }
};
