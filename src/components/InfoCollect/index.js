import React, { Fragment } from 'react';
import styles from './index.less';
import { Form ,Cascader, Input, Button,Modal} from 'antd';
import { connect } from 'dva';
import verity from 'utils/regex';
import Options from 'utils/options';

const FormItem = Form.Item;

class InfoCollect extends React.Component{
    state={
        loading:false,
        submitted:false,
    }
    handleSubmit = (e) =>{
        e.preventDefault()
        let value = {}
        this.props.form.validateFields((err, values) => {
            if (!err) {
             value = values
            }
          })
        if(!Object.values(value).length){
            return
        }
        const {xm,bm=[],cp,dh,gx}= value
        const { dispatch } = this.props
        const content = {
            name:xm,
            department:bm.join(""),
            car_number:cp,
            phone:dh,
            relation:gx
        }
        dispatch({
            type:'apply/handleApply',
            payload: content
        })
        setTimeout(() =>{
            this.setState({loading:false})
            const value = this.props.apply.value;
            if(value){
                if(value.code==="0"){
                    this.setState({submitted:true})
                    Modal.success({
                        title: '申请成功',
                        content: (
                            <div>
                             <p style={{textAlign:"center"}}><img src="http://wdlj.zoomdong.xin/message.png" style={{margin:'0 auto'}} alt=""/></p>     
                               <p style={{textAlign:"center" ,fontSize:'20px'}}>请等待管理员审核...</p>
                              <p style={{textAlign:"center" ,fontSize:'18px'}}>预计会在三个工作日左右收到出入证</p>
                            </div>
                          ),
                    })
                }else if(value.code ==="2001"){
                    Modal.info({
                        title: value.message,
                    })
                }
            }
        },2000)
    }
    render(){
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {labelCol: {xs: {span: 24},sm: {span: 8}},wrapperCol: {xs: {span: 24},sm: {span: 12}} }
        return (
          <Fragment>
              <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.content}></div>
                </div>
                <div className={styles.content1}>
                    <p className={styles.header1}>东大安保</p>
                    <p className={styles.header2}>申请出行证</p>
                </div>
                <div className={styles.content2}>
                <Form
                >
                    <FormItem
                    label='姓名'
                    {...formItemLayout}
                    key='name'
                    >
                        {getFieldDecorator('xm', {
                            rules: [{ required: true, message: '请输入姓名!' }],
                        })(
                            <Input placeholder="请输入申请人姓名"  style={{width: '15vw'}}/>
                        )}
                    </FormItem>

                <FormItem
                    label='所在部门'
                    {...formItemLayout}
                    key='bumen'
                >
                    {getFieldDecorator('bm', {
                    rules: [{
                        required: true, message: '请选择所在部门'
                    }]
                    })(
                      <Cascader options={Options} placeholder="请选择所在部门"  style={{width: '15vw'}}/>
                    )}
                </FormItem>

                <FormItem
                    label='车牌号'
                    {...formItemLayout}
                    key='carnumber'
                    >
                        {getFieldDecorator('cp', {
                            rules: [{
                                pattern:verity.carCard,message: '请输入符合规范的车牌号码'
                            },
                                { required: true, message: '请输入您的车牌号码' 
                            }],
                        })(
                            <Input placeholder="请输入您的车牌号"  style={{width: '15vw'}}/>
                        )}
                </FormItem>

                <FormItem
                        label='电话号码'
                        {...formItemLayout}
                        key='phonenumber'
                        >
                            {getFieldDecorator('dh', {
                                rules: [{
                                    pattern:verity.mobile,message: '请输入正确的号码'
                                },{ required: true, message: '请输入电话!' }],
                            })(
                                <Input placeholder="请输入您的电话号码"  style={{width: '15vw'}}/>
                            )}
                </FormItem>

                <FormItem
                        label='与车主的关系'
                        {...formItemLayout}
                        key='connect'
                        >
                            {getFieldDecorator('gx', {
                                rules: [{ message: '' }],
                            })(
                                <Input placeholder="车主是本人可以不填"  style={{width: '15vw'}}/>
                            )}
                </FormItem>

                <Button
                    type="primary"
                    onClick={this.handleSubmit}
                    className="login-form-button"
                    style={{width: '15vw' }}
                    loading={this.state.loading}
                    disabled={this.state.submitted}
                >
                    {this.state.submitted? '提交成功':'点击提交' }
                </Button>
                </Form>
                </div>
             </div>
           </Fragment>
        )
    }
}
export default connect(({ apply }) => ({ apply }))(Form.create()(InfoCollect));
