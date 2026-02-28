# TED (Technical Easy Drawing)

건축 도면 데이터를 시각화하는 웹 애플리케이션입니다. 공종별 도면 확인, 리비전 이력 탐색, 다중 레이어 오버레이를 제공합니다.

## 실행 방법

```bash
npm install
npm run dev
```

## 기술 스택

- **React 18 + TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **React Router v6**
- **Feature-Sliced Design (FSD)**

## 구현 기능

- [x] 도면 목록 페이지 — 공종 뱃지 및 최신 리비전 버전 표시
- [x] 도면 상세 페이지 (3탭 구성)
  - [x] **공종별 탭** — 공종마다 리비전 이미지 선택 뷰어, 구역(region) 단위 분리 지원
  - [x] **이력 탭** — 전 공종 리비전을 날짜순 타임라인으로 표시
  - [x] **오버레이 탭** — 공종 이미지를 `mix-blend-multiply`로 레이어 합성, 공종별 토글

## 미완성 기능

- [ ] **정밀 이미지 정렬** — metadata의 `imageTransform`(x, y, scale, rotation)을 CSS transform으로 적용해 픽셀 단위 보정. 현재는 `object-fill`로 근사 처리 중
