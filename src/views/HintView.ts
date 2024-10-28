import { lego } from '@armathai/lego';
import anime from 'animejs';
import { Container, Point, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { GameModelEvents, HintModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
import { getViewByProperty, makeSprite } from '../utils';
import { PhoneView } from './PhoneView';

export class HintView extends Container {
    private hand: Sprite;
    private hintPositions: Point[] = [];
    private currentPoint = 0;
    private isFirstWave = true;
    private phoneView: PhoneView;
    private isLeftChoice = true;

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
        if (visible) {
            this.isLeftChoice = true;
            this.show();
        } else {
            this.hide();
        }
        // visible ? this.show() : this.hide();
    }

    private onGameStateUpdate(state: GameState): void {
        this.isFirstWave = state === GameState.Wave1;
    }

    private build(): void {
        this.hand = makeSprite({ texture: Images['game/hand'] });
        this.hand.anchor.set(0.15, 0.25);
        this.addChild(this.hand);

        this.phoneView = getViewByProperty('name', 'PhoneView') as PhoneView;
    }

    private show(): void {
        this.removeTweens();
        this.hintPositions = this.getHintPosition();
        this.currentPoint = 0;

        if (this.isFirstWave) {
            this.phoneView.glowRightChoice();
            this.pointHand();
        } else {
            this.phoneView.showChoiceGlow(this.isLeftChoice);
            // this.isLeftChoice = !this.isLeftChoice;
            this.pointHand();
        }
    }

    private hide(): void {
        this.removeTweens();
        this.phoneView.hideGlows();
        this.hand.alpha = 0;
    }

    private pointHand(): void {
        const point = this.hintPositions[this.currentPoint];
        this.hand.scale.set(1);
        this.hand.position.set(point.x, point.y);
        this.showHand(100);
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
            complete: () => {
                this.hideHand();
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
                if (!this.isFirstWave) {
                    this.phoneView.hideChoiceGlow(this.isLeftChoice);
                    this.isLeftChoice = !this.isLeftChoice;
                    this.phoneView.showChoiceGlow(this.isLeftChoice);
                } else {
                    this.phoneView.glowRightChoice();
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
            duration: 600,
            easing: 'easeInOutCubic',
            complete: () => this.showHand(),
        });
    }

    private removeTweens(): void {
        anime.remove(this.hand);
        anime.remove(this.hand.scale);
    }

    private getHintPosition(): Point[] {
        if (!this.phoneView) return [new Point(0, 0)];

        return this.isFirstWave ? this.phoneView.getRightChoicePosition() : this.phoneView.getChoicesPositions();
    }
}
