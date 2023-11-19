# 프로젝트
리버스 옥션 기반 절판 도서 구매 서비스   (2023.10.12 ~ 진행중)

# 개발 언어
Html / css / javascript / ReactJs / NodeJs / MySQL / Git / Figma

# 설명
구매자와 판매자가 회원가입을 하고 로그인을 하여 절판도서 정보를 검색하여 절판도서의 정보를 볼 수 있고, 판매자가 판매하려는 절판도서를 올리면 구매자는 선택하여 구매하는 역경매 시스템을 홈페이지로 구현하였습니다.
서버 - 위에 업로드한 코드들
웹페이지 - https://github.com/gangheeLee/7bookproject

# Figma
[https://www.figma.com/file/xdXexabPFzAOEh4XM1fD1E/%EB%A6%AC%EB%B2%84%EC%8A%A4-%EC%98%A5%EC%85%98-%EA%B8%B0%EB%B0%98-%EC%A0%88%ED%8C%90%EB%8F%84%EC%84%9C-%EA%B5%AC%EB%A7%A4-%EC%84%9C%EB%B9%84%EC%8A%A4-(Copy)-(Copy)?type=design&node-id=54-2&mode=design&t=XARf9rTgPoTmKt9u-0](https://www.figma.com/file/xdXexabPFzAOEh4XM1fD1E/%EB%A6%AC%EB%B2%84%EC%8A%A4-%EC%98%A5%EC%85%98-%EA%B8%B0%EB%B0%98-%EC%A0%88%ED%8C%90%EB%8F%84%EC%84%9C-%EA%B5%AC%EB%A7%A4-%EC%84%9C%EB%B9%84%EC%8A%A4-V2?type=design&node-id=54-2&mode=design&t=jQ5jQ2w3i78BmPwQ-0)

# ERD diagram
![book_ERD_diagram](https://github.com/gangheeLee/bookproject/assets/121603208/5bfdd4cd-17b8-4500-bff5-89ad5879569b)

# 영상 (제작 진행중 완성된 부분까지만 올렸습니다.)
https://youtu.be/V28lsGfJ7Dw

# 기능
- Mainpage : 슬라이드쇼를 이용하여 5가지의 베스트셀러책들을 보여지게 하였고, 메인화면에 검색바를 만들어서 책을 검색하여 책의 정보를 데이터베이스에서 가져와 제목, 저자, 출판사, 소개글을 보여지게 하였습니다. 페이지 가장 하단에는 회사의 정보를 담아두었습니다.

- Login, Register : 로그인과 회원가입을 데이터베이스와 연결하여 정보를 저장하고 정보를 인식하여 로그인 할 수 있도록 하였습니다. 그리고 ID찾기와 PW찾기를 만들어서 정보를 가지고 ID를 찾거나 PW를 재설정 할 수 있게 했습니다.

- Mypage : 회원정보수정, 도서 구매 리스트, 도서 판매 리스트 3가지 메뉴로 나누어 회원정보를 수정할 수 있고 구매한 도서리스트와 판매한 리스트를 데이터베이스에서 가져와서 표형식으로 구현하였습니다.

- Book Enroll : 구매자가 원하는 책을 올리도록 이미지, 책 제목, 저자, 출판사, 구매희망가, 상품상태를 입력하여 조회화면에 등록하도록 만들었습니다.

- Book Search : 책을 조회함으로써 구매자는 구매자들이 올려놓은 책정보를 보고 희망가격을 다른 구매자가 올린 책의 가격을 보고 비교할 수 있고, 판매자는 판매가를 조절함으로써 경매를 할 수 있도록 만들었습니다. 

- Q&A : 구매자와 판매자가 홈페이지 관리자와 의사소통을 할 수 있는 공간을 게시판 형식으로 만들어서 게시글을 작성하고 답변할 수 있는 페이지를 구성하였습니다.

- manager page : 회원관리와 등록도서관리를 할 수 있도록 만들예정입니다.
