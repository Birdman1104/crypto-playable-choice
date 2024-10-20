import { BoardModel } from './BoardModel';
import { ObservableModel } from './ObservableModel';

export enum GameState {
    Unknown = 'Unknown',
    Fail = 'Fail',
    PreActions = 'PreActions',
    Wave1 = 'Wave1',
    Wave1Actions = 'Wave1Actions',
    Wave2 = 'Wave2',
    Wave2Actions = 'Wave2Actions',
    Wave3 = 'Wave3',
    Wave3Actions = 'Wave3Actions',
    Wave4 = 'Wave4',
    Wave4Actions = 'Wave4Actions',
}

// export const WaveGT;

export const getWaveActionStateFromWaveLevel = (waveLevel: number): GameState => {
    const WaveActionsLevelToGameState = [
        GameState.PreActions,
        GameState.Wave1Actions,
        GameState.Wave2Actions,
        GameState.Wave3Actions,
        GameState.Wave4Actions,
    ];

    return WaveActionsLevelToGameState[waveLevel] || GameState.Unknown;
};

export class GameModel extends ObservableModel {
    private _state: GameState = GameState.Unknown;
    private _board: BoardModel | null = null;

    constructor() {
        super('GameModel');

        this._state = GameState.Unknown;
        this.makeObservable();
    }

    get state(): GameState {
        return this._state;
    }

    set state(value: GameState) {
        this._state = value;
    }

    get board(): BoardModel | null {
        return this._board;
    }

    set board(value: BoardModel) {
        this._board = value;
    }

    public setState(state: GameState): void {
        this._state = state;
    }

    public initialize(): void {
        this._state = GameState.PreActions;
        this._board = new BoardModel();
        this._board.initialize();
    }

    public destroy(): void {
        this._board?.destroy();
        this._board = null;
    }
}
