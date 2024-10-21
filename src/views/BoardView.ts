import { lego } from '@armathai/lego';
import { Container, Rectangle, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { BoardViewEvents } from '../events/MainEvents';
import { GameModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
import { makeSprite } from '../utils';
import { PoorGuy } from './Characters/PoorGuy';

export class BoardView extends Container {
    private bkg: Sprite;
    private poorGuy: PoorGuy;

    constructor() {
        super();

        lego.event.on(GameModelEvents.StateUpdate, this.onStateUpdate, this);

        this.build();

        // drawBounds(this);
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: PIXI.Rectangle | undefined): Rectangle {
        return new Rectangle(0, 0, 700, 500);
    }

    private build(): void {
        this.buildBkg();
        this.buildPoorGuy();
    }

    private buildBkg(): void {
        this.bkg = makeSprite({ texture: Images['game/bkg'] });
        this.bkg.position.set(this.width / 2, this.height / 2);
        this.addChild(this.bkg);
    }

    private buildPoorGuy(): void {
        this.poorGuy = new PoorGuy();
        this.poorGuy.position.set(this.width / 2, this.height / 2);
        this.addChild(this.poorGuy);
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
