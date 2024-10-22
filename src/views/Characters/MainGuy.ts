import anime from 'animejs';
import { Container } from 'pixi.js';
import { MainBody } from './MainBody';

export class MainGuy extends Container {
    private body: MainBody;
    private isIdle = false;

    constructor() {
        super();

        this.build();
    }

    public idle(): void {
        if (this.isIdle) return;
        this.isIdle = true;
        this.body.idle();
        this.breathe();
    }

    public happy(): void {
        if (!this.isIdle) return;
        this.isIdle = false;
        this.body.happy();
        this.breathe();
    }

    private build(): void {
        this.body = new MainBody();
        this.addChild(this.body);
    }

    private breathe(): void {
        this.body.scale.y = 1;
        anime({
            targets: this.body.scale,
            y: 1.01,
            duration: 2000,
            direction: 'alternate',
            easing: 'easeInOutSine',
            loop: true,
            update: () => {
                this.body.position.y = -((this.body.scale.y - 1) / 2) * this.body.height;
            },
        });
    }
}
