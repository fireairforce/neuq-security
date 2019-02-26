import React, { Fragment } from 'react';
import {connect} from 'dva';
import styles from './index.less';
import columns from '../../utils/header';
import { Form,Select,Button,Table,Modal,message } from 'antd';
import HeaderTwo from '../../layout/headerTwo';
const FormItem = Form.Item;
const Option = Select.Option;
let value1=[],value2=[],value3=[],data=[],index=[];
class InfoCheck extends React.Component{
    // 把已经通过审核的数据搞的不能选择
    state={
        selectedRowKeys:[],
        statics:[],
        selectedRows:[],
        current:1,
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
      // 获取所有申请人的数据
      getdata = (params) => {
        const {dispatch} = this.props;
        dispatch({
            type:`shyg/${params}`,
            payload:''
        })
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
        // console.log(trans2);
        setTimeout(() => {
            this.setState({
                statics:value1,
                selectedRowKeys:trans2
            })
        }, 500);
        // console.log(this.state.selectedRowkeys);
    }
    cheched = (params) => {
        let item = this.state.selectedData;
        // console.log(item);
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
                    setTimeout(()=>{
                        window.location.href = window.location.href;
                      },1000)
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
                     setTimeout(()=>{
                         window.location.href = window.location.href;
                       },1000)
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
       const { current,statics,selectedRowKeys } = this.state;
       if(!statics.length){
        Modal.info({
            title:'提示',
            content:'当前数据列表为空,无法选择'
        })
       }else{
            let m = statics.length%10; // m是多的数据
            let n = Math.ceil(statics.length/10); // n是页数
            // if(index.length==selectedRowKeys.length&&index.length){
            //     this.onSelectChange([],[]);
            // }else{
                // 取消选择
                // if(index.length==selectedRowKeys.length&&index.length){
                //    let len = index.length;
                //    let flag = 1;
                //    for(let i = 0; i<len ;i++){
                //        if(selectedData[i].key!=data[i].key){
                //           flag = 0; 
                //        }
                //    }
                //    if(flag){
                //       this.onSelectChange([],[]); // 直接把当前页面清空
                //    }else{
                       
                //    }
                // }
                if(current==n){ //在最后一页
                    for(let i = statics.length-1;i>=statics.length-m;i--){
                      index.push(statics[i].key);
                      data.push(statics[i]);
                    //   console.log(statics[i]);
                    }
                }
               else if(current<n){
                    for(let i =(current-1)*10;i<current*10;i++){
                        index.push(statics[i].key);
                        data.push(statics[i]);
                    }
                }
                this.onSelectChange(index,data);
            // }   
       }  
   }
   componentDidMount(){
       if(!this.state.statics.length){ //当列表的数据为空的时候，进行一次请求，节省性能
         this.getdata('getpassList');
         this.getdata('getfailList');
        setTimeout(()=>{
            if((this.props.shyg.content||this.props.shyg.value)&&(this.props.shyg.content.code==="0"||this.props.shyg.value.code==="0")){
                    let a = this.props.shyg.value?this.props.shyg.value.data:[]; // 通过的数据
                    let b = this.props.shyg.content?this.props.shyg.content.data:[];  //没有通过的数据
                    a.map((item)=>(
                        value1.push(Object.assign({},item,{flag:true})) // 往value1里面新增一个属性用于禁选的判断
                    ))
                    b.map((item)=>(
                        value2.push(Object.assign({},item,{flag:false}))
                    ))
                    if(value1.length&&value2.length){
                        value1.sort((a,b)=>{
                            return b.id-a.id; // 对通过的数据按照时间的近到远的排序
                        })
                        value2.sort((a,b)=>{
                            return b.id-a.id;　// 对还没有审核的数据按照近到远的排序
                        })
                        value1 = JSON.parse(JSON.stringify(value1).replace(/id/g,"key"));
                        value2 = JSON.parse(JSON.stringify(value2).replace(/id/g,"key"));
                         // 把id换成key，避免error
                        value3 = value2.concat(value1); //把没通过的数据放在通过的数据的前面
                    }
                    this.setState({
                        statics:value2,
                    }) 
            }else{
                message.info('登录令牌已失效，请重新登录');
                this.props.history.push(`/checklogin`); // 如果token过期了的话或者没有token直接让他跳转回去登录界面
            }
        },1000)
     }
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
        console.log(this.state);
         // console.log(this.props);
        // console.log(value1); // value1指的是通过了审核的数据
        // console.log(value2);  // value2是没有通过审核的数据
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
                                // showSizeChanger:true,
                                onChange:(page,pageSize)=>{
                                     this.setState({
                                        current:page
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
export default connect(({ shyg }) => ({ shyg }))(Form.create()(InfoCheck));