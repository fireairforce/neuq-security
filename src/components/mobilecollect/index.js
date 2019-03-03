import React, { Component } from 'react'
import { Button, Col, Form, Input,Row,Cascader } from 'antd'
import { Modal } from 'antd-mobile'
import verity from '../../utils/regex'
import Options from '../../utils/options'
import styles from './index.less'
import axios from 'axios'
const FormItem = Form.Item

class Collect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      submitted: false,
      showModal:false
    }
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleReset () {
    this.setState({loading: false,submitted:true})
    this.props.form.resetFields()
  }

  async handleSubmit(){
      // console.log();
      this.setState({ loading:true })
      let value = this.props.form.getFieldsValue();
      const {xm,bm,cp,dh,gx}= value ;
      const content = {
        name:xm,
        department:bm[0],
        car_number:cp,
        phone:dh,
        relation:gx
      }
      const res = await axios.post('http://neuqsecurity.lyzwhh.top/pass/apply',{
          ...content
        })
        setTimeout(() =>{
          this.setState({loading:false})
          if(res.status===200&&res.data.code==="0"){
                  this.setState({submitted:true,showModal:true})
          }
      },2000)
  }

  render () {
    const {getFieldDecorator} = this.props.form
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
    // console.log(this.props);
    return (
       <div className={styles.wrapper}>
        <div className={styles.header}>
           <h2>东大安保</h2>
        </div>
        <Form >
                 <FormItem
                    label='姓名'
                    {...formItemLayout}
                    key='name'
                    style={{width:"90vw",marginLeft: 20}}
                    >
                        {getFieldDecorator('xm', {
                            rules: [{ required: true, message: '请输入姓名!' }],
                        })(
                            <Input placeholder="请输入申请人姓名"  />
                        )}
                    </FormItem>

                <FormItem
                    label='所在部门'
                    {...formItemLayout}
                    key='bumen'
                    style={{width:"90vw",marginLeft: 20}}
                >
                    {getFieldDecorator('bm', {
                    rules: [{
                        required: true, message: '请选择所在部门'
                    }]
                    })(
                      <Cascader options={Options} placeholder="请选择所在部门" />
                    )}
                </FormItem>

                <FormItem
                    label='车牌号'
                    {...formItemLayout}
                    key='carnumber'
                    style={{width:"90vw",marginLeft: 20}}
                    >
                        {getFieldDecorator('cp', {
                            rules: [{ required: true, message: '请输入车牌号!' }],
                        })(
                            <Input placeholder="请输入您的车牌号"/>
                        )}
                </FormItem>

                <FormItem
                        label='电话号码'
                        {...formItemLayout}
                        key='phonenumber'
                        style={{width:"90vw",marginLeft: 20}}
                        >
                            {getFieldDecorator('dh', {
                                rules: [{
                                    pattern:verity.mobile,message: '请输入正确的号码'
                                },{ required: true, message: '请输入电话!' }],
                            })(
                                <Input placeholder="请输入您的电话号码"/>
                            )}
                </FormItem>

                <FormItem
                        label='与车主的关系'
                        {...formItemLayout}
                        key='connect'
                        style={{width:"90vw",marginLeft: 20}}
                        >
                            {getFieldDecorator('gx', {
                                rules: [{ message: '' }],
                            })(
                                <Input placeholder="车主是本人可以不填" />
                            )}
                </FormItem>

          <FormItem
            key="form-content-footer"
            onSubmit={this.handleSubmit}
          >
            <Row gutter={16} type='flex'>
              <Col xs={{span: 24}} sm={{span: 12, offset: 6}}>
                <Button
                  type='primary'
                  htmlType="submit"
                  onClick={this.handleSubmit}
                  loading={this.state.loading}
                  disabled={this.state.submitted}
                  style={{marginLeft: "20%" ,width:100}}
                >
                  {this.state.submitted ? '提交成功' : '点击提交'}
                </Button>
                <Button
                  type="ghost"
                  onClick={this.handleReset}
                  className='form-button-2'
                  style={{marginLeft: 20,width:100}}
                >
                  重置
                </Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
        <Modal
          visible={this.state.showModal}
          transparent
          maskClosable={false}
          onClose={()=>{this.setState({showModal:false})}}
          title="你的请求已提交"
          footer={[{ text: 'Ok', onPress: () => { this.setState({showModal:false}) } }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div style={{ height: 100, overflow: 'scroll' }}>
                {/* <p style={{textAlign:"center"}}><img src="http://wdlj.zoomdong.xin/message.png" style={{margin:'0 auto'}} alt=""/></p>      */}
                <p style={{textAlign:"center" ,fontSize:'18px'}}>请等待管理员审核...</p>
                <p style={{textAlign:"center" ,fontSize:'18px'}}>预计会在三个工作日左右收到出入证</p>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(Collect);
