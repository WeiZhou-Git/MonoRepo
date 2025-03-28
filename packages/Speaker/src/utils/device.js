import { delCode } from '@samsung-speaker/utils';

const tempMac = window.webapis ? window.webapis.network.getMac() : 'fc:92:54:08:65:06';
export const mac = tempMac || 'fc:92:54:08:65:06';
export const deviceid = delCode(mac, ":");