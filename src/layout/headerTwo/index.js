import React from 'react';
import styles from './index.less';


class HeaderTwo extends React.Component{
    render(){
        return(
            <div className={styles.wrapper}>
               <div className={styles.logo}>
                   <img src={require('./../../assets/logo.png')} style={{width:"65px",height:"65px"}}  alt="logo"/>
               </div>
               <div className={styles.word}>
                 <img src={require('./../../assets/word.png')} alt="word"/>
               </div>
            </div>
        )
    }
}
export default HeaderTwo;