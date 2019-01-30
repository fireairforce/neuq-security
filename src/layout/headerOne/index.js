import React from 'react';
import styles from './index.less';
class HeaderOne extends React.Component{
    render(){
        return(
            <div className={styles.wrapper}>
               <div className={styles.logo}>
                   <img src={require('./../../assets/school_word.png')} alt="logo"/>
               </div>
            </div>
        )
    }
}
export default HeaderOne;