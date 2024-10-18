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

    public initialize(): void {
        //
    }
}
