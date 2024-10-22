import { lego } from '@armathai/lego';
import anime from 'animejs';
import { AnimatedSprite, Container, Rectangle, Sprite } from 'pixi.js';
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
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: PIXI.Rectangle | undefined): Rectangle {
        return new Rectangle(0, 0, 700, 500);
    }

    private build(): void {
        this.buildBkg();
        this.buildHouse();
        this.buildCar();
        this.buildPoorGuy();
        this.buildMainGuy();
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
        this.poorGuy.position.set(150, 400);
        this.poorGuy.scale.set(0.4);
        this.addChild(this.poorGuy);
    }

    private buildBubble(): void {
        this.bubble = new Bubble();
        this.bubble.position.set(this.poorGuy.x + 25, this.poorGuy.y - 90);
        this.bubble.scale.set(0.8);
        this.addChild(this.bubble);
    }

    private buildMainGuy(): void {
        this.mainGuy = new MainGuy();
        this.mainGuy.position.set(this.poorGuy.x + 5, this.poorGuy.y + 10);
        this.mainGuy.alpha = 0;
        this.mainGuy.scale.set(0.385);
        this.addChild(this.mainGuy);
    }

    private onStateUpdate(newState: GameState, oldState: GameState): void {
        switch (newState) {
            case GameState.PreActions:
                this.preActions();
                break;
            case GameState.Wave1Actions:
                this.wave1Actions();
                break;
            case GameState.Wave2Actions:
                this.wave2Actions();
                break;
            case GameState.Wave3Actions:
                this.wave3Actions();
                break;
            case GameState.Wave4Actions:
                //
                break;
            case GameState.Wave1:
            case GameState.Wave2:
            case GameState.Wave3:
            case GameState.Fail:
                this.poorGuy?.idle();
                this.mainGuy?.idle();
                break;

            default:
                break;
        }
    }

    private preActions(): void {
        this.bubble.show();
    }

    private wave1Actions(): void {
        this.poorGuy.happy();
        this.mainGuy.happy();
        this.playDudeUpgradeVFX();
        anime({
            targets: this.poorGuy,
            alpha: 0,
            duration: 300,
            easing: 'easeInOutSine',
        });
        anime({
            targets: this.mainGuy,
            alpha: 1,
            duration: 300,
            easing: 'easeInOutSine',
            complete: () => {
                delayRunnable(1, () => lego.event.emit(BoardViewEvents.Wave1ActionsComplete));
            },
        });
    }

    private wave2Actions(): void {
        this.mainGuy.happy();
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
                delayRunnable(1, () => lego.event.emit(BoardViewEvents.Wave2ActionsComplete));
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

    private wave3Actions(): void {
        this.mainGuy.happy();
        this.house.show();
    }

    private playDudeUpgradeVFX(): void {
        const frames: any[] = [];
        for (let i = 0; i <= 19; i++) {
            frames.push(Images[`upgrade_vfx/Fx05_${i < 10 ? '0' + i : i}`]);
        }

        const anim = AnimatedSprite.fromFrames(frames);
        anim.position.copyFrom(this.mainGuy.position);
        anim.anchor.set(0.5);
        anim.animationSpeed = 0.45;
        anim.scale.set(1.2);
        anim.loop = false;

        anim.play();
        anim.onComplete = () => {
            anim.destroy();
        };
        this.addChild(anim);
    }
}
