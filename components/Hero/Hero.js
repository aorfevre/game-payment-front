import componentStyle from './hero.module.scss';
import styles from '../../styles/global.module.scss';
import Button from '../Button/Button';


export default function Hero( ) {
  return (
    <div className={componentStyle.hero_section}>
        <div className="container">
            <div className="row">
                <div className="col-content col-lg-12">
                    <h2 className={`${styles.h2} ${componentStyle.title}`}>Play PVP Minigames <br />Anywhere. Anytime</h2>
                    <div className={componentStyle.body}>
                        Duel other players for ETH in game-theory minigames seamlessly through our Telegram Bot
                        & take home the prize pool 🏆
                    </div>
                    <Button type="link" onClick = {()=>{}} disabled={false} className="btn__text" title="⚡ Let’s duel ⚡" link="https://t.me/DeductionDuel_bot" responsive={true} target="_blank"/>
                </div>
            </div>
        </div>
    </div>
  )
}
