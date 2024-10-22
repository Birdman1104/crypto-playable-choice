import { lego } from '@armathai/lego';
import anime from 'animejs';
import { Container, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { BoardViewEvents } from '../events/MainEvents';
import { callIfExists, delayRunnable, makeSprite } from '../utils';

export class Bubble extends Container {
    private bubble: Sprite;
    private text: Sprite;

    constructor() {
        super();

        this.build();
    }

    public show(): void {
        anime({
            targets: this.bubble.scale,
            x: 1,
            y: 1,
            duration: 300,
            easing: 'easeInOutSine',
            complete: () => {
                anime({
                    targets: this.text.scale,
                    x: 1,
                    y: 1,
                    duration: 300,
                    easing: 'easeInOutSine',
                    complete: () => {
                        delayRunnable(3, () => {
                            const cb = () => {
                                lego.event.emit(BoardViewEvents.PreActionsComplete);
                            };
                            this.hide(cb);
                        });
                    },
                });
            },
        });
    }

    public hide(cb?): void {
        anime({
            targets: this.text.scale,
            x: 0,
            y: 0,
            duration: 300,
            easing: 'easeInOutSine',
        });

        anime({
            targets: this.bubble.scale,
            x: 0,
            y: 0,
            delay: 200,
            easing: 'easeInOutSine',
            duration: 300,
            complete: () => {
                callIfExists(cb);
            },
        });
    }

    private build(): void {
        this.buildBubble();
        this.buildText();
    }

    private buildBubble(): void {
        this.bubble = makeSprite({ texture: Images['game/bubble'] });
        this.bubble.anchor.set(0, 1);
        this.bubble.scale.set(0);
        this.addChild(this.bubble);
    }

    private buildText(): void {
        this.text = makeSprite({ texture: Images['game/bubble_text'] });
        this.text.anchor.set(0.5);
        this.text.position.set(220, -90);
        this.text.scale.set(0);
        this.addChild(this.text);
    }
}
