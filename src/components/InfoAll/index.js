import React, { Fragment } from 'react';
import styles from './index.less';
import { Form,Button,Table,Select,message,Modal } from 'antd'
import { connect } from 'dva';
import columns from '../../utils/header';
import HeaderTwo from '../../layout/headerTwo';
import Options from '../../utils/options';

const FormItem = Form.Item;
const Option = Select.Option;
let value1 = [],value2=[];
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
                ids.push(item[i].key);
            }
            const pass = {ids};
            console.log(pass);
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
        // const { statics } = this.state;
        if(value1.length){            
            this.setState({
                statics:value1.filter(v=>v.department===value2[type])
            })
        }
       
    }
    componentDidMount(){
        if(!this.state.statics.length){
            this.getdata("getpassList");
            setTimeout(()=>{
                const {xxhz} = this.props;
                if(xxhz.value&&xxhz.value.code==='0'){
                  value1 = xxhz.value.data;
                  if(value1.length){
                    value1.sort(function(a,b){
                        return b.id - a.id;  //对里面的数据进行一个时间的从最新到后面的排序
                    })
                    value1 = JSON.parse(JSON.stringify(value1).replace(/id/g,"key"));
                    this.setState({
                        statics:value1
                    })
                }
              }else{
                message.info('登录令牌已失效，请重新登录');
                this.props.history.push(`/checklogin`); // 如果token过期了的话或者没有token直接让他跳转回去登录界面
              }
            },1000)
      }
      Options.map(v=>(
          value2[v.type]=v.value
      ));
    }
    // 对数据的选择函数
    onSelectChange = (selectedRowKeys,selectedRows) =>{
        let a = [];
        while(selectedRows.length){
          a.push(selectedRows.pop());
        }
        // console.log(a);
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
        // console.log(this.props);
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
                                          <Option value="0" onClick={()=>{this.setState({statics:value1})}}>全部</Option>
                                          <Option value="1" onClick={()=>{this.onChoice('cs')}}>计算机</Option>
                                          <Option value="2" onClick={()=>{this.onChoice('gl')}}>管理</Option>
                                          <Option value="3" onClick={()=>{this.onChoice('ky')}}>控院</Option>
                                          <Option value="4" onClick={()=>{this.onChoice('st')}}>数统</Option>
                                          <Option value="5" onClick={()=>{this.onChoice('zc')}}>资材</Option>
                                          <Option value="6" onClick={()=>{this.onChoice('jj')}}>经济</Option>
                                          <Option value="7" onClick={()=>{this.onChoice('yy')}}>语言</Option>
                                          <Option value="8" onClick={()=>{this.onChoice('sky')}}>社科院</Option>
                                          <Option value="9" onClick={()=>{this.onChoice('tyb')}}>体育部</Option>
                                          <Option value="10" onClick={()=>{this.onChoice('yjs')}}>研究生院</Option>
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

