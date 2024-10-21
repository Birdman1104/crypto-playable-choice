import { Container } from 'pixi.js';
import { MainHead } from './MainHead';

export class MainGuy extends Container {
    private head: MainHead;

    constructor() {
        super();

        this.build();
    }

    public idle(): void {
        console.log('idle');
    }

    private build(): void {
        this.head = new MainHead();
        this.head.happy();
        this.addChild(this.head);
    }
}
