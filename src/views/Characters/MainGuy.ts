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
    }

    public happy(): void {
        if (!this.isIdle) return;
        this.isIdle = false;
        this.body.happy();
    }

    private build(): void {
        this.body = new MainBody();
        this.addChild(this.body);

        this.idle();
        this.breathe();
    }

    private breathe(): void {
        anime({
            targets: this.body.scale,
            y: 1.015,
            duration: 2000,
            direction: 'alternate',
            easing: 'easeInOutSine',
            loop: true,
            update: () => {
                this.body.position.y = -((this.body.scale.y - 1) / 2) * this.body.height;
            },
        });
    }

    private removeAnimations(): void {
        anime.remove(this.body.scale);
        this.body.scale.set(1);
        this.body.position.y = 0;
    }
}
