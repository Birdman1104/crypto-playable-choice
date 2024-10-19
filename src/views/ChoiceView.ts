import { Container, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { makeSprite } from '../utils';

export class ChoiceView extends Container {
    private bkg: Sprite;
    private icon: Sprite;
    private price: Sprite;
    private text: Sprite;

    constructor(private config: ChoiceConfig) {
        super();

        this.build();
    }

    public updateChoices(): void {
        //
    }

    private build(): void {
        this.buildBkg();
        this.buildIcon();
        // this.buildPrice();
        // this.buildText();
    }

    private buildBkg(): void {
        this.bkg = makeSprite({ texture: Images['game/choice_bkg'] });
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
