// ============================================================
// FIREBASE INIT & HELPERS
// Depends on: config.js (FIREBASE_CONFIG) being loaded first
// ============================================================
var _fbApp = null;
var _fbDb = null;
var _fbAuth = null;
var _fbEnabled = false;

function fbInit() {
  try {
    // Must use typeof — accessing an undeclared global throws ReferenceError
    if (typeof firebase === "undefined" || !firebase.apps) return;
    if (firebase.apps.length === 0) {
      _fbApp = firebase.initializeApp(FIREBASE_CONFIG);
    } else {
      _fbApp = firebase.apps[0];
    }
    _fbDb = firebase.database(_fbApp);
    _fbAuth = firebase.auth(_fbApp);
    _fbEnabled = true;
  } catch(e) {
    console.warn("Firebase init failed:", e.message);
    _fbEnabled = false;
  }
}
fbInit();
// Retry once the page is fully loaded in case the CDN scripts were slow.
// After fbInit() succeeds, also re-trigger the auth subscription because
// the React useEffect already ran with !_fbEnabled and returned early.
if (!_fbEnabled) {
  window.addEventListener("load", function() {
    if (!_fbEnabled) {
      fbInit();
      // If fbInit succeeded, notify the React app so it can subscribe to auth
      if (_fbEnabled && _fbAuth && window._fbAuthRetryCallback) {
        window._fbAuthRetryCallback();
      }
    }
  });
}

function fbRef(path) { return _fbEnabled && _fbDb ? _fbDb.ref(path) : null; }
function fbSet(path, val) { var r=fbRef(path); if(r) r.set(val); }
function fbUpdate(path, val) { var r=fbRef(path); if(r) r.update(val); }
function fbPush(path, val) { var r=fbRef(path); if(r) return r.push(val); return null; }
function fbOn(path, cb) { var r=fbRef(path); if(r) { r.on('value', snap=>cb(snap.val())); return ()=>r.off('value'); } return ()=>{}; }
function fbOnce(path) { var r=fbRef(path); if(r) return r.once('value').then(s=>s.val()); return Promise.resolve(null); }
function fbRemove(path) { var r=fbRef(path); if(r) r.remove(); }
function fbLimitLast(path, n, cb) { var r=fbRef(path); if(r){var q=r.limitToLast(n);q.on('value',snap=>cb(snap.val()));return()=>q.off('value');}return()=>{}; }
function fbQuery(path, n, cb) { var r=fbRef(path); if(r){var q=r.orderByChild('ts').limitToLast(n);q.on('value',snap=>{var v=snap.val();cb(v?Object.values(v):[]); });return()=>q.off('value');}return()=>{}; }
