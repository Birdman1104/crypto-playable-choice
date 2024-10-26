import anime from 'animejs';
import { Container, Sprite } from 'pixi.js';
import { Images } from '../../assets';
import { makeSprite } from '../../utils';
import { MainHead } from './MainHead';

export class MainBody extends Container {
    private torso: Sprite;
    private leftArm: Sprite;
    private rightArm: Sprite;
    private legs: Sprite;
    private head: MainHead;

    constructor() {
        super();
        this.build();
    }

    public happy(): void {
        this.removeAnimations();

        this.head.happy();

        anime({
            targets: this.rightArm,
            angle: [0, -12],
            duration: 800,
            direction: 'alternate',
            easing: 'easeInOutSine',
            loop: true,
        });
    }

    public idle(): void {
        this.removeAnimations();

        this.head.idle();

        anime({
            targets: this.rightArm,
            angle: [0, -5],
            duration: 1000,
            direction: 'alternate',
            easing: 'easeInOutSine',
            loop: true,
        });

        anime({
            targets: this.leftArm,
            angle: [-2, 2],
            duration: 2000,
            direction: 'alternate',
            easing: 'easeInOutSine',
            loop: true,
        });

        anime({
            targets: this.torso.scale,
            x: 1.05,
            duration: 2000,
            direction: 'alternate',
            easing: 'easeInOutSine',
            loop: true,
        });

        anime({
            targets: this.torso,
            angle: 1,
            duration: 1000,
            direction: 'alternate',
            easing: 'easeInOutSine',
            loop: true,
        });
    }

    private build(): void {
        this.head = new MainHead();
        this.head.x = 2;
        this.addChild(this.head);

        this.torso = makeSprite({ texture: Images['main_guy/torso'] });
        this.addChild(this.torso);

        this.leftArm = makeSprite({ texture: Images['main_guy/left_arm'] });
        this.leftArm.anchor.set(0.6, 0.28);
        this.leftArm.position.set(this.leftArm.width * 0.1, -this.leftArm.height * 0.22);
        this.addChild(this.leftArm);

        this.legs = makeSprite({ texture: Images['main_guy/legs'] });
        this.addChild(this.legs);

        this.addChild(this.torso);

        this.rightArm = makeSprite({ texture: Images['main_guy/right_arm'] });
        this.rightArm.anchor.set(0.3, 0.21);
        this.rightArm.position.set(-this.rightArm.width * 0.2, -this.rightArm.height * 0.29);
        this.addChild(this.rightArm);
    }

    private removeAnimations(): void {
        [
            this,
            this.torso,
            this.rightArm,
            this.leftArm,
            this.legs,
            this.scale,
            this.torso.scale,
            this.rightArm.scale,
            this.leftArm.scale,
            this.legs.scale,
        ].forEach((c) => anime.remove(c));
    }
}
