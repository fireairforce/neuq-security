import React, { Fragment } from 'react';
import styles from './index.less';
import {Form,Button,Table,Select} from 'antd'
import {connect} from 'dva';
import columns from '../../utils/header';
import HeaderTwo from '../../layout/headerTwo';
const FormItem = Form.Item;
const Option = Select.Option;
let value1 = [],value2=[];
class InfoAll extends React.Component{
    state={
        statics:[]
    }
    getdata = (params) =>{
       const {dispatch} = this.props;
       dispatch({
           type:`xxhz/${params}`,
           payload:''
        })
    }
    
    componentDidMount(){
        this.getdata("getpassList");
        this.getdata("getfailList");
        setTimeout(()=>{
            const {xxhz} = this.props;
            if(typeof(xxhz.value)!=="undefined" && typeof(xxhz.content)!=="undefined"){
                value1 = xxhz.value.data;
                value2 = xxhz.content.data;
             }
             if(value1.length&&value2.length){
                const value3 = value1.concat(value2);
                this.setState({
                    statics:value3
                })
             }
        },1000)
        
    }
    render(){
        const pagination = {
            pageSize: 10,
          };
        const {getFieldDecorator} = this.props.form;
        const {statics} = this.state;
        return(
            <Fragment>
                 <HeaderTwo />
                <div className={styles.wrapper}>
                   <h1 className={styles.header1}>东大安保</h1>
                   <h1 className={styles.header2}>信息汇总</h1>
                   <div className={styles.content2}>
                      <Form layout="inline" >
                        <div className={styles.content3}>
                            <FormItem>
                                {
                                    getFieldDecorator('request_id')(
                                        <Select
                                            style={{width:100}}
                                            placeholder="未处理的请求"
                                        >
                                            <Option value="0">未处理的请求</Option>
                                            <Option value="1">已处理的请求</Option>
                                        </Select>      
                                    )
                                }
                            </FormItem>
                            <FormItem>
                                {
                                    getFieldDecorator('school_name')(
                                        <Select
                                            style={{width:"100px"}}
                                            placeholder="学院"
                                        >
                                          <Option value="0">全部</Option>
                                          <Option value="1">计算机</Option>
                                          <Option value="2">管理</Option>
                                          <Option value="3">控院</Option>
                                          <Option value="4">数统</Option>
                                          <Option value="5">资材</Option>
                                          <Option value="6">经济</Option>
                                          <Option value="7">语言</Option>
                                          <Option value="8">社科院</Option>
                                          <Option value="9">体育部</Option>
                                          <Option value="10">研究生院</Option>
                                        </Select>
                                    )
                                } 
                            </FormItem>   
                            </div>
                            <div className={styles.content4}>
                                <Button className={styles.button1} onClick={()=>{alert('chynb!')}}>选择制证</Button>
                                <Button className={styles.button2}>生成二维码</Button>
                            </div>
                        </Form>
                    </div>
                    <div className={styles.content1}>
                      <Table 
                        bordered
                        columns={columns}
                        dataSource={statics}
                        pagination={pagination}
                      />
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default connect(({ xxhz }) => ({ xxhz }))(Form.create()(InfoAll));