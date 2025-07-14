import React from 'react';

/**
 * 
 * @param {Object} 
 * @param {string} 
 * @param {Function} 
 * @returns {JSX.Element}
 */
const AntiBot = ({ name = "copyemail", onChange }) => {
  const _0x5a7e = [
    "\x68\x6f\x6e\x65\x79\x70\x6f\x74", // honeypot
    "\x5f\x5f\x62\x6f\x74\x5f\x64\x65\x74\x65\x63\x74\x69\x6f\x6e\x5f\x5f", // __bot_detection__
    "\x63\x6f\x70\x79\x65\x6d\x61\x69\x6c", // copyemail
    "\x62\x6c\x6f\x63\x6b", // block
    "\x32\x70\x78", // 2px
    "\x2d\x32\x70\x78", // -2px
    "\x6e\x6f\x6e\x65", // none
    "\x68\x69\x64\x64\x65\x6e", // hidden
    "\x74\x72\x75\x65", // true
    "\x2d\x31", // -1
    "\x74\x65\x78\x74", // text
    "\x6f\x66\x66" // off
  ];
  
  // Функция для декодирования строк
  const _0x3b2c = (idx) => {
    return _0x5a7e[idx];
  };
  
  // Функция для выбора случайного элемента из массива
  const _0x4c3d = (arr) => {
    const _0x7d8e = Math.floor(Math.random() * arr.length);
    return arr[_0x7d8e];
  };
  
  // Обфускация стилей с использованием функции для дополнительной защиты
  const _0x5d4e = () => {
    return {
      _0x1a: _0x3b2c(3),
      _0x2b: _0x3b2c(4),
      _0x3c: _0x3b2c(5),
      _0x4d: _0x3b2c(6),
      _0x5e: 0,
      _0x6f: 0.01,
      _0x7g: _0x3b2c(7)
    };
  };
  
  // Генерация случайного ID с дополнительной энтропией
  const _0x8h2j = () => {
    const _0x9i3k = Date.now().toString(36);
    const _0x0j4l = Math.random().toString(36).substring(2, 15);
    const _0x1k5m = Math.random().toString(36).substring(2, 15);
    return `${_0x9i3k}_${_0x0j4l}_${_0x1k5m}`;
  };
  
  // Обфускация имени поля с дополнительной защитой
  const _0x2l6n = () => {
    // Используем переданное имя или выбираем случайное из предопределенных
    const _0x3m7o = name || _0x4c3d([_0x3b2c(0), _0x3b2c(1), _0x3b2c(2)]);
    
    // Добавляем случайный суффикс для усложнения обнаружения
    const _0x4n8p = Math.random() < 0.5 ? 
      `${_0x3m7o}_${Math.random().toString(36).substring(2, 5)}` : 
      _0x3m7o;
    
    return _0x4n8p;
  };
  
  // Получаем обфусцированные значения
  const _0x5o9q = _0x5d4e(); // Стили
  const _0x6p0r = _0x2l6n(); // Имя поля
  const _0x7q1s = _0x8h2j(); // ID
  
  const _0x8r2t = {};
  _0x8r2t[`data-${Math.random().toString(36).substring(2, 8)}`] = _0x3b2c(8);
  
  // Рендеринг компонента с обфускацией
  return (
    <input
      type={_0x3b2c(10)}
      name={_0x6p0r}
      id={`${_0x6p0r}_${_0x7q1s}`}
      onChange={onChange}
      style={{
        display: _0x5o9q._0x1a,
        width: _0x5o9q._0x2b,
        height: _0x5o9q._0x2b,
        margin: _0x5o9q._0x3c,
        border: _0x5o9q._0x4d,
        padding: _0x5o9q._0x5e,
        opacity: _0x5o9q._0x6f,
        visibility: _0x5o9q._0x7g
      }}
      aria-hidden={_0x3b2c(8)}
      tabIndex={_0x3b2c(9)}
      autoComplete={_0x3b2c(11)}
      data-bot-field={_0x3b2c(8)}
      {..._0x8r2t}
    />
  );
};

// Экспорт компонента с дополнительной обфускацией
export default React.memo(AntiBot); 