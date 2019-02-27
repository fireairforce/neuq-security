import React from 'react';
import { Button, Col, Form, Input, message,Row,Cascader, Radio} from 'antd'
import Options from '../utils/options';
import verify from '../utils/regex';

const FormItem = Form.Item;

class MobileCollect extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12}
            }
        }
        return(
            <div className={styles.form_header}>
               东大安保出行证申请表
            </div>
        )
    }
} 
MobileCollect = Form.create()(MobileCollect);
export default MobileCollect;
