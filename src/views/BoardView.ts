import { lego } from '@armathai/lego';
import anime from 'animejs';
import { Container, Rectangle, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { BoardViewEvents } from '../events/MainEvents';
import { GameModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
import { delayRunnable, makeSprite } from '../utils';
import { Bubble } from './Bubble';
import { MainGuy } from './Characters/MainGuy';
import { PoorGuy } from './Characters/PoorGuy';
import { House } from './House';

export class BoardView extends Container {
    private bkg: Sprite;
    private poorGuy: PoorGuy;
    private mainGuy: MainGuy;
    private car: Sprite;
    private house: House;
    private bubble: Bubble;

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
        this.buildHouse();
        // this.buildMainGuy();
        this.buildPoorGuy();
        this.buildBubble();
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

    private buildHouse(): void {
        this.house = new House();
        this.house.position.set(420, 266);
        this.addChild(this.house);
    }

    private buildPoorGuy(): void {
        this.poorGuy = new PoorGuy();
        this.poorGuy.position.set(150, 375);
        this.poorGuy.scale.set(0.4);
        this.addChild(this.poorGuy);
    }

    private buildBubble(): void {
        this.bubble = new Bubble();
        this.bubble.position.set(this.poorGuy.x + 25, this.poorGuy.y - 90);
        this.bubble.scale.set(0.8);
        delayRunnable(3, () => this.bubble.show());
        // this.bubble.show();
        this.addChild(this.bubble);
    }

    private buildMainGuy(): void {
        this.mainGuy = new MainGuy();
        this.mainGuy.position.set(150, 375);
        this.addChild(this.mainGuy);
    }

    private onStateUpdate(newState: GameState, oldState: GameState): void {
        console.warn('new game state is ', newState);

        switch (newState) {
            case GameState.PreActions:
                this.preActions();
                // setTimeout(() => {
                //     lego.event.emit(BoardViewEvents.PreActionsComplete);
                // }, 500);
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
                this.showHouse();
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

    private preActions(): void {
        //
    }

    private showHouse(): void {
        this.house.show();
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
