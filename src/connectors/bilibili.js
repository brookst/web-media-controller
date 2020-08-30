import BaseConnector from 'content/base-connector';
import Utils from 'content/utils';
import _ from 'underscore';

const connector = new class extends BaseConnector {
    constructor() {
        super();

        this.name = 'Bilibili';
        this.prefix = '/com/bilibili';

        this.artistSelector = 'a[class*="name"]';
        this.titleSelector = 'h1';

        this.currentTimeSelector = '.bilibili-player-video-time-now';
        this.lengthSelector = '.bilibili-player-video-time-total';

        this.playButtonSelector =
            '.bilibili-player-video-btn.bilibili-player-video-btn-start';
        this.nextButtonSelector = '.bilibili-player-video-btn-next';

        this.playerSelector = 'div#bofqi';
    }

    get playbackStatus() {
        return Utils.query('.bilibili-player-video-btn').then((elem) => {
            if (elem.classList.contains('video-state-pause')) {
                return 'paused';
            } else {
                return 'playing';
            }
        });
    }

    get controlsInfo() {
        const hasNextButton =
            document.querySelector(this.nextButtonSelector) !== null;
        return super.controlsInfo.then((controlsInfo) => _(controlsInfo).extend({
            canGoPrevious: false,
            canSeek: false,
            canStop: false,
            canGoNext: hasNextButton,
        }),
        );
    }
}();

connector.start();
