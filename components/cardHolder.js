import React, {useRef, useState} from 'react'
import TinderCard from 'react-tinder-card'
import styles from '../styles/Home.module.css';
import {useDeviceSize} from "../lib/deviceSize";
import {useTelegramWeb} from "../lib/telegramWeb";

const db = [
  {
    name: 'Костя',
    url: 'https://ven-shupo.github.io/secure-frontend/masik.jpeg',
    rate: 'Масик',
    age: 30,
    description: 'Детка, если ты мне не напишешь - <b>bold</b>, <strong>bold</strong> \x2a\x2aмне\x2a\x2a \~\~напишет\~\~ \|\|та сука\|\|' +
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
    description: '%2AМоя бывшая сказала%2A, 2Aчто2A я %7C%0Aне найду%7C%0A никого лучше нее, но кажется я уже нашел' +
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
    description: '```Привет! Меня зовут Саша, мне 21```' +
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
      message: characters[currentIndexRef.current].description,
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
