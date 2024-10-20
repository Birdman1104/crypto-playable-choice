import { lego } from '@armathai/lego';
import { BoardViewEvents, MainGameEvents, PhoneViewEvents, TakeMe } from '../events/MainEvents';
import { AdModelEvents, BoardModelEvents, GameModelEvents } from '../events/ModelEvents';
import {
    onAdStatusUpdateCommand,
    onGameOverUpdateCommand,
    onMainViewReadyCommand,
    resizeCommand,
    takeToStoreCommand,
} from './Commands';
import {
    onChoiceClickCommand,
    onGameStateUpdateCommand,
    onPreActionsCompleteCommand,
    onWave1ActionsCompleteCommand,
    onWave2ActionsCompleteCommand,
    onWave3ActionsCompleteCommand,
    onWave4ActionsCompleteCommand,
} from './GameLogicCommands';

export const mapCommands = () => {
    eventCommandPairs.forEach(({ event, command }) => {
        lego.event.on(event, command);
    });
};

export const unMapCommands = () => {
    eventCommandPairs.forEach(({ event, command }) => {
        lego.event.off(event, command);
    });
};

const eventCommandPairs = Object.freeze([
    {
        event: MainGameEvents.MainViewReady,
        command: onMainViewReadyCommand,
    },
    {
        event: AdModelEvents.StatusUpdate,
        command: onAdStatusUpdateCommand,
    },
    {
        event: GameModelEvents.StateUpdate,
        command: onGameStateUpdateCommand,
    },
    {
        event: MainGameEvents.Resize,
        command: resizeCommand,
    },
    {
        event: BoardModelEvents.GameOverUpdate,
        command: onGameOverUpdateCommand,
    },
    {
        event: TakeMe.ToStore,
        command: takeToStoreCommand,
    },
    {
        event: BoardViewEvents.PreActionsComplete,
        command: onPreActionsCompleteCommand,
    },
    {
        event: BoardViewEvents.Wave1ActionsComplete,
        command: onWave1ActionsCompleteCommand,
    },
    {
        event: BoardViewEvents.Wave2ActionsComplete,
        command: onWave2ActionsCompleteCommand,
    },
    {
        event: BoardViewEvents.Wave3ActionsComplete,
        command: onWave3ActionsCompleteCommand,
    },
    {
        event: BoardViewEvents.Wave4ActionsComplete,
        command: onWave4ActionsCompleteCommand,
    },
    {
        event: PhoneViewEvents.ChoiceClick,
        command: onChoiceClickCommand,
    },
]);
