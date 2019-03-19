import React, { Fragment } from 'react'
import {connect} from 'dva'
import styles from './index.less'
import columns from 'utils/header'
import request from 'utils/request'
import API from 'config/api'
import Options from 'utils/options'
import { Form,Select,Button,Table,Modal,message } from 'antd'
import HeaderTwo from 'layout/headerTwo'
const FormItem = Form.Item
const Option = Select.Option
let value1=[],value2=[],data=[],index=[],school=[]
class InfoCheck extends React.Component{
    // 把已经通过审核的数据搞的不能选择
    state={
        selectedRowKeys:[],
        statics:[],
        selectedRows:[],
        total:10,
        current:1,
        checked:false // 表示一开始就显示信息没有审核的界面
    };
    // 数据的选择函数
    onSelectChange = (selectedRowKeys,selectedRows) => {
        this.setState({ 
            selectedRowKeys,
            selectedRows
        });
      }
   // 获取到那些没有通过审核的数据放在列表里面
    getFail = () =>{
        request({
            url: `${API.passedList}?page=1`, // 没有通过的数据请求
            method: 'get',
            token:true
            }).then(res=>{
                if(res.data.data.length){
                    res.data.data.map(item=>(
                        value2.push(Object.assign({}, item ,{ flag:false }))
                    ))
                    this.setState({
                       statics:res.data.data,
                       total:res.data.total, 
                    })
                }
            })
          this.setState({
              selectedRowKeys:[],       
              statics:value2,
              checked:false,
           })        
    }
   // 获取那些通过审核的数据放在列表里面
    getPass = () =>{
        // 获取已经通过审核的数据
        request({
            url: `${API.passCheckedlist}?page=1`,
            method: 'get',
            token:true
            }).then(res=>{
                if(res.data.data.length){
                    res.data.data.map(item=>(
                        value1.push(Object.assign({},item,{flag:true}))
                    ))
                    this.setState({
                        statics:res.data.data,
                        total:res.data.total
                    })
                }
            })
        // 注释部分用于对已通过的数据进行勾选
        // let trans2 = [];
        // for(var i in value1){
        //     trans2[i]= value1[i].key;
        // }
        this.setState({
            statics:value1,
            // selectedRowKeys:trans2,
            checked:true
        })
    }
    cheched = (params) => {
        let item = this.state.selectedRows;
        const { dispatch } = this.props;
        let ids = [];
        if(item.length){
            for(var i in item){
                ids.push(item[i].key);
            }
            const pass = { ids }
            if(params==='handlefailList'){
               　Modal.confirm({
                   title:'您确定要删除这些信息吗',
                   content:'一旦删除便不可修改',
                   onOk(){
                    dispatch({
                        type:`shyg/${params}`,
                        payload:pass
                    })
                  }
                })
            }else{
                　Modal.confirm({
                    title:'您确定通过这些信息吗',
                    content:'一旦确认便不可修改',
                    onOk(){
                     dispatch({
                         type:`shyg/${params}`,
                         payload:pass
                     })
                   }
                 })
            }      
        }else{
            Modal.info({
                title:'提示',
                content:'请您选择一个用户'
            })
        return;
        }
       
    }
   componentDidMount(){
       if(!localStorage.token){
         message.info('登录令牌已失效，请重新登录');
         this.props.history.push(`/checklogin`); 
       }
       request({
        url: `${API.passedList}?page=1`, // 没有通过的数据请求
        method: 'get',
        token:true
        }).then(res=>{
            if(res.data.data.length){
                res.data.data.map(item=>(
                    value2.push(Object.assign({}, item ,{ flag:false }))
                ))
                this.setState({
                   statics:res.data.data,
                   total:res.data.total, 
                })
            }
        })
        request({
            url: `${API.passCheckedlist}?page=1`, // 通过审核的数据请求
            method: 'get',
            token:true
            }).then(res=>{
                if(res.data.data.length){
                    res.data.data.map(item=>(
                        value1.push(Object.assign({}, item ,{ flag:true }))
                    ))
                }
            })
   
    }
    render(){ 
        Options.map(v=>(
            school[v.role] = v.value
        ))
        const { selectedRowKeys,statics,total ,current,checked} = this.state
        const pagination = {
            pageSize:10,
            total, 
            defaultPageSize:10,
            current,
            onChange:(page)=>{
                this.setState({
                    current:page,
                })
                if(!checked){
                    request({
                        url: `${API.passedList}?page=${page}`,
                        method: 'get',
                        token:true
                    }).then(res=>{
                        if(res.data.data.length){
                            res.data.data.map(item=>(
                                value2.push(Object.assign({}, item ,{ flag:false }))
                            ))
                            this.setState({
                               statics:res.data.data,
                               total:res.data.total, 
                            })
                        }
                    })    
                }else{
                    request({
                        url: `${API.passCheckedlist}?page=${page}`,
                        method: 'get',
                        token:true
                    }).then(res=>{
                        if(res.data.data.length){
                            res.data.data.map(item=>(
                                value1.push(Object.assign({}, item ,{ flag:true }))
                            ))
                            this.setState({
                               statics:res.data.data,
                               total:res.data.total, 
                            })
                        }
                    })    
                }
                                 
            },
            showTotal: function () {  //设置显示一共几条数据
                return '共 ' + total + ' 条数据'; 
            }
        }
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                disabled: record.flag
            }),
        }
        return(
            <Fragment> 
               <div className={styles.wrapper}>
                    <HeaderTwo />
                    <h1 className={styles.header2}>{`${school[localStorage.role]} 信息审核`}</h1>
                    <div className={styles.content2}>
                        <Form layout="inline">
                                <div className={styles.content3}>
                                   <Button onClick={this.selectmore}>批量审核</Button>
                                   <FormItem>
                                        {
                                            <Select
                                                style={{width:"160"}}
                                                placeholder="未通过审核"
                                                defaultValue="0"
                                                isRequired="0"
                                            >
                                                <Option value="0" onClick={this.getFail}>未通过审核</Option>
                                                <Option value="1" onClick={this.getPass}>已通过审核</Option>
                                            </Select>
                                        }
                                        </FormItem>
                                </div>
                                <div className={styles.content4}>
                                    <Button onClick={()=>{this.cheched('handlepassList')}} type="primary" style={{backgroundColor:'#99CC66',borderColor:'#d9d9d9'}}>确认通过</Button>
                                    <Button onClick={()=>{this.cheched('handlefailList')}} type="danger">拒绝申请</Button>
                                </div>
                            </Form> 
                        </div>
                        <div className={styles.clear}></div>
                        <div className={styles.content1}>
                        <Table 
                            bordered
                            rowSelection={rowSelection}
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
export default connect(({ shyg,shdl }) => ({ shyg,shdl }))(InfoCheck);