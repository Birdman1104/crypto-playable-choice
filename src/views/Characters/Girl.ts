import anime from 'animejs';
import { Container, Sprite } from 'pixi.js';
import { Images } from '../../assets';
import { makeSprite } from '../../utils';

export class Girl extends Container {
    private frame1: Sprite;
    private frame2: Sprite;

    constructor() {
        super();

        this.build();
    }

    private build(): void {
        this.frame1 = makeSprite({ texture: Images['game/girl_1'] });
        this.frame2 = makeSprite({ texture: Images['game/girl_2'] });
        this.addChild(this.frame1, this.frame2);

        this.idle();
    }

    private idle(): void {
        anime({
            targets: this.frame2,
            alpha: 0,
            duration: 500,
            delay: 100,
            direction: 'alternate',
            easing: 'linear',
            loop: true,
        });
    }
}
