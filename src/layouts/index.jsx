import React,{useEffect,useMemo} from 'react';
import { Layout, Table } from 'antd';
import layoutStore from './store'
import { observer } from 'mobx-react';
import styles  from './index.module.less'


const {Header,Content} = Layout

function BasicLayout() {

  const {data,getData} = layoutStore

  useEffect(() => {
      getData()
  }, [getData])

  const columns = useMemo(() => {
    let arr = [
        {
            title:'产品名称',
            dataIndex:'pro_name',
            key:'pro_name',
            fixed:'left'
        },
        {
            title:'背景',
            dataIndex:'pro_bg',
            key:'pro_bg',
            fixed:'left'
        },
        {
            title:'地址',
            dataIndex:'pro_address',
            key:'pro_address',
            render:(t,d)=>{
              console.log(d.pro_address)
              return <span>
                <a href={`http://${d.pro_address}`} target='_blank' rel='noreferrer'>{d.pro_address}</a>
              </span>
            }
        },
        {
            title:'部署地址',
            dataIndex:'deploy_address',
            key:'deploy_address' 
        },
        {
            title:'部署目录',
            dataIndex:'deploy_list',
            key:'deploy_list'
        },
        {
            title:'对应代码分支',
            dataIndex:'code_branch',
            key:'code_branch',
            hidden:true
        },
        {
            title:'代码仓库',
            dataIndex:'code_repo',
            key:'code_repo',
            hidden:true
        },
        {
            title:'更新日期',
            dataIndex:'update_date',
            key:'update_date',
            width:130,
            fixed: 'right'
        },
        {
            title:'上传人',
            dataIndex:'upload_user',
            key:'upload_user',
            width:90,
            fixed: 'right'
        },
        {
            title:'负责人',
            dataIndex:'respon_user',
            key:'respon_user',
            width:90,
            fixed: 'right'
        },
    ]
    return arr.filter(d=>!d.hidden)
  }, []) 

  return (
    <div className={styles['app']}>
      <Layout>
            <Header>团队项目</Header>
            <Content className="ant-layout-content" style={{ padding: '50px' }}>
                <Table 
                  columns={columns}
                  dataSource={data}
                />                    
            </Content>
            {/* <Footer>底部</Footer> */}
      </Layout>
    </div>
  );
}

export default  observer(BasicLayout)