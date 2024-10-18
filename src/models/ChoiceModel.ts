import { ObservableModel } from './ObservableModel';

export class ChoiceModel extends ObservableModel {
    private _choice: string;
    private _isCorrectAnswer: boolean;

    constructor(config: ChoiceConfig) {
        super('ChoiceModel');

        this._choice = config.choice;
        this._isCorrectAnswer = config.isCorrectAnswer;

        this.makeObservable();
    }

    get choice(): string {
        return this._choice;
    }

    set choice(value: string) {
        this._choice = value;
    }

    get isCorrectAnswer(): boolean {
        return this._isCorrectAnswer;
    }

    set isCorrectAnswer(value: boolean) {
        this._isCorrectAnswer = value;
    }

    public init(): void {
        //
    }
}
