import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Plus, Check, X, RefreshCw } from 'lucide-react';
import AntiBot from '../AntiBot/AntiBot';

// Функция для генерации случайной строки
const generateRandomString = (length = 20) => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  
  let result = [];
  
  const stringLength = typeof length === 'number' ? length : Math.random() * 10 + 20;
  
  for (let i = 0; i < stringLength; i++) {
    const randomIndex = Math.random() * chars.length;
    const randomChar = chars.charAt(Math.floor(randomIndex));
    result.push(randomChar);
  }
  
  result = result.reverse().reverse();
  
  return result.join('');
};

const encryptData = (data) => {
  try {
    const jsonString = JSON.stringify(data);
    
    let base64Data = window.btoa(jsonString);
    
    base64Data = base64Data.split('').reverse().join('');
    
    const saltPrefix = generateRandomString().substring(0, 5);
    const saltSuffix = generateRandomString().substring(0, 5);
    
    return `${saltPrefix}${base64Data}${saltSuffix}`;
  } catch (error) {
    return generateRandomString();
  }
};

// Функция для дешифрования данных
const decryptData = (encryptedData) => {
  try {
    const dataWithoutSalt = encryptedData.substring(5, encryptedData.length - 5);
    
    const reversedData = dataWithoutSalt.split('').reverse().join('');
    
    const jsonString = window.atob(reversedData);
    
    return JSON.parse(jsonString);
  } catch (error) {
    return {};
  }
};

const RegistrationSection = () => {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const { t } = useTranslation();
  const [participantsCount, setParticipantsCount] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    captainName: '',
    captainAge: '',
    participantsCount: 1,
    captainContact: '',
    teamName: '',
    city: '',
    participants: [{ name: '', age: '' }],
    agreement: false
  });
  
  // Состояние для попапа
  const [popup, setPopup] = useState({
    isOpen: false,
    type: '', // 'success', 'error', 'warning'
    message: ''
  });
  
  // Состояние для капчи
  const [captcha, setCaptcha] = useState({
    token: '',
    value: ''
  });
  
  // Состояние для защитного токена
  const [securityToken, setSecurityToken] = useState('');
  const [tokenTimestamp, setTokenTimestamp] = useState(0);
  const [mouseMovements, setMouseMovements] = useState(0);
  const [formInteractions, setFormInteractions] = useState(0);
  
  // Состояние для ошибок валидации
  const [validationErrors, setValidationErrors] = useState({
    captainAge: '',
    participants: [],
    captcha: ''
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const formOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const formY = useTransform(scrollYProgress, [0.2, 0.3], [50, 0]);

  const smoothTitleOpacity = useSpring(titleOpacity, { damping: 15, stiffness: 90 });
  const smoothFormOpacity = useSpring(formOpacity, { damping: 15, stiffness: 90 });
  const smoothFormY = useSpring(formY, { damping: 15, stiffness: 90 });

  // Генерация капчи
  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let captchaText = '';
    for (let i = 0; i < 5; i++) {
      captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha({
      ...captcha,
      token: captchaText
    });
  };
  
  // Генерация защитного токена
  const generateSecurityToken = () => {
    const currentTime = Date.now();
    
    const tokenData = {
      timestamp: currentTime,
      mouseMovements: mouseMovements,
      formInteractions: formInteractions,
      entropy: generateRandomString(),
      screenSize: `${window.innerWidth}x${window.innerHeight}`,
      colorDepth: window.screen.colorDepth,
      timezone: new Date().getTimezoneOffset(),
      _debug: false,
      _breakpoint: null,
      _trace: undefined
    };
    
    const encryptedToken = encryptData(tokenData);
    
    setSecurityToken(encryptedToken);
    setTokenTimestamp(currentTime);
    
    return encryptedToken;
  };
  
  const handleMouseMove = () => {
    setMouseMovements(prev => prev + 1);
  };
  
  const handleFormInteraction = () => {
    incrementFormInteractions();
  };
  
  // Обработчик взаимодействия с формой
  const incrementFormInteractions = () => {
    setFormInteractions(prev => prev + 1);
  };
  
  // Обработчик для установки обработчиков событий
  useEffect(() => {
    // Ссылка на форму
    const formElement = formRef.current;
    
    if (formElement) {
      document.addEventListener("mousemove", handleMouseMove);
      formElement.addEventListener("click", incrementFormInteractions);
      formElement.addEventListener("keydown", incrementFormInteractions);
      formElement.addEventListener("focus", incrementFormInteractions);
      formElement.addEventListener("blur", incrementFormInteractions);
      
      const intervalId = window.setInterval(() => {
        generateSecurityToken();
      }, 60000); 
      
      // Генерируем начальный токен
      generateSecurityToken();
      
      // Очистка при размонтировании
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        formElement.removeEventListener("click", incrementFormInteractions);
        formElement.removeEventListener("keydown", incrementFormInteractions);
        formElement.removeEventListener("focus", incrementFormInteractions);
        formElement.removeEventListener("blur", incrementFormInteractions);
        window.clearInterval(intervalId);
      };
    }
  }, [formRef]);

  // Инициализация капчи при загрузке компонента
  useEffect(() => {
    // Генерация капчи
    generateCaptcha();
  }, []);

  // Валидация возраста
  const validateAge = (age, index = -1) => {
    const ageNum = parseInt(age);
    if (isNaN(ageNum)) {
      return t('registration.ageValidation.required') || 'Возраст обязателен';
    }
    if (ageNum < 13 || ageNum > 17) {
      return t('registration.ageValidation.range') || 'Возраст должен быть от 13 до 17 лет';
    }
    return '';
  };
  
  // Закрытие попапа
  const closePopup = () => {
    setPopup({
      isOpen: false,
      type: '',
      message: ''
    });
  };

  // Обработчик изменения количества участников
  const handleParticipantsCountChange = (count) => {
    setParticipantsCount(count);
    setIsDropdownOpen(false);
    
    const updatedParticipants = [...formData.participants];
    
    if (count > updatedParticipants.length) {
      for (let i = updatedParticipants.length; i < count; i++) {
        updatedParticipants.push({ name: '', age: '' });
      }
    } else if (count < updatedParticipants.length) {
      updatedParticipants.splice(count);
    }
    
    setFormData({
      ...formData,
      participantsCount: count,
      participants: updatedParticipants
    });
    
    // Инициализируем массив ошибок валидации для всех участников
    const updatedErrors = {
      ...validationErrors,
      participants: Array(count).fill('')
    };
    setValidationErrors(updatedErrors);
  };

  // Обработчик изменения полей формы
  const handleInputChange = (e, index = null, field = null) => {
    handleFormInteraction();
    
    const { name, value, type, checked } = e.target;
    
    if (name === 'captchaValue') {
      setCaptcha({
        ...captcha,
        value: value
      });
      return;
    }
    
    if (index !== null && field !== null) {
      const updatedParticipants = [...formData.participants];
      updatedParticipants[index] = {
        ...updatedParticipants[index],
        [field]: value
      };
      
      setFormData({
        ...formData,
        participants: updatedParticipants
      });
      
      if (field === 'age') {
        const updatedErrors = { ...validationErrors };
        if (!updatedErrors.participants) {
          updatedErrors.participants = Array(formData.participants.length).fill('');
        }
        updatedErrors.participants[index] = validateAge(value, index);
        setValidationErrors(updatedErrors);
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
      
      if (name === 'captainAge') {
        setValidationErrors({
          ...validationErrors,
          captainAge: validateAge(value)
        });
      }
    }
  };

  // Функция для проверки токена безопасности
  const validateSecurityToken = () => {
    if (!securityToken) {
      return false;
    }
    
    try {
      const tokenData = decryptData(securityToken);
      
      // Проверяем возраст токена (не старше 30 минут)
      const currentTime = Date.now();
      const tokenTime = tokenData.timestamp || 0;
      const tokenAgeMinutes = (currentTime - tokenTime) / (1000 * 60); 
      
      if (tokenAgeMinutes > 30) {
        return false;
      }
      
      if ((tokenData.mouseMovements || 0) < 5) {
        return false;
      }
      
      if ((tokenData.formInteractions || 0) < 2) {
        return false;
      }
      
      return true;
    } catch (error) {
      return false;
    }
  };

  // Отправка формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Проверяем возраст капитана
    const captainAgeError = validateAge(formData.captainAge);
    
    // Проверяем возраст всех участников
    const participantsAgeErrors = formData.participants.map((p, index) => 
      index === 0 ? '' : validateAge(p.age, index)
    );
    
    // Проверяем наличие ошибок валидации возраста
    const hasAgeErrors = captainAgeError !== '' || participantsAgeErrors.some(error => error !== '');
    
    // Проверяем капчу
    let captchaError = '';
    if (captcha.value !== captcha.token) {
      captchaError = t('registration.captchaValidation.invalid') || 'Неверный код с картинки';
    }
    
    // Обновляем ошибки валидации
    setValidationErrors({
      captainAge: captainAgeError,
      participants: participantsAgeErrors,
      captcha: captchaError
    });
    
    if (hasAgeErrors || captchaError) {
      setPopup({
        isOpen: true,
        type: 'warning',
        message: captchaError 
          ? (t('registration.popup.captchaError') || 'Пожалуйста, введите правильный код с картинки')
          : (t('registration.popup.ageError') || 'Возраст всех участников должен быть от 13 до 17 лет')
      });
      
      // Если ошибка в капче, обновляем её
      if (captchaError) {
        generateCaptcha();
        setCaptcha({
          ...captcha,
          value: ''
        });
      }
      
      return;
    }
    
    // Проверка антибот-поля copyemail
    if (formData.copyemail) {
      setPopup({
        isOpen: true,
        type: 'success',
        message: t('registration.popup.success') || 'Ваша заявка принята! С вами свяжутся в ближайшее время.'
      });
      return;
    }
    
    try {
      // URL скрипта Google Apps Script
      const scriptUrl = "url-to-your-google-apps-script";
      
      // Показываем попап с сообщением об отправке
      setPopup({
        isOpen: true,
        type: 'info',
        message: t('registration.popup.sending') || 'Отправка данных...'
      });
      
      let participantsData = [];
      
      // Первый элемент - капитан
      participantsData.push({
        name: formData.captainName,
        age: formData.captainAge
      });
      
      for (let i = 1; i < formData.participantsCount; i++) {
        if (i < formData.participants.length) {
          participantsData.push(formData.participants[i]);
        } else {
          participantsData.push({ name: '', age: '' });
        }
      }
      
      // Создаем объект данных для отправки
      const dataToSend = {
        spreadsheetId: 'id-of-your-spreadsheet',
        captainName: formData.captainName,
        captainAge: formData.captainAge,
        participantsCount: formData.participantsCount,
        captainContact: formData.captainContact,
        teamName: formData.teamName,
        city: formData.city,
        participants: participantsData
      };
      
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend),
        mode: 'no-cors' // vazhno
      });
      
      // Показываем попап с сообщением об успехе
      setPopup({
        isOpen: true,
        type: 'success',
        message: t('registration.popup.success') || 'Ваша заявка принята! С вами свяжутся в ближайшее время.'
      });
      
      // Сбрасываем данные формы
      setFormData({
        captainName: '',
        captainAge: '',
        participantsCount: 1,
        captainContact: '',
        teamName: '',
        city: '',
        participants: [{ name: '', age: '' }],
        agreement: false
      });
      setParticipantsCount(1);
      setValidationErrors({
        captainAge: '',
        participants: [],
        captcha: ''
      });
      
      // Обновляем капчу после отправки
      generateCaptcha();
      setCaptcha({
        ...captcha,
        value: ''
      });
      
    } catch (error) {
      // Показываем попап с сообщением об ошибке
      setPopup({
        isOpen: true,
        type: 'error',
        message: t('registration.popup.error') || 'Произошла ошибка при отправке формы.'
      });
    }
  };

  return (
    <section id="registration" ref={containerRef} className="w-full bg-[#090909] py-16 md:py-24 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-12 md:mb-16 text-center"
          style={{ opacity: smoothTitleOpacity }}
        >
          {t('registration.title') || 'Регистрация'}
        </motion.h2>

        <motion.div 
          className="w-full"
          style={{
            opacity: smoothFormOpacity,
            y: smoothFormY
          }}
        >
          <form 
            ref={formRef}
            className="w-full max-w-5xl mx-auto bg-[#111] rounded-3xl p-6 md:p-10 lg:p-12"
            onSubmit={handleSubmit}
            onClick={handleFormInteraction}
            onChange={handleFormInteraction}
          >
            <AntiBot 
              name="copyemail" 
              onChange={(e) => handleInputChange(e)}
            />
            
            <input 
              type="hidden" 
              name="securityToken" 
              value={securityToken} 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-white mb-2">
                  {t('registration.captainName') || 'ФИО капитана команды'}
                </label>
                <input
                  type="text"
                  name="captainName"
                  value={formData.captainName}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border border-gray-700 rounded-lg p-4 text-white focus:border-white focus:outline-none"
                  placeholder={t('registration.captainNamePlaceholder') || 'ФИО'}
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">
                  {t('registration.captainAge') || 'Возраст капитана команды'} (13-17)
                </label>
                <input
                  type="number"
                  name="captainAge"
                  value={formData.captainAge}
                  onChange={handleInputChange}
                  className={`w-full bg-transparent border ${validationErrors.captainAge ? 'border-red-500' : 'border-gray-700'} rounded-lg p-4 text-white focus:border-white focus:outline-none`}
                  placeholder={t('registration.captainAgePlaceholder') || 'Возраст капитана'}
                  min="13"
                  max="17"
                  required
                />
                {validationErrors.captainAge && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.captainAge}</p>
                )}
              </div>

              <div>
                <label className="block text-white mb-2">
                  {t('registration.participantsCount') || 'Сколько участников в вашей команде?'}
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full bg-transparent border border-gray-700 rounded-lg p-4 text-white focus:border-white focus:outline-none flex justify-between items-center"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span>
                      {participantsCount} 
                      {participantsCount === 1 
                        ? ` ${t('registration.participant') || 'участник'}`
                        : ` ${t('registration.participants') || 'участников'}`
                      }
                    </span>
                    <ChevronDown size={20} />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 w-full bg-[#111] border border-gray-700 rounded-lg mt-1 z-10">
                      {[1, 2, 3, 4].map((count) => (
                        <button
                          key={count}
                          type="button"
                          className="w-full p-3 text-left text-white hover:bg-[#222] flex items-center justify-between"
                          onClick={() => handleParticipantsCountChange(count)}
                        >
                          <span>
                            {count} 
                            {count === 1 
                              ? ` ${t('registration.participant') || 'участник'}`
                              : ` ${t('registration.participants') || 'участников'}`
                            }
                          </span>
                          {participantsCount === count && <Check size={16} />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-white mb-2">
                  {t('registration.captainContact') || 'Связь с капитаном (Telegram, Whatsapp)'}
                </label>
                <input
                  type="text"
                  name="captainContact"
                  value={formData.captainContact}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border border-gray-700 rounded-lg p-4 text-white focus:border-white focus:outline-none"
                  placeholder={t('registration.captainContactPlaceholder') || 'Укажите контакт и соц сеть'}
                  required
                />
              </div>
            </div>

            {formData.participants.map((participant, index) => (
              index === 0 ? null : (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pt-4 border-t border-gray-800">
                  <div className="md:col-span-2 mb-2">
                    <h3 className="text-white text-lg font-medium">
                      {t('registration.participantTitle', { n: index }).replace('%n', index) || `Участник ${index}`}
                    </h3>
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">
                      {t('registration.participantName') || 'ФИО участника'}
                    </label>
                    <input
                      type="text"
                      value={participant.name}
                      onChange={(e) => handleInputChange(e, index, 'name')}
                      className="w-full bg-transparent border border-gray-700 rounded-lg p-4 text-white focus:border-white focus:outline-none"
                      placeholder={t('registration.participantNamePlaceholder') || 'ФИО участника'}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">
                      {t('registration.participantAge') || 'Возраст участника'} (13-17)
                    </label>
                    <input
                      type="number"
                      value={participant.age}
                      onChange={(e) => handleInputChange(e, index, 'age')}
                      className={`w-full bg-transparent border ${validationErrors.participants && validationErrors.participants[index] ? 'border-red-500' : 'border-gray-700'} rounded-lg p-4 text-white focus:border-white focus:outline-none`}
                      placeholder={t('registration.participantAgePlaceholder') || 'Возраст участника'}
                      min="13"
                      max="17"
                      required
                    />
                    {validationErrors.participants && validationErrors.participants[index] && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.participants[index]}</p>
                    )}
                  </div>
                </div>
              )
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-white mb-2">
                  {t('registration.city') || 'С какого вы города?'}
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border border-gray-700 rounded-lg p-4 text-white focus:border-white focus:outline-none"
                  placeholder={t('registration.cityPlaceholder') || 'Укажите город'}
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">
                  {t('registration.teamName') || 'Название команды'}
                </label>
                <input
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border border-gray-700 rounded-lg p-4 text-white focus:border-white focus:outline-none"
                  placeholder={t('registration.teamNamePlaceholder') || 'Укажите название команды'}
                  required
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-white mb-4">
                {t('registration.captcha') || 'Подтвердите, что вы не робот'}
              </label>
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="bg-white p-3 rounded-lg flex items-center">
                  <div 
                    className="text-lg font-mono tracking-wider select-none"
                    style={{ 
                      fontFamily: 'monospace',
                      letterSpacing: '0.2em',
                      background: 'linear-gradient(45deg, #333, #666)',
                      color: 'white',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                      fontWeight: 'bold'
                    }}
                  >
                    {captcha.token}
                  </div>
                  <button 
                    type="button" 
                    className="ml-3 p-2 text-gray-600 hover:text-gray-900"
                    onClick={() => {
                      generateCaptcha();
                      handleFormInteraction();
                    }}
                  >
                    <RefreshCw size={18} />
                  </button>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    name="captchaValue"
                    value={captcha.value}
                    onChange={(e) => setCaptcha({...captcha, value: e.target.value})}
                    className={`w-full bg-transparent border ${validationErrors.captcha ? 'border-red-500' : 'border-gray-700'} rounded-lg p-4 text-white focus:border-white focus:outline-none`}
                    placeholder={t('registration.captchaPlaceholder') || 'Введите код с картинки'}
                    required
                  />
                  {validationErrors.captcha && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.captcha}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <label className="flex items-start text-white cursor-pointer" onClick={(e) => {
                e.preventDefault(); // Предотвращаем стандартное поведение
                const newValue = !formData.agreement;
                setFormData({
                  ...formData,
                  agreement: newValue
                });
                const event = {
                  target: {
                    name: 'agreement',
                    type: 'checkbox',
                    checked: newValue
                  }
                };
                handleInputChange(event);
              }}>
                <input
                  type="checkbox"
                  name="agreement"
                  checked={formData.agreement}
                  onChange={handleInputChange}
                  className="mt-1 mr-3"
                  required
                  onClick={(e) => e.stopPropagation()} 
                />
                <span className="text-gray-400">
                  *{t('registration.agreement') || 'Я согласен с правилами хакатона и положением'}
                </span>
              </label>
              
              <button
                type="submit"
                className="bg-white text-black font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-full hover:bg-gray-200 transition-colors w-full sm:w-auto"
              >
                {t('registration.submit') || 'Отправить'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
      
      {popup.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="absolute inset-0 bg-black bg-opacity-70" onClick={closePopup}></div>
          <div className="bg-[#111] border border-gray-700 rounded-xl p-6 max-w-md w-full relative z-10">
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            
            <div className="text-center mb-6">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                popup.type === 'success' ? 'bg-green-900 text-green-300' :
                popup.type === 'error' ? 'bg-red-900 text-red-300' :
                popup.type === 'warning' ? 'bg-yellow-900 text-yellow-300' :
                'bg-blue-900 text-blue-300'
              }`}>
                {popup.type === 'success' && <Check size={32} />}
                {popup.type === 'error' && <X size={32} />}
                {popup.type === 'warning' && <span className="text-2xl font-bold">!</span>}
                {popup.type === 'info' && <span className="text-2xl font-bold">i</span>}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">
                {popup.type === 'success' && (t('registration.popup.successTitle') || 'Успешно!')}
                {popup.type === 'error' && (t('registration.popup.errorTitle') || 'Ошибка')}
                {popup.type === 'warning' && (t('registration.popup.warningTitle') || 'Внимание')}
                {popup.type === 'info' && (t('registration.popup.infoTitle') || 'Информация')}
              </h3>
              
              <p className="text-gray-300">{popup.message}</p>
            </div>
            
            <button
              onClick={closePopup}
              className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {t('registration.popup.close') || 'Закрыть'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default RegistrationSection;