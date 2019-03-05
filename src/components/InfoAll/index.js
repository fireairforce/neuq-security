import React, { Fragment } from 'react';
import styles from './index.less';
import { Form,Button,Table,Select,message,Modal } from 'antd'
import { connect } from 'dva';
import columns from '../../utils/header';
import HeaderTwo from '../../layout/headerTwo';
import Options from '../../utils/options';
import request from '../../utils/request'
import API from '../../config/api'

const FormItem = Form.Item;
const Option = Select.Option;
let value1 = [],value2=[];
class InfoAll extends React.Component{
    state={
        statics:[],
        selectedRowKeys:[],
        selectedRows:[],
    };
  
    getCode = () =>{
        let item = this.state.selectedRows;
        const {dispatch} = this.props;
        let ids =[];
        if(item.length){
            for(let i in item){
                ids.push(item[i].key);
            }
            let pass = ids.join('+')
            dispatch({
                type:'xxhz/handleCode',
                payload:pass
            })
        }else{
            Modal.info({
                title:'提示',
                content:'请您先选择一个用户'
            })
            return;
        }
    }
    // 信息筛选
    onChoice = (type) =>{ 
        if(value1.length){            
            this.setState({
                statics:value1.filter(v=>v.department===value2[type])
            })
        }
    }

    componentDidMount(){
        if(!localStorage.token){
            message.info('登录令牌已失效，请重新登录');
            this.props.history.push(`/checklogin`); // 如果token过期了的话或者没有token直接让他跳转回去登录界面
        }
        request({
            url: API.passCheckedlist,
            method: 'get',
            token:true
        }).then(res=>{
            if(res.data.length){
                res.data.sort(function(a,b){
                    return b.id - a.id;  //对里面的数据进行一个时间的从最新到后面的排序
                })
                res.data = JSON.parse(JSON.stringify(res.data).replace(/id/g,"key"));
            }
            this.setState({
                statics:res.data
            },()=>{
                value1 = res.data
            })
        })
        Options.map(v=>(
           value2[v.type]=v.value
        ));
    }
    // 对数据的选择函数
    onSelectChange = (selectedRowKeys,selectedRows) =>{
        // console.log(selectedRowKeys,selectedRows);
        this.setState({ 
            selectedRowKeys,
            selectedRows
        })
    }
    render(){
        const pagination = {
            pageSize: 10,
          };
        const {statics,selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
          };
        return(
            <Fragment>
                
                <div className={styles.wrapper}>
                   <HeaderTwo />
                   <h1 className={styles.header2}>信息汇总</h1>
                   <div className={styles.content2}>
                      <Form layout="inline" >
                        <div className={styles.content3}>
                            <FormItem>
                                {
                                        <Select
                                            style={{width:"200px"}}
                                            placeholder="全部部门"
                                            defaultValue="0"
                                        >
                                          <Option value="0" onClick={()=>{this.setState({statics:value1})}}>全部</Option>
                                           {
                                               Options.map((item,index)=>{
                                                   return <Option key={item.value} value={`${index+1}`} onClick={()=>{this.onChoice(`${item.type}`)}}>{item.value}</Option>
                                               })
                                           } 
                                        </Select>
                                } 
                            </FormItem>   
                            </div>
                            <div className={styles.content4}>
                                <Button onClick={this.getCode}>导出二维码</Button>
                            </div>
                        </Form>
                    </div>
                    <div className={styles.content1}>
                      <Table 
                        bordered
                        columns={columns}
                        dataSource={statics}
                        pagination={pagination}
                        rowSelection={rowSelection}
                      />
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default connect(({ xxhz }) => ({ xxhz }))(InfoAll);

