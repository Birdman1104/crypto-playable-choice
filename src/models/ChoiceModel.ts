import { ObservableModel } from './ObservableModel';

export class ChoiceModel extends ObservableModel {
    private _choice: string;
    private _price: number;
    private _reward: number | string;
    private _isCorrectAnswer: boolean;

    constructor(config: ChoiceConfig) {
        super('ChoiceModel');

        this._choice = config.name;
        this._price = config.price;
        this._reward = config.reward;
        this._isCorrectAnswer = config.isCorrectAnswer;

        this.makeObservable();
    }

    get choice(): string {
        return this._choice;
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

    public init(): void {
        //
    }
}
