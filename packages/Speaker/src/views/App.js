import React, { Component } from 'react';
import { NetEaseCloudSDK } from '@netease-music/player-sdk'
import './style/App.less';
import { bind } from 'file-loader';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	//将要架在你dom的时候的声明周期
	async componentWillMount() {

		window.onWebSdkInitReady(() => {
			this.globalPlayer = NetEaseCloudSDK.createPlayer({
				container: 'player',
			})
			window.a = this.globalPlayer;
			console.log('gloPlayer', this.globalPlayer)
		})

		// NetEaseCloudSDK.anonymous();
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
		return (
			<>
				<div id="player"></div>

				<div className="voice_btn" onClick={this.playSong.bind(this)}>播放[歌名/专辑]</div>
				<div className="voice_btn" onClick={this.playSinger.bind(this)}>播放[歌手名]的歌</div>
				<div className="voice_btn" onClick={this.playSingerSong.bind(this)}>播放[歌手名]的[歌名/专辑]</div>
				<div className="voice_btn" onClick={this.playSingerTypeSong.bind(this)}>播放[歌手名]的[类型]的歌曲</div>
				<div className="voice_btn" onClick={this.playType.bind(this)}>播放[类型]的歌曲</div>
				<div className="voice_btn" onClick={this.playRanking.bind(this)}>播放[排行榜]的歌曲</div>
				<div className="voice_btn" onClick={this.playLanguage.bind(this)}>播放[语种]的歌曲</div>
				<div className="voice_btn" onClick={this.playMySongList.bind(this)}>播放[我的收藏 | 我的歌单]的歌曲</div>
				
				<p></p>
				<div className="player_btn" onClick={this.prevSong.bind(this)}>上一曲</div>
				<div className="player_btn" onClick={this.play.bind(this)}>播放</div>
				<div className="player_btn" onClick={this.pause.bind(this)}>暂停</div>
				<div className="player_btn" onClick={this.nextSong.bind(this)}>下一曲</div>
				<div className="player_btn" onClick={this.sequence.bind(this)}>顺序播放</div>
				<div className="player_btn" onClick={this.repeat.bind(this)}>循环播放</div>
				<div className="player_btn" onClick={this.shuffle.bind(this)}>随机播放</div>

				<p></p>
				<div className='quaLity_btn' onClick={this.changeQuality.bind(this, 'hires')}>HIRES音质</div>
				<div className='quaLity_btn' onClick={this.changeQuality.bind(this, 'lossless')}>无损音质</div>
				<div className='quaLity_btn' onClick={this.changeQuality.bind(this, 'exhigh')}>极高音质</div>
				<div className='quaLity_btn' onClick={this.changeQuality.bind(this, 'higher')}>较高音质</div>
				<div className='quaLity_btn' onClick={this.changeQuality.bind(this, 'standard')}>标准音质</div>

			</>
		);
	}

	play() {
		this.globalPlayer.play()
	}

	pause () {
		this.globalPlayer.pause()
	}

	nextSong () {
		this.globalPlayer.nextSong()
	}

	prevSong () {
		this.globalPlayer.prevSong()
	}

	playSong() {
		this.globalPlayer.playSong({
			songName: '真的没喝多',
			mediaType: '1'
		})
	}

	playSinger() {
		this.globalPlayer.playSinger({
			singer: '张杰',
		})
	}

	playSingerSong() {
		this.globalPlayer.playSingerSong({
			mediaName: '守村人',
			artistName: '薛之谦',
			mediaType: '2',
		})
	}

	playSingerTypeSong() {
		this.globalPlayer.playSingerSong({
			artistName: '陈奕迅',
			mediaName: '粤语',
		})
	}

	playType() {
		this.globalPlayer.playType({
			mediaName: '节奏'
		})
	}

	playRanking() {
		this.globalPlayer.playRanking({
			mediaName: '热搜榜'
		})
		
	}

	playLanguage() {
		this.globalPlayer.playLanguage({
			mediaName: '韩语'
		})
	}

	playMySongList() {
		// 涉及登录
	}

	// 顺序
	sequence() {
		this.globalPlayer.playMode({
			mode: 'sequence'
		})
	}

	// 循环
	repeat() { 
		this.globalPlayer.playMode({
			mode: 'repeat'
		})
	}
	//随机
	shuffle() {
		this.globalPlayer.playMode({
			mode: 'shuffle'
		})
	}

	// 切换音质
	changeQuality (level) {
		this.globalPlayer.changeQuality({
			level
		})
	}

}
export default App;
// export default App;
