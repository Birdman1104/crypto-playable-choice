import { lego } from '@armathai/lego';
import anime from 'animejs';
import { Container, Sprite, Text } from 'pixi.js';
import { Images } from '../assets';
import { BoardModelEvents } from '../events/ModelEvents';
import { makeSprite } from '../utils';
export class MoneyBar extends Container {
    private bkg: Sprite;
    private text: Text;

    constructor() {
        super();

        lego.event.on(BoardModelEvents.BalanceUpdate, this.updateBalance, this);
        this.build();
    }

    private updateBalance(value: number): void {
        anime({
            targets: this.text,
            text: [this.text.text, value],
            duration: 500,
            round: true,
            easing: 'linear',
        });
    }

    private build(): void {
        this.buildBkg();
        this.buildText();
    }

    private buildBkg(): void {
        this.bkg = makeSprite({ texture: Images['game/money_bar'] });
        this.addChild(this.bkg);
    }

    private buildText(): void {
        this.text = new Text('0', {
            fill: 0x11aa88,
            fontSize: 64,
        });
        this.text.position.set(30, 0);
        this.text.anchor.set(0.5);
        this.addChild(this.text);
    }
}
