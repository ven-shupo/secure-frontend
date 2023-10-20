import React, {useRef, useState} from 'react'
import TinderCard from 'react-tinder-card'
import styles from '../styles/Home.module.css';
import {useDeviceSize} from "../lib/deviceSize";
import {useTelegramWeb} from "../lib/telegramWeb";

var toUtf8 = function(text) {
  var surrogate = encodeURIComponent(text);
  return surrogate
  var result = '';
  for (var i = 0; i < surrogate.length;) {
      var character = surrogate[i];
  i += 1;
      if (character == '%') {
        var hex = surrogate.substring(i, i += 2);
    if (hex) {
      result += String.fromCharCode(parseInt(hex, 16));
    }
      } else {
        result += character;
      }
  }
  return result;
};

const db = [
  {
    name: 'Костя',
    url: 'https://ven-shupo.github.io/secure-frontend/masik.jpeg',
    rate: 'Масик',
    age: 30,
    description: 'Детка, &#42;&#42;если&#42;&#42; ты мне не напишешь - мне напишет та сука' +
    '\n\n⬇️ Оценки бывших ⬇️\n' +
    '📷 | Реальное\n' + 
    '🫂 | Сигма   \n' +
    '💰 | Элит    \n' +
    '#️⃣ | Гигачад, Качок' 
  },
  {
    name: 'Дима',
    url: 'https://ven-shupo.github.io/secure-frontend/chechik.jpg',
    rate: 'Чечик',
    age: 25,
    description: 'Моя бывшая сказала, что я не найду никого лучше нее, но кажется я уже нашел' +
    '\n\n⬇️ Оценки бывших ⬇️\n' +
    '📷 | Реальное \n' + 
    '🫂 | Бета     \n' +
    '💰 | Комфорт  \n' +
    '#️⃣ | Анимешник' 
  },
  {
    name: 'Саша',
    url: 'https://ven-shupo.github.io/secure-frontend/tubik.jpg',
    rate: 'Тюбик',
    age: 21,
    description: 'Привет! Меня зовут Саша, мне 21' +
    '\n\n⬇️ Оценки бывших ⬇️\n' +
    '📷 | Фейк    \n' + 
    '🫂 | Омега   \n' +
    '💰 | Эконом  \n' +
    '#️⃣ | Ботан, Скуф' 
  },
]

function CardHolder () {
  const characters = db;
  const tg = useTelegramWeb();
  const [width, height] = useDeviceSize();
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const currentIndexRef = useRef(currentIndex);
  const [lastDirection, setLastDirection] = useState();
  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }
  tg.expand();
  tg.MainButton.setParams({text: 'Описание', is_visible: true}).onClick(() => {
    tg.showPopup({
      title: characters[currentIndexRef.current].name,
      message: toUtf8(characters[currentIndexRef.current].description),
      buttons: [
        {type: 'cancel'},
      ]
    })
  });
  return (
    <div>
      <div
        className={styles.cardContainer}
        style={{backgroundColor: 'var(--tg-theme-bg-color)'}}
      >
        {characters.map((character, index) =>
          <div>
            <TinderCard
              className={styles.swipe}
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name, index)}
              swipeRequirementType='position'
              swipeThreshold={width / 2}
            >
              <div
                className={styles.card}
                style={{ backgroundImage: 'url(' + character.url + ')' }}
              >
                <h3>{character.name}, {character.age}</h3>
                <rate>{character.rate}</rate>
              </div>
            </TinderCard>
          </div>
        )}
        {lastDirection &&
          <h1
            className={styles.infoText}
            style={{color: 'var(--tg-theme-text-color)'}}
          >You swiped {lastDirection}</h1>}
      </div>
    </div>
  )
}

export default CardHolder
