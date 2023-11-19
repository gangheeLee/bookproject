const express = require("express"); // npm i express | yarn add express
const mysql = require("mysql2"); // npm i mysql | yarn add mysql
const app = express();
const PORT = 4001; // 포트번호 설정
const cors = require("cors");

// MySQL 연결
const db = mysql.createPool({
  host: "127.0.0.1", // 호스트
  user: "root", // 데이터베이스 계정
  password: "123456", // 데이터베이스 비밀번호
  database: "7book_db", // 사용할 데이터베이스
});

app.use(
  cors({
    origin: "*", // 출처 허용 옵션
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200, // 응답 상태 200으로 설정
  })
);

// post 요청 시 값을 객체로 바꿔줌
app.use(express.urlencoded({ extended: true }));

// 서버 연결 시 발생
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

// 데이터 해독
app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

app.get("/getOrderList", (req, res) => {
  // Order List 가져오기
  console.log("getOrderList Call " + new Date());
  console.log(req.query.OBuyer);
  const sqlQuery = `SELECT * FROM order_list WHERE OBuyer = '${req.query.OBuyer}'`;
  db.query(sqlQuery, (err, result) => {
    console.log(sqlQuery);
    console.log(result);
    res.send(result);
  });
});

app.get("/getSaleList", (req, res) => {
  // Sale List 가져오기
  console.log("getSaleList Call " + new Date());
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.query.SLBuyer);
  const sqlQuery = `SELECT * FROM sale_list WHERE SLBuyer = '${req.query.SLBuyer}'`;

  db.query(sqlQuery, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.get("/getSearchInfo", (req, res) => {
  // book_info 가져오기
  console.log("getSearchInfo Call " + new Date());
  res.header("Access-Control-Allow-Origin", "*");
  const sqlQuery = "SELECT * FROM book_info WHERE BookTitle = 'C언어'";

  db.query(sqlQuery, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.get("/getTitleSearch", (req, res) => {
  // search 가져오기
  console.log("getTitleSearch Call " + new Date());
  res.header("Access-Control-Allow-Origin", "*");
  const title = req.param("title");
  console.log("title : ", title);
  // console.log(req.body);

  const sqlQuery = "SELECT * FROM book_info WHERE BookTitle = ?";

  db.query(sqlQuery, title, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

// 회원가입 데이터 mysql에 저장
app.post("/register", (res, req) => {
  console.log("getRegister Call " + new Date());
  console.log(res);
  res.header("Access-Control-Allow-Origin", "*");
  const values = [
    res.body.ID,
    res.body.PW,
    res.body.Name,
    res.body.Birth,
    res.body.PhoneNumber,
    res.body.Email,
  ];
  const sqlQuery =
    "INSERT INTO user (ID, PW, Name, Birth, PhoneNumber, Email) VALUES (?)";
  db.query(sqlQuery, [values], (err, result) => {
    console.log(result);
    req.send(result);
  });
});

///////// 로그인 정보 가져오기 /////////////////

app.post("/login", (res, req) => {
  try {
    console.log("getLogin Call " + new Date());
    console.log(res.body.ID);
    console.log(res.body.PW);
    res.header("Access-Control-Allow-Origin", "*");
    const value = [res.body.ID, res.body.PW];
    const sqlQuery = `SELECT COUNT(*) AS result FROM user WHERE ID='${res.body.ID}' AND PW='${res.body.PW}'`;
    console.log(sqlQuery);
    console.log(value);
    db.query(sqlQuery, (err, result) => {
      console.log(result[0]["result"]);
      req.send(`${result[0]["result"]}`);
    });
  } catch (err) {
    console.log(err);
  }
});

////////// 마이페이지 클릭시 이름과 생년월일 가져오기 //////////////////

app.post("/mypage", (res, req) => {
  try {
    console.log("getLogin Call " + new Date());
    console.log(res.body.ID);
    res.header("Access-Control-Allow-Origin", "*");
    const value = [res.body.ID];
    const sqlQuery = "SELECT Name,Birth FROM user WHERE ID = ?";
    console.log(sqlQuery);
    db.query(sqlQuery, [value], (err, result) => {
      console.log(result);
      req.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

/////////////////////////// 마이페이지 회원정보 수정하기 ///////////////////////

app.post("/mypagechange", (res, req) => {
  try {
    console.log("mypagechange Call " + new Date());
    console.log(res.body.ID);
    console.log(res.body.PW);
    console.log(res.body.PhoneNumber);
    console.log(res.body.Email);
    const value = [res.body.PW, res.body.PhoneNumber, res.body.Email];
    const sqlQuery = `UPDATE user SET PW='${res.body.PW}', PhoneNumber='${res.body.PhoneNumber}',Email='${res.body.Email}' WHERE ID='${res.body.ID}'`;
    db.query(sqlQuery, [value], (err, result) => {
      console.log(result);
    });
  } catch (err) {
    console.log(err);
  }
});

////////////////// 책 등록정보 입력하여 데이터베이스에 저장하기 ///////////

app.post("/bookenroll", (res, req) => {
  try {
    console.log("bookenroll Call " + new Date());
    console.log(res.body);
    const sqlPNum = "SELECT PNum FROM purchase_book ORDER BY PNum DESC LIMIT 1";
    db.query(sqlPNum, (err, result) => {
      const PNum = result[0]["PNum"] + 1;
      const PImage = `/asset/${res.body.PBookTitle}.png`;
      const value = [
        PNum,
        res.body.PBookTitle,
        res.body.PAuthor,
        res.body.PPublisher,
        res.body.DesiredPrice,
        new Date(),
        res.body.PQuality,
        res.body.PID,
        PImage,
      ];
      console.log(value);
      const sqlQuery1 =
        "INSERT INTO purchase_book (PNum, PBookTitle, PAuthor, PPublisher, DesiredPrice, PurRegisDate, PQuality, PID, PImage) VALUES (?)";
      db.query(sqlQuery1, [value], (err, result) => {
        console.log(result);
        // req.send(result);
      });
    });
  } catch (err) {
    console.log(err);
  }
});

/////////////// 구매 도서 요청페이지에 구매자가 올린 정보 올리기 //////////////////////

app.get("/getBook", (req, res) => {
  // purchase_book 가져오기
  console.log("getSearchInfo Call " + new Date());
  res.header("Access-Control-Allow-Origin", "*");
  const sqlQuery = "SELECT PImage, PBookTitle, PAuthor FROM purchase_book";

  db.query(sqlQuery, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

////////////////////// Q&A 데이터베이스에 저장된 내용 화면에 뿌림 ///////////////////

app.get("/qna", (req, res) => {
  console.log("getQna Call " + new Date());
  res.header("Access-Control-Allow-Origin", "*");
  // console.log(req.query.QID);
  const sqlQuery =
    "SELECT QNum AS id,QID AS writer, QTitle AS content FROM question";

  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

//////////////////// Q&A 질문 작성하기 내용 데이터베이스에 저장 ////////////////////

app.post("/question", (res, req) => {
  console.log("bookenroll Call " + new Date());
  console.log(res.body);
  const sqlQNum = "SELECT QNum FROM question ORDER BY QNum DESC LIMIT 1";
  // const sqlQNum =
  //   "SELECT ROW_NUMBER() OVER (ORDER BY column_name) AS row_num FROM question";
  db.query(sqlQNum, (err, result) => {
    const QNum = result[0]["QNum"] + 1;
    // const QNum = result;
    // console.log(result);
    const value = [
      QNum,
      res.body.QTitle,
      res.body.QContent,
      res.body.QID,
      new Date(),
    ];
    const sqlQuery =
      "INSERT INTO question (QNum, QTitle, QContent, QID, QDate) VALUES (?)";
    db.query(sqlQuery, [value], (err, result) => {
      console.log(result);
    });
  });
});

///////////////////////// Q&A 삭제버튼누르면 데이터베이스 내용 삭제하기 ///////////////

app.post("/qnadel", (res, req) => {
  console.log("bookenroll Call " + new Date());
  console.log(res.body);
  const sqlQuery = "DELETE FROM question WHERE ID = ?";
  db.query(sqlQuery, (err, result) => {
    console.log(result);
  });
});

/////////////////////// ID찾기(일치여부) ////////////////////////

app.post("/idsearchs", (res, req) => {
  console.log("idsearchs Call " + new Date());
  console.log(res.body.Name);
  const value = [res.body.Name, res.body.Birth, res.body.PhoneNumber];
  const sqlQuery = `SELECT COUNT(*) AS result FROM user WHERE Name = '${res.body.Name}' AND Birth = '${res.body.Birth}' AND PhoneNumber = '${res.body.PhoneNumber}'`;
  db.query(sqlQuery, [value], (err, result) => {
    console.log(result[0]["result"]);
    req.send(`${result[0]["result"]}`);
  });
});

//////////////// ID찾았을때 ID화면에 보여주기 ////////////////

app.post("/idfind", (res, req) => {
  console.log("idfind Call " + new Date());
  console.log(res.body);
  const value = [res.body.Name, res.body.Birth, res.body.PhoneNumber];
  const sqlQuery = `SELECT ID FROM user WHERE Name = '${res.body.Name}' AND Birth = '${res.body.Birth}' AND PhoneNumber = '${res.body.PhoneNumber}'`;
  db.query(sqlQuery, [value], (err, result) => {
    console.log(result);
    req.send(`${result[0]["ID"]}`);
  });
});

////////////////// PW찾기(일치 여부) ////////////////////

app.post("/pwsearch", (res, req) => {
  console.log("pwsearch Call " + new Date());
  console.log(res.body);
  const value = [res.body.ID, res.body.Name, res.body.PhoneNumber];
  const sqlQuery = `SELECT COUNT(*) AS result FROM user WHERE ID = '${res.body.ID}' AND Name = '${res.body.Name}' AND PhoneNumber = '${res.body.PhoneNumber}'`;
  db.query(sqlQuery, [value], (err, result) => {
    console.log(result[0]["result"]);
    req.send(`${result[0]["result"]}`);
  });
});

//////////////// PW 일치시 PW 수정 /////////////////////

app.post("/pwfind", (res, req) => {
  console.log("pwfind Call " + new Date());
  console.log(res.body);
  const sqlQuery = `UPDATE user SET PW = '${res.body.PW}' WHERE ID = '${res.body.ID}'`;
  db.query(sqlQuery, (err, result) => {
    console.log(result);
  });
});
