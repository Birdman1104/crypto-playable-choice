import { lego } from '@armathai/lego';
import anime from 'animejs';
import { Container, Point, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { GameModelEvents, HintModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
import { getViewByProperty, makeSprite } from '../utils';

export class HintView extends Container {
    private hand: Sprite;
    private hintPositions: Point[] = [];
    private currentPoint = 0;
    private isFirstWave = true;

    constructor() {
        super();

        lego.event
            .on(HintModelEvents.VisibleUpdate, this.onHintVisibleUpdate, this)
            .on(GameModelEvents.StateUpdate, this.onGameStateUpdate, this);

        this.build();
        this.hide();
    }

    get viewName() {
        return 'HintView';
    }

    public destroy(): void {
        this.removeTweens();
        lego.event.off(HintModelEvents.VisibleUpdate, this.onHintVisibleUpdate, this);
        lego.event.off(GameModelEvents.StateUpdate, this.onGameStateUpdate, this);

        super.destroy();
    }

    private onHintVisibleUpdate(visible: boolean): void {
        visible ? this.show() : this.hide();
    }

    private onGameStateUpdate(state: GameState): void {
        this.isFirstWave = state === GameState.Wave1;
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

        const phone = getViewByProperty('name', 'PhoneView');
        if (this.isFirstWave) {
            phone.glowRightChoice();
            this.pointHand(600);
        } else {
            phone.glowChoices();
            this.pointHand(1100);
        }
    }

    private hide(): void {
        this.removeTweens();
        this.hand.alpha = 0;
    }

    private pointHand(delay = 0): void {
        const point = this.hintPositions[this.currentPoint];
        this.hand.scale.set(1);
        this.hand.position.set(point.x, point.y);
        this.showHand(delay);
    }

    private showHand(delay = 0): void {
        anime({
            targets: this.hand,
            alpha: 1,
            duration: 200,
            angle: 0,
            delay,
            easing: 'easeInOutCubic',
            complete: () => this.scaleAnimationHand(),
        });
    }

    private scaleAnimationHand(): void {
        anime({
            targets: this.hand.scale,
            x: 0.8,
            y: 0.8,
            duration: 500,
            easing: 'easeInOutCubic',
            direction: 'alternate',
            loop: this.isFirstWave ? 6 : 1,
            complete: () => {
                if (this.isFirstWave) {
                    this.hideHand();
                } else {
                    this.currentPoint += 1;
                    if (this.currentPoint >= this.hintPositions.length) {
                        this.currentPoint = 0;
                    }
                    this.moveHand(this.hintPositions[this.currentPoint]);
                }
            },
        });
    }

    private hideHand(): void {
        anime({
            targets: this.hand,
            alpha: 0,
            duration: 300,
            easing: 'easeInOutCubic',
            complete: () => {
                this.currentPoint += 1;
                if (this.currentPoint >= this.hintPositions.length) {
                    this.currentPoint = 0;
                }
                this.moveHand(this.hintPositions[this.currentPoint]);
            },
        });
    }

    private moveHand(pos): void {
        anime({
            targets: this.hand,
            x: pos.x,
            y: pos.y,
            duration: 500,
            easing: 'easeInOutCubic',
            complete: () => this.showHand(),
        });
    }

    private removeTweens(): void {
        anime.remove(this.hand);
        anime.remove(this.hand.scale);
    }

    private getHintPosition(): Point[] {
        const phoneView = getViewByProperty('name', 'PhoneView');
        if (!phoneView) return [new Point(0, 0)];

        return this.isFirstWave ? phoneView.getRightChoicePosition() : phoneView.getChoicesPositions();
    }
}
