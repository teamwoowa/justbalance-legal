# On That Note 개인정보 정책 리뷰

검토일: 2026-10-23. 법률 자문·GDPR 인증이 아닌 공식 정책 및 현재 소스 대조다. 런타임·운영 DB·기존 잔고 사이트는 변경하지 않았다.

## 결론
로그인 부재만으로 방침이 불필요해지지 않는다. Google Play는 개인정보 미수집 앱에도 공개 개인정보처리방침과 앱 내 접근을 요구한다. GDPR은 식별 가능성에 따라 판단하며 익명화는 불가역이어야 한다. 현 후보는 임의 설치 credential의 SHA-256을 player로 저장하고 닉네임·복수 보드 기록에 연결하므로 가명처리 자료로 다룬다. 독일에서 실제 운영 활동을 하는 EU establishment인지 확인하되 거주 사실 하나로 모든 적용 결론을 내리지 않는다. 영어권에만 배포해도 EU 내 운영 관련 처리가 자동 제외되는 것은 아니다.

## 실제 소스 확인
- arcade_scores.gd: 무작위 설치 credential, 닉네임, pending/보존 상태를 로컬 arcade_ranking.json에 저장한다. 로그인 이메일·실명은 필수 입력이 아니다. 사용자가 닉네임을 실명으로 쓸 가능성은 있다.
- worker.ts: player_key를 SHA-256으로 해시하고 runs.player 및 score_entries.player에 저장한다. 공개 entries와 저장된 완료 result에 해시 앞16자 player_id를 포함한다. 같은 설치의 다른 보드·닉네임을 연결할 수 있다.
- 서버 시작 티켓과 eligibility의 비공개 검증은 공개 REGISTER 동의와 별개다. 입력 시각·입력 종류/손 등 replay를 서버에서 재채점한다. 원시 replay 자체를 D1에 저장하는 코드는 없고 digest·결과를 저장한다. 그래서 '공개 동의 전 전송0건'이라고 쓰면 부정확하다.
- 공개 TOP10 조회는 LIMIT10이며 전체 저장 테이블의 보존 상한이 아니다. score_entries와 완료 runs.result의 보관기간은 없다. 만료 후24시간이 지난 미완료 runs를 새 시작 시 최대100개 정리하는 코드만 있다. 정해진 시각에 모든 만료 항목이 삭제된다고 보장하지 않는다.
- 라우트는 board/runs/eligibility/register/scores이며 사용자 인증 삭제 route는 없다. 삭제가 완료됐다는 화면·정책을 먼저 만들지 않는다.
- admission 소스는 IP를 키로 사용하지 않지만 Cloudflare/TLS 접속 처리까지 IP 미처리라고 말할 수 없다. observability.enabled=false도 모든 플랫폼 처리 부재의 증거가 아니다.
- 현재 설치본/현행 본편은 광고·Billing provider·공개 랭킹 endpoint 미연결이다. 빈 원격 D1만 생성됐다. 별도 진단 앱·소스 후보와 실제 운영을 구분한다.
- 추후 GMA Next-Gen SDK는 공식 최신 문서상 IP·광고 상호작용·진단·기기 식별자를 자동 처리할 수 있다. 고정 SDK1.4.0/UMP4.0.0·최종 manifest/설정을 별도 대조해야 하며 최신 문서가 고정 버전의 정확한 census를 대신하지 않는다.

## 잔고 정책에서 재사용할 것
- 개발자 표시 Woowa, 문의처 team.woowa@gmail.com, 수집/목적/근거/제공자/보관/권리/문의의 구성. 표시명 Woowa와 법적 controller 신원은 같은 문제로 단정하지 않는다.
- 공개 GitHub Pages 정적 HTML 방식. 게임 안내는 별도 경로/저장소로 분리하며 기존 잔고 정책을 덮어쓰지 않는다. 영어 원문을 우선하며 검토용 한국어 설명은 분리한다. 이 문서는 게임 전용 폴더의 검토 브랜치·PR로만 관리하고 실제 Pages 정책 게시와 구분한다.
- 비밀번호·인증 값/구매 토큰을 이메일로 받지 않는 문의 원칙. 개인정보 권리 요청은 원칙적으로 지체 없이1개월 이내 대응한다. 기존30일 문구를 GDPR 법정 표현으로 그대로 복제하지 않는다.

## 그대로 복사하면 안 되는 항목
1. 로그인/계정 삭제/가입 이메일 확인: 게임은 로그인 없음. '랭킹 기록 삭제 및 개인정보 요청'으로 변경. 계정 삭제 정책을 충족하려고 불필요한 계정을 새로 만들지 않는다. Play의 계정삭제 요건과 GDPR의 개인정보 삭제권을 구분한다.
2. 금융/거래·CSV/Yahoo/Frankfurter/Supabase·Google Sign-In: 게임의 처리 목록에 없음. 제거한다.
3. '광고·프로파일링에 사용하지 않음/광고 ID 미접근': 광고 도입 계획과 충돌. 개발자 랭킹과 광고 프로필을 결합하지 않는 원칙과 Google SDK의 광고 관련 처리를 분리한다.
4. EU Frankfurt 저장: D1을 기본 자동 위치로 생성했고 EU jurisdiction을 지정하지 않았다. Google 처리도 별도다. 데이터 위치·역할·DPA/이전 근거를 확인하기 전 EU 전용 저장을 약속하지 않는다.
5. 백업7일: D1 Free Time Travel의7일 이력과 별도 수동 export/이메일·서비스 백업의 삭제는 다르다. 복구 후 삭제된 기록이 부활하지 않도록 억제/재삭제 절차를 검수한다.
6. 16세 미만 미대상: 이전 게임 계획은13–15/16–17/18+ 검토 단계다. 잔고의16+를 게임에 자동 적용하지 않는다. 목표연령/동의연령·광고 제한·스토어 선언을 일치시킨다.
7. BfDI 단독 제소기관: 일반 민간 사업자는 주(Land) 기관 소관일 수 있다. 사업자 소재 주 확인 전 BfDI를 유일한 관할로 지정하지 않는다. 이용자는 적절한 감독기관에 제소할 수 있다고 안내한다.
8. 모든 권리요청을 무조건30일 내 완료/모든 처리 계약근거: GDPR의 원칙1개월 응답, 법정 연장/예외, 처리별 실제 근거와 조건을 정확히 적는다.

## 최소 범위의 적합화 방안
- 로컬 게임은 랭킹 공개 동의/광고 동의와 분리한다. 선택적 광고 거절만으로 무료/오프라인 플레이를 막지 않는다. 공개 랭킹 시작 시점의 비공개 검증 전송도 설명한다.
- 공개 필드는 닉네임·게임/곡/난도·점수·정확도/콤보·순위만을 우선 검토. player_id 제거 또는 보드별 pseudonym 변경은 앱 자기기록 판별/캐시와 함께 계약·검사 후 적용하며 이번에는 소스 변경하지 않았다. 익명화 완료라고 부르지 않는다.
- 설치 credential을 이용한 인증된 삭제·접근 요청 경로를 마련하되 새 로그인/이메일 등록/신분증 수집을 기본으로 요구하지 않는다. 비밀 credential은 앱→HTTPS로만 보내고 URL·스크린샷·이메일에 넣지 않는다. 기기 분실 시 닉네임만으로 소유권을 확정하지 않는다. GDPR Art11의 추가식별 최소화 원칙과 요청자 증명 가능성을 고려한다.
- 삭제는 score_entries뿐 아니라 runs의 nickname/result/digest 등 연결자료, 보드 캐시, pending 재전송, 복구 절차까지 다룬다. 동시 submit/삭제 경합·다른 설치 보호·삭제 후 재등록 선택도 검수한다.
- 보관기간은 후보 제안과 운영 약속을 구분: 미완료 티켓 expiry+24h 정리는 현 구현. 완료 증거/등록 기록/백업/문의는 정확한 기간 또는 객관적 기준을 확정하고 자동 작업·실패 알림을 구현해야 한다. 임의의30일/90일/7일을 이미 실행 중인 사실처럼 쓰지 않는다.
- UMP: 필요 동의 갱신·canRequestAds, 동의와 거절·옵션 관리/철회, 미성년 처리, 광고 미디에이션 실제 vendor를 확인. UMP를 모든 GDPR 처리의 동의로 쓰지 않는다.
- 공개 등록의 동의(Art6(1)(a))를 후보 근거로 검토. 요청한 서비스의 필요 처리(Art6(1)(b))·보안/부정방지의 정당한 이익(Art6(1)(f))은 필요성·이익형량을 확인 후 채택. 동의가 필요한 SDK/기기저장 접근은 별도다.
- 공개 방침은 영문·접근 제한/로그인 없는 활성 URL, 앱 내 Privacy/Privacy options, Play Data safety/광고/연령 선언과 일치. 가입 계정이 없다는 이유로 '수집 데이터 없음'을 자동 선택하지 않는다.

## 게시 차단(최소 확인 사항)
1. Woowa의 실제 개인정보처리자 법적 신원·적절한 연락처/사업상 주소 공개 범위·소재 주. 기존 페이지를 증빙으로 법적 완전성을 승인하지 않는다. 독일 서비스 제공자 고지(Impressum) 필요 여부도 별도 확인.
2. 랭킹 검증·공개 점수·문의·구매/광고 증거의 보관기간/삭제 실행 및 백업복원 억제.
3. 목표 연령·정확한 SDK/제공자·DPA/국외이전과 데이터 위치·실제 운영 원격 확인.
4. 앱 삭제/데이터 지우기와 서버 삭제의 구분·설치 분실 시 증명/처리 절차.
5. 공개 문서 최종 소유자 확인·게시 승인. 누락된 값을 만들어 채우거나 기존 잔고 정책을 변경하지 않는다.

## 산출물
- [PRIVACY_POLICY_DRAFT_EN.md](PRIVACY_POLICY_DRAFT_EN.md): 미게시 영어 검토 초안. 미래 기능을 현재 운영 사실로 쓰지 않으며 미확정 항목을 표시.
- 개발 프로젝트의 SOURCE_REFERENCES.json: 실제 소스 줄 근거(이 공개 문서 묶음에는 포함하지 않음).

## 공식 출처 / 기존 비교 문서
- Google Play User Data: https://support.google.com/googleplay/android-developer/answer/10144311?hl=en
- EU Commission 적용·익명/가명: https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/application-gdpr_en
- EU Commission 권리요청: https://commission.europa.eu/law/law-topic/data-protection/information-individuals_en
- UMP: https://developers.google.com/admob/android/privacy
- GMA Next-Gen 데이터: https://developers.google.com/admob/android/next-gen/privacy/play-data-disclosure
- Cloudflare DPA: https://www.cloudflare.com/cloudflare-customer-dpa/ (계정의 수락/적용 확인은 별도)
- D1 Time Travel: https://developers.cloudflare.com/d1/reference/time-travel/
- 감독기관: https://www.bfdi.bund.de/EN/Service/Inhalte/Flyer/Recht-auf-Datenschutz/Recht-auf-Datenschutz.html
- 비교 정책: https://teamwoowa.github.io/justbalance-legal/privacy.html
- 비교 원본 고정: https://github.com/teamwoowa/justbalance-legal/blob/d6b573b3963d23c3b333b7498b91f9ccfe861468/privacy.html
