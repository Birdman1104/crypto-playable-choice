import { lego } from '@armathai/lego';
import anime from 'animejs';
import { AnimatedSprite, Container, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { BoardViewEvents } from '../events/MainEvents';
import { makeSprite } from '../utils';

export class House extends Container {
    private layer1: Sprite;
    private layer2: Sprite;
    private layer3: Sprite;
    private layer4: Sprite;
    private layer5: Sprite;
    private layer6: Sprite;
    private layer7: Sprite;
    private layer8: Sprite;
    private layer9: Sprite;
    private house: Sprite;

    constructor() {
        super();

        this.build();
    }

    get layersInOrder(): Sprite[] {
        return [
            this.layer5,
            this.layer4,
            this.layer8,
            this.layer6,
            this.layer3,
            this.layer7,
            this.layer9,
            this.layer1,
            this.layer2,
        ];
    }

    public show(): void {
        this.playDustVFX();
        this.layersInOrder.forEach((layer, i) => {
            anime({
                targets: layer.scale,
                x: 1,
                y: 1,
                duration: 300,
                delay: i * 100,
                complete: () => {
                    if (i === this.layersInOrder.length - 1) {
                        anime({
                            targets: this.house,
                            alpha: 1,
                            duration: 400,
                            easing: 'linear',
                            complete: () => {
                                setTimeout(() => {
                                    lego.event.emit(BoardViewEvents.Wave3ActionsComplete);
                                }, 500);
                            },
                        });
                    }
                },
            });
        });
    }

    private build(): void {
        this.layer1 = makeSprite({ texture: Images['house/layer1'] });
        this.layer1.position.set(-192, -93);
        this.addChild(this.layer1);

        this.layer2 = makeSprite({ texture: Images['house/layer2'] });
        this.layer2.position.set(-60, -108);
        this.addChild(this.layer2);

        this.layer3 = makeSprite({ texture: Images['house/layer3'] });
        this.layer3.position.set(-5, -35);
        this.addChild(this.layer3);

        this.layer4 = makeSprite({ texture: Images['house/layer4'] });
        this.layer4.position.set(0, 67);
        this.addChild(this.layer4);

        this.layer5 = makeSprite({ texture: Images['house/layer5'] });
        this.layer5.position.set(0, 120);
        this.addChild(this.layer5);

        this.layer6 = makeSprite({ texture: Images['house/layer6'] });
        this.layer6.position.set(152, 91);
        this.addChild(this.layer6);

        this.layer7 = makeSprite({ texture: Images['house/layer7'] });
        this.layer7.position.set(-123, -65);
        this.addChild(this.layer7);

        this.layer8 = makeSprite({ texture: Images['house/layer8'] });
        this.layer8.position.set(5, 50);
        this.addChild(this.layer8);

        this.layer9 = makeSprite({ texture: Images['house/layer9'] });
        this.layer9.position.set(100, -75);
        this.addChild(this.layer9);

        this.house = makeSprite({ texture: Images['house/house'] });
        this.addChild(this.house);

        this.layersInOrder.forEach((layer) => {
            layer.scale.set(0);
        });

        this.house.alpha = 0;
    }

    private playDustVFX(): void {
        const frames: any[] = [];
        for (let i = 0; i <= 16; i++) {
            frames.push(Images[`dust/Fx03_${i < 10 ? '0' + i : i}`]);
        }

        const anim = AnimatedSprite.fromFrames(frames);
        anim.anchor.set(0.5);
        anim.animationSpeed = 0.5;
        anim.scale.set(1.5);
        anim.loop = false;

        anim.play();
        anim.onComplete = () => {
            anim.destroy();
        };
        this.addChild(anim);
    }
}
