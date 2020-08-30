import BaseConnector from 'content/base-connector';
import Utils from 'content/utils';

const connector = new class extends BaseConnector {
    constructor() {
        super();

        this.name = 'Spotify';
        this.prefix = '/com/spotify';

        this.artistsSelector = '.Root__now-playing-bar [dir="auto"]:last-child a';
        this.titleSelector = '.Root__now-playing-bar [dir="auto"]:first-child a';

        this.currentTimeSelector = '.playback-bar__progress-time:first-child';
        this.lengthSelector = '.playback-bar__progress-time:last-child';

        this.playButtonSelector = '.control-button[class*="spoticon-play-"],.control-button[class*="spoticon-pause-"]';

        this.prevButtonSelector = '.control-button[class*="spoticon-skip-back-"]';
        this.nextButtonSelector = '.control-button[class*="spoticon-skip-forward-"]';
        this.artSelector = '.now-playing__cover-art .cover-art-image';

        this.playerSelector = '.now-playing-bar';
    }

    get playbackStatus() {
        return Utils.query('.player-controls__buttons').then((elem) => {
            const playButton = elem.querySelector('.control-button[class*="spoticon-play-"]');
            if (playButton) {
                return 'paused';
            }

            return 'playing';
        });
    }
}();

connector.start();
