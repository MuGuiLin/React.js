import React from 'react';
import { Link } from 'react-router-dom';

import { Layout, Menu, Avatar, Icon } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

export default class Inspection extends React.Component {
    constructor(props) {
        super(props)
    };

    render() {
        return (
            <Content style={{ margin: '16px 16px 0' }}>
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']} style={{ lineHeight: '64px' }} >
                    <Menu.Item key="1">
                        <Link to='/main/inspection'>模板</Link>
                    </Menu.Item>

                    <Menu.Item key="2">
                        <Link to='/main/inspection/myinspection'>我的巡检</Link>
                    </Menu.Item>

                    <Menu.Item key="3">
                        <Link to='/main/inspection/notInspection'>未完成巡检</Link>
                    </Menu.Item>

                    <Menu.Item key="4">
                        <Link to='/main/inspection/allInspection'>全部巡检</Link>
                    </Menu.Item>
                </Menu>

                <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>
                    {this.props.children}
                </div>
            </Content>
        )
    };
};