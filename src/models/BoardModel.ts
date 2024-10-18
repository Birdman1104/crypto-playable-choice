import { WAVE_CONFIG } from '../configs/WaveConfig';
import { ObservableModel } from './ObservableModel';
import { WaveModel } from './WaveModel';

export class BoardModel extends ObservableModel {
    private _gameOver = false;
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

    public initialize(): void {
        this._waves = WAVE_CONFIG.map((waveConfig) => {
            const wave = new WaveModel(waveConfig);
            wave.initialize();
            return wave;
        });
    }
}
