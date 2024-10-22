import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Graphics } from 'pixi.js';
import { getGameViewGridConfig } from '../configs/gridConfigs/GameViewGC';
import { GameModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
import { tweenToCell } from '../utils';
import { BoardView } from './BoardView';

export class GameView extends PixiGrid {
    private board: BoardView;
    private sky: Graphics;
    private ground: Graphics;

    constructor() {
        super();

        lego.event.on(GameModelEvents.StateUpdate, this.onStateUpdate, this);
        this.build();
    }

    public getGridConfig(): ICellConfig {
        return getGameViewGridConfig();
    }

    public update(): void {
        //
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        this.buildSky();
        this.buildGround();
        this.buildBoard();
    }

    private buildSky(): void {
        this.sky = new Graphics();
        this.sky.beginFill(0x396cfb, 1);
        this.sky.drawRect(0, 0, 10, 10);
        this.sky.endFill();
        this.setChild('sky', this.sky);
    }

    private buildGround(): void {
        this.ground = new Graphics();
        this.ground.beginFill(0x1f1423, 1);
        this.ground.drawRect(0, 0, 10, 10);
        this.ground.endFill();
        this.setChild('ground', this.ground);
    }

    private buildBoard(): void {
        this.board = new BoardView();
        this.setChild('preaction', this.board);
    }

    private onStateUpdate(state: GameState): void {
        switch (state) {
            case GameState.Wave1Actions:
                tweenToCell(this, this.board, 'wave1action', 'easeInOutSine', 400);
                break;
            case GameState.Wave2Actions:
                tweenToCell(this, this.board, 'wave2action', 'easeInOutSine', 400);
                break;
            case GameState.Wave3Actions:
                tweenToCell(this, this.board, 'wave3action', 'easeInOutSine', 400);
                break;
            case GameState.Wave4Actions:
                break;
            case GameState.Wave1:
            case GameState.Wave2:
            case GameState.Wave3:
            case GameState.Wave4:
                tweenToCell(this, this.board, 'preaction', 'easeInOutSine', 400);
                break;

            default:
                break;
        }
    }
}
