import { lego } from '@armathai/lego';
import anime from 'animejs';
import { Container, Rectangle, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { BoardViewEvents } from '../events/MainEvents';
import { GameModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
import { delayRunnable, makeSprite } from '../utils';
import { MainGuy } from './Characters/MainGuy';
import { PoorGuy } from './Characters/PoorGuy';

export class BoardView extends Container {
    private bkg: Sprite;
    private poorGuy: PoorGuy;
    private mainGuy: MainGuy;
    private car: Sprite;

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
        this.buildCar();
        // delayRunnable(2, () => this.showCar());
        // this.buildMainGuy();
        // this.buildPoorGuy();
    }

    private buildBkg(): void {
        this.bkg = makeSprite({ texture: Images['game/bkg'] });
        this.bkg.position.set(this.width / 2, this.height / 2);
        this.addChild(this.bkg);
    }

    private buildCar(): void {
        this.car = makeSprite({ texture: Images['game/car'] });
        this.car.position.set(-1500, 420);
        this.car.alpha = 0;
        this.addChild(this.car);
    }

    private buildPoorGuy(): void {
        this.poorGuy = new PoorGuy();
        this.poorGuy.position.set(this.width / 2, this.height / 2);
        this.addChild(this.poorGuy);
    }

    private buildMainGuy(): void {
        this.mainGuy = new MainGuy();
        this.mainGuy.position.set(this.width / 2, this.height / 2);
        this.addChild(this.mainGuy);
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
                this.showCar();

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

    private showCar(): void {
        anime({
            targets: this.car,
            alpha: 1,
            duration: 200,
            easing: 'linear',
        });
        anime({
            targets: this.car,
            x: 100,
            duration: 900,
            easing: 'easeOutElastic(1, 1.2)',
            complete: () => {
                delayRunnable(500, () => lego.event.emit(BoardViewEvents.Wave2ActionsComplete));
            },
        });
        anime({
            targets: this.car.scale,
            x: 1.1,
            direction: 'alternate',
            duration: 300,
            easing: 'easeOutBack',
        });
    }
}
