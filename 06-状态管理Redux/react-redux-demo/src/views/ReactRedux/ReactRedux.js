import React, { PureComponent } from 'react';

// 引入react-redux模块，就不用导入store仓库了，因为在入口文件index.js的Provider组中已经导入，所以直接导入import {connect} from 'react-redux';
import { connect } from 'react-redux';

export default connect((state) => {
    // 注：这里的state 就是store仓库中的state，所以从这里返回的数据在应该组件被调用时，会解构赋值给props，然后在上面的this.props中就可以拿到对应的数据啦！！！
    console.debug('connect() -> state', state);

    // return state;  // 将store仓库中所有的数据都返回给props

    return {
        users: state.users // 只返回users数据返回给props
    }
}
    // 注：如在这里自定义了更新方法，那么 this.props.dispatch 将会被覆盖掉
    , {
        addUser: (data) => {
            return data;
        },

        upUser(data) {
            return data;
        }
    }

)(class ReactRedux extends PureComponent {
    constructor() {
        super();

        this.state = {
            // users: this.props.users
            nName: '',
            nAge: '',
            nJob: ''
        }

    }

    componentDidMount() {
        // 注：react-redux 在更新store中的数据后会自动更新render()，所以不用监听 或 强制重新渲染当前组件啦！
        // 强制重新渲染当前组件，执行render()方法 state和props数据更新，就会重新render，但是当层级过深时，可能就不会触发渲染，这时候就要用到this.forceUpdate()
        this.forceUpdate();

    }

    getStore = () => {
        console.log(this.props.users)
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
        // 更新store中的数据
        // this.props.dispatch({
        //     type: 'UP-USERS',
        //     data: {
        //         name: this.state.nName,
        //         age: this.state.nAge,
        //         job: this.state.nJob
        //     }
        // });

        this.props.upUser({
            type: 'UP-USERS',
            data: {
                name: this.state.nName,
                age: this.state.nAge,
                job: this.state.nJob
            }
        });

        // this.props.addser({
        //     type: 'ADD-ITEMS',
        //     data: { name: this.state.nName }
        // })


    }

    render() {
        // 在connect()方法设置指定想要的数据，所以直接在props获取store中的数据就OK啦！
        const { name, age, job } = this.props.users

        return (
            <section className="redux">
                <h1>React-Redux </h1>
                <p>
                    react-redux 是专门用在React中的，它依赖于 redux。
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
                    {'\n'}      - store.dispatch() 提交更新状态
                    {'\n'}      - store.subscribe() 变更订阅

                    {'\n'}{'\n'}
                    <b>react-redux中常用的对象和方法：</b>
                    {'\n'}  * provider 组件，用是指定作用范围
                    {'\n'}  * connect(fn, obj/fn) 方法是一个工厂函数，在调用以后会返回一个包装组件（高阶组件），所以要在调用后在传入组件。
                    {'\n'}      + connect()方法的第一个参数是一个函数：
                    {'\n'}          - 该函数的第一个参数就是 store 中的 state，可以解构state中的数据【就是将store仓库中的数据映射到当前组件的props中！】。
                    {'\n'}          - 该函数的返回值将被解构赋值给当前组件的 props中。
                    {'\n'}      + connect()方法的第二个参数可以是对象，也可以是一个函数
                    {'\n'}      + connect()方法的第三是一个函数。。。看下面的吧！
                    
                    {'\n'}{'\n'}
                    <b>connect()方法中参数：</b>
                    {'\n'}  * connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
                    {'\n'}      - mapStateToProps?: Function
                    {'\n'}      - mapDispatchToProps?: Function | Object
                    {'\n'}      - mergeProps?: Function
                    {'\n'}      - options?: Object
                </pre>
                <p>英文官网：<a href="https://react-redux.js.org" target="_blank">https://react-redux.js.org</a> </p>
                <p>中文官网：<a href="https://www.redux.org.cn/docs/react-redux" target="_blank">https://www.redux.org.cn/docs/react-redux</a> </p>

                <h1> 从store中获取到的数据： 昵称：{name}，Age：{age}，职位：{job}</h1>
                <button type="button" onClick={this.getStore} >获取redux中的store的数据</button>
                <p>
                    <label>昵称：<input type="text" onChange={this.onChangeName} /> {this.state.nName}</label>
                </p>
                <p>
                    <label>年龄：<input type="number" onChange={this.onChangeAge} /> {this.state.nAge}</label>
                </p>
                <p>
                    <label>职位：<input type="text" onChange={this.onChangeJob} /> {this.state.nJob}</label>
                </p>
                <button type="button" onClick={this.upState} >修改redux中的store的数据</button>
            </section>
        );
    }
})