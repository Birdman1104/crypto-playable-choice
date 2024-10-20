import { lego } from '@armathai/lego';
import { GameState } from '../models/GameModel';
import Head from '../models/HeadModel';
import { setGameStateCommand } from './Commands';
import { isRightChoiceGuard } from './GameLogicGuards';

export const onChoiceClickCommand = (name: string): void => {
    lego.command.payload(name).execute(setChoiceToClickedCommand);
    lego.command.payload(name).guard(isRightChoiceGuard).execute(onRightChoiceCommand);
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

export const onGameStateUpdateCommand = (state: GameState): void => {
    switch (state) {
        case GameState.Wave1:
        case GameState.Wave2:
        case GameState.Wave3:
        case GameState.Wave4:
            lego.command.execute(startNextWaveCommand);
            break;

        default:
            break;
    }
};
