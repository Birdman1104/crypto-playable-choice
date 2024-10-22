import { lego } from '@armathai/lego';
import { Container, Point, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { PhoneViewEvents } from '../events/MainEvents';
import { ChoiceModelEvents } from '../events/ModelEvents';
import { ChoiceModel } from '../models/ChoiceModel';
import { delayRunnable, makeSprite } from '../utils';
import { ChoiceView } from './ChoiceView';

export class PhoneView extends Container {
    private phone: Sprite;
    private leftChoice: ChoiceView;
    private rightChoice: ChoiceView;

    constructor() {
        super();

        lego.event.on(ChoiceModelEvents.IsClickedUpdate, this.onChoiceClick, this);

        this.build();
    }

    get name(): string {
        return 'PhoneView';
    }

    public getHintPosition(): Point[] {
        let correctAnswer = this.rightChoice.isCorrectAnswer ? this.rightChoice : this.leftChoice;
        const pos = new Point(correctAnswer.x + correctAnswer.width / 3.5, correctAnswer.y + 25);
        return [this.toGlobal(pos)];
    }

    public updateChoices(choices: { right: ChoiceModel; wrong: ChoiceModel }): void {
        this.destroyChoices();
        this.buildChoices(choices);
    }

    private buildChoices(choices: { right: ChoiceModel; wrong: ChoiceModel }): void {
        const rnd = Math.random() > 0.5;
        this.buildChoice(choices.right, rnd);
        this.buildChoice(choices.wrong, !rnd);
    }

    private buildChoice(choice: ChoiceModel, isOnLeft: boolean): void {
        const config: ChoiceConfig = extractChoiceConfigFromModel(choice);
        const choiceView = new ChoiceView(config, choice.uuid);
        choiceView.scale.set(0.7);
        const x = isOnLeft ? -80 : 80;
        choiceView.position.set(x, -150);
        choiceView.on('choiceClick', (name) => {
            lego.event.emit(PhoneViewEvents.ChoiceClick, name);
        });
        choiceView.on('clickAnimationComplete', (name) => {
            delayRunnable(0.5, () => {
                lego.event.emit(PhoneViewEvents.ClickAnimationComplete, name);
            });
        });
        this.addChild(choiceView);

        if (isOnLeft) {
            this.leftChoice = choiceView;
        } else {
            this.rightChoice = choiceView;
        }
    }

    private build(): void {
        this.buildPhone();
    }

    private buildPhone(): void {
        this.phone = makeSprite({ texture: Images['game/phone'] });
        this.addChild(this.phone);
    }

    private destroyChoices(): void {
        this.rightChoice?.destroy();
        this.leftChoice?.destroy();
    }

    private onChoiceClick(clicked: boolean, wasClicked: boolean, uuid: string): void {
        const choice = this.getChoiceByUUID(uuid);
        if (!choice) return;
        this.leftChoice?.disable();
        this.rightChoice?.disable();
        choice.animateClick();
    }

    private getChoiceByUUID(uuid: string): ChoiceView | null {
        if (this.rightChoice.uuid === uuid) return this.rightChoice;
        if (this.leftChoice.uuid === uuid) return this.leftChoice;
        return null;
    }
}

const extractChoiceConfigFromModel = (model: ChoiceModel): ChoiceConfig => {
    return {
        name: model.name,
        icon: model.icon,
        price: model.price,
        reward: model.reward,
        isCorrectAnswer: model.isCorrectAnswer,
    };
};
