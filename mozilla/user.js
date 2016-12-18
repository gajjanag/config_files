/* Mozilla Firefox can't be bothered to sync all my relevant settings
 * Hence this file to lock down certain settings in the browser
 * Heavily based off of https://github.com/pyllyukko/user.js */

/* Structure: first essential stuff and then ambiguous stuff,
 * divided into categories */

/******************************************************************************
 * HTML5 / APIs / DOM essentials                                              *
 *                                                                            *
 ******************************************************************************/

// Disable information leakage via the geolocation API (this one is at least
// more reasonable than the battery API, and Firefox does take essential steps)
// ref: https://www.mozilla.org/en-US/firefox/geolocation/
user_pref("geo.enabled", false);

// Stupid battery API
// ref: https://developer.mozilla.org/en-US/docs/Web/API/BatteryManager
user_pref("dom.battery.enabled", false);

// Beacon (A stupid API created essentially for tracking purposes)
// Sad thing is this comes from the W3C
// ref: https://developer.mozilla.org/en-US/docs/Web/API/navigator.sendBeacon,
// https://w3c.github.io/beacon
user_pref("beacon.enabled", false);

// Clipboard events API, again no business in a browser, lots of sec concerns
// ref: https://news.ycombinator.com/item?id=9582727,
// https://www.quora.com/How-can-you-copy-to-clipboard-without-Flash
user_pref("dom.event.clipboardevents.enabled", false);

// Navigation timing API, why should users provide this information: devs can
// (and already do) get it by alternative means
// ref: https://wiki.mozilla.org/Security/Reviews/Firefox/NavigationTimingAPI
user_pref("dom.enable_performance", false);

// Text to speech API, main concern is UI elements (invisible microphone bugs)
// and third party server
// ref: https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html,
// https://wiki.mozilla.org/HTML5_Speech_API
user_pref("media.webspeech.recognition.enable", false);

// Sensor API, again same concerns as above
// ref: https://wiki.mozilla.org/Sensor_API
user_pref("device.sensors.enabled", false);

// Ping API, this is a junk API with no value whatsoever unlike above
// moreover, it is a huge privacy hole
// Here at least Firefox does the right thing by disabling by default
// Nevertheless, who can tell down the road, so we forecefully disable it
// ref: http://kb.mozillazine.org/Browser.send_pings,
// http://kb.mozillazine.org/Browser.send_pings.require_same_host
user_pref("browser.send_pings", false);
// should be redundant
user_pref("browser.send_pings.require_same_host", true);

// gamepad API: what is W3C smoking??? Seriously, there is a unhealthy passion
// for doing everything in a browser
// concerns: again, UI elements though here they pose far less a privacy threat
// than e.g sensors/battery/location/speech
// ref: http://www.w3.org/TR/gamepad/
user_pref("dom.gamepad.enabled", false);

// VR devices: ditto, currently off merely due to experimental status and may
// become on by default soon, which we don't want
// ref: https://developer.mozilla.org/en-US/Firefox/Releases/36#Interfaces.2FAPIs.2FDOM
user_pref("dom.vr.enabled", false);

// Notifications API: I could care less about this, the web worked fine without
// it for ages
// ref: https://notifications.spec.whatwg.org/
user_pref("dom.webnotifications.enabled", false);

// WebGL: huge concerns, large attack surface, and no use for people who use
// browsers for work and not games
// ref: http://www.contextis.com/resources/blog/webgl-new-dimension-browser-exploitation
user_pref("webgl.disabled", true);
// related, for pdf.js: if pdf.js actually needs this as a feature or for
// performance, pdf.js may be deemed broken and should not work
// note that current Firefox gets this setting right
user_pref("pdfjs.enableWebGL", false);

// Face detection, same stuff as before. Basically make a browser a kitchen sink.
// ref: https://bugzilla.mozilla.org/show_bug.cgi?id=999396
user_pref("camera.control.face_detection.enabled", false);

// DRM bs
// Terrible stuff for web standards, the topic has been beaten to death
// ref: https://news.ycombinator.com/item?id=11678516
user_pref("media.eme.enabled", false);
user_pref("media.eme.apiVisible", false);

// Preventing hardware based fingerprinting, canvas, fonts, plugins, etc
// ref: https://wiki.mozilla.org/Platform/GFX/HardwareAcceleration
// https://www.macromedia.com/support/documentation/en/flashplayer/help/help01.html
// https://github.com/dillbyrne/random-agent-spoofer/issues/74
user_pref("gfx.direct2d.disabled", true);
user_pref("layers.acceleration.disabled", true);

// getUserMedia
// Yet another API with limited use, but endless possibilities of abuse,
// essentially for capturing local media streams. W3C is drafting something.
// While at it, disable getUserMedia screen sharing
// ref: https://wiki.mozilla.org/Media/getUserMedia,
// https://developer.mozilla.org/en-US/docs/Web/API/Navigator,
// https://w3c.github.io/mediacapture-scenarios/scenarios.html,
// https://mozilla.github.io/webrtc-landing/gum_test.html
user_pref("media.navigator.enabled", false);
user_pref("media.getusermedia.screensharing.enabled", false);

/******************************************************************************
 * HTML5 / APIs / DOM ambiguities (least to most)                             *
 *                                                                            *
 ******************************************************************************/

// Disable dom.mozTCPSocket.enabled (raw TCP socket support)
// ref: https://trac.torproject.org/projects/tor/ticket/18863,
// https://www.mozilla.org/en-US/security/advisories/mfsa2015-97/,
// https://developer.mozilla.org/docs/Mozilla/B2G_OS/API/TCPSocket
user_pref("dom.mozTCPSocket.enabled", false);

// Disable Web Audio API
// Basically, fingerprinting is done via testing FFT execution speed (among
// other things)
// not a widely used API, and certainly is not essential for browsing
// ref: https://bugzil.la/1288359
user_pref("dom.webaudio.enabled", false);

// IndexedDB API for offline storage - unnecessary offline storage should be
// disabled
// ref: https://developer.mozilla.org/en-US/docs/IndexedDB,
// https://wiki.mozilla.org/Security/Reviews/Firefox4/IndexedDB_Security_Review
// NOTE: this is disabled here, however some plugins might get broken
// ref: http://forums.mozillazine.org/viewtopic.php?p=13842047#p13842047
user_pref("dom.indexedDB.enabled", false);

// Disable DOM local storage (the successor to cookies for tracking), after all:
// "the more things change, the more they stay the same"
// ref: http://kb.mozillazine.org/Dom.storage.enabled,
// https://w3c.github.io/webstorage/#dom-localstorage
// NOTE: this does yield some side information (since a website can do feature
// check to determine whether you have this or not),
// Panopticlick (https://panopticlick.eff.org) check in Aug 2015 gave 3 bits
// as an estimate of information from this
// Comment out this line depending on this
//user_pref("dom.storage.enabled", false);

// WebTelephony
// This is meant for sending/receiving phone calls, and is NOT the same as
// WebRTC. There are security issues, e.g placement of calls to high cost
// numbers, routing through high cost network, MITM, legality, etc.
// We force disable this, though this is currently the default.
// ref: https://wiki.mozilla.org/WebAPI/Security/WebTelephony
user_pref("dom.telephony.enabled", false);

// Firefox Hello / WebRTC in general
// There are large concerns about IP address leakage via WebRTC
// ref: https://webrtchacks.com/dear-ny-times/ and many others
// However, it is still far better than proprietary solns, like Skype/GHangouts
// Sadly due to network effects, no one I know uses Firefox Hello anyway and
// everyone uses their favorite junky proprietary solution. Furthermore, there
// have been no addressals of the IP address leakage.
// As such, completely shutdown WebRTC stuff.
user_pref("media.peerconnection.ice.default_address_only", true);
// add another pref for Firefox > 51
// ref: https://bugzilla.mozilla.org/show_bug.cgi?id=1304600
user_pref("media.peerconnection.ice.no_host", true);
user_pref("media.peerconnection.enabled", false);
user_pref("loop.logDomains", false);

// FIXME: "Access Your Location" "Maintain Offline Storage" "Show Notifications"

/******************************************************************************
 * Misc essentials                                                            *
 *                                                                            *
 ******************************************************************************/

// SOCKS remote DNS
// By default, all DNS lookups are performed client side
// They should be performed on a remote proxy server
// Note that this should not affect regular browsing, but only for fancy SOCKS/
// proxy stuff, in which case this needs to be changed from the default
// ref: https://trac.torproject.org/projects/tor/wiki/doc/TorifyHOWTO/WebBrowsers
user_pref("network.proxy.socks_remote_dns", true);

// Do not monitor the connection state of users
user_pref("network.manage-offline-status", false);

// Scripting of Plugins by Javascript
// This opens a whole can of worms and is similar to the universally hated
// ActiveX of IE
// Essentially all security companies recommend this setting that is not done
// by default
// ref: https://benchmarks.cisecurity.org/tools2/CIS_Mozilla_Firefox_Benchmark_v1.0.0.pdf
user_pref("security.xpconnect.plugin.unrestricted", false);

/******************************************************************************
 * Misc ambiguities (least to most)                                           *
 *                                                                            *
 ******************************************************************************/

// Mixed active content
// By default, Firefox blocks all HTTP active content served over HTTPS
// This is very important, since otherwise the HTTPS security model is broken
// to a large extent
// This is forced to ensure that it will not be changed in future updates
// Mixed passive content is a little harder to reason about, and many sites have
// this issue. However, the main one for me (Google) now handles it correctly.
// As such, I block both. See below for more details.
// ref: https://blog.mozilla.org/tanvi/2013/04/10/mixed-content-blocking-enabled-in-firefox-23/
user_pref("security.mixed_content.block_active_content", true);
user_pref("security.mixed_content.block_display_content", true);

// JAR and unsafe file types
// Disable JAR from opening unsafe file types
// (default in Firefox, we force this)
user_pref("network.jar.open-unsafe-types", false);

// Javascript in History URLs
// Not much to say here, pretty esoteric behavior
// (default in Firefox, we force this)
user_pref("browser.urlbar.filter.javascript", true);

// Local file Same Origin Policy
// Set a relatively strict policy on local HTML files and the like
// (default in Firefox, we force this)
// ref: http://kb.mozillazine.org/Security.fileuri.strict_origin_policy
user_pref("security.fileuri.strict_origin_policy", true);

// Autocopy from clipboard
// In hardcore *-nixes (no MACOSX), selecting text automatically copies to
// the clipboard by default
// I have never been able to get this work on Linux consistently, and am
// habituated to the Ctrl+C etc shortcuts
// Furthermore, as this is platform specific, I disable it here
// ref: http://kb.mozillazine.org/Clipboard.autocopy
user_pref("clipboard.autocopy", false);

// Default search engine
// I use duckduckgo as it is reasonably complete and the least invasive as far
// as we know
// Replace by your favorite
user_pref("browser.search.defaultenginename", "DuckDuckGo");
user_pref("browser.search.geoSpecificDefaults", false);
user_pref("browser.search.order.1", "DuckDuckGo");
user_pref("browser.search.order.2", "Bing");
user_pref("browser.search.order.3", "Google");

// asm.js
// asm.js is essentially Firefox's answer to Chrome's NaCl
// They allow essentially arbitrary code to be compiled down to JS (Firefox)
// or asm (NaCl) for fast performance
// really, such things should be handled by native apps
// tons of security vulnerabilities and large attack surface; thankfully it is
// not super popular at the moment due to differences between browser vendors
// ref: http://asmjs.org/,
// https://www.mozilla.org/en-US/security/advisories/mfsa2015-29/,
// https://www.mozilla.org/en-US/security/advisories/mfsa2015-50/,
// https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-2712
user_pref("javascript.options.asmjs", false);

// wasm
// Web Assembly - yet another thing like asm.js, except that Firefox, Google, and
// Microsoft have teamed up together
// Same points apply as with asm.js, only thing is that it is much newer and
// still under active development
// ref: https://en.wikipedia.org/wiki/WebAssembly
user_pref("javascript.options.wasm", false);

// SVG files
// SVG are essentially XML style markup that supports vector graphics
// Great format, but as usual browsers mess this up by allowing embedded JS in
// the SVG file
// One can in theory disable this to reduce attack surface, but it is a popular
// format
// Reduce attack surface somewhat by disabling opentype_svg
// ref: https://www.blackhat.com/docs/us-14/materials/us-14-DeGraaf-SVG-Exploiting-Browsers-Without-Image-Parsing-Bugs.pdf
user_pref("gfx.font_rendering.opentype_svg.enabled", false);

// URL inference (part 1)
// By default, Firefox submits a query to a search engine (default Google) in
// order to infer the correct URL from an incomplete/malformed one if its own
// built-in URL rewrites fail
// Note that Firefox's built in rewrites are quite good
// The privacy implication here is in the search engine's knowledge of the URL
// and its correction and associating it with you in whatever ways are possible
// Thus, we disable this, resulting in an error message instead for badly
// written URLs
// Comment out to allow the default behavior
// ref: http://kb.mozillazine.org/Keyword.enabled#Caveats
user_pref("keyword.enabled", false);

// URL inference (part 2)
// By default, Firefox tries to guess a domain name in order to complete URL's
// e.g http://foo -> http://(prefix)foo(suffix) where prefix=www, suffix=com
// This has had numerous unwanted consequences, and though it perhaps saves the
// user some trouble, has caused far too much trouble for what it is worth
// ref: http://www-archive.mozilla.org/docs/end-user/domain-guessing.html
user_pref("browser.fixup.alternate.enabled", false);

// Disable Firefox Sync
// It is a nice idea, with a terrible implementation
// First off, not all preferences get synced, e.g disabling pocket.
// Second, as soon as one fiddles with cookie settings, it fails, even if
// cookies are still enabled.
user_pref("services.sync.enabled", false);

// Fingerprinting surfaces
// Media statistics
// ref: https://bugzil.la/654550,
// https://github.com/pyllyukko/user.js/issues/9#issuecomment-100468785
// https://github.com/pyllyukko/user.js/issues/9#issuecomment-148922065
user_pref("media.video_stats.enabled", false);
// Build ID
// Value taken from Tor Browser
// ref: https://bugzil.la/583181
user_pref("general.buildID.override", "20100101");
// Font fingerprinting
// ref: http://www.browserleaks.com/fonts,
// https://github.com/pyllyukko/user.js/issues/120
user_pref("browser.display.use_document_fonts", 0);

/******************************************************************************
 * Extensions / Plugins essentials                                            *
 *                                                                            *
 ******************************************************************************/

// Permanently disable Flash; no comment needed.
// Can't believe that Firefox still enables this for all the poor legacy
// websites out there
// Note it is redundant on good Linux distros (e.g Arch/Debian) as they don't
// install it by default
// ref: too many to count!
user_pref("plugin.state.flash", 0);

// Disable add on metadata
// ref: https://blog.mozilla.org/addons/how-to-opt-out-of-add-on-metadata-updates/
user_pref("extensions.getAddons.cache.enabled", false);

/******************************************************************************
 * Extensions / Plugins ambiguities (least to most)                           *
 *                                                                            *
 ******************************************************************************/

// Click to play for plugins
// Always use click to play, and never run a plugin until asked to do so
// (default in Firefox, we force this)
// ref: https://wiki.mozilla.org/Firefox/Click_To_Play,
// https://blog.mozilla.org/security/2012/10/11/click-to-play-plugins-blocklist-style/
user_pref("plugins.click_to_play", true);

// Update addons automatically
// (default in Firefox, we force this)
// ref: https://blog.mozilla.org/addons/how-to-turn-off-add-on-updates/
user_pref("extensions.update.enabled", true);

// Extensions blocklist
// This is retrieved and periodically updated from a Mozilla server (default)
// (default in Firefox, we force this)
// ref: http://kb.mozillazine.org/Extensions.blocklist.enabled
user_pref("extensions.blocklist.enabled", true);

// built in PDF viewer
// I can live without the pdf preview, anyway the file gets downloaded into
// /tmp
// This rec was made on the basis of some CVE that I have no interest in checking,
// hence placed in ambiguities:
// ref: https://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2015-2743
user_pref("pdfjs.disabled", true);

/******************************************************************************
 * Features / Components essentials                                           *
 *                                                                            *
 ******************************************************************************/

// Tracking protection
// ref: https://wiki.mozilla.org/Polaris#Tracking_protection,
// https://support.mozilla.org/en-US/kb/tracking-protection-firefox,
// https://support.mozilla.org/en-US/kb/tracking-protection-pbm
user_pref("privacy.trackingprotection.enabled", true);
user_pref("privacy.trackingprotection.pbmode.enabled", true);

// Health report
// Disable this; see Telemetry note for why I do not send data to Mozilla
// ref: https://support.mozilla.org/en-US/kb/firefox-health-report-understand-your-browser-perf
user_pref("datareporting.healthreport.uploadEnabled", false);
// Disable collection of the data (healthreport.sqlite* files)
user_pref("datareporting.healthreport.service.enabled", false);
// Also flip the "master kill switch" on data uploads
// ref: https://gecko.readthedocs.org/en/latest/toolkit/components/telemetry/telemetry/preferences.html
user_pref("datareporting.policy.dataSubmissionEnabled", false);

// Disable heartbeat (another Firefox feedback mechanism)
// ref: https://wiki.mozilla.org/Advocacy/heartbeat
user_pref("browser.selfsupport.url", "");

// Safe browsing
// Block reported web forgeries/attack sites
// (default in Firefox, we force this)
// ref: http://kb.mozillazine.org/Browser.safebrowsing.enabled,
// http://kb.mozillazine.org/Safe_browsing,
// https://support.mozilla.org/en-US/kb/how-does-phishing-and-malware-protection-work,
// http://forums.mozillazine.org/viewtopic.php?f=39&t=2711237&p=12896849#p12896849,
// http://kb.mozillazine.org/Browser.safebrowsing.malware.enabled
user_pref("browser.safebrowsing.enabled", true);
user_pref("browser.safebrowsing.malware.enabled", true);
// However, the default with respect to downloads makes no sense
// on Linux, downloading crapware is almost impossible especially with my usage
// pattern, and in general education is key, the band-aid is not that great
// and lies at the whims of Google
// Furthermore, safe browsing stuff leaks information to Google
// ref: https://www.mozilla.org/en-US/firefox/39.0/releasenotes/
user_pref("browser.safebrowsing.downloads.remote.enabled", false);

// Remove universally loathed Pocket integration
// ref: https://support.mozilla.org/en-US/kb/save-web-pages-later-pocket-firefox
user_pref("browser.pocket.enabled", false);
// Since Firefox 45 or so need to do some more chicanery
user_pref("extensions.pocket.enabled", false);

/******************************************************************************
 * Features / Components ambiguities (least to most)                          *
 *                                                                            *
 ******************************************************************************/

// Firefox Hello
// I choose to keep this enabled, since the real issue is WebRTC.
// Again, I derive utility that outweighs the IP address leakage issue from
// Firefox Hello
// Comment out to disable
// ref: https://wiki.mozilla.org/Loop
// user_pref("loop.enabled", false);

// Telemetry
// Do not send data to Firefox; I do this as a symbolic protest against the
// bloated, terrible web we are in - I hope that the large mass of security
// stuff drives a simple, better thought out web, roughly inspired by the Lynx
// browser
// (default in Firefox, we force this)
// Comment if you want to send this stuff and help Mozilla
// ref: https://wiki.mozilla.org/Platform/Features/Telemetry,
// https://www.mozilla.org/en-US/legal/privacy/firefox.html#telemetry,
// https://wiki.mozilla.org/Security/Reviews/Firefox6/ReviewNotes/telemetry,
// https://gecko.readthedocs.org/en/latest/toolkit/components/telemetry/telemetry/preferences.html,
// https://wiki.mozilla.org/Telemetry/Experiments
user_pref("toolkit.telemetry.enabled", false);
user_pref("toolkit.telemetry.unified", false);
user_pref("experiments.supported", false);
user_pref("experiments.enabled", false);

// Disable remote debugging
// WebIDE
// ref: https://trac.torproject.org/projects/tor/ticket/16222
user_pref("devtools.webide.enabled", false);
user_pref("devtools.webide.autoinstallADBHelper", false);
user_pref("devtools.webide.autoinstallFxdtAdapters", false);
// general remote debugging
// ref: https://developer.mozilla.org/docs/Tools/Remote_Debugging/Debugging_Firefox_Desktop#Enable_remote_debugging,
// https://developer.mozilla.org/en-US/docs/Tools/Tools_Toolbox#Advanced_settings
user_pref("devtools.debugger.remote-enabled", false);
// "to use developer tools in the context of the browser itself, and not only web content"
user_pref("devtools.chrome.enabled", false);
// ref: https://developer.mozilla.org/en-US/docs/Tools/Remote_Debugging/Debugging_Firefox_Desktop#Firefox_37_onwards
user_pref("devtools.debugger.force-local", true);

// Firefox tiles on new tab
// This one is tricky; I am generally ok with this
// However, a new tab effectively leaks the browsing history of another tab
// I have not found value from Firefox's ads, and they obscure the real scary
// stuff going on in Firefox (pocket integration, etc)
// Again, as a symbolic protest, I disable this stuff
// ref: http://www.thewindowsclub.com/disable-remove-ad-tiles-from-firefox,
// http://forums.mozillazine.org/viewtopic.php?p=13876331#p13876331,
// https://wiki.mozilla.org/Tiles/Technical_Documentation#Ping,
// https://support.mozilla.org/en-US/kb/new-tab-page-show-hide-and-customize-top-sites#w_how-do-i-turn-the-new-tab-page-off,
// https://gecko.readthedocs.org/en/latest/browser/browser/DirectoryLinksProvider.html#browser-newtabpage-directory-ping,
// https://gecko.readthedocs.org/en/latest/browser/browser/DirectoryLinksProvider.html#browser-newtabpage-directory-source
user_pref("browser.newtabpage.enhanced", false);
user_pref("browser.newtabpage.enabled", false);
user_pref("browser.newtab.url", "about:blank");
user_pref("browser.newtab.preload", false);
user_pref("browser.newtabpage.directory.ping", "");
user_pref("browser.newtabpage.directory.source", "data:text/plain,{}");

/******************************************************************************
 * Automatic connections essentials                                           *
 *                                                                            *
 ******************************************************************************/

// GeoIP lookup
// Prevent GeoIP lookup for picking default search engine
// ref: https://support.mozilla.org/en-US/kb/how-stop-firefox-making-automatic-connections
user_pref("browser.search.geoip.url", "");

// Connections to Mozilla snippets
// Disable these unwanted extra connections
// ref: https://support.mozilla.org/en-US/kb/how-stop-firefox-making-automatic-connections
user_pref("browser.aboutHomeSnippets.updateUrl", "");

/******************************************************************************
 * Automatic connections ambiguities (least to most)                          *
 *                                                                            *
 ******************************************************************************/

// Prefetching
// Prefetching could offer speed benefits at the cost of increased memory usage
// However, it has privacy implications (additional "visited" websites),
// possible security implications, is useless and in fact usually detrimental
// on mobile platforms, pay ber byte situations, etc
// Left as ambiguous, since I don't have performance figures
// ref: http://kb.mozillazine.org/Network.prefetch-next,
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ#Is_there_a_preference_to_disable_link_prefetching.3F
user_pref("network.prefetch-next", false);

// DNS prefetching
// Like above, but easier to justify as DNS query packets are small.
// Nevertheless, the same concerns as above hold, and I have not noticed a
// significant performance impact.
// It also places a load on the DNS servers.
// ref: http://kb.mozillazine.org/Network.dns.disablePrefetch,
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Controlling_DNS_prefetching,
// https://www.usenix.org/legacy/event/leet10/tech/full_papers/Krishnan.pdf
user_pref("network.dns.disablePrefetch", true);

// Block dot onion DNS stuff
// this is already being done, we force it
// ref: https://bugzilla.mozilla.org/show_bug.cgi?id=1228457
user_pref("network.dns.blockDotOnion", true);

// Speculative pre-connections
// Yet another prefetch mechanism that we disable
// Note that HTTP/2 obviates most of the purported benefits of this, so it is
// just a matter of time
// ref: https://support.mozilla.org/en-US/kb/how-stop-firefox-making-automatic-connections
user_pref("network.http.speculative-parallel-limit", 0);

// Network predictor
// Less concerning than above from privacy/security viewpoint, nonetheless is
// quite hefty for its supposed benefits
// ref: https://wiki.mozilla.org/Privacy/Reviews/Necko
user_pref("network.predictor.enabled", false);

// Search suggestions
// Search suggestions are sometimes useful; but is anyway useless in a private
// or no persistent history type of scenario
// ref: http://kb.mozillazine.org/Browser.search.suggest.enabled
user_pref("browser.search.suggest.enabled", false);
// Force disable showing search suggestions in location bar
user_pref("browser.urlbar.suggest.searches", false);

// SSDP
// This is a device protocol (think ffmpeg libavdevice) for e.g streaming video
// Nothing I know requires this, and it is in fact disabled by default.
// In particular, Firefox Hello does not require this.
// ref: https://bugzilla.mozilla.org/show_bug.cgi?id=1111967
user_pref("browser.casting.enabled", false);

// OpenH.264
// By default, Firefox downloads an open H.264 implementation on first launch
// Allow this as I do not really care.
// note: must be done as a preconfiguration
// ref: https://support.mozilla.org/en-US/kb/how-stop-firefox-making-automatic-connections#w_media-capabilities,
// http://andreasgal.com/2014/10/14/openh264-now-in-firefox/
// user_pref("media.gmp-gmpopenh264.enabled", false);
// user_pref("media.gmp-manager.url", "");

// Auto updates
// By default, Firefox checks automatically for new updates
// For Arch/Debian users, this setting is irrelevant, and for Windows/MacOS,
// it is essential.
// Thus, enabling it (the default) is not harmful and could be useful
// ref: https://support.mozilla.org/en-US/kb/how-stop-firefox-making-automatic-connections
// user_pref("browser.search.update", false);
// user_pref("app.update.auto", false);

/******************************************************************************
 * HTTP essentials                                                            *
 *                                                                            *
 ******************************************************************************/

// Cookie settings
// Do not allow third party cookies (useful for many advertising networks, but
// note that the bigshots google, facebook, etc can do whatever they want)
// would love to totally block all cookies, but the web is broken and does
// not work for many important sites without them
// ref: http://kb.mozillazine.org/Network.cookie.cookieBehavior#1
user_pref("network.cookie.cookieBehavior", 1);
user_pref("network.cookie.thirdparty.sessionOnly", true);
user_pref("prefs.privacy.disable_button.view_cookies", false);

/******************************************************************************
 * HTTP ambiguities (least to most)                                           *
 *                                                                            *
 ******************************************************************************/

// CSP (Content Security Policy)
// This helps against XSS attacks, packet sniffing, etc
// However, it is still considered experimental and so not enabled by default
// Some portions of this are enabled by default, we force both portions.
// ref: https://bugzilla.mozilla.org/show_bug.cgi?id=855326,
//https://developer.mozilla.org/en-US/docs/Web/Security/CSP/Introducing_Content_Security_Policy
user_pref("security.csp.enable", true);
user_pref("security.csp.experimentalEnabled", true);
// user_pref("security.csp.enable", true);

// DNT (Do Not Track)
// Do Not Track is a flawed concept with very good intentions
// The reason it is flawed is that websites are not bound to obey DNT, and even
// worse DNT can be used for browser fingerprinting
// In other words, a website who cares enough to respect this will not need DNT
// anyway, while websites who don't could fingerprint off this
// Thus, we force it off (the default).
// ref: // http://dnt.mozilla.org/,
// https://en.wikipedia.org/wiki/Do_not_track_header,
// https://dnt-dashboard.mozilla.org,
// https://github.com/pyllyukko/user.js/issues/11
user_pref("privacy.donottrackheader.enabled", false);
user_pref("noscript.doNotTrack.enabled", false);

// Referer header
// This is unfortunately needed by many websites, though it is a privacy concern.
// In particular, Wolfram Alpha needs it.
// We don't disable it, but keep it slightly more controlled than the default
// by spoofing it - this works on all websites I care about.
// Also, on SSL website, we always disable it per the CIS link listed here.
// ref: http://kb.mozillazine.org/Network.http.sendRefererHeader#0,
// https://bugzilla.mozilla.org/show_bug.cgi?id=822869
// user_pref("network.http.sendRefererHeader", 1);
// Send a referer header with the target URI as the source, thus spoofing it
user_pref("network.http.referer.spoofSource", true);

// User agent spoofing
// This is very useful especially for Linux users, since the user agent
// reveals many bits of information (9+ as per panopticlick). Hence, we spoof
// ourselves to be like Windows running Firefox. If you want to take this further,
// you could spoof the browser to be the most popular one, namely Safari/Mac.
// However, this may lead to breakage.
// Of course, feature detection via JavaScript may be done to fingerprint.
// Nevertheless, most of the time I run JScript disabled, so I find this
// an acceptible tradeoff.
// Furthermore, it is needed for the web version of TurboTax.
// ref: https://github.com/gorhill/uMatrix/wiki/Latest-user-agent-strings
// user_pref("general.useragent.override", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:39.0) Gecko/20100101 Firefox/39.0");
// user_pref("general.useragent.override", "Mozilla/5.0 (Android; Linux armv7l; rv:9.0) Gecko/20111216 Firefox/9.0 Fennec/9.0");

/******************************************************************************
 * Caching essentials                                                         *
 *                                                                            *
 ******************************************************************************/

// Offline cache
// Do not store offline cache.
// ref: http://kb.mozillazine.org/Browser.cache.offline.enable
user_pref("browser.cache.offline.enable", false);

// Clear history on close (most things cleared by default, but we lock them).
// For passwords, I use a separate password managaer - a separate password
// manager is anyway useful for offline stuff, and sufficient for browsing as well
// ref: https://support.mozilla.org/en-US/kb/Clear%20Recent%20History#w_how-do-i-make-firefox-clear-my-history-automatically
user_pref("privacy.sanitize.sanitizeOnShutdown", true);
user_pref("privacy.clearOnShutdown.cache", true);
user_pref("privacy.clearOnShutdown.cookies", true);
user_pref("privacy.clearOnShutdown.downloads", true);
user_pref("privacy.clearOnShutdown.formdata", true);
user_pref("privacy.clearOnShutdown.history", true);
user_pref("privacy.clearOnShutdown.offlineApps", true);
user_pref("privacy.clearOnShutdown.passwords", true);
user_pref("privacy.clearOnShutdown.sessions", true);
user_pref("privacy.clearOnShutdown.siteSettings", true);
// Don't remember browsing history.
user_pref("places.history.enabled", false);

// Make all cookies session cookies
// By default, Firefox uses originating server's policy
// Well, we know how this turns out: e.g google sets an INSANE 2-3 year
// expiration policy on their cookies! We have to stop this
user_pref("network.cookie.lifetimePolicy", 2);

// Caching of SSL pages
// This is essential to disable - SSL pages often contain sensitive information.
// ref: CIS Version 1.2.0 October 21st, 2011 2.5.8 Disable Caching of SSL Pages,
// http://kb.mozillazine.org/Browser.cache.disk_cache_ssl
user_pref("browser.cache.disk_cache_ssl", false);

// Page thumbnail generation
// We already prevent page thumbnail display; force the prevention of capture
// apparently Firefox has prefs not exposed in about:config, and this is one
// of them (TODO: verify)?
// ref: https://developer.mozilla.org/en-US/docs/Mozilla/Preferences/Preference_reference/browser.pagethumbnails.capturing_disabled,
// https://support.mozilla.org/en-US/questions/973320
user_pref("browser.pagethumbnails.capturing_disabled", true);

/******************************************************************************
 * Caching ambiguities (least to most)                                        *
 *                                                                            *
 ******************************************************************************/

// Private browsing
user_pref("browser.privatebrowsing.autostart", true);

// Temp files
// Always delete temp files on exit; default in Firefox, we force it
// ref: https://bugzil.la/238789#c19
user_pref("browser.helperApps.deleteTempFileOnExit", true);

// Browser disk cache
// Kill browser disk cache (have not noticed any visible slowdown,
// reduces SSD wear and/or magnetic drive fragmentation). Furthermore, it is
// an unnecessary information leakage.
user_pref("browser.cache.disk.enable", false);

// Extra session data
// Do not store extra session data.
// ref: CIS Version 1.2.0 October 21st, 2011 2.5.7 Clear SSL Form Session Data,
// http://kb.mozillazine.org/Browser.sessionstore.privacy_level#2
// note: CIS says 1, we use 2
user_pref("browser.sessionstore.privacy_level", 2);
// Remove the session store entirely.
// ref: https://news.ycombinator.com/item?id=12565023,
// http://kb.mozillazine.org/Browser.sessionstore.enabled
user_pref("browser.sessionstore.max_tabs_undo", 0);
user_pref("browser.sessionstore.max_windows_undo", 0);

// Form fill
// Do not allow Firefox to remember forms
// ref: CIS Version 1.2.0 October 21st, 2011 2.5.6 Delete Search and Form History
user_pref("browser.formfill.enable", false);
user_pref("browser.formfill.expire_days", 0);

// Remember signons
// I use a password manager for this
// ref: CIS Version 1.2.0 October 21st, 2011 2.5.2 Disallow Credential Storage
user_pref("signon.rememberSignons", false);

/******************************************************************************
 * UI essentials                                                              *
 *                                                                            *
 ******************************************************************************/

// Outdated plugins
// Users should be notified of outdated plugins; this is very important for
// security.
// However, Firefox's implementation of this sucks, they open a new tab
// every time I launch the browser, saying "plugins are up to date or some such
// useless message".
// Look, I don't care when my plugins are up to date, I want to know ONLY
// when they are not.
// ref: CIS Version 1.2.0 October 21st, 2011 2.1.2 Enable Auto Notification of Outdated Plugins
// https://wiki.mozilla.org/Firefox3.6/Plugin_Update_Awareness_Security_Review
user_pref("plugins.update.notifyUser", false);

// Auto-fill of forms
// Do not autofill forms until username has been entered.
user_pref("signon.autofillForms", false);

// IDN (Internationalized Domain Name)
// Pretty important for security: by default Firefox displays IDNs in their
// "intended" unicode form. However, it is very easy to spoof by using letters
// from non-ASCII whose font is very similar to the standard font
// Thus we force the display of the "raw" punycode representation to guard
// against such spoofing
// ref: CIS Mozilla Firefox 24 ESR v1.0.0 - 3.6 Enable IDN Show Punycode
// http://kb.mozillazine.org/Network.IDN_show_punycode
user_pref("network.IDN_show_punycode", true);

// CSS history leak
// Prevent CSS from leaking history, for whatever reason Firefox does not plug
// this leak by default
// ref: https://blog.mozilla.org/security/2010/03/31/plugging-the-css-history-leak/,
// http://dbaron.org/mozilla/visited-privacy
user_pref("layout.css.visited_links_enabled", false);

/******************************************************************************
 * UI ambiguities (least to most)                                             *
 *                                                                            *
 ******************************************************************************/

// Disable modification of right-click menu
// This is made ambiguous as I am certainly cautious enough to not fall into
// silly traps like this
// However, for general users, this can give a security benefit at minimal
// usability cost
// Thus for me the default is ok
// user_pref("dom.event.contextmenu.enabled", false);

// Downloads
// Disable Downloading on Desktop
// This is even sillier for me, since my "Desktop" folder is really just another
// dir, and I don't use a conventional Desktop
// However, this is useful for general Windows users who are used to clicking
// and installing random stuff - it adds an additional hoop to go through in
// order to install stuff from the net (they need to migrate to the Downloads
// folder)
// Apparently this is a CIS rec, must have been one of those easy ones that
// help "beef up" their report and give the impression that they do real work
// In short, I change this to always download to "Desktop",
// ref: CIS 2.3.2 Disable Downloading on Desktop,
// http://kb.mozillazine.org/About:config_entries#Browser.
user_pref("browser.download.folderList", 0);
// Prompt for downloads
// I get irritated by this, and prefer to clean up my download dir manually
// whenever I feel like it
// I see no benefit in this, and leave it at the default (no prompt)
// ref: https://developer.mozilla.org/en/Download_Manager_preferences
user_pref("browser.download.useDownloadDir", true);

// Always keep Firefox as a default: in spite of all its flaws, Firefox based
// browsers are the best of the lot.
// For instance, all the "hardcore" browsers like Iceweasel, IceCat, and the
// Tor browser are based off a Firefox codebase.
// However, no need to waste cycles actually doing the check each time.
user_pref("browser.shell.checkDefaultBrowser", false);

// Autocomplete
// Autocomplete has limited use for me since I keep no history
// I thus disable it, comment out to restore default behavior
// ref: http://kb.mozillazine.org/About:config_entries#Browser,
// http://kb.mozillazine.org/Inline_autocomplete,
// http://kb.mozillazine.org/Disabling_autocomplete_-_Firefox#Firefox_3.5
user_pref("browser.urlbar.autoFill", false);
user_pref("browser.urlbar.autoFill.typed", false);
user_pref("browser.urlbar.autocomplete.enabled", false);
// Also disable autocompleting via bookmarks which I find annoying
// ref: http://www.labnol.org/software/browsers/prevent-firefox-showing-bookmarks-address-location-bar/3636/,
// http://kb.mozillazine.org/Browser.urlbar.maxRichResults
user_pref("browser.urlbar.maxRichResults", 0);

// Very low level stuff generally handled well by Firefox.
// This sort of stuff is "the easy side" of crypto, and generally responsible
// projects (hoping Firefox is such) handle these things appropriately.
// Furthermore, practical attacks rarely target low level crypto primitives,
// and due to above they generate high publicity, leading to rapid patches.
// The "hard side" involving user interaction is where most projects fail,
// and Firefox is no exception.
// As such, only noted for things not already set as defaults on the latest
// Firefox release, i.e we do not "force defaults".

// NOTE: Ciphers are not addressed. They typically generate the most amount of
// press anyway, and Firefox typically does a reasonable job. I am also a bit
// skeptical of the refusal of 128 bit suites in pyllyukko/user.js, there
// are many experts who think it is fine for now; though perhaps not in a post
// quantum world.

/******************************************************************************
 * TLS / HTTPS / OCSP essentials                                              *
 *                                                                            *
 ******************************************************************************/

// Treat unsafe SSL negotiation as broken. The indicator is useless as protection,
// but helps raise awareness of servers that need upgrading.
// Going further with this makes browsing nearly impossible, the web is that
// broken, see the ambiguities require_safe_negotiation.
// ref: https://wiki.mozilla.org/Security:Renegotiation#security.ssl.treat_unsafe_negotiation_as_broken,
// CVE-2009-3555
user_pref("security.ssl.treat_unsafe_negotiation_as_broken", true);

/******************************************************************************
 * TLS / HTTPS / OCSP  ambiguities (least to most)                            *
 *                                                                            *
 ******************************************************************************/

// OCSP
// Forcing revocation check via OCSP may not be a great idea, as it leaks
// information about sites visited to the CA. OCSP stapling is a reasonable
// alternative. Change if desired.
// ref: https://blog.mozilla.org/security/2013/07/29/ocsp-stapling-in-firefox/
// user_pref("security.OCSP.require", true);

// Certificate pinning
// The default, which allows user MITM (pinning not enforced if the trust anchor
// is a user inserted CA) seems mostly fine. I have not yet had site breakage
// for a strict level, so why not set it higher and always force pinning.
// ref: https://wiki.mozilla.org/SecurityEngineering/Public_Key_Pinning#How_to_use_pinning
user_pref("security.cert_pinning.enforcement_level", 2);

// disallow SHA-1
// ref: https://bugzilla.mozilla.org/show_bug.cgi?id=1302140
user_pref("security.pki.sha1_enforcement_level", 1);

// Safe SSL negotiation
// this makes browsing next to impossible=) (13.2.2012)
// update: the world is not ready for this! (6.5.2014)
// ref: https://wiki.mozilla.org/Security:Renegotiation#security.ssl.require_safe_negotiation,
// CVE-2009-3555
// user_pref("security.ssl.require_safe_negotiation", true);
