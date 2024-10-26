import anime from 'animejs';
import { Container, Rectangle, Sprite, Texture } from 'pixi.js';
import { Images } from '../assets';
import { callIfExists, makeSprite } from '../utils';

export class ChoiceView extends Container {
    private iconSprite: Sprite;
    private grayBkg: Sprite;
    private whiteBkg: Sprite;
    private grayBox: Sprite;
    private price: Sprite;

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
        return this.grayBkg.getBounds();
    }

    public disable(): void {
        this.canEmit = false;
    }

    public glow(cb?): void {
        anime({
            targets: this.whiteBkg,
            alpha: 1,
            easing: 'easeInOutSine',
            duration: 500,
            direction: 'alternate',
            complete: () => callIfExists(cb),
        });
    }

    public animateClick(): void {
        if (this.canAnimate) {
            this.canAnimate = false;
            let emitted = false;
            anime({
                targets: this.scale,
                x: 0.6,
                y: 0.6,
                easing: 'easeInOutSine',
                duration: 150,
                direction: 'alternate',
                loopComplete: () => {
                    if (!emitted) {
                        this.grayBox.texture = Texture.from(Images[`choices/yellow`]);
                        this.price.tint = 0x383d45;
                        this.emit('clickAnimationComplete', this.config.name);
                        emitted = true;
                    }
                },
            });
        }
    }

    private build(): void {
        this.buildGrayBkg();
        this.buildWhiteBkg();
        this.buildGrayBox();
        this.buildIcon();
        this.buildPrice();
    }

    private buildGrayBkg(): void {
        this.grayBkg = makeSprite({ texture: Images[`choices/gray_bkg`] });
        this.grayBkg.interactive = true;
        this.grayBkg.on('pointerdown', () => {
            this.canEmit && this.emit('choiceClick', this.config.name);
        });
        this.addChild(this.grayBkg);
    }

    private buildWhiteBkg(): void {
        this.whiteBkg = makeSprite({ texture: Images[`choices/white_bkg`] });
        this.whiteBkg.alpha = 0;
        this.addChild(this.whiteBkg);
    }

    private buildGrayBox(): void {
        this.grayBox = makeSprite({ texture: Images[`choices/gray`] });
        this.grayBox.y = -2;
        this.addChild(this.grayBox);
    }

    private buildIcon(): void {
        this.iconSprite = makeSprite({ texture: Images[`choices/${this.config.icon}`] });
        this.addChild(this.iconSprite);
    }

    private buildPrice(): void {
        this.price = makeSprite({ texture: Images[`choices/${this.config.icon}_price`] });
        this.addChild(this.price);
    }
}
