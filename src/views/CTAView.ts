import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Graphics } from 'pixi.js';
import { getCTAGridConfig } from '../configs/gridConfigs/CTAViewGC';
import { CtaModelEvents } from '../events/ModelEvents';
import { FailView } from './FailView';

export class CTAView extends PixiGrid {
    private blocker: Graphics;
    private fail: FailView;

    constructor() {
        super();

        lego.event.on(CtaModelEvents.VisibleUpdate, this.visibleUpdate, this);
        this.build();
    }

    public getGridConfig(): ICellConfig {
        return getCTAGridConfig();
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        this.buildBlocker();
        this.buildFail();
    }

    private buildFail(): void {
        this.fail = new FailView();
        this.setChild('fail', this.fail);
    }

    private buildBlocker(): void {
        this.blocker = new Graphics();
        this.blocker.beginFill(0x919191, 1);
        this.blocker.drawRect(0, 0, 10, 10);
        this.blocker.endFill();
        this.blocker.alpha = 0;
        this.setChild('blocker', this.blocker);
    }

    private visibleUpdate(visible: boolean): void {
        this.blocker.interactive = true;

        this.fail.show();
    }
}
