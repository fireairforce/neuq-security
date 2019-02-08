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
    state={
        selectedRowkeys:[],
        statics:[],
        selectedData:[],
    };
    onSelectChange = (selectedRowKeys,selectedRows) => {
        console.log(selectedRowKeys);
        // a.push(selectedRows.pop());
        while(!a.length){
            a.push(selectedRows.pop());
        }
        this.setState({ 
            selectedRowKeys,
            selectedData:a
        });
      }
    //  获取到通过审核和没有通过审核的数据
    getpassdata = () =>{
         const {dispatch} = this.props;
         dispatch({
            type:'shyg/getpassList',
            payload:''
         })
    }
    getfaildata = () =>{
        const {dispatch} = this.props;
        dispatch({
            type:'shyg/getfailList',
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
            trans2[i]=i;
        }
        this.setState({
            selectedRowKeys:trans2,
            statics:value1
        })
    }
    
    componentDidMount(){
        this.getpassdata();
        this.getfaildata();
        setTimeout(()=>{
            value1 = this.props.shyg.value?this.props.shyg.value.data:""; // 通过的数据
            value2 = this.props.shyg.content?this.props.shyg.content.data:"";  //没有通过的数据
            let value3 = []; 
            if(value1!==""&&value2!==""){
                value3 = value1.concat(value2); //所有的数据
                let trans = [];
                for(var i=0;i<value1.length;i++){
                   trans[i]=i;
                } 
                this.setState({
                   statics:value3,
                   selectedRowKeys: []
                })  
            } 
        },1000)
    }
    passChecked = () =>{
        let item = this.state.selectedData;
        console.log(item);
        const {dispatch} = this.props;
        let ids = [];
        if(item.length){
            for(var i in item){
                ids.push(item[i].id);
            }
            const pass={ids}
            dispatch({
                type:'shyg/handlepassList',
                payload:pass
            })
        }else{
            Modal.info({
                title:"提示",
                content:'请选择一个用户'
            })
            return ;
        }
    }
    rejectChecked= () =>{
        let item = this.state.selectedData;
        console.log(item);
    } 
    render(){ 
     
         const {getFieldDecorator} = this.props.form; 
         const {selectedRowKeys,statics} = this.state;
         const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
          };   
          console.log(statics);   
        return(
            <Fragment>
                <HeaderTwo />
               <div className={styles.wrapper}>
                    <h1 className={styles.header2}>信息审核</h1>
                    <div className={styles.content2}>
                        <Form layout="inline" >
                                <div className={styles.content3}>
                                   <Button>批量审核</Button>
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
                                    <Button onClick={this.passChecked} type="primary">确认通过</Button>
                                    <Button onClick={this.rejectChecked} type="primary">拒绝申请</Button>
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