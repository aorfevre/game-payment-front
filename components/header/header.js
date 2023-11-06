import React from 'react';
import componentStyle from './header.module.scss';
import Button from '../Button/Button';


function Header() {
    
  return (
    <header className={componentStyle.header}>
        <div className="container">
            <div className="row d-flex justify-content-between">
                <div className={`${componentStyle.col_logo} col-6`}>
                    <a href="" className="link">
                        <img src="/assets/images/logo.svg" alt="" className={componentStyle.header_logo} />
                    </a>
                </div>
                <div className={`${componentStyle.col_btns} col-6`}>
                    <div className={componentStyle.icon}>
                        <a href="#" className="link">
                            <img src="/assets/images/logo-white1.svg" alt="" className={componentStyle.header_logo} />
                        </a>
                    </div>
                    <Button type="link" onClick = {()=>{}} disabled={false} className="btn__outline_res" title="Play pvp duels" link="#" responsive={true} />
                    <Button type="link" onClick = {()=>{}} disabled={false} className="btn__outline_small" title="Play" link="#" responsive={true} />
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header
