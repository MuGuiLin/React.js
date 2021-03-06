import React, { PureComponent } from 'react';
import './Redux.css';

import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import { Button, Icon} from '@material-ui/core';

// 引入store仓库
import store from '../../store';

class Redux extends PureComponent {
    constructor() {
        super();

        this.state = {
            // user: store.getState().users
            nName: '',
            nAge: '',
            nJob: ''
        }
    }

    componentDidMount() {
        // 可以直接导入store后，用getState()方法来取数据
        console.log(store)


        // 监听store中的数据有变化时触发subscribe()方法
        store.subscribe(() => {
            console.log('store中的数据被修改了：', store.getState());

            // 强制重新渲染当前组件，执行render()方法 state和props数据更新，就会重新render，但是当层级过深时，可能就不会触发渲染，这时候就要用到this.forceUpdate()
            this.forceUpdate();
        })
    }

    componentWillUnmount() {
        
    }

    getStore = () => {
        console.log(store.getState());
        // this.setState({
        //     user: store.getState().users
        // })
    }


    onChangeName = (e) => {
        this.setState({
            // user: { ...user, ...{ name: e.target.value } }
            nName: e.target.value
        });
    }

    onChangeAge = (e) => {
        this.setState({
            nAge: e.target.value
        });
    }

    onChangeJob = (e) => {
        this.setState({
            nJob: e.target.value 
        });
    }

    upState = () => {

        // store.dispatch({
        //     type: "UP-USERS",
        //     data: {
        //         name: this.state.nName,
        //         age: this.state.nAge,
        //         job: this.state.nJob,
        //     }
        // })

        // 如果store.dispatch会多次用到，可以做进一步封装
        this.publicDispatch("UP-USERS", {
            name: this.state.nName,
            age: this.state.nAge,
            job: this.state.nJob
        })
    }

    //封装store.dispatch()
    publicDispatch = (type, data) => {
        store.dispatch({ type, data })
    }

    // 添加books商品类型
    addGoods = () => {
        store.dispatch({
            type: "ADD-GOODS-TYPE",
            data: {
                books: []
            }
        })
    }

    // 向books添加商品数据
    addGoodsData = () => {
        let goods = store.getState().goods
        goods.books.push({
            id: this.state.nName,
            name: this.state.nAge,
            rmb: this.state.nJob
        })
        store.dispatch({
            type: "ADD-GOODS-DATA",
            data: goods
        })
    }

    // 修改books中的数据
    upGoodsData = () => {
        let goods = store.getState().goods
        store.dispatch({
            type: "UP-GOODS-DATA",
            data: {
                books: [...goods.books, {
                    id: this.state.nName,
                    name: this.state.nAge,
                    rmb: this.state.nJob
                }]
            }
        })
    }
    

    render() {
        const { name, age, job } = store.getState().users

        return (
            <section className="redux">
                <h1>Redux </h1>
                <p>
                Redux 是 JavaScript 状态容器，提供可预测化的状态管理。 (如果你需要一个 WordPress 框架，请查看 Redux Framework。)

                可以让你构建一致化的应用，运行于不同的环境（客户端、服务器、原生应用），并且易于测试。
                
                不仅于此，它还提供 超爽的开发体验，比如有一个时间旅行调试器可以编辑后实时预览。

                Redux 除了和 React 一起用外，还支持其它界面库。 它体小精悍（只有2kB，包括依赖）。
                </p>

                <p>注：redux 和 react-redux 是两个库，但react-redux 依赖 redux，所有要用react-redux 的话，要把redux一起安装哦：npm install -S redux react-redux </p>

                <pre>
                    <b>redux中常用的对象和方法：</b>
                   
                    {'\n'}  * createStore() 用于创建store存储仓库
                    {'\n'}  * combineReducers() 初始化、修改状态(数据)

                    {'\n'}  * reducer 纯函数
                    {'\n'}  * state 对象
                    {'\n'}  * action 对象
                    
                    {'\n'}  * store 对象中有这3个方法
                    {'\n'}      - store.getState() 获取状态值【就是得到export default createStore(function (state, action))中state的值】
                    {'\n'}      - store.dispatch() 提交更新状态【修改数据】
                    {'\n'}      - store.subscribe() 变更订阅【监听store中只要有数据变化时，就会执行该方法】
                </pre>
                <p>英文官网：<a href="http://redux.js.org" target="_blank">http://redux.js.org</a> </p>
                <p>中文官网：<a href="https://www.redux.org.cn" target="_blank">https://www.redux.org.cn</a> </p>

                <h1> 从store中获取到的数据： 昵称：{name}，Age：{age}，职位：{job}</h1>
                <Button variant="contained"  onClick={this.getStore} >获取redux中的store的数据</Button>
                <p>
                    <label>昵称：<input type="text" onChange={this.onChangeName} /> {this.state.nName}</label>
                </p>
                <p>
                    <label>年龄：<input type="number" onChange={this.onChangeAge} /> {this.state.nAge}</label>
                </p>
                <p>
                    <label>职位：<input type="text" onChange={this.onChangeJob} /> {this.state.nJob}</label>
                </p>
                <Button variant="contained" color="primary" onClick={this.upState} >修改redux中的store的users数据</Button>
                
                <h1> 向store中的goodsi添加或修改数据：</h1>
                <Button variant="contained" color="secondary" onClick={this.addGoods} >添加redux中的store的goods数据</Button>
                <Button variant="outlined" color="primary"  onClick={this.addGoodsData} >添加redux中的store的goods数据</Button>
                <Button color="secondary" onClick={this.upGoodsData} >修改redux中的store的goods数据</Button>

                <Icon>add_circle</Icon>
                <Icon color="primary">add_circle</Icon>
                <Icon color="secondary">add_circle</Icon>
                <Icon style={{ color: 'green' }}>add_circle</Icon>
                <Icon fontSize="small">add_circle</Icon>
                <Icon style={{ fontSize: 30 }}>add_circle</Icon>
            </section>
        );
    }
}

export default Redux;