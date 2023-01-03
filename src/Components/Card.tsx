import styles from './Card.module.scss';

interface CardProps {
    day: string;
    img: string;
    min: string;
    max: string;
}

export default function Card({day, img, min, max}: CardProps) {
  return (
    <div className={styles.card}>
        <p className={styles.card__day}>{day}</p>
        <img src={img}/>
        <div className={styles.card__text}>
            <p>{min}</p>
            <p>{max}</p>
        </div>
    </div>
  )
}
