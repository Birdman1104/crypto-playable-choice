import anime from 'animejs';
import { Container, Sprite } from 'pixi.js';
import { Images } from '../../assets';
import { makeSprite } from '../../utils';

export class MainHead extends Container {
    private head: Sprite;

    private happyEyes: Sprite;
    private downEyes: Sprite;
    private closedEyes: Sprite;

    private lips: Sprite;
    private mouth: Sprite;

    private brows: Sprite;
    private browsHappy: Sprite;

    constructor() {
        super();
        this.build();
    }

    public idle(): void {
        this.removeAnimations();
        this.hideAll();

        [this.closedEyes, this.downEyes, this.lips, this.brows].forEach((c) => (c.alpha = 1));

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
            angle: [-0.3, 0.7],
            duration: 1000,
            direction: 'alternate',
            easing: 'easeInOutSine',
            loop: true,
        });
    }

    public happy(): void {
        this.removeAnimations();

        this.hideAll();

        [this.happyEyes, this.mouth, this.browsHappy].forEach((c) => (c.alpha = 1));

        anime({
            targets: this,
            angle: [-0.7, 0.3],
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
        this.head = makeSprite({ texture: Images['main_guy/head'] });
        this.head.anchor.set(0.5, 0.15);
        this.head.position.set(0, -this.head.height * 0.35);
        this.addChild(this.head);

        this.closedEyes = makeSprite({ texture: Images['main_guy/eyes_closed'] });
        this.addChild(this.closedEyes);

        this.happyEyes = makeSprite({ texture: Images['main_guy/eyes_happy'] });
        this.addChild(this.happyEyes);

        this.downEyes = makeSprite({ texture: Images['main_guy/eyes_down'] });
        this.addChild(this.downEyes);

        this.lips = makeSprite({ texture: Images['main_guy/lips'] });
        this.addChild(this.lips);

        this.mouth = makeSprite({ texture: Images['main_guy/mouth'] });
        this.addChild(this.mouth);

        this.brows = makeSprite({ texture: Images['main_guy/brows'] });
        this.addChild(this.brows);

        this.browsHappy = makeSprite({ texture: Images['main_guy/brows_happy'] });
        this.addChild(this.browsHappy);
    }

    private removeAnimations(): void {
        [
            this,
            this.head,
            this.closedEyes,
            this.happyEyes,
            this.downEyes,
            this.lips,
            this.mouth,
            this.brows,
            this.browsHappy,
        ].forEach((c) => anime.remove(c));

        this.angle = 0;
    }

    private hideAll(): void {
        [this.closedEyes, this.happyEyes, this.downEyes, this.lips, this.mouth, this.brows, this.browsHappy].forEach(
            (c) => (c.alpha = 0),
        );
    }
}
