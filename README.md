# 마곡 롯데캐슬 르웨스트

정적 HTML 홈페이지. 디자인을 고정한 마스터가 아닌, 다음 현장에 복사해 수정할 수 있는 기반입니다.

## 구성
- index.html: 메인·관심고객등록
- overview.html / location.html / premium.html: 사업개요·입지·프리미엄
- plans.html / community.html / media.html: 타입·커뮤니티·홍보센터
- v13.css: 공통 디자인, v13.js: 메뉴·이미지 확대
- registration-config.js: 현장별 접수 주소
- registration.js: 접수 검증·시트 저장 결과 처리
- assets: 사용 중인 이미지와 글꼴. 사진 display 파일은 목록용이며 확대 시 원본을 사용합니다.

## 다른 현장에 재사용
1. 별도 저장소로 복사한 뒤 registration-config.js의 접수 주소를 먼저 빈 문자열로 바꿉니다. 르웨스트 시트로 다른 현장 고객을 보내지 마세요.
2. 현장명·로고·전화·주소·관리자 정보와 각 페이지 내용을 교체합니다.
3. 이미지·대체텍스트·타입 선택지·페이지별 title/description/OG 정보를 함께 교체합니다.
4. 새 현장 전용 시트와 접수 프로그램을 연결하고 저장·메일 테스트를 진행합니다.
5. 메뉴·페이지 수·섹션 순서는 현장에 맞게 변경합니다. 현재 디자인은 고정 규격이 아닙니다.

## 공개 후 검색 설정
최종 도메인 확정 후 페이지별 canonical·og:url·og:image, sitemap.xml, robots.txt의 Sitemap 항목을 같은 도메인으로 설정합니다. GitHub Pages 도메인 및 HTTPS 연결 뒤 구글 Search Console과 네이버 Search Advisor에서 소유권 확인·사이트맵 제출·수집 확인을 진행합니다. 검색 등록과 상위 노출은 별개입니다.

## 개인정보
고객 데이터는 저장소에 포함하지 않습니다. 접수 주소는 공개 웹 앱 주소이며 비밀키가 아닙니다. 접수 시트와 Apps Script 관리 권한은 별도로 유지합니다. 이메일 알림 사본은 메일함에서 관리합니다.
