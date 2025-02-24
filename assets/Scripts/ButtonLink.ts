import { _decorator, Component, Node, Button, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ButtonLink')
export class ButtonLink extends Component {
    
    @property()
    iosUrl: string = 'https://apps.apple.com/us/app/ride-master-car-builder-game/id6449224139';

    @property()
    androidUrl: string = 'https://play.google.com/store/apps/details?id=com.LuB.DeliveryConstruct&hl=en';

    start() {
        const button = this.node.getComponent(Button);
        if (button) {
            button.node.on('click', this.openLink, this);
        }
    }

    openLink() {
        // let url;
        
        // if (sys.platform === sys.Platform.IOS) {
        //     url = this.iosUrl;
        // } else if (sys.platform === sys.Platform.ANDROID) {
        //     url = this.androidUrl;
        // } else {
        //     url = this.androidUrl;
        // }

        // sys.openURL(url);
        let url;

        // Определяем платформу через user agent
        const userAgent = navigator.userAgent || navigator.vendor;

        if (/android/i.test(userAgent)) {
            url = this.androidUrl;
        } else if (/iPad|iPhone|iPod/.test(userAgent)) {
            url = this.iosUrl;
        } else {
            url = this.androidUrl; 
        }

        sys.openURL(url);
    }
}