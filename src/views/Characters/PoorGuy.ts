import anime from 'animejs';
import { Container, Sprite } from 'pixi.js';
import { Images } from '../../assets';
import { makeSprite } from '../../utils';

class PoorHead extends Container {
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

    private build(): void {
        this.head = makeSprite({ texture: Images['poor/head'] });
        this.head.anchor.set(0.5, 0.25);
        this.head.position.set(0, -this.head.height / 4);
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

    public idle(): void {
        [this.downEyes, this.lips, this.head, this.closedEyes].forEach((c) => (c.alpha = 1));
        [this.happyEyes, this.mouth].forEach((c) => (c.alpha = 0));

        anime({
            targets: this.downEyes,
            alpha: 0,
            duration: 500,
            delay: 1000,
            direction: 'alternate',
            easing: 'easeInOutSine',
            loop: true,
        });

        anime({
            targets: this,
            angle: 2,
            duration: 1000,
            direction: 'alternate',
            easing: 'easeInOutSine',
            loop: true,
        });
    }
}

export class PoorGuy extends Container {
    private head: PoorHead;
    constructor() {
        super();
        this.build();
    }

    public update(dt: number): void {
        //
    }

    private build(): void {
        this.head = new PoorHead();
        this.addChild(this.head);
        this.head.idle();
    }
}
