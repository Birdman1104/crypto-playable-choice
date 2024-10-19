import { Container, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { ChoiceModel } from '../models/ChoiceModel';
import { makeSprite } from '../utils';
import { ChoiceView } from './ChoiceView';

export class PhoneView extends Container {
    private phone: Sprite;
    private leftChoice: ChoiceView;
    private rightChoice: ChoiceView;

    constructor() {
        super();

        this.build();
    }

    public updateChoices(choices: { right: ChoiceModel; wrong: ChoiceModel }): void {
        const rnd = Math.random() > 0.5;
        this.buildChoice(choices.right, rnd);
        this.buildChoice(choices.wrong, !rnd);
    }

    private buildChoice(choice: ChoiceModel, isOnLeft: boolean): void {
        const config: ChoiceConfig = extractChoiceConfigFromModel(choice);
        const choiceView = new ChoiceView(config);
        const x = isOnLeft ? -300 : 100;
        choiceView.position.set(x, 0);
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
