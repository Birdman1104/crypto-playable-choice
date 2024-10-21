import anime from 'animejs';
import { Container, Sprite } from 'pixi.js';
import { Images } from '../../assets';
import { makeSprite } from '../../utils';

export class PoorHead extends Container {
    private head: Sprite;
    private happyEyes: Sprite;
    private downEyes: Sprite;
    private closedEyes: Sprite;
    private lips: Sprite;
    private mouth: Sprite;

    constructor() {
        super();
        this.build();
    }

    public update(): void {
        //
    }

    public idle(): void {
        this.removeAnimations();

        [this.downEyes, this.lips, this.head, this.closedEyes].forEach((c) => (c.alpha = 1));
        [this.happyEyes, this.mouth].forEach((c) => (c.alpha = 0));

        anime({
            targets: this.downEyes,
            alpha: 0,
            duration: 300,
            delay: 1000,
            direction: 'alternate',
            easing: 'easeInOutSine',
            loop: true,
        });

        anime({
            targets: this,
            angle: [-1, 0.5],
            duration: 1000,
            direction: 'alternate',
            easing: 'easeInOutSine',
            loop: true,
        });
    }

    public happy(): void {
        this.removeAnimations();

        [this.happyEyes, this.mouth].forEach((c) => (c.alpha = 1));
        [this.downEyes, this.lips, this.closedEyes].forEach((c) => (c.alpha = 0));

        anime({
            targets: this,
            angle: [-1, 0.5],
            duration: 1000,
            direction: 'alternate',
            easing: 'easeInOutSine',
            loop: true,
        });

        anime({
            targets: this.happyEyes,
            alpha: 0,
            duration: 300,
            delay: 1000,
            direction: 'alternate',
            easing: 'easeInOutSine',
            loop: true,
        });

        anime({
            targets: this.closedEyes,
            alpha: 1,
            duration: 300,
            delay: 1000,
            direction: 'alternate',
            easing: 'easeInOutSine',
            loop: true,
        });
    }

    private build(): void {
        this.head = makeSprite({ texture: Images['poor/head'] });
        this.head.anchor.set(0.5, 0.15);
        this.head.position.set(0, -this.head.height * 0.35);
        this.addChild(this.head);

        this.closedEyes = makeSprite({ texture: Images['poor/close_eyes'] });
        this.addChild(this.closedEyes);

        this.happyEyes = makeSprite({ texture: Images['poor/eyes_happy'] });
        this.addChild(this.happyEyes);

        this.downEyes = makeSprite({ texture: Images['poor/eyes_look_down'] });
        this.addChild(this.downEyes);

        this.lips = makeSprite({ texture: Images['poor/lips'] });
        this.addChild(this.lips);

        this.mouth = makeSprite({ texture: Images['poor/mouth'] });
        this.addChild(this.mouth);
    }

    private removeAnimations(): void {
        [this, this.head, this.downEyes, this.happyEyes, this.lips, this.mouth, this.closedEyes].forEach((c) =>
            anime.remove(c),
        );

        this.angle = 0;
    }
}
