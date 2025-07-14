/**
 * Google Apps Script для обработки данных регистрации команд
 * Версия 7.2 (с улучшенной защитой от ботов и обфускацией)
 */

// ID таблицы Google Sheets
const SPREADSHEET_ID = 'id';
const SHEET_NAME = 'Registrations';
const SECURITY_LOG_SHEET = 'SecurityLog';

/**
 * Обработчик POST-запросов
 */
function doPost(e) {
  try {
    Logger.log("===== НАЧАЛО ОБРАБОТКИ ЗАПРОСА =====");
    Logger.log("Тип запроса: POST");
    
    let payload;
    if (e.postData && e.postData.contents) {
      Logger.log("Получены данные из postData.contents");
      try {
        payload = JSON.parse(e.postData.contents);
        Logger.log("JSON успешно распарсен");
      } catch (error) {
        Logger.log("Ошибка при парсинге JSON: " + error);
        payload = e.parameter || {};
      }
    } else if (e.parameter) {
      Logger.log("Получены данные из parameter");
      payload = e.parameter;
    } else {
      throw new Error("Не удалось получить данные запроса");
    }
    
    Logger.log("Полученные данные: " + JSON.stringify(payload));
    
    if (payload.copyemail) {
      Logger.log("Обнаружен бот! Поле copyemail заполнено: " + payload.copyemail);
      logSuspiciousActivity(payload, "Заполнено скрытое поле copyemail");
      return ContentService.createTextOutput(JSON.stringify({
        result: 'success',
        message: 'Данные успешно записаны'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    if (!validateSecurityToken(payload)) {
      Logger.log("Обнаружен бот! Недействительный токен безопасности");
      logSuspiciousActivity(payload, "Недействительный токен безопасности");
      return ContentService.createTextOutput(JSON.stringify({
        result: 'success',
        message: 'Данные успешно записаны'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    if (isSuspiciousActivity(payload)) {
      Logger.log("Обнаружена подозрительная активность!");
      logSuspiciousActivity(payload, "Подозрительная активность: недостаточно взаимодействий");
      return ContentService.createTextOutput(JSON.stringify({
        result: 'success',
        message: 'Данные успешно записаны'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    if (!payload.captchaValue) {
      Logger.log("Отсутствует значение капчи");
    }
    
    const spreadsheetId = payload.spreadsheetId || SPREADSHEET_ID;
    Logger.log("Используем spreadsheetId: " + spreadsheetId);
    
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    Logger.log("Успешно открыта таблица: " + spreadsheet.getName());
    
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      Logger.log("Лист '" + SHEET_NAME + "' не найден, создаем новый");
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Дата регистрации',
        'ФИО капитана',
        'Возраст капитана',
        'Количество участников',
        'Контакт капитана',
        'Название команды',
        'Город',
        'Участник 1 ФИО',
        'Участник 1 Возраст',
        'Участник 2 ФИО',
        'Участник 2 Возраст',
        'Участник 3 ФИО',
        'Участник 3 Возраст'
      ]);
      sheet.getRange(1, 1, 1, 13).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    
    let participants = [];
    if (payload.participants) {
      try {
        if (typeof payload.participants === 'object') {
          participants = payload.participants;
        } else {
          participants = JSON.parse(payload.participants);
        }
        Logger.log("Данные участников: " + JSON.stringify(participants));
      } catch (error) {
        Logger.log("Ошибка при парсинге participants: " + error);
        participants = [];
      }
    }
    
    const rowData = [
      new Date(),
      payload.captainName || '',
      payload.captainAge || '',
      payload.participantsCount || 1,
      payload.captainContact || '',
      payload.teamName || '',
      payload.city || ''
    ];
    
    for (let i = 0; i < 3; i++) {
      if (i < participants.length) {
        rowData.push(participants[i].name || '');
        rowData.push(participants[i].age || '');
      } else {
        rowData.push('');
        rowData.push('');
      }
    }
    
    sheet.appendRow(rowData);
    Logger.log("Данные успешно записаны в таблицу");
    Logger.log("===== ЗАВЕРШЕНИЕ ОБРАБОТКИ ЗАПРОСА =====");
    
    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      message: 'Данные успешно записаны'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log("КРИТИЧЕСКАЯ ОШИБКА: " + error.message);
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      message: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * @param {Object} 
 * @returns {boolean} - Результат проверки
 */
function validateSecurityToken(payload) {
  try {
    if (!payload.securityToken) {
      Logger.log("Отсутствует токен безопасности");
      return false;
    }
    
    const decodedToken = Utilities.base64Decode(payload.securityToken);
    const tokenString = Utilities.newBlob(decodedToken).getDataAsString();
    const tokenParts = tokenString.split(':');
    
    if (tokenParts.length < 4) {
      Logger.log("Неверный формат токена");
      return false;
    }
    
    const tokenTimestamp = parseInt(tokenParts[0]);
    const mouseMovements = parseInt(tokenParts[2]);
    const formInteractions = parseInt(tokenParts[3]);
    
    const currentTime = Date.now();
    const tokenAge = currentTime - tokenTimestamp;
    if (tokenAge > 120000 || tokenAge < 0) {
      Logger.log("Токен устарел или имеет неверную временную метку");
      return false;
    }
    
    if (payload.tokenTimestamp && parseInt(payload.tokenTimestamp) !== tokenTimestamp) {
      Logger.log("Несоответствие временной метки в токене и в запросе");
      return false;
    }
    
    if (mouseMovements < 5 || formInteractions < 3) {
      Logger.log("Недостаточно взаимодействий: мышь=" + mouseMovements + ", форма=" + formInteractions);
      return false;
    }
    
    return true;
  } catch (error) {
    Logger.log("Ошибка при проверке токена: " + error);
    return false;
  }
}

/**
 * @param {Object} 
 * @returns {boolean} - Результат проверки
 */
function isSuspiciousActivity(payload) {
  if (payload.mouseMovements < 5 || payload.formInteractions < 3) {
    Logger.log("Подозрительная активность: недостаточно взаимодействий");
    return true;
  }
  
  if (payload.submissionTime && payload.tokenTimestamp) {
    const fillingTime = parseInt(payload.submissionTime) - parseInt(payload.tokenTimestamp);
    if (fillingTime < 10000) { 
      Logger.log("Подозрительная активность: форма заполнена слишком быстро (" + fillingTime + " мс)");
      return true;
    }
  }
  
  return false;
}

/**
 * Логирование подозрительной активности
 * @param {Object}
 * @param {string} reason - Причина подозрительной активности
 */
function logSuspiciousActivity(payload, reason) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    let logSheet = spreadsheet.getSheetByName(SECURITY_LOG_SHEET);
    if (!logSheet) {
      logSheet = spreadsheet.insertSheet(SECURITY_LOG_SHEET);
      logSheet.appendRow([
        'Дата',
        'IP',
        'Причина',
        'Данные запроса'
      ]);
      logSheet.getRange(1, 1, 1, 4).setFontWeight('bold');
      logSheet.setFrozenRows(1);
    }
    
    logSheet.appendRow([
      new Date(),
      '',  // IP не доступен в Google Apps Script
      reason,
      JSON.stringify(payload)
    ]);
    
    Logger.log("Подозрительная активность записана в лог");
  } catch (error) {
    Logger.log("Ошибка при логировании подозрительной активности: " + error);
  }
}

/**
 * Обработчик GET-запросов
 */
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    result: 'success',
    message: 'Сервис работает'
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Функция для настройки CORS
 */
function doOptions(e) {
  var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Max-Age': '3600'
  };
  
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders(headers);
}

/**
 * Функция для тестирования скрипта
 * Можно запустить вручную из редактора скриптов
 */
function testScript() {
  Logger.log("Тестирование скрипта");
  
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    Logger.log("Успешно открыта таблица: " + spreadsheet.getName());
    
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    Logger.log("Лист '" + SHEET_NAME + "' " + (sheet ? "найден" : "не найден"));
    
    if (sheet) {
      sheet.appendRow([
        new Date(), 
        "Тестовые данные", 
        "25", 
        "2", 
        "test@example.com", 
        "Тестовая команда", 
        "Москва",
        "Участник 1", 
        "24",
        "Участник 2",
        "26",
        "",
        ""
      ]);
      Logger.log("Тестовые данные успешно записаны");
    }
    
    Logger.log("Тестирование успешно завершено");
  } catch (error) {
    Logger.log("Ошибка при тестировании: " + error.message);
  }
}