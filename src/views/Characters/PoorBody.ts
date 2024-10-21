import anime from 'animejs';
import { Container, Sprite } from 'pixi.js';
import { Images } from '../../assets';
import { makeSprite } from '../../utils';
import { PoorHead } from './PoorHead';

export class PoorBody extends Container {
    private torso: Sprite;
    private leftArm: Sprite;
    private rightArm: Sprite;
    private leftLeg: Sprite;
    private rightLeg: Sprite;
    private head: PoorHead;

    constructor() {
        super();
        this.build();
    }

    public happy(): void {
        this.removeAnimations();

        this.head.happy();

        anime({
            targets: this.leftArm,
            angle: [0, -15],
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
            targets: this.leftArm,
            angle: [0, -5],
            duration: 1000,
            direction: 'alternate',
            easing: 'easeInOutSine',
            loop: true,
        });

        anime({
            targets: this.rightArm,
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
        this.head = new PoorHead();
        this.addChild(this.head);

        this.torso = makeSprite({ texture: Images['poor/body'] });
        this.addChild(this.torso);

        this.rightArm = makeSprite({ texture: Images['poor/l_arm'] });
        this.rightArm.anchor.set(0.6, 0.28);
        this.rightArm.position.set(this.rightArm.width * 0.1, -this.rightArm.height * 0.22);
        this.addChild(this.rightArm);

        this.leftLeg = makeSprite({ texture: Images['poor/l_leg'] });
        this.addChild(this.leftLeg);

        this.rightLeg = makeSprite({ texture: Images['poor/r_leg'] });
        this.addChild(this.rightLeg);

        this.addChild(this.torso);

        this.leftArm = makeSprite({ texture: Images['poor/l_arm_phone'] });
        this.leftArm.anchor.set(0.38, 0.3);
        this.leftArm.position.set(-this.leftArm.width * 0.12, -this.leftArm.height * 0.2);
        this.addChild(this.leftArm);
    }

    private removeAnimations(): void {
        [
            this,
            this.torso,
            this.rightArm,
            this.leftArm,
            this.rightLeg,
            this.leftLeg,
            this.scale,
            this.torso.scale,
            this.rightArm.scale,
            this.leftArm.scale,
            this.rightLeg.scale,
            this.leftLeg.scale,
        ].forEach((c) => anime.remove(c));
    }
}
