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

    public get waveLevel(): number {
        return this._waveLevel;
    }

    public set waveLevel(value: number) {
        this._waveLevel = value;
    }

    public get rightAnswer(): string {
        return this._rightAnswer;
    }

    public set rightAnswer(value: string) {
        this._rightAnswer = value;
    }

    public get wrongAnswer(): string {
        return this._wrongAnswer;
    }

    public set wrongAnswer(value: string) {
        this._wrongAnswer = value;
    }

    public init(): void {
        //
    }
}
