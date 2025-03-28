export const PlayModes = {
    SEQUENCE: 'sequence', // 顺序
    SHUFFLE: 'shuffle', // 随机
    REPEAT: 'repeat' // 循环
} as const;

export const MusicLevel = {
    HIRES: 'hires', // hires
    LOSSLESS: 'lossless', // 无损
    EXHIGH: 'exhigh', // 极高
    HIGHER: 'higher', // 较高
    STANDARD: 'standard' // 标准

} as const;

export type PlayMode = typeof PlayModes[keyof typeof PlayModes];
export type Level = typeof MusicLevel[keyof typeof MusicLevel];
