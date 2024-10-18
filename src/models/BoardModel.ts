import { WAVE_CONFIG } from '../configs/WaveConfig';
import { ObservableModel } from './ObservableModel';
import { WaveModel } from './WaveModel';

export class BoardModel extends ObservableModel {
    private _gameOver = false;
    private _balance: number;
    private _waves: WaveModel[] = [];

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

    get balance(): number {
        return this._balance;
    }

    set balance(value: number) {
        this._balance = value;
    }

    public initialize(): void {
        this._waves = WAVE_CONFIG.map((waveConfig) => {
            const wave = new WaveModel(waveConfig);
            wave.initialize();
            return wave;
        });
    }

    public updateBalance(value: number | string): void {
        if (typeof value === 'string') {
            this._balance = parseInt(value);
        } else {
            this._balance += value;
        }
    }
}
