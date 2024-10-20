import { lego } from '@armathai/lego';
import { Container } from 'pixi.js';
import { BoardViewEvents } from '../events/MainEvents';
import { GameModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';

export class BoardView extends Container {
    constructor() {
        super();

        lego.event.on(GameModelEvents.StateUpdate, this.onStateUpdate, this);
        this.build();
    }

    private build(): void {
        //
    }

    private onStateUpdate(newState: GameState, oldState: GameState): void {
        console.warn('new game state is ', newState);

        switch (newState) {
            case GameState.PreActions:
                setTimeout(() => {
                    lego.event.emit(BoardViewEvents.PreActionsComplete);
                }, 500);
                break;
            case GameState.Wave1Actions:
                setTimeout(() => {
                    lego.event.emit(BoardViewEvents.Wave1ActionsComplete);
                }, 500);
                break;
            case GameState.Wave2Actions:
                setTimeout(() => {
                    lego.event.emit(BoardViewEvents.Wave2ActionsComplete);
                }, 500);
                break;
            case GameState.Wave3Actions:
                setTimeout(() => {
                    lego.event.emit(BoardViewEvents.Wave3ActionsComplete);
                }, 500);
                break;
            case GameState.Wave4Actions:
                setTimeout(() => {
                    lego.event.emit(BoardViewEvents.Wave4ActionsComplete);
                }, 500);
                break;

            default:
                break;
        }
    }
}
