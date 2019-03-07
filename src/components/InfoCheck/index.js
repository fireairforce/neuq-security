import React, { Fragment } from 'react';
import {connect} from 'dva';
import styles from './index.less';
import columns from '../../utils/header';
import { Form,Select,Button,Table,Modal,message } from 'antd';
import HeaderTwo from '../../layout/headerTwo';
import request from '../../utils/request'
import API from '../../config/api'

const FormItem = Form.Item;
const Option = Select.Option;
let value1=[],value2=[],data=[],index=[];
class InfoCheck extends React.Component{
    // 把已经通过审核的数据搞的不能选择
    state={
        selectedRowKeys:[],
        statics:[],
        selectedRows:[],
        current:1,
        pagestatics:[]
    };
    // 对数据进行去重
    removeDuplicatedItem = arr =>{
        for(var i = 0; i < arr.length-1; i++){
            for(var j = i+1; j < arr.length; j++){
                if(arr[i]==arr[j]){
                   arr.splice(j,1);
                   j--;//删除重复后，数组下标往前移动
                }
            }
        }
        return arr;
    }
    // 数据的选择函数
    onSelectChange = (selectedRowKeys,selectedRows) => {
        this.setState({ 
            selectedRowKeys,
            selectedRows
        },
          ()=>{
              this.removeDuplicatedItem(selectedRowKeys);
              this.removeDuplicatedItem(selectedRows)
            } 
        );
      }
   // 获取到那些没有通过审核的数据放在列表里面
    getFail = () =>{
          this.setState({
              selectedRowKeys:[],       
              statics:value2
           })        
    }
   // 获取那些通过审核的数据放在列表里面
    getPass = () =>{
        let trans2 = [];
        for(var i in value1){
            trans2[i]= value1[i].key;
        }
        this.setState({
            statics:value1,
            selectedRowKeys:trans2
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
            // console.log(pass);
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
//批量选择操作,可以考虑对这边的
   selectmore = () =>{
       const { current,statics } = this.state;         
       if(!statics.length){
        Modal.info({
            title:'提示',
            content:'当前数据列表为空,无法选择'
        })
       }else{
            let m = statics.length%10; // m是多的数据
            let n = Math.ceil(statics.length/10); // n是页数
            if( current == n ){
              for(let i = statics.length-1;i>=statics.length-m;i--){
                  index.push(statics[i].key)
                  data.push(statics[i]);
              }
            }else if(current<n){
                for(let i =(current-1)*10;i<current*10;i++){
                    index.push(statics[i].key);
                    data.push(statics[i]);
                }
            }
            this.onSelectChange(index,data);  
       }  
   }
   componentDidMount(){
       if(!localStorage.token){
         message.info('登录令牌已失效，请重新登录');
         this.props.history.push(`/checklogin`); 
       }

       request({
        url: API.passedList, // 没有通过的数据请求
        method: 'get',
        token:true
        }).then(res=>{
            if(res.data.length){
                let a = [];
                res.data.map(item=>(
                a.push(Object.assign({},item,{flag:false}))
                ))
                a.sort((a,b)=>{
                return b.id - a.id
                })
                a = JSON.parse(JSON.stringify(a).replace(/id/g,"key"));
                this.setState({
                statics:[...this.state.statics,...a]
                    },()=>{
                    value2 =a
                })
            }
        })

       request({
        url: API.passCheckedlist,
        method: 'get',
        token:true
        }).then(res=>{
            if(res.data.length){
                let a = [];
                res.data.map(item=>(
                   a.push(Object.assign({},item,{flag:true}))
                ))
                a.sort((a,b)=>{
                  return b.id - a.id
                })
                a = JSON.parse(JSON.stringify(a).replace(/id/g,"key"));
                value1 = a;
            }
        })
    }
    render(){ 
        const { selectedRowKeys,statics,current } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                disabled: record.flag
            }),
        };
        return(
            <Fragment> 
               <div className={styles.wrapper}>
                    <HeaderTwo />
                    <h1 className={styles.header2}>信息审核</h1>
                    <div className={styles.content2}>
                        <Form layout="inline">
                                <div className={styles.content3}>
                                   <Button onClick={this.selectmore}>批量审核</Button>
                                   <FormItem>
                                        {
                                            <Select
                                                style={{width:100}}
                                                placeholder="未通过审核"
                                                defaultValue="0"
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
                            pagination={{
                                total:statics.length,
                                pageSize:10,
                                defaultPageSize:10,
                                current:current,
                                onChange:(page,pageSize)=>{
                                    this.setState({
                                        current:page,
                                    })                        
                                },
                                showTotal: function () {  //设置显示一共几条数据
                                    return '共 ' + statics.length + ' 条数据'; 
                                }
                            }}
                            />
                        </div>
               </div>
            </Fragment>
        )
    }
}
export default connect(({ shyg }) => ({ shyg }))(InfoCheck);