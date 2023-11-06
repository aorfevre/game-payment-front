import componentStyle from './card.module.scss';
import React from 'react';


export default function CardGrid({ bgSchema, data, glow}) {

  return (
    <div className={`${componentStyle.icon_block_section}`}>
        <div className="container">
            <div className={`row ${componentStyle.icon_row} ${bgSchema === "light" && componentStyle.bgLight} ${glow ? componentStyle.glow : null}`}>
                {
                    data.map((item,index)=>
                        <div className={`${componentStyle.icon_block} col-lg-4`} key={index+'c'}>
                            { item.icon && 
                                <div className={`${componentStyle.icon}`}>
                                    <div className={`${componentStyle.yellowBg}`} ></div>
                                    <img src={item.icon} alt="Icon" className={`${componentStyle.img}`} />
                                </div>
                            }
                            <h3 className={`${componentStyle.ico_title}`}>{item.title}</h3>
                            { item.subheading && <h3 className={`${componentStyle.ico_subtitle}`}>{item.subheading}</h3>}
                            { item.content && <div className={`${componentStyle.ico_content}`}>{item.content}</div> }
                        </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}
