import React, { Component } from 'react';
import { objKeySort } from '@samsung-speaker/utils';
import './style/App.less';

import { getToplist, searchSong } from '../server/api';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	//将要架在你dom的时候的声明周期
	async componentWillMount() {
		console.log(objKeySort)
		let res = await searchSong({})
		console.log('准备完毕', res)
	}
	componentDidUpdate(prevProps, prevState) {
		// console.log('app更改完毕', prevProps, prevState);
	}
	shouldComponentUpdate(nextProps, nextState) {
	}
	// 组件第一次渲染完成，此时dom节点已经生成
	componentDidMount() {
		console.log('浏览器类型，' + navigator.userAgent);
		//当联网的时候触发的回调
		window.addEventListener(
			'online',
			() => {
				//如果最后一页是断网页面的时候，返回上一页v
			},
			false
		);
		//当断网的时候触发的回调
		window.addEventListener(
			'offline',
			() => {
			},
			false
		);
	}

	render() {
		return (<></>);
	}
}
export default App;
// export default App;
