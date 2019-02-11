import React, { Fragment } from 'react';
import {connect} from 'dva';
import styles from './index.less';
import columns from '../../utils/header';
import {Form,Select,Button,Table,Modal} from 'antd';
import HeaderTwo from '../../layout/headerTwo';
const FormItem = Form.Item;
const Option = Select.Option;
let value1=[],value2=[],a=[];
class InfoCheck extends React.Component{
    // 把已经通过审核的数据搞的不能选择
    state={
        selectedRowkeys:[],
        statics:[],
        selectedData:[],
    };
    // 数据的选择函数
    onSelectChange = (selectedRowKeys,selectedRows) => {
        // console.log(selectedRowKeys);  
        // console.log(selectedRows);
        // a.push(selectedRows.pop());
        while(selectedRows.length){
            a.push(selectedRows.pop());
        }
        // console.log(a);
        this.setState({ 
            selectedRowKeys,
            selectedData:a
        });
      }
    //   getcheckedbox = (record) => ({
    //       disabled: value1.map((item,index)=>{
    //           return record.id===item.id
    //       })
    //   })

      // 获取所有申请人的数据
      getdata = (params) => {
        const {dispatch} = this.props;
        dispatch({
            type:`shyg/${params}`,
            payload:''
        })
      }

    getFail = () =>{
          a=[];
          this.setState({
              selectedRowKeys:[],       
              statics:value2
           })        
    }

    getPass = () =>{
        a=[];
        let trans2 = [];
        for(var i in value1){
            trans2[i]=parseInt(i);
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
        console.log(item);
        const { dispatch } = this.props;
        let ids = [];
        if(item.length){
            for(var i in item){
                ids.push(item[i].id);
            }
            const pass = { ids }
            dispatch({
                type:`shyg/${params}`,
                payload:pass
            })
        }else{
            Modal.info({
                title:'提示',
                content:'请您选择一个用户'
            })
            return;
        }
        setTimeout(()=>{
          window.location.reload();
        },2000)
    }
    //批量选择操作
   selectmore = () =>{
       
   }
   componentDidMount(){
        this.getdata('getpassList');
        this.getdata('getfailList');
        setTimeout(()=>{
            value1 = this.props.shyg.value?this.props.shyg.value.data:""; // 通过的数据
            value2 = this.props.shyg.content?this.props.shyg.content.data:"";  //没有通过的数据
            let value3 = []; 
            if(value1.length&&value2.length){
                value1.sort(function(a,b){
                    return b.id-a.id; // 对通过的数据按照时间的近到远的排序
                })
                value2.sort(function(a,b){
                    return b.id-a.id;　// 对还没有审核的数据按照近到远的排序
                })
                value3 = value2.concat(value1); //把没通过的数据放在通过的数据的前面
                // let trans = [];
                // for(var i=0;i<value1.length;i++){
                //    trans[i]=i;
                // } 
                this.setState({
                statics:value3,
                //    selectedRowKeys: []
                })  
            } 
        },2000)
    }
    render(){ 
         const {getFieldDecorator} = this.props.form; 
         const {selectedRowKeys,statics} = this.state;
         const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: this.getcheckedbox //禁止一些选择
          };
             console.log(selectedRowKeys);
        //   console.log(value1); // value1指的是通过了审核的数据
        //   console.log(value2);  // value2是没有通过审核的数据
        return(
            <Fragment>
               <HeaderTwo />
               <div className={styles.wrapper}>
                    <h1 className={styles.header2}>信息审核</h1>
                    <div className={styles.content2}>
                        <Form layout="inline" >
                                <div className={styles.content3}>
                                   <Button onClick={this.selectmore}>批量审核</Button>
                                    <FormItem>
                                        {
                                            getFieldDecorator('city_id')(
                                                <Select
                                                    style={{width:100}}
                                                    placeholder="审核信息"
                                                >
                                                    <Option value="0" onClick={this.getFail}>未通过审核</Option>
                                                    <Option value="1" onClick={this.getPass}>已通过审核</Option>
                                                </Select>
                                            )
                                        }
                                    </FormItem>
                                </div>
                                <div className={styles.content4}>
                                    <Button onClick={()=>{this.cheched('handlepassList')}} type="primary">确认通过</Button>
                                    <Button onClick={()=>{this.cheched('handlefailList')}} type="primary">拒绝申请</Button>
                                </div>
                            </Form> 
                        </div>
                        <div className={styles.content1}>
                        <Table 
                            bordered
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={statics}
                            />
                        </div>
               </div>
            </Fragment>
        )
    }
}
export default connect(({ shyg }) => ({ shyg }))(Form.create()(InfoCheck));