import { Container, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { makeSprite } from '../utils';

export class ChoiceView extends Container {
    private bkg: Sprite;
    private icon: Sprite;
    private price: Sprite;
    private text: Sprite;
    private canEmit = true;

    constructor(private config: ChoiceConfig) {
        super();

        this.build();
    }

    public disable(): void {
        this.canEmit = false;
        this.alpha = 0.7;
    }

    private build(): void {
        this.buildBkg();
        this.buildIcon();
        // this.buildPrice();
        // this.buildText();
    }

    private buildBkg(): void {
        this.bkg = makeSprite({ texture: Images['game/choice_bkg'] });
        this.bkg.interactive = true;
        this.bkg.on('pointerdown', () => {
            this.canEmit && this.emit('choiceClick', this.config.name);
        });
        this.addChild(this.bkg);
    }

    private buildIcon(): void {
        this.icon = makeSprite({ texture: Images[`game/${this.config.icon}`] });
        this.addChild(this.icon);
    }

    private buildPrice(): void {
        this.price = makeSprite({ texture: Images[`game/${this.config.price}`] });
        this.price.position.set(0, 50);
        this.addChild(this.price);
    }

    private buildText(): void {
        this.text = makeSprite({ texture: Images[`game/${this.config.name}`] });
        this.text.position.set(0, -50);
        this.addChild(this.text);
    }
}
