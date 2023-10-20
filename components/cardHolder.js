import React, {useRef, useState} from 'react'
import TinderCard from 'react-tinder-card'
import styles from '../styles/Home.module.css';
import {useDeviceSize} from "../lib/deviceSize";
import {useTelegramWeb} from "../lib/telegramWeb";

const db = [
  {
    name: 'Семен',
    url: 'https://ven-shupo.github.io/secure-frontend/semen.jpeg',
    age: 21,
    rate: 5,
    description: 'description очень большое описание \n\n\n\n\n\n\n\n\n\n\n\n' +
    '👤\nДругой человек 🌑🌑🌕🌑🌑 Как на фото\n' +
    '🫂\nЗажатый 🌑🌑🌑🌕🌑 Раскрепощенный\n' +
    '🧠\nЖенственный 🌑🌑🌕🌑🌑 Муженственный\n' +
    '💰\nБедный 🌑🌑🌑🌕🌑 Богатый\n' +
    'Чечик'
  },
  {
    name: 'Андрей',
    url: 'https://ven-shupo.github.io/secure-frontend/semen.jpeg',
    rate: 5,
    age: 32,
    description: 'description очень большое описание \n\n\n\n\n\n\n\n\n\n\n\n' +
    '👤\nДругой человек 🌑🌑🌕🌑🌑 Как на фото\n' +
    '🫂\nЗажатый 🌑🌑🌑🌕🌑 Раскрепощенный\n' +
    '🧠\nЖенственный 🌑🌑🌕🌑🌑 Муженственный\n' +
    '💰\nБедный 🌑🌑🌑🌕🌑 Богатый\n' +
    'Чечик'
  },
  {
    name: 'Саша',
    url: 'https://ven-shupo.github.io/secure-frontend/semen.jpeg',
    rate: 5,
    age: 21,
    description: 'description очень большое описание \n\n\n\n\n\n\n\n\n\n\n\n' +
    '👤\nДругой человек 🌑🌑🌕🌑🌑 Как на фото\n' +
    '🫂\nЗажатый 🌑🌑🌑🌕🌑 Раскрепощенный\n' +
    '🧠\nЖенственный 🌑🌑🌕🌑🌑 Муженственный\n' +
    '💰\nБедный 🌑🌑🌑🌕🌑 Богатый\n' +
    'Чечик'
  },
  {
    name: 'Миша',
    url: 'https://ven-shupo.github.io/secure-frontend/semen.jpeg',
    rate: 5,
    age: 32,
    description: 'description очень большое описание \n\n\n\n\n\n\n\n\n\n\n\n' +
    '👤\nДругой человек 🌑🌑🌕🌑🌑 Как на фото\n' +
    '🫂\nЗажатый 🌑🌑🌑🌕🌑 Раскрепощенный\n' +
    '🧠\nЖенственный 🌑🌑🌕🌑🌑 Муженственный\n' +
    '💰\nБедный 🌑🌑🌑🌕🌑 Богатый\n' +
    'Чечик'
  },
  {
    name: 'Иван',
    url: 'https://ven-shupo.github.io/secure-frontend/semen.jpeg',
    rate: 5,
    age: 32,
    description: 'description очень большое описание \n\n\n\n\n\n\n\n\n\n\n\n' +
    '👤\nДругой человек 🌑🌑🌕🌑🌑 Как на фото\n' +
    '🫂\nЗажатый 🌑🌑🌑🌕🌑 Раскрепощенный\n' +
    '🧠\nЖенственный 🌑🌑🌕🌑🌑 Муженственный\n' +
    '💰\nБедный 🌑🌑🌑🌕🌑 Богатый\n' +
    'Чечик'
  }
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
                <rate>{character.rate}⭐</rate>
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
