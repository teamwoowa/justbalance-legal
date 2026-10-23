# On That Note — Privacy Policy

**UNPUBLISHED REVIEW DRAFT — 23 October 2026. Not an effective policy.**
The current local review build does not have a public leaderboard connection, production advertising, or production in-app billing enabled. Sections describing those optional services are proposed launch disclosures. Do not publish or enter this draft as an AdMob privacy URL until the release gates in PRIVACY_POLICY_REVIEW.md are resolved.

## 1. Who is responsible
On That Note is developed under the name **Woowa**. Privacy contact: **team.woowa@gmail.com**.

[Before publication: identify the actual legal person/entity responsible for processing and provide the appropriate contact/address details. The developer display name alone has not been verified as the complete controller identity.]

## 2. Playing without an account
You do not need to create a login account or provide an email address to play. Your device stores game settings, calibration, progress, local scores, your selected nickname, local diagnostic files, and data needed to manage pending leaderboard submissions.

The game generates a random installation credential rather than asking for your name or using a hardware identifier as your leaderboard login. This credential is not your advertising ID. Please do not send installation credentials, purchase tokens, passwords, or authentication codes in support emails.

## 3. Optional online leaderboard
**Proposed disclosure for activation; not enabled in the current local review build.**

When you use an online leaderboard, the service processes a random installation credential, a session/ticket identifier, game and chart/ruleset identifiers, timing calibration where applicable, and input timing/type/hand information needed to validate the score. Starting a ranked round and checking eligibility may send verification data before you choose whether to publish a score. Choosing not to publish does not undo data already sent for verification.

The server derives a pseudonymous player identifier from the installation credential and links it to your ranking records. These are not guaranteed to be irreversibly anonymous records. The current candidate also returns a shortened player identifier with leaderboard rows, which can link records across boards. [Before publication: confirm the final public identifier contract and revise this paragraph if it changes.]

Publishing a result is a separate choice. Public rows contain the nickname, rank, score, accuracy and combo associated with a game/chart. Choose a nickname that does not reveal your real name, email address or other private information. Declining public score submission does not by itself block local play.

Input replay data is processed to recalculate a result. The reviewed ranking database stores validation digests and results, not the raw input replay itself. Network infrastructure still processes connection information, including IP addresses, to deliver requests.

## 4. Optional rewarded advertising and purchases
**Proposed launch section; these providers are not integrated into the current main review build.**

If enabled, rewarded advertising starts through an explicit choice, outside song playback. The intended reward is three play attempts shared across launch tracks; a retry uses an attempt and practice does not. Granting an entitlement requires validated reward handling, not merely closing an advertisement.

Google's advertising services may process IP addresses, approximate location derived from IP, advertising interactions, diagnostic data and device identifiers, depending on the final SDK, settings and privacy choices. We do not use leaderboard identity to build a combined leaderboard-and-advertising profile. This does not mean that Google's advertising SDK performs no advertising-related processing.

Where required, we will present the applicable privacy choices before requesting advertisements and provide a way to reopen privacy options and withdraw consent. Refusing optional advertising does not require you to register an account or publish a leaderboard result.

If Google Play purchases are enabled, Google processes payment-method information. The app/server may process product, purchase/status and entitlement verification information. [Before publication: replace this section with the exact final SDK/provider and server data inventory, purpose-specific legal bases and retention. Do not describe diagnostic TEST records as production purchases.]

## 5. Purposes and legal bases
Local processing supports settings, progress and gameplay. Online score verification supports the ranked service you request. Publication is optional. Security controls prevent forged scores and repeated requests. Support information is used to answer your request.

[Before publication: confirm the processing-specific legal bases. Proposed analysis: consent for optional public score publication and processing requiring consent; contract necessity only for processing objectively necessary to provide the requested service; legitimate interests for proportionate security after an interests assessment. A privacy-policy acknowledgement is not blanket consent.]

## 6. Who receives data and where
If activated, the planned leaderboard uses Cloudflare Workers and D1. Support messages sent to the contact email are handled through Gmail. Optional advertisements and payments use the Google services described above. Public leaderboard rows are visible to other players.

We do not publish private installation credentials, email correspondence, payment tokens or raw replay inputs on a leaderboard. [Before publication: verify the final providers, their roles, applicable data-processing terms, international-transfer safeguards and processing locations. Do not claim that all data stays in Germany or the EU; the created D1 database was not configured with an EU jurisdiction restriction.]

## 7. Retention and security
[Before publication: insert implemented periods or objective retention criteria for incomplete tickets, completed validation results, published scores, advertising/purchase evidence, support correspondence and backups. The current ranking candidate has no general retention limit for completed results or published entries.]

A top-ten display is not a promise that only ten records are stored. Removing an item from the displayed top ten does not necessarily delete the underlying record.

Online private data must be transmitted over HTTPS. Access to backend administration must be restricted. Backup restoration must preserve prior deletion decisions rather than silently republish deleted records. [Release validation pending; do not treat these required safeguards as proof that the online service is already operational.]

## 8. Delete records and exercise your rights without an account
For privacy questions, access, correction, deletion, restriction, portability where applicable, objections or consent withdrawal, contact **team.woowa@gmail.com**. You do not need to reinstall the app to contact us. We aim to respond without undue delay and, as a rule, within one month; if a lawful extension applies, we will explain it within the initial period.

We may need proportionate information to locate your records and confirm that you are entitled to act on them. A nickname alone may not distinguish you from another player. Do not email secret installation credentials. We do not require account registration simply to contact us about privacy.

[Before publication: implement and describe an authenticated installation-based request/deletion route, with a safe alternative process for lost installations. The current candidate has no user deletion API. Do not advertise a nonexistent Delete records button.]

Clearing app storage through your device's settings removes local app data, subject to your device/platform backup and restore behaviour. It does not by itself delete server leaderboard records or Google's independent payment records. Losing local installation data may prevent automatic proof of ownership or recovery.

You may complain to a competent data-protection supervisory authority, including in your place of residence, work, or the place of an alleged infringement. [Before publication: provide appropriate authority information for the actual controller establishment; do not assume the German federal authority is the only competent authority.]

## 9. Age and privacy choices
[Before publication: confirm the game's audience and country-specific consent-age handling, child/teen advertising restrictions and matching store declarations. JustBalance's 16+ eligibility has not been adopted for this game.]

## 10. Changes and contact
The published policy will show its effective/update date. Material changes must be disclosed before affected processing begins where required.

Privacy contact: **Woowa — team.woowa@gmail.com**.
