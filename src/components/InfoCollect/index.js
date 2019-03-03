import React, { Fragment } from 'react';
import styles from './index.less';
import { Form ,Cascader, Input, Button,Modal} from 'antd';
import { connect } from 'dva';
import verity from '../../utils/regex';
import Options from '../../utils/options';
import { Redirect } from 'dva/router';

// import axios from 'axios';

const FormItem = Form.Item;

class InfoCollect extends React.Component{
    // componentDidMount(){
    //     const ids = [146]
    //     const data = { ids }
    //     axios.post('http://neuqsecurity.lyzwhh.top/pass/getQRcode',{
    //         data
    //     },{
    //         headers:{token:'71ae0a939adec0ea62a32d0ca2ba6262'}
    //     }).then(res=>{
    //         var blob = new Blob([res.data],{type: res.headers['content-type']});
    //         var downloadElement = document.createElement('a');
    //         var href = window.URL.createObjectURL(blob); //创建下载的链接
    //         downloadElement.href = href;
    //         downloadElement.download = 'QRCode.zip'; //下载后文件名
    //         document.body.appendChild(downloadElement);
    //         downloadElement.click(); //点击下载
    //         document.body.removeChild(downloadElement); //下载完成移除元素
    //         window.URL.revokeObjectURL(href); //释放掉blob对象
    //     })
    // }
    state={
        loading:false,
        submitted:false,
    }
    handleSubmit = () =>{
        // this.setState({ loading:true })
        let value = this.props.form.getFieldsValue();
        const {xm,bm,cp,dh,gx}=value;
        const {dispatch} = this.props;
        const content = {
            name:xm,
            department:bm[0],
            car_number:cp,
            phone:dh,
            relation:gx
        }
        // console.log(content);
        dispatch({
            type:'apply/handleApply',
            payload: content
        })
        setTimeout(() =>{
            // console.log(this.props.apply.value);
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
                }
            }
        },2000)
    }
    render(){
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {labelCol: {xs: {span: 24},sm: {span: 8}},wrapperCol: {xs: {span: 24},sm: {span: 12}} }
        // console.log(document.body.scrollWidth);
       
        return(
          <Fragment>
              {document.body.scrollWidth<400?<Redirect to="/mobile" />:null}
              <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.content}></div>
                </div>
                <div className={styles.content1}>
                    <p className={styles.header1}>东大安保</p>
                    <p className={styles.header2}>申请出行证</p>
                </div>
                <div className={styles.content2}>
                <Form>
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
                            rules: [{ required: true, message: '请输入车牌号!' }],
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
                    htmlType="submit"
                    className="login-form-button"
                    onClick={this.handleSubmit}
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
