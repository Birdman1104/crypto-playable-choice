import { WAVE_CONFIG } from '../configs/WaveConfig';
import { ChoiceModel } from './ChoiceModel';
import { ObservableModel } from './ObservableModel';
import { WaveModel } from './WaveModel';

export class BoardModel extends ObservableModel {
    private _gameOver = false;
    private _balance: number;
    private _waves: WaveModel[] = [];
    private _currentWave: WaveModel;
    private _currentLevelNumber: number;

    constructor() {
        super('BoardModel');

        this.makeObservable();
    }

    get gameOver(): boolean {
        return this._gameOver;
    }

    set gameOver(value: boolean) {
        this._gameOver = value;
    }

    get waves(): WaveModel[] {
        return this._waves;
    }

    set waves(value: WaveModel[]) {
        this._waves = value;
    }

    get currentWave(): WaveModel {
        return this._currentWave;
    }

    set currentWave(value: WaveModel) {
        this._currentWave = value;
    }

    get balance(): number {
        return this._balance;
    }

    set balance(value: number) {
        this._balance = value;
    }

    get currentLevelNumber(): number {
        return this._currentLevelNumber;
    }

    public initialize(): void {
        this._currentLevelNumber = -1;
        this._waves = WAVE_CONFIG.map((waveConfig) => {
            const wave = new WaveModel(waveConfig);
            wave.initialize();
            return wave;
        });
        this._currentWave = this._waves[this._currentLevelNumber];
    }

    public startNextWave(): void {
        if (this._currentLevelNumber + 1 > this.waves.length) return;

        this._currentLevelNumber = this._currentLevelNumber < 0 ? 0 : this._currentLevelNumber + 1;
        this._currentWave = this._waves[this.currentLevelNumber];
    }

    public updateBalance(value: number | string): void {
        if (typeof value === 'string') {
            this._balance = parseInt(value);
        } else {
            this._balance += value;
        }
    }

    public isRightChoice(name: string): boolean {
        console.warn('is ', name, 'right choice, ', this._currentWave.rightAnswer.name === name);

        return this._currentWave.rightAnswer.name === name;
    }

    public getAnswerByName(name: string): ChoiceModel | null {
        return this._currentWave.getAnswerByName(name);
    }

    public getAnswerByUUID(uuid: string): ChoiceModel | null {
        return this._currentWave.getAnswerByUUID(uuid);
    }
}
