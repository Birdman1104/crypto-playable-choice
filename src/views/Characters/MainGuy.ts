import anime from 'animejs';
import { Container } from 'pixi.js';
import { delayRunnable } from '../../utils';
import { MainBody } from './MainBody';

export class MainGuy extends Container {
    private body: MainBody;
    constructor() {
        super();

        this.build();
    }

    public idle(): void {
        this.removeAnimations();
        this.body.idle();
        this.breathe();
    }

    public happy(): void {
        this.removeAnimations();
        this.body.happy();
        this.breathe();
    }

    private build(): void {
        this.body = new MainBody();
        this.addChild(this.body);

        this.idle();
        delayRunnable(4, () => this.happy());
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
