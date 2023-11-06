import componentStyle from './wrap.module.scss';
import Button from '../Button/Button';


export default function BottomWrap() {

    return (        
        <div className={componentStyle.bottom_wrap_section}>
            <div className="container">
                <div className="row">
                    {/* <img src="/assets/images/lightning.png" alt="" className={componentStyle.background} /> */}
                    {/* Use above image is animation is not required */}
                    <div className={componentStyle.background}>
                        <svg width="100%" height="110%" viewBox="0 0 343 526" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path id="path1" fill-rule="evenodd" clip-rule="evenodd" d="M122.72 0.150021C122.72 0.150021 293.22 2.15002 304.22 2.15002C315.22 2.15002 323.72 14.65 318.72 26.65C313.72 38.65 234.72 157.65 234.72 157.65C234.72 157.65 308.72 157.15 324.22 157.65C339.72 158.15 347.72 171.65 339.22 185.65C330.72 199.65 107.22 499.15 107.22 499.15L104.22 502.15L63.7203 523.65C56.7797 526.683 52.7102 526.482 45.2203 523.65C36.0928 520.323 31.5292 517.411 24.2203 510.65C20.2313 506.04 19.3409 502.982 20.2203 496.65L76.2202 319.65H15.7203C0.999231 315.908 -2.12543 310.735 1.22025 296.15L60.7203 32.15C61.5746 26.6802 62.9653 24.2491 67.2202 21.15L106.22 2.65002C111.069 0.133257 114.438 -0.285154 121.22 0.150021H122.72Z" fill="#FFFF09"/>
                            <path id="path2"fill-rule="evenodd" clip-rule="evenodd" d="M115.22 19.65L301.22 20.15L201.72 176.15H321.72L91.7202 488.65L54.7203 507.65L39.2203 499.65L100.72 300.15H21.2203L78.7202 37.15L115.22 19.65ZM285.22 27.65H122.72L67.442 274.15H150.22L85.2202 482.65L305.72 184.65H185.22L285.22 27.65Z" fill="#FF66C4"/>
                            <path id="path3" d="M122.72 27.65H285.22L185.22 184.65H305.72L85.2202 482.65L150.22 274.15H67.442L122.72 27.65Z" fill="#00F4FF"/>
                        </svg>
                    </div>
                    <div className="col-lg-12">
                        <div className={componentStyle.col_content}>
                            <h6 className={componentStyle.subtitle}>READY TO DUEL?</h6>
                            <h3 className={componentStyle.title}>Play now on Telegram</h3>
                            <Button type="link" onClick = {()=>{}} disabled={false} className="btn__black" title={'Launch app on Telegram'} link="https://t.me/DeductionDuel_bot" target="_blank" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
  
