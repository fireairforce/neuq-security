import React, { Fragment } from 'react';
import styles from './index.less';
import { Form,Button,Table,Select,message,Modal } from 'antd'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Allcolumn } from 'utils/header'
import Options from 'utils/options'
import request from 'utils/request'
import API from 'config/api'
import HeaderTwo from 'layout/headerTwo'

const FormItem = Form.Item;
const Option = Select.Option;
let value1 = [],value2=[];
class InfoAll extends React.Component{
    state={
        statics:[],
        selectedRowKeys:[],
        selectedRows:[],
        total:0,
        current:1,
        done:'all'
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
    getInfo = (type) => {
        if(type==='done'){
            request({
                url:`${API.getmadeCode}?page=1`,
                method:'get',
                token:true,
            }).then(res=>{
                if(res.data.data.length){
                   this.setState({
                       statics:res.data.data,
                       total:res.data.total,
                       done:type
                   })
                }
            })
        }
        
    }
    componentDidMount(){
        if(!localStorage.token){
            message.info('登录令牌已失效，请重新登录');
            this.props.history.push(`/checklogin`); // 如果token过期了的话或者没有token直接让他跳转回去登录界面
        }
        request({
            url: `${API.passCheckedlist}?page=1`,
            method: 'get',
            token:true
        }).then(res=>{
            if(res.code==="0"){
                if(res.data.data.length){
                    this.setState({
                        statics:res.data.data,
                        total:res.data.total
                    },()=>{
                        value1 = res.data.data
                    })
                }
            }
            else{
                this.props.dispatch(routerRedux.push('/checklogin'))
            }
        })
        Options.map(v=>(
           value2[v.type]=v.value
        ));
    }
    // 对数据的选择函数
    onSelectChange = (selectedRowKeys,selectedRows) =>{
        this.setState({ 
            selectedRowKeys,
            selectedRows
        })
    }
    render(){
        const { statics,selectedRowKeys,total ,current,done} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
          };
          const pagination = {
            pageSize: 10,
            total,
            defaultPageSize:10,
            current,
            onChange: (current) => {
                 this.setState({
                     current
                 })
                 if(done==='all'){
                    request({
                        url: `${API.passCheckedlist}?page=${current}`,
                        method: 'get',
                        token:true
                      }).then(res=>{
                         if(res.data.data.length){
                            this.setState({
                               statics:res.data.data,
                               total:res.data.total, 
                            })
                        }
                    })  
                 }else if(done==='done'){
                    request({
                        url: `${API.getmadeCode}?page=${current}`,
                        method: 'get',
                        token:true
                      }).then(res=>{
                         if(res.data.data.length){
                            this.setState({
                               statics:res.data.data,
                               total:res.data.total, 
                            })
                        }
                    })  
                 }
                
            }
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
                                            isRequired="0"
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
                            <FormItem>
                                  {
                                     <Select
                                         style={{width:"160"}}
                                         placeholder="未制证信息"
                                         defaultValue="0"
                                         isRequired="0"
                                     >
                                         <Option value="0" onClick={()=>{this.getInfo('undone')}}>未制证信息</Option>
                                         <Option value="1" onClick={()=>{this.getInfo('done')}}>已制证信息</Option>
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
                        columns={Allcolumn}
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

