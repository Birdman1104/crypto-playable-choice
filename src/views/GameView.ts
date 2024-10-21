import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Graphics } from 'pixi.js';
import { getGameViewGridConfig } from '../configs/gridConfigs/GameViewGC';
import { BoardView } from './BoardView';

export class GameView extends PixiGrid {
    private board: BoardView;
    private sky: Graphics;

    constructor() {
        super();

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
        this.buildBoard();
    }

    private buildSky(): void {
        this.sky = new Graphics();
        this.sky.beginFill(0x396cfb, 1);
        this.sky.drawRect(0, 0, 10, 10);
        this.sky.endFill();
        this.setChild('sky', this.sky);
    }

    private buildBoard(): void {
        this.board = new BoardView();
        this.setChild('preaction', this.board);
    }
}
