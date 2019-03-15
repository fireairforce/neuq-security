import React, { Fragment } from 'react'
import styles from './index.less'
import { Button,WhiteSpace } from 'antd-mobile'

export default class Guide extends React.Component{
    constructor(props){
        super(props)
        this.state={
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(item){
       this.props.history.push(`/${item}`)
    }
    render(){
        const buttonStyle={
            border:'3px solid #fff',
            width:"300px",
            borderRadius:'14px',
            fontSize:'22px',
            fontFamily:'Microsoft Yahei',
            height:'50px',
            lineHeight:'50px',
            color:'#fff',
            margin:'0 auto',
            pointer:'cursor'
        }
        return(
            <Fragment>
             <div className={styles.wrapper}>
                <div className={styles.content}>
                   <p>为了解决校园内车辆混乱的问题,</p>
                   <p>让师生都能享受良好校园环境，</p>
                   <p>现收集校内所有车主的信息。</p>
                   <p>您的信息将会被您所在的学院审核，</p>
                   <p>之后您会收到车辆出入证。</p>
                   <p>我们会确保您所提交的信息的安全。</p>
                   <p>感谢配合。</p>
                   <WhiteSpace />
                   <Button type="ghost" style={buttonStyle} onClick={()=>{this.handleClick('collect')}}>电脑填写</Button>
                   <WhiteSpace /><WhiteSpace /> <WhiteSpace />
                   <Button type="ghost" style={buttonStyle} onClick={()=>{this.handleClick('mobile')}}>手机填写</Button>
                </div>
             </div>
            </Fragment>
        )
    }
}