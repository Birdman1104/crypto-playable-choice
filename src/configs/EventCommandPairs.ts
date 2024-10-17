import { lego } from '@armathai/lego';
import { MainGameEvents, TakeMe } from '../events/MainEvents';
import { AdModelEvents, BoardModelEvents, GameModelEvents } from '../events/ModelEvents';
import {
    onAdStatusUpdateCommand,
    onGameOverUpdateCommand,
    onGameStateUpdateCommand,
    onMainViewReadyCommand,
    resizeCommand,
    takeToStoreCommand
} from './Commands';

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
]);
