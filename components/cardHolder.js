import React, {useRef, useState} from 'react'
import TinderCard from 'react-tinder-card'
import styles from '../styles/Home.module.css';
import {useDeviceSize} from "../lib/deviceSize";
import {useTelegramWeb} from "../lib/telegramWeb";

const db = [
  {
    name: 'Richard Hendricks',
    url: 'https://ven-shupo.github.io/secure-frontend/semen.jpeg',
    rate: 5,
  },
  {
    name: 'Erlich Bachman',
    url: 'https://ven-shupo.github.io/secure-frontend/semen.jpeg',
    rate: 5,
  },
  {
    name: 'Monica Hall',
    url: 'https://ven-shupo.github.io/secure-frontend/semen.jpeg',
    rate: 5,
  },
  {
    name: 'Jared Dunn',
    url: 'https://ven-shupo.github.io/secure-frontend/semen.jpeg',
    rate: 5,
  },
  {
    name: 'Dinesh Chugtai',
    url: 'https://ven-shupo.github.io/secure-frontend/semen.jpeg',
    rate: 5,
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
  tg.MainButton.setParams({text: 'FULL DESCRIPTION', is_visible: true}).onClick(() => {
    tg.showPopup({
      title: characters[currentIndexRef.current].name,
      message: 'full description',
      buttons: [
        {type: 'cancel'},
      ]
    })
  });
  return (
    <div>
      <div className={styles.cardContainer}>
        {characters.map((character, index) =>
          <div>
            <TinderCard
              className={styles.card}
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name, index)}
              swipeRequirementType='position'
              swipeThreshold={width / 2}
            >
              <div
                className={styles.card}
                style={{ backgroundImage: 'url(' + character.url + ')' }}
              >
                <h3>{character.name}</h3>
              </div>
            </TinderCard>
          </div>
        )}
      </div>
      {lastDirection ? <h1 className={styles.infoText}>You swiped {lastDirection}</h1> : <h1 className={styles.infoText} />}
    </div>
  )
}

export default CardHolder
