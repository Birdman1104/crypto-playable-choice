import { lego } from '@armathai/lego';
import { Howl } from 'howler';

import { BoardViewEvents, PhoneViewEvents } from './events/MainEvents';
import { GameModelEvents } from './events/ModelEvents';
import { GameState } from './models/GameModel';
import { CAR_SOUND } from './sounds/car';
import { CLICK_SOUND } from './sounds/click';
import { FAIL_SOUND } from './sounds/fail';
import { GIRL_SOUND } from './sounds/girlHello';
import { GUY_REACTION } from './sounds/guyReaction';
import { HOME_SOUND } from './sounds/home';
import { PHONE_SOUND } from './sounds/phone';
import { RIGHT_SOUND } from './sounds/right';
import { THEME_SOUND } from './sounds/theme';
import { YES_SOUND } from './sounds/yes';

class SoundControl {
    private sounds: any;
    public constructor() {
        this.sounds = {};
        lego.event
            .on('muteSound', this.mute, this)
            .on(GameModelEvents.StateUpdate, this.onGameStateUpdate, this)
            .on(BoardViewEvents.CarAnimationStart, this.playCar, this)
            .on(BoardViewEvents.CarAnimationComplete, this.playGuyReaction, this)
            .on(BoardViewEvents.HouseAnimationStart, this.playHome, this)
            .on(BoardViewEvents.GirlAnimationComplete, this.playGirlSound, this)
            .on(PhoneViewEvents.ChoiceClick, this.playClick, this);
    }

    public loadSounds(): void {
        this.sounds.click = new Howl({ src: CLICK_SOUND, volume: 1 });
        this.sounds.car = new Howl({ src: CAR_SOUND, volume: 0.7 });
        this.sounds.fail = new Howl({ src: FAIL_SOUND, volume: 1 });
        this.sounds.girlHello = new Howl({ src: GIRL_SOUND, volume: 1 });
        this.sounds.guyReaction = new Howl({ src: GUY_REACTION, volume: 1 });
        this.sounds.home = new Howl({ src: HOME_SOUND, volume: 1 });
        this.sounds.phone = new Howl({ src: PHONE_SOUND, volume: 1 });
        this.sounds.right = new Howl({ src: RIGHT_SOUND, volume: 1 });
        this.sounds.theme = new Howl({ src: THEME_SOUND, volume: 0.4, loop: true });
        this.sounds.yes = new Howl({ src: YES_SOUND, volume: 1 });
    }

    private playClick(): void {
        this.sounds.click.play();
    }

    private playCar(): void {
        this.sounds.car.play();
    }

    private playHome(): void {
        this.sounds.home.play();
    }

    private playPhone(): void {
        this.sounds.phone.play();
    }

    private playRightChoice(): void {
        this.sounds.right.play();
    }

    private playGirlSound(): void {
        this.sounds.girlHello.play();
    }

    private playGuyReaction(): void {
        this.sounds.guyReaction.play();
    }

    private onGameStateUpdate(state: GameState): void {
        switch (state) {
            case GameState.PreActions:
                this.sounds.theme.play();
                break;
            case GameState.Fail:
                this.sounds.theme.stop();
                this.sounds.fail.play();
                break;
            case GameState.Fail:
                this.sounds.theme.stop();
                this.sounds.fail.play();
                break;
            case GameState.Wave1:
            case GameState.Wave2:
            case GameState.Wave3:
            case GameState.Wave4:
                this.playPhone();
                break;
            case GameState.Wave2Actions:
            case GameState.Wave3Actions:
            case GameState.Wave4Actions:
                this.playRightChoice();
                break;
            case GameState.Wave1Actions:
                this.playRightChoice();
                this.sounds.yes.play();
                break;

            default:
                break;
        }
    }

    private mute(muted: boolean): void {
        for (const [key, value] of Object.entries(this.sounds)) {
            // @ts-ignore
            value.volume(muted ? 0 : 1);
        }
    }
}

const SoundController = new SoundControl();
export default SoundController;
