import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getUIGridConfig } from '../configs/gridConfigs/UIViewGC';
import { BoardModelEvents } from '../events/ModelEvents';
import { WaveModel } from '../models/WaveModel';
import { PhoneView } from './PhoneView';

export class UIView extends PixiGrid {
    private phone: PhoneView;

    constructor() {
        super();

        lego.event.on(BoardModelEvents.CurrentWaveUpdate, this.onCurrentWaveUpdate, this);
        this.build();
    }

    public getGridConfig(): ICellConfig {
        return getUIGridConfig();
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        this.buildPhone();
    }

    private onCurrentWaveUpdate({ rightAnswer, wrongAnswer }: WaveModel): void {
        const config = { right: rightAnswer, wrong: wrongAnswer };
        this.phone?.updateChoices(config);
    }

    private buildPhone(): void {
        this.phone = new PhoneView();
        this.setChild('phone_show', this.phone);
    }
}
