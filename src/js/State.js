import './lib/gun.js';
import './lib/sea.js';
import './lib/nts.js';
import './lib/open.js';
import './lib/radix.js';
import './lib/radisk.js';
import './lib/store.js';
import './lib/rindexed.js';

import PeerManager from './PeerManager.js';
import iris from './lib/iris.min.js';

const State = {
  init: function(publicOpts) {
    Gun.log.off = true;
    const o = Object.assign({ peers: PeerManager.getRandomPeers(), localStorage: false, retry:Infinity }, publicOpts);
    this.public = Gun(o);
    if (publicOpts && publicOpts.peers) {
      publicOpts.peers.forEach(url => PeerManager.addPeer({url}));
    }
    this.local = Gun({peers: [], file: 'State.local', multicast:false, localStorage: false}).get('state');
    if (iris.util.isElectron) {
      this.electron = Gun({peers: ['http://localhost:8768/gun'], file: 'State.local', multicast:false, localStorage: false}).get('state');
    }
    window.State = this;
    iris.util.setPublicState && iris.util.setPublicState(this.public);
  }
};

export default State;
