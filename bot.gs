
//引数が1ならslackID, 引数が2なら名前を抽出する
function extractUnsubmittedPeople(num) {

  //必要に応じて書き換える変数
  //参照したいスプシのシート名
  var sheetname = "関係者リスト";　

  //スプシとシートを定義
  var spreadsheet = SpreadsheetApp.getActive();
  var relatedPeopleSheet = spreadsheet.getSheetByName(sheetname);

  //スプシの情報を最新に更新する（なにか変更を加えた後にflushする）
  relatedPeopleSheet.getRange('B2:D2').setValue(sheetname);  
  SpreadsheetApp.flush();  // 変更内容を即反映
  console.log(relatedPeopleSheet.getRange('I6').getValue());
  
  const FValues = relatedPeopleSheet.getRange('F:F').getValues();　 //F列の値を全て取得
  const lastRow = FValues.filter(String).length;　　//空白の要素を除いた長さを取得

  //未提出者の所属期と名前を抽出
  //範囲を取得
  var　gradeRange = relatedPeopleSheet.getRange(4, 6, lastRow-1);
  var  idRange = relatedPeopleSheet.getRange(4,7,lastRow-1);
  //値(2次元配列)を取得
  var grade = gradeRange.getValues();
  var id =　idRange.getValues();

  //一元配列にするための変数を確保
  var grade2 = []
  var id2 = []
  var unsubmittedPeople = [];
  var unsubmittedID = [];

  //二つの配列の値を組み合わせて一つの配列に格納
  for(i=0;i<grade.length;i++){
    if(id[i][0] != ''){
      grade0 = grade[i][0];
      id0 = id[i][0];
      grade2.push(grade[i][0]);
      id2.push(id[i][0]);
      unsubmittedPeople.push(grade0);
      unsubmittedID.push("<@"+id0 +">");
    }
  }
  Logger.log(unsubmittedPeople);

  if(num == 1){
    return unsubmittedID;
  }
  if(num == 2){
    return unsubmittedPeople;
  }
}



//サトちゃんの設定
function notifyToSlack() {

  //必要に応じて書き換える変数
  //体調報告フォームのURL
  var formUrl = "http://forms.gle/";   
  //botの名前
  var botname = "サトちゃん@健康管理P";   
  //コピーしたIncoming WebhookのURL                 
  var webhookUrl = "https://hooks.slack.com/services/"; 
 
  var unsubmittedPeople = extractUnsubmittedPeople(1);
  let today = new Date();
  today = Utilities.formatDate(today,"JST", "MM月dd日");

   //slackメッセージ文
  var message = "【"+today+"の健康報告フォームの未提出者】は以下の通りだゾー！\n"+
  "未提出者は至急提出してね♪\n"+unsubmittedPeople+"\n\n体調に気をつけながら、今日も頑張るゾー！\n"+"<"+formUrl+">\n";

  var jsonData =
  {
     "username" : botname,
      "text" : message,
      "unfurl_links":true
  }

  var payload = JSON.stringify(jsonData);
  var options =
  {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload
  };
  UrlFetchApp.fetch(webhookUrl, options);
}



//サトちゃんママの設定
function notifyToSlack2() {

  //必要に応じて書き換える変数
  //体調報告フォームのURL
  var formUrl = "http://forms.gle/";   
  //botの名前
  var botname = "サトちゃんママ＠健康管理PP";   
  //コピーしたIncoming WebhookのURL                 
  var webhookUrl = "https://hooks.slack.com/services/"; 
  

  let today = new Date();
  today = Utilities.formatDate(today,"JST", "MM月dd日");
  var unsubmittedPeople = extractUnsubmittedPeople(1);
  
  //Slackメッセージ文
 var message = "母です。再三の忠告にもかかわらず、未だに"+today+"のフォームを提出していない者は至急提出してください。\n"+
  unsubmittedPeople+
  "\n\n明日こそはきちんと午前中に提出するように。\n<"+ formUrl +">\n";
  
  var jsonData =
  {
     "username" : botname,
     "text" : message,
     "unfurl_links":true
  };

  var payload = JSON.stringify(jsonData);

  var options =
  {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload
  };

  UrlFetchApp.fetch(webhookUrl, options);
}


function notifyToSlack3() {

   //必要に応じて書き換える変数
  //体調報告フォームのURL
  var formUrl = "http://forms.gle/";
  //botの名前
  var botname = "サトちゃん＠健康管理P";
  //コピーしたIncoming WebhookのURL    
  var webhookUrl = "https://hooks.slack.com/services/";
   
  //メッセージ文
  var message = "<!channel>\n みんなおはよう！\n 昼夜の寒暖差で体調を崩しやすい時期だから、体調管理をしっかりしていくゾー！\n<"+formUrl+">\n";

  var jsonData =
  {
     "username" : botname,
      "text" : message,
      "unfurl_links":true
  }

  var payload = JSON.stringify(jsonData);
  var options =
  {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload
  };
  UrlFetchApp.fetch(webhookUrl, options);
}