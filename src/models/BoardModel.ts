import { ObservableModel } from './ObservableModel';

export class BoardModel extends ObservableModel {
    private _gameOver = false;

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
