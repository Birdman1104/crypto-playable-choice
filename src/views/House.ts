import anime from 'animejs';
import { Container, Sprite } from 'pixi.js';
import { Images } from '../assets';
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

    public show(): void {
        [
            this.layer5,
            this.layer4,
            this.layer8,
            this.layer6,
            this.layer3,
            this.layer7,
            this.layer9,
            this.layer1,
            this.layer2,
        ].forEach((layer, i) => {
            anime({
                targets: layer.scale,
                x: 1,
                y: 1,
                duration: 300,
                delay: i * 100,
                complete: () => {
                    if (i === 8) {
                        anime({
                            targets: this.house,
                            alpha: 1,
                            duration: 400,
                            easing: 'linear',
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

        [
            this.layer1,
            this.layer2,
            this.layer3,
            this.layer4,
            this.layer5,
            this.layer6,
            this.layer7,
            this.layer8,
            this.layer9,
        ].forEach((layer) => {
            layer.scale.set(0);
        });

        this.house.alpha = 0;
    }
}
