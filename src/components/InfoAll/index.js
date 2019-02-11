import React, { Fragment } from 'react';
import styles from './index.less';
import {Form,Button,Table,Select} from 'antd'
import {connect} from 'dva';
import columns from '../../utils/header';
import HeaderTwo from '../../layout/headerTwo';
const FormItem = Form.Item;
const Option = Select.Option;
let value1 = [];
class InfoAll extends React.Component{
    state={
        statics:[],
        selectedRowKeys:[],
        selectedData:[],
    };
    getdata = (params) => {
       const {dispatch} = this.props;
       dispatch({
           type:`xxhz/${params}`,
           payload:''
        })
    }
    getCode = () =>{
        let item = this.state.selectedData;
        const {dispatch} = this.props;
        let ids =[];
        if(item.length){
            for(let i in item){
                ids.push(item[i].id);
            }
            const pass = {ids};
            dispatch({
                type:'xxhz/handleCode',
                payload:pass
            })
        }
    }
    componentDidMount(){
        this.getdata("getpassList");
        setTimeout(()=>{
            const {xxhz} = this.props;
            if(typeof(xxhz.value)!=="undefined"){
                value1 = xxhz.value.data;
             }
             if(value1.length){
                 value1.sort(function(a,b){
                    return b.id - a.id;  //对里面的数据进行一个时间的从最新到后面的排序
                 })
                 this.setState({
                     statics:value1
                 })
             }
        },1000)
        
    }
    // 对数据的选择函数
    onSelectChange = (selectedRowKeys,selectedRows) =>{
        let a = new Array();
        while(selectedRows.length){
          a.push(selectedRows.pop());
        }
        console.log(a);
        this.setState({
            selectedRowKeys,
            selectedData:a
        })
    }
    render(){
        const pagination = {
            pageSize: 10,
          };
        const {getFieldDecorator} = this.props.form;
        const {statics,selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
          };
        return(
            <Fragment>
                <HeaderTwo />
                <div className={styles.wrapper}>
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
export default connect(({ xxhz }) => ({ xxhz }))(Form.create()(InfoAll));

