import { lego } from '@armathai/lego';
import anime from 'animejs';
import { AnimatedSprite, Container, Rectangle, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { BoardViewEvents } from '../events/MainEvents';
import { GameModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
import { delayRunnable, makeSprite } from '../utils';
import { Bubble } from './Bubble';
import { Girl } from './Characters/Girl';
import { MainGuy } from './Characters/MainGuy';
import { PoorGuy } from './Characters/PoorGuy';
import { House } from './House';

const CAR_SCALE = 1.2;
const CAR_INITIAL_X = -1500;
const CAR_FINAL_X = 32;
const CAR_Y = 335;
export class BoardView extends Container {
    private bkg: Sprite;
    private poorGuy: PoorGuy;
    private mainGuy: MainGuy;
    private car: Sprite;
    private house: House;
    private bubble: Bubble;
    private girl: Girl;

    constructor() {
        super();

        lego.event.on(GameModelEvents.StateUpdate, this.onStateUpdate, this);

        this.build();
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        return new Rectangle(0, 50, 600, 450);
    }

    private build(): void {
        this.buildBkg();
        this.buildHouse();
        this.buildPoorGuy();
        this.buildMainGuy();
        this.buildBubble();
        this.buildGirl();
        this.buildCar();
    }

    private buildBkg(): void {
        this.bkg = makeSprite({ texture: Images['game/bkg'] });
        this.bkg.position.set(this.width / 2, this.height / 2);
        this.addChild(this.bkg);
    }

    private buildCar(): void {
        this.car = makeSprite({ texture: Images['game/car'] });
        this.car.position.set(CAR_INITIAL_X, CAR_Y);
        this.car.alpha = 0;
        this.car.scale.set(CAR_SCALE);
        this.addChild(this.car);
    }

    private buildHouse(): void {
        this.house = new House();
        this.house.position.set(360, 245);
        this.addChild(this.house);
    }

    private buildPoorGuy(): void {
        this.poorGuy = new PoorGuy();
        this.poorGuy.position.set(220, 278);
        this.poorGuy.scale.set(-0.65, 0.65);
        this.addChild(this.poorGuy);
    }

    private buildGirl(): void {
        this.girl = new Girl();
        this.girl.position.set(320, 285);
        this.girl.scale.set(-0.78, 0.78);
        this.girl.alpha = 0;
        this.addChild(this.girl);
    }

    private buildBubble(): void {
        this.bubble = new Bubble();
        this.bubble.position.set(this.poorGuy.x - 30, this.poorGuy.y - 40);
        this.bubble.scale.set(0.8);
        this.addChild(this.bubble);
    }

    private buildMainGuy(): void {
        this.mainGuy = new MainGuy();
        this.mainGuy.position.set(this.poorGuy.x - 5, this.poorGuy.y + 15);
        this.mainGuy.alpha = 0;
        this.mainGuy.scale.set(-0.635, 0.635);
        this.addChild(this.mainGuy);
    }

    private onStateUpdate(newState: GameState, oldState: GameState): void {
        switch (newState) {
            case GameState.PreActions:
                this.preActions();
                break;
            case GameState.Wave1Actions:
                delayRunnable(0.3, () => this.wave1Actions());
                break;
            case GameState.Wave2Actions:
                delayRunnable(0.3, () => this.wave2Actions());
                break;
            case GameState.Wave3Actions:
                delayRunnable(0.3, () => this.wave3Actions());
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
        this.playDudeUpgradeVFX(this.mainGuy.x, this.mainGuy.y);
        anime({
            targets: this.poorGuy,
            alpha: 0,
            duration: 300,
            easing: 'easeInOutSine',
            complete: () => {
                this.poorGuy.destroy();
            },
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
        lego.event.emit(BoardViewEvents.CarAnimationStart);
        anime({
            targets: this.car,
            alpha: 1,
            duration: 200,
            easing: 'linear',
        });
        anime({
            targets: this.car,
            x: CAR_FINAL_X,
            duration: 900,
            easing: 'easeOutElastic(1, 1.2)',
            complete: () => {
                lego.event.emit(BoardViewEvents.CarAnimationComplete);
                delayRunnable(1, () => lego.event.emit(BoardViewEvents.Wave2ActionsComplete));
            },
        });
    }

    private wave3Actions(): void {
        this.mainGuy.happy();
        this.house.show();
        anime({
            targets: this.girl,
            alpha: 1,
            duration: 200,
            easing: 'easeInOutSine',
            complete: () => lego.event.emit(BoardViewEvents.GirlAnimationComplete),
        });
        this.playDudeUpgradeVFX(this.girl.x, this.girl.y);
        lego.event.emit(BoardViewEvents.HouseAnimationStart);
        anime({
            targets: this.mainGuy.scale,
            x: 0.635,
            easing: 'easeInOutSine',
            duration: 200,
        });
    }

    private playDudeUpgradeVFX(x: number, y: number): void {
        const frames: any[] = [];
        for (let i = 0; i <= 15; i++) {
            frames.push(Images[`upgrade_vfx/Fx05_${i < 10 ? '0' + i : i}`]);
        }

        const anim = AnimatedSprite.fromFrames(frames);
        anim.position.set(x, y);
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
