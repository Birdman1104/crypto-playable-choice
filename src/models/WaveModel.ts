import { ChoiceModel } from './ChoiceModel';
import { ObservableModel } from './ObservableModel';

export class WaveModel extends ObservableModel {
    private _waveLevel: number;
    private _rightAnswer: ChoiceModel;
    private _wrongAnswer: ChoiceModel;

    constructor(config: WaveConfig) {
        super('WaveModel');

        this._waveLevel = config.level;
        this._rightAnswer = new ChoiceModel(config.rightChoice);
        this._wrongAnswer = new ChoiceModel(config.wrongChoice);

        this.makeObservable();
    }

    get waveLevel(): number {
        return this._waveLevel;
    }

    set waveLevel(value: number) {
        this._waveLevel = value;
    }

    get rightAnswer(): ChoiceModel {
        return this._rightAnswer;
    }

    set rightAnswer(value: ChoiceModel) {
        this._rightAnswer = value;
    }

    get wrongAnswer(): ChoiceModel {
        return this._wrongAnswer;
    }

    set wrongAnswer(value: ChoiceModel) {
        this._wrongAnswer = value;
    }

    public init(): void {
        //
    }

    public getAnswerByName(name: string): ChoiceModel | null {
        return this.rightAnswer.name === name
            ? this.rightAnswer
            : this.wrongAnswer.name === name
            ? this.wrongAnswer
            : null;
    }

    public getAnswerByUUID(uuid: string): ChoiceModel | null {
        return this.rightAnswer.uuid === uuid
            ? this.rightAnswer
            : this.wrongAnswer.uuid === uuid
            ? this.wrongAnswer
            : null;
    }
}
