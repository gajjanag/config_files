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

// WebGL: huge concerns, large attack surface, and no use for people who use
// browsers for work and not games
// ref: http://www.contextis.com/resources/blog/webgl-new-dimension-browser-exploitation
user_pref("webgl.disabled", true);
// related, for pdf.js: if pdf.js actually needs this as a feature or for
// performance, pdf.js may be deemed broken and should not work
// note that current Firefox gets this setting right
user_pref("pdfjs.enableWebGL", false);

/******************************************************************************
 * HTML5 / APIs / DOM ambiguities (least to most)                             *
 *                                                                            *
 ******************************************************************************/

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
user_pref("dom.storage.enabled", false);

// Firefox Hello / WebRTC in general
// There are large concerns about IP address leakage via WebRTC
// ref: https://webrtchacks.com/dear-ny-times/ and many others
// However, it is still far better than proprietary solns, like Skype/GHangouts
// Note that uBlock Origin has a dialog box to block such IP address harvesting
// Although uBlock can't be perfect, for now I view this as a reasonable
// compromise
// Uncomment to disable WebRTC
// user_pref("media.peerconnection.enabled", false);
// getUserMedia (again, uncomment to disable WebRTC)
// ref: https://wiki.mozilla.org/Media/getUserMedia,
// https://developer.mozilla.org/en-US/docs/Web/API/Navigator
// user_pref("media.navigator.enabled", false);

// TODO: "Access Your Location" "Maintain Offline Storage" "Show Notifications"


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
// this issue (even the almighty Google); see below for this
// ref: https://blog.mozilla.org/tanvi/2013/04/10/mixed-content-blocking-enabled-in-firefox-23/
user_pref("security.mixed_content.block_active_content", true);

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
// Change accordingly to enable
// ref: http://kb.mozillazine.org/Clipboard.autocopy
user_pref("clipboard.autocopy", false);

// Proxy settings
// By default, in Linux Firefox uses the system proxy settings
// You can change this accordingly for Windows and/or if you use a proxy
// configuration tool
// To force a direct connection, uncomment this
// ref: http://kb.mozillazine.org/Network.proxy.type
// user_pref("network.proxy.type", 0);

// Default search engine
// I use duckduckgo as it is reasonably complete and the least invasive as far
// as we know
// Replace by your favorite
user_pref("browser.search.defaultenginename", "DuckDuckGo");

// asm.js
// asm.js is essentially Firefox's answer to Chrome's NaCl
// They allow essentially arbitrary code to be compiled down to JS (Firefox)
// or asm (NaCl) for fast performance
// really, such things should be handled by native apps
// tons of security vulnerabilities and large attack surface; thankfully it is
// not super popular at the moment due to differences between browser vendors
// Change accordingly based on need
// ref: http://asmjs.org/,
// https://www.mozilla.org/en-US/security/advisories/mfsa2015-29/,
// https://www.mozilla.org/en-US/security/advisories/mfsa2015-50/,
// https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-2712
user_pref("javascript.options.asmjs", false);

// SVG files
// SVG are essentially XML style markup that supports vector graphics
// Great format, but as usual browsers mess this up by allowing embedded JS in
// the SVG file
// One can in theory disable this to reduce attack surface, but it is a popular
// format
// Reduce attack surface somewhat by disabling opentype_svg
// Change accordingly based on need
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

// Mixed passive content
// By default, Firefox does not block HTTP passive content (images, audio, etc)
// served over HTTPS
// This is still a security concern, but a much smaller one than the active
// content issue
// Note that this is ambiguous since many sites have issues with this, even
// Google after many years!
// Comment out to stop blocking such insecurely delivered content
// ref: https://blog.mozilla.org/tanvi/2013/04/10/mixed-content-blocking-enabled-in-firefox-23/
user_pref("security.mixed_content.block_display_content", true);

/******************************************************************************
 * Extensions / Plugins essentials                                            *
 *                                                                            *
 ******************************************************************************/

// Permanently disable Flash; no comment needed
// Can't believe that Firefox still enables this for all the poor legacy
// websites out there
// Note it is redundant on good Linux distros (e.g Arch/Debian) as they don't
// install it by default
// ref: too many to count!
user_pref("plugin.state.flash", 0);

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

/******************************************************************************
 * Features / Components essentials                                           *
 *                                                                            *
 ******************************************************************************/

// Tracking protection
// ref: https://wiki.mozilla.org/Polaris#Tracking_protection,
// https://support.mozilla.org/en-US/kb/tracking-protection-firefox
user_pref("privacy.trackingprotection.enabled", true);

// Health report
// Disable this; see Telemetry note for why I do not send data to Mozilla
// ref: https://support.mozilla.org/en-US/kb/firefox-health-report-understand-your-browser-perf
user_pref("datareporting.healthreport.uploadEnabled", false);
// Disable collection of the data (healthreport.sqlite* files)
user_pref("datareporting.healthreport.service.enabled", false);

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
// pattern
// Furthermore, safe browsing stuff leaks information to Google
// ref: https://www.mozilla.org/en-US/firefox/39.0/releasenotes/
user_pref("browser.safebrowsing.downloads.enabled", false);

// Remove universally loathed Pocket integration
// ref: https://support.mozilla.org/en-US/kb/save-web-pages-later-pocket-firefox
user_pref("browser.pocket.enabled", false);

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
// https://wiki.mozilla.org/Security/Reviews/Firefox6/ReviewNotes/telemetry
user_pref("toolkit.telemetry.enabled", false);

// Firefox tiles on new tab
// This one is tricky; I am generally ok with this
// However, a new tab effectively leaks the browsing history of another tab
// I have not found value from Firefox's ads, and they obscure the real scary
// stuff going on in Firefox (pocket integration, etc)
// Again, as a symbolic protest, I disable this stuff
// ref: http://www.thewindowsclub.com/disable-remove-ad-tiles-from-firefox,
// http://forums.mozillazine.org/viewtopic.php?p=13876331#p13876331,
// https://wiki.mozilla.org/Tiles/Technical_Documentation#Ping,
// https://support.mozilla.org/en-US/kb/new-tab-page-show-hide-and-customize-top-sites#w_how-do-i-turn-the-new-tab-page-off
user_pref("browser.newtabpage.enhanced", false);
user_pref("browser.newtabpage.enabled", false);
user_pref("browser.newtab.url", "about:blank");
user_pref("browser.newtab.preload", false);
user_pref("browser.newtabpage.directory.ping", "");

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
// Like above, but easier to justify as DNS query packets are small
// Nevertheless, the same concerns as above hold, and I have not noticed a
// significant performance impact
// ref: http://kb.mozillazine.org/Network.dns.disablePrefetch,
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Controlling_DNS_prefetching,
// https://www.usenix.org/legacy/event/leet10/tech/full_papers/Krishnan.pdf
user_pref("network.dns.disablePrefetch", true);

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

// SSDP
// This is a device protocol (think ffmpeg libavdevice) for e.g streaming video
// I believe Firefox Hello requires this, hence enabled
// Change accordingly to disable
// ref: https://bugzilla.mozilla.org/show_bug.cgi?id=1111967
// user_pref("browser.casting.enabled", false);

// OpenH.264
// By default, Firefox downloads an open H.264 implementation on first launch
// Allow this as I do not really care
// UI, suffer from buffering issues, etc)
// Change accordingly to enable (note: must be done as a preconfiguration)
// ref: https://support.mozilla.org/en-US/kb/how-stop-firefox-making-automatic-connections#w_media-capabilities,
// http://andreasgal.com/2014/10/14/openh264-now-in-firefox/
// user_pref("media.gmp-gmpopenh264.enabled", false);
// user_pref("media.gmp-manager.url", "");

// Auto updates
// By default, Firefox checks automatically for new updates
// For Arch/Debian users, this setting is irrelevant, and for Windows/MacOS,
// it is essential
// Thus, enabling it (the default) is not harmful and could be useful
// Uncomment if you REALLY want to disable automatic updates
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
user_pref("network.cookie.lifetimePolicy", 2);

/******************************************************************************
 * HTTP ambiguities (least to most)                                           *
 *                                                                            *
 ******************************************************************************/

// CSP (Content Security Policy)
// This helps against XSS attacks, packet sniffing, etc
// However, it is still considered experimental and so not enabled by default
// Some portions of this are enabled by default, we force only the experimental
// portion
// ref: https://bugzilla.mozilla.org/show_bug.cgi?id=855326,
//https://developer.mozilla.org/en-US/docs/Web/Security/CSP/Introducing_Content_Security_Policy
user_pref("security.csp.experimentalEnabled", true);
// Change below to match desired behavior
// user_pref("security.csp.enable", true);

// DNT (Do Not Track)
// Do Not Track is a flawed concept with very good intentions
// The reason it is flawed is that websites are not bound to obey DNT, and even
// worse DNT can be used for browser fingerprinting
// In other words, a website who cares enough to respect this will not need DNT
// anyway, while websites who don't could fingerprint off this
// Thus, we leave it turned off (the default), uncomment to change
// ref: // http://dnt.mozilla.org/,
// https://en.wikipedia.org/wiki/Do_not_track_header,
// https://dnt-dashboard.mozilla.org,
// https://github.com/pyllyukko/user.js/issues/11
// user_pref("privacy.donottrackheader.enabled", true);

/******************************************************************************
 * Caching essentials                                                            *
 *                                                                            *
 ******************************************************************************/

/******************************************************************************
 * Caching ambiguities (least to most)                                           *
 *                                                                            *
 ******************************************************************************/

/******************************************************************************
 * UI essentials                                                            *
 *                                                                            *
 ******************************************************************************/

// Outdated plugins
// Users should be notified of outdated plugins; this is very important for
// security
// No idea why Firefox does not enable this by default
// ref: CIS Version 1.2.0 October 21st, 2011 2.1.2 Enable Auto Notification of Outdated Plugins
// https://wiki.mozilla.org/Firefox3.6/Plugin_Update_Awareness_Security_Review
user_pref("plugins.update.notifyUser", true);

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

// Incomplete SSL
// Warn about SSL that does not implement RFC 5746
// This is the default in Firefox, we force it to make sure
// ref: https://developer.mozilla.org/en/Preferences/Mozilla_preferences_for_uber-geeks
// see also CVE-2009-3555
user_pref("security.ssl.warn_missing_rfc5746", 1);

/******************************************************************************
 * UI ambiguities (least to most)                                           *
 *                                                                            *
 ******************************************************************************/

// Disable modification of right-click menu
// This is made ambiguous as I am certainly cautious enough to not fall into
// silly traps like this
// However, for general users, this can give a security benefit at minimal
// usability cost
// Thus for me the default is ok, uncomment to change this
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
// change accordingly for desired behavior
// ref: CIS 2.3.2 Disable Downloading on Desktop,
// http://kb.mozillazine.org/About:config_entries#Browser.
user_pref("browser.download.folderList", 0);
// Prompt for downloads
// I get irritated by this, and prefer to clean up my download dir manually
// whenever I feel like it
// I see no benefit in this, and leave it at the default (no prompt)
// uncomment to change this
// ref: https://developer.mozilla.org/en/Download_Manager_preferences
// user_pref("browser.download.useDownloadDir", true);

// Always keep Firefox as a default: in spite of all its flaws, Firefox based
// browsers are the best of the lot
// For instance, all the "hardcore" browsers like Iceweasel, IceCat, and the
// Tor browser are based off a Firefox codebase
// I see no harm in this, but some of you may want to change this
user_pref("browser.shell.checkDefaultBrowser", true);

// Autocomplete
// Autocomplete has limited use for me since I keep no history
// I thus disable it, comment out to restore default behavior
// ref: http://kb.mozillazine.org/About:config_entries#Browser,
// http://kb.mozillazine.org/Inline_autocomplete,
// http://kb.mozillazine.org/Disabling_autocomplete_-_Firefox#Firefox_3.5
user_pref("browser.urlbar.autoFill", false);
user_pref("browser.urlbar.autoFill.typed", false);
user_pref("browser.urlbar.autocomplete.enabled", true);
// Also disable autocompleting via bookmarks which I find annoying
// ref: http://www.labnol.org/software/browsers/prevent-firefox-showing-bookmarks-address-location-bar/3636/,
// http://kb.mozillazine.org/Browser.urlbar.maxRichResults
user_pref("browser.urlbar.maxRichResults", 0);

// Currently view as at being too low a level and too frequently updated
// to be sustainable
// This sort of stuff is "the easy side" of crypto, and generally responsible
// projects (hoping Firefox is such) handle these things appropriately
// Furthermore, practical attacks rarely target low level crupto primitives,
// and due to above they generate high publicity, leading to rapid patches.
// The "hard side" involving user interaction is where most projects fail,
// and Firefox is no exception.
// For now, do not impose anything.
// TODO: revisit this if needed.

/******************************************************************************
 * TLS / HTTPS / OCSP essentials                                                            *
 *                                                                            *
 ******************************************************************************/

// See above general comments

/******************************************************************************
 * TLS / HTTPS / OCSP  ambiguities (least to most)                                           *
 *                                                                            *
 ******************************************************************************/

// See above general comments

/******************************************************************************
 * Ciphers essentials                                                            *
 *                                                                            *
 ******************************************************************************/

// See above general comments

/******************************************************************************
 * Ciphers  ambiguities (least to most)                                           *
 *                                                                            *
 ******************************************************************************/

// See above general comments


// Make all cookies session cookies
// By default, Firefox uses originating server's policy
// Well, we know how this turns out: e.g google sets an INSANE 2-3 year
// expiration policy on their cookies! We have to stop this
user_pref("network.cookie.lifetimePolicy", 2);
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Browsing history settings
// Clear on shutdown (most things cleared by default)
user_pref("privacy.sanitize.sanitizeOnShutdown", true);

// Additional clearing
user_pref("privacy.clearOnShutdown.offlineApps", true);
user_pref("privacy.clearOnShutdown.siteSettings", true);
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// More ambiguous settings


////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Less essential
// Kill browser cache (have not noticed any visible slowdown,
// reduces SSD wear and/or magnetic drive fragmentation
user_pref("browser.cache.disk.enable", false);

// Place all downloads in Desktop folder: Desktop folder is anyway created
// on most OS configurations, is quicker to access, and unifies the location of
// "temporary" stuff
// NOTE: this is not cross platform!
user_pref("browser.download.dir", "/home/gajjanag/Desktop");

////////////////////////////////////////////////////////////////////////////////