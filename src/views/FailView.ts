import { lego } from '@armathai/lego';
import anime from 'animejs';
import { Container, Rectangle, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { TakeMe } from '../events/MainEvents';
import { makeSprite } from '../utils';

export class FailView extends Container {
    private fail: Sprite;
    private tryAgain: Sprite;
    private canEmit: boolean = false;

    constructor() {
        super();
        this.build();
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: PIXI.Rectangle | undefined): Rectangle {
        return new Rectangle(0, 0, 800, 800);
    }

    public show(): void {
        this.showFail();
    }

    private showFail(): void {
        anime({
            targets: this.fail.scale,
            x: 0.8,
            y: 0.8,
            duration: 300,
            easing: 'easeInOutSine',
            complete: () => this.showTryAgain(),
        });
    }

    private showTryAgain(): void {
        anime({
            targets: this.tryAgain.scale,
            x: 1.3,
            y: 1.3,
            duration: 300,
            easing: 'easeInOutSine',
            complete: () => this.pulseTryAgain(),
        });
    }

    private pulseTryAgain(): void {
        this.canEmit = true;
        anime({
            targets: this.tryAgain.scale,
            x: 1.45,
            y: 1.45,
            duration: 200,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine',
        });
    }

    private build(): void {
        this.buildTryAgain();
        this.buildFail();
    }

    private buildFail(): void {
        this.fail = makeSprite({ texture: Images['game/fail'] });
        this.fail.position.set(this.width / 2, this.fail.height / 2);
        this.fail.scale.set(0);
        this.addChild(this.fail);
    }

    private buildTryAgain(): void {
        this.tryAgain = makeSprite({ texture: Images['game/try_again'] });
        this.tryAgain.position.set(this.width / 2, this.height - this.tryAgain.height / 2 - 100);
        this.tryAgain.scale.set(0);
        this.tryAgain.interactive = true;
        this.tryAgain.on('pointerdown', () => {
            if (this.canEmit) {
                lego.event.emit(TakeMe.ToStore);
            }
        });
        this.addChild(this.tryAgain);
    }
}
