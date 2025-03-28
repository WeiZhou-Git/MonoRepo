export interface InitState {
    appId: string;
    privateKey: string;
    device: string;
    domain: string;
    signType: string;
    [key: string]: any;
}

export interface DeviceInfo {
    deviceType: string;
	os: string;
	appVer: string;
	channel: string;
	model: string;
	deviceId: string;
	brand: string;
	osVer: string;
	clientIp: string;
}

export interface VoiceParams {
	mediaName: string,
	mediaType: string,
	artistName: string
}