import React from 'react';
import styles from './index.less';
class HeaderOne extends React.Component{
    render(){
        return(
            <div className={styles.wrapper}>
               <div className={styles.logo}>
                   <img src="http://wdlj.zoomdong.xin/school_word.png" style={{width:'auto',height:'auto',maxWidth:'100%',maxHeight:'100%'}} alt="logo"/>
               </div>
            </div>
        )
    }
}
export default HeaderOne;