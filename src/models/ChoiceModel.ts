import { ObservableModel } from './ObservableModel';

export class ChoiceModel extends ObservableModel {
    private _name: string;
    private _icon: string;
    private _price: number;
    private _reward: number | string;
    private _isCorrectAnswer: boolean;
    private _isClicked = false;

    constructor(config: ChoiceConfig) {
        super('ChoiceModel');

        this._name = config.name;
        this._icon = config.icon;
        this._price = config.price;
        this._reward = config.reward;
        this._isCorrectAnswer = config.isCorrectAnswer;

        this.makeObservable();
    }

    get name(): string {
        return this._name;
    }

    get icon(): string {
        return this._icon;
    }

    get isCorrectAnswer(): boolean {
        return this._isCorrectAnswer;
    }

    get price(): number {
        return this._price;
    }

    get reward(): number | string {
        return this._reward;
    }

    get isClicked(): boolean {
        return this._isClicked;
    }

    set isClicked(value: boolean) {
        this._isClicked = value;
    }

    public init(): void {
        //
    }
}
