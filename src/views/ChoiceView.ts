import anime from 'animejs';
import { Container, Rectangle, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { callIfExists, makeSprite } from '../utils';

export class ChoiceView extends Container {
    private choice: Sprite;
    private choiceCopy: Sprite;
    private clickedChoice: Sprite;
    private canEmit = true;
    private canAnimate = true;

    constructor(private config: ChoiceConfig, public readonly uuid: string) {
        super();

        this.build();
    }

    get isCorrectAnswer(): boolean {
        return this.config.isCorrectAnswer;
    }

    get icon(): string {
        return this.config.icon;
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        return this.choice.getBounds();
    }

    public disable(): void {
        this.canEmit = false;
    }

    public glow(cb?): void {
        this.choiceCopy = makeSprite({ texture: Images[`game/${this.config.icon}`] });
        this.addChild(this.choiceCopy);

        anime({
            targets: this.choiceCopy,
            alpha: 0,
            easing: 'easeInOutSine',
            duration: 500,
        });
        anime({
            targets: this.choiceCopy.scale,
            x: 1.15,
            y: 1.15,
            easing: 'easeInOutSine',
            duration: 500,
            complete: () => {
                this.choiceCopy.visible = false;
                this.choiceCopy.destroy();
                callIfExists(cb);
            },
        });
    }

    public animateClick(): void {
        if (this.canAnimate) {
            this.canAnimate = false;
            anime({
                targets: this.choice.scale,
                x: 0.7,
                y: 0.7,
                easing: 'easeInOutSine',
                duration: 150,
                complete: () => this.switchChoices(),
            });
        }
    }

    private build(): void {
        this.buildChoice();
        this.buildClickedChoice();
    }

    private buildChoice(): void {
        this.choice = makeSprite({ texture: Images[`game/${this.config.icon}`] });
        this.choice.interactive = true;
        this.choice.on('pointerdown', () => {
            this.canEmit && this.emit('choiceClick', this.config.name);
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
                this.emit('clickAnimationComplete', this.config.name);
            },
        });
    }
}
