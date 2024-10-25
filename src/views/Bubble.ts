import { lego } from '@armathai/lego';
import anime from 'animejs';
import { Container, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { BoardViewEvents } from '../events/MainEvents';
import { callIfExists, delayRunnable, makeSprite } from '../utils';

export class Bubble extends Container {
    private bubble: Sprite;

    constructor() {
        super();

        this.build();
    }

    public show(): void {
        anime({
            targets: this.scale,
            x: 0.8,
            y: 0.8,
            duration: 200,
            easing: 'easeInOutSine',
            complete: () => {
                delayRunnable(1.5, () => {
                    const cb = () => {
                        lego.event.emit(BoardViewEvents.PreActionsComplete);
                    };
                    this.hide(cb);
                });
            },
        });
    }

    public hide(cb?): void {
        anime({
            targets: this.scale,
            x: 0,
            y: 0,
            easing: 'easeInOutSine',
            duration: 200,
            complete: () => {
                callIfExists(cb);
            },
        });
    }

    private build(): void {
        this.buildBubble();
        this.scale.set(0);
    }

    private buildBubble(): void {
        this.bubble = makeSprite({ texture: Images['game/bubble'] });
        this.bubble.anchor.set(0, 1);
        this.addChild(this.bubble);
    }
}
