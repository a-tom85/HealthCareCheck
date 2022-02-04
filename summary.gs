//23:59にその日の未提出者を「未提出者シート」に書き出す

//トリガーを設定23:59に設定する
function setTrigger(){
  const time = new Date();
  time.setHours(23);
  time.setMinutes(59);
  ScriptApp.newTrigger("writePeople").timeBased().at(time).create();
}

//unsubmittedpeopleを新しいシートに日付とともに書く
function writePeople(){
  var sheetname = "未提出者";
  var submittionsheet   = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetname);
  let today = new Date();
  today = Utilities.formatDate(today,"JST", "MM月dd日");
  var lastcol = submittionsheet.getLastColumn();
  Logger.log(lastcol);

  //名前を取得
  let array1D = extractUnsubmittedPeople(2);
  let array2D = [];
  for(i=0;i<array1D.length;i++){
    array2D[i]=[array1D[i]];
  }

  submittionsheet.getRange(2,lastcol+1).setValue(today+"の未提出者");
  var color="#add8e6";
  submittionsheet.getRange(2,lastcol+1).setBackground(color);

  var range = submittionsheet.getRange(3,lastcol+1,array2D.length, array2D[0].length); 

  range.setValues(array2D);
  //境界線の設定
  range.setBorder(true, true, true, true, true, true);
  submittionsheet.setColumnWidth(lastcol+1, 200);
}