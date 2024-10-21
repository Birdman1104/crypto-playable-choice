import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getUIGridConfig } from '../configs/gridConfigs/UIViewGC';
import { BoardModelEvents, GameModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
import { WaveModel } from '../models/WaveModel';
import { tweenToCell } from '../utils';
import { MoneyBar } from './MoneyBarView';
import { PhoneView } from './PhoneView';

export class UIView extends PixiGrid {
    private phone: PhoneView;
    private moneyBar: MoneyBar;

    constructor() {
        super();

        lego.event
            .on(BoardModelEvents.CurrentWaveUpdate, this.onCurrentWaveUpdate, this)
            .on(GameModelEvents.StateUpdate, this.onStateUpdate, this);

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
        this.buildMoneyBar();
    }

    private onCurrentWaveUpdate({ rightAnswer, wrongAnswer }: WaveModel): void {
        const config = { right: rightAnswer, wrong: wrongAnswer };
        this.phone?.updateChoices(config);
    }

    private buildPhone(): void {
        this.phone = new PhoneView();
        this.setChild('phone_hide', this.phone);
    }

    private buildMoneyBar(): void {
        this.moneyBar = new MoneyBar();
        this.setChild('money_bar', this.moneyBar);
    }

    private onStateUpdate(newState): void {
        switch (newState) {
            case GameState.Wave1:
            case GameState.Wave2:
            case GameState.Wave3:
            case GameState.Wave4:
                this.phone && tweenToCell(this, this.phone, 'phone_show', 0.5);
                break;
            case GameState.PreActions:
            case GameState.Wave1Actions:
            case GameState.Wave2Actions:
            case GameState.Wave3Actions:
                this.phone && tweenToCell(this, this.phone, 'phone_hide', 0.5);
                break;

            default:
                break;
        }
    }
}
