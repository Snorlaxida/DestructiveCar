import { _decorator, Component, Node, tween, UIOpacity, Vec3 } from 'cc';
import { PlayerController } from './PlayerController';
const { ccclass, property } = _decorator;

@ccclass('GameState')
export class GameState extends Component {
    @property(Node)
    gameUi: Node = null;

    @property(Node)
    retryUi: Node = null;

    @property(Node)
    shadowUi: Node = null;

    // @property(Node)
    // car: Node = null;

    private pulseTween: any = null;
    // private carMovement: PlayerController = null;


    start() {
        
    }

    gameOver() {
        // this.carMovement = this.car.getComponent(PlayerController);
        // this.carMovement.setSpeed(0);
        this.fadeOutGameUi();
        this.showRetryUi();
        this.showDarkOverlay();
    }

    fadeOutGameUi() {
        const uiOpacity = this.gameUi.getComponent(UIOpacity);
        if (uiOpacity) {
            tween(uiOpacity)
                .to(1, { opacity: 0 }, { easing: 'sineInOut' }) 
                .start();
        }
    }

    showRetryUi() {
        if (this.retryUi) {
            this.retryUi.active = true; 
            this.retryUi.setScale(new Vec3(0, 0, 0));
            tween(this.retryUi)
                .to(1, { scale: new Vec3(1, 1, 1) }, { easing: 'sineOut' })
                .call(() => this.startPulse())
                .start();
        }
    }
    startPulse() {
        this.pulseTween = tween(this.retryUi)
            .to(0.5, { scale: new Vec3(1.1, 1.1, 1) }, { easing: 'sineInOut' })
            .to(0.5, { scale: new Vec3(1, 1, 1) }, { easing: 'sineInOut' })
            .union() 
            .repeatForever()
            .start();
    }

    showDarkOverlay() {
        this.shadowUi.active = true; 
        const uiOpacity = this.shadowUi.getComponent(UIOpacity);
        if (uiOpacity) {
            tween(uiOpacity)
                .to(1, { opacity: 100 }, { easing: 'sineInOut' }) 
                .start();
        }
    }
}


