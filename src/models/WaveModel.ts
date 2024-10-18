import { ObservableModel } from './ObservableModel';

export class WaveModel extends ObservableModel {
    private _waveLevel: number;
    private _rightAnswer: string;
    private _wrongAnswer: string;

    constructor(private config: WaveConfig) {
        super('WaveModel');

        this._waveLevel = config.level;
        this._rightAnswer = config.rightAnswer;
        this._wrongAnswer = config.wrongAnswer;

        this.makeObservable();
    }

    get waveLevel(): number {
        return this._waveLevel;
    }

    set waveLevel(value: number) {
        this._waveLevel = value;
    }

    get rightAnswer(): string {
        return this._rightAnswer;
    }

    set rightAnswer(value: string) {
        this._rightAnswer = value;
    }

    get wrongAnswer(): string {
        return this._wrongAnswer;
    }

    set wrongAnswer(value: string) {
        this._wrongAnswer = value;
    }

    public init(): void {
        //
    }
}
