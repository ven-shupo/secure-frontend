import React, { useState, useMemo, useRef, useEffect } from 'react'
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
  const [lastDirection, setLastDirection] = useState();
  const swiped = (direction, nameToDelete) => {
    setLastDirection(direction)
  }
  tg.expand()
  return (
    <div>
      <h1 className={styles.infoText}>Secure</h1>
      <div className={styles.cardContainer}>
        {characters.map((character) =>
          <TinderCard
            className={styles.swipe}
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name)}
            swipeRequirementType='position'
            swipeThreshold={width / 2}
          >
            <div
              className={styles.card}
              style={{ backgroundImage: 'url(' + character.url + ')' }}
            >
              <h3>{character.name}</h3>
              <rate>{character.rate}</rate>
            </div>
          </TinderCard>
        )}
      </div>
      {lastDirection ? <h2 className={styles.infoText}>You swiped {lastDirection}</h2> : <h2 className={styles.infoText} />}
    </div>
  )
}

export default CardHolder
