'use client'
import React from 'react';
import Link from 'next/link';
import styles from "./button.module.scss";


const Button = ({ type, onClick, disabled, className, title , link, glow, responsive,target}) => {
  
  return type === 'button' ? (
    <button onClick={onClick} disabled={disabled} target={target} className={`${styles.btn} ${className === 'btn__outline' ? styles.btn__outline : null} ${className === 'btn__outline_res' ? styles.btn__outline_res : null} ${className === 'btn__outline_small' ? styles.btn__outline_small : null} ${className === 'btn_text' ? styles.btn__text : null} ${className === 'btn__black' ? styles.btn__black : null} ${glow === true ? styles.glow : null} `}>
        <span className={styles.btn_text}> {title}</span>
     
    </button>
  ) : (
    <a href={link ? link : '#'} disabled={disabled} target={target} className={`${styles.btn} ${className === 'btn__outline' ? styles.btn__outline : null} ${className === 'btn__outline_res' ? styles.btn__outline_res : null} ${className === 'btn__outline_small' ? styles.btn__outline_small : null} ${className === 'btn_text' ? styles.btn__text : null} ${className === 'btn__black' ? styles.btn__black : null} ${glow === true ? styles.glow : null}`}>
       <span className={styles.btn_text}>{title}</span>
    </a>
  );
};

export default Button;

