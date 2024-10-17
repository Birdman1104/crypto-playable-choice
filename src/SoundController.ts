import { lego } from '@armathai/lego';
import { Howl } from 'howler';

import { CLICK_SOUND } from './sounds/click';

class SoundControl {
    private sounds: any;
    public constructor() {
        this.sounds = {};
        lego.event
            .on('muteSound', this.mute, this)
    }

    public loadSounds(): void {
        this.sounds.click = new Howl({ src: CLICK_SOUND, volume: 1 });
    }

    private playClick(): void {
        this.sounds.click.play();
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
