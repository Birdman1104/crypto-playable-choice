import anime from 'animejs';
import { Container, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { makeSprite } from '../utils';

export class ChoiceView extends Container {
    private choice: Sprite;
    private clickedChoice: Sprite;
    private canEmit = true;
    private canAnimate = true;

    constructor(private config: ChoiceConfig) {
        super();

        this.build();
    }

    public disable(): void {
        this.canEmit = false;
        // this.alpha = 0.7;
    }

    private build(): void {
        this.buildChoice();
        this.buildClickedChoice();
    }

    private buildChoice(): void {
        this.choice = makeSprite({ texture: Images[`game/${this.config.icon}`] });
        this.choice.interactive = true;
        this.choice.on('pointerdown', () => {
            this.canAnimate && this.animateClick();
            this.canAnimate = false;
        });
        this.addChild(this.choice);
    }

    private buildClickedChoice(): void {
        this.clickedChoice = makeSprite({ texture: Images[`game/${this.config.icon}_clicked`] });
        this.clickedChoice.visible = false;
        this.clickedChoice.alpha = 0;
        this.clickedChoice.scale.set(0.7);

        this.addChild(this.clickedChoice);
    }

    private animateClick(): void {
        anime({
            targets: this.choice.scale,
            x: 0.7,
            y: 0.7,
            easing: 'easeInOutSine',
            duration: 150,
            complete: () => this.switchChoices(),
        });
    }

    private switchChoices(): void {
        this.clickedChoice.visible = true;
        anime({
            targets: this.clickedChoice,
            alpha: 1,
            easing: 'easeInOutSine',
            duration: 50,
        });
        anime({
            targets: this.choice,
            alpha: 0,
            easing: 'easeInOutSine',
            duration: 50,
            complete: () => this.bringBackToNormalSize(),
        });
    }

    private bringBackToNormalSize(): void {
        anime({
            targets: this.clickedChoice.scale,
            x: 1,
            y: 1,
            easing: 'easeInOutSine',
            duration: 150,
            complete: () => {
                this.canEmit && this.emit('choiceClick', this.config.name);
            },
        });
    }
}
