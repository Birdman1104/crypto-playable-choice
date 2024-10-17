import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getGameViewGridConfig } from '../configs/gridConfigs/GameViewGC';

export class GameView extends PixiGrid {

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
        //
    }
}
