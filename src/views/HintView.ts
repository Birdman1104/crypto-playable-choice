import { lego } from '@armathai/lego';
import anime from 'animejs';
import { Container, Point, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { HintModelEvents } from '../events/ModelEvents';
import { getViewByProperty, makeSprite } from '../utils';

export class HintView extends Container {
    private hand: Sprite;
    private hintPositions: Point[] = [];
    private currentPoint = 0;

    constructor() {
        super();

        lego.event.on(HintModelEvents.VisibleUpdate, this.onHintVisibleUpdate, this);

        this.build();
        this.hide();
    }

    get viewName() {
        return 'HintView';
    }

    public destroy(): void {
        this.removeTweens();
        lego.event.off(HintModelEvents.VisibleUpdate, this.onHintVisibleUpdate, this);

        super.destroy();
    }

    private onHintVisibleUpdate(visible: boolean): void {
        visible ? this.show() : this.hide();
    }

    private build(): void {
        this.hand = makeSprite({ texture: Images['game/hand'] });
        this.hand.anchor.set(0.15, 0.25);
        this.addChild(this.hand);
    }

    private show(): void {
        this.removeTweens();
        this.hintPositions = this.getHintPosition();
        this.currentPoint = 0;

        this.showFirstTime();
    }

    private hide(): void {
        this.removeTweens();
        this.hand.visible = false;
    }

    private showFirstTime(): void {
        const point = this.hintPositions[this.currentPoint];
        this.hand.scale.set(1);
        this.hand.alpha = 1;
        this.hand.position.set(point.x, point.y);
        this.hand.angle = 0;
        this.hand.visible = true;

        this.pointHand();
    }

    private pointHand(): void {
        anime({
            targets: this.hand,
            alpha: 1,
            duration: 300,
            easing: 'easeInOutCubic',
            complete: () => {
                anime({
                    targets: this.hand.scale,
                    x: 0.8,
                    y: 0.8,
                    duration: 500,
                    easing: 'easeInOutCubic',
                    direction: 'alternate',
                    loop: 6,
                    complete: () => {
                        anime({
                            targets: this.hand,
                            alpha: 0,
                            duration: 300,
                            easing: 'easeInOutCubic',
                            complete: () => {
                                this.moveHand(this.hintPositions[this.currentPoint]);
                            },
                        });
                    },
                });
            },
        });
    }

    private moveHand(pos): void {
        anime({
            targets: this.hand,
            x: pos.x,
            y: pos.y,
            duration: 3000,
            easing: 'easeInOutCubic',
            complete: () => this.pointHand(),
        });
    }

    private removeTweens(): void {
        anime.remove(this.hand);
        anime.remove(this.hand.scale);
    }

    private getHintPosition(): Point[] {
        const phoneView = getViewByProperty('name', 'PhoneView');
        if (!phoneView) return [new Point(0, 0)];

        return phoneView.getHintPosition();
    }
}
