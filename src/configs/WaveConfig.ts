export const WAVE_CONFIG: readonly WaveConfig[] = Object.freeze([
    {
        level: 1,
        rightChoice: {
            name: 'NFT',
            price: 50,
            reward: '5000',
            isCorrectAnswer: true,
            icon: 'nft',
        },
        wrongChoice: {
            name: 'BURGER',
            price: 20,
            reward: -20,
            isCorrectAnswer: false,
            icon: 'burger',
        },
    },
    {
        level: 2,
        rightChoice: {
            name: 'ETH',
            price: 4000,
            reward: '100000',
            isCorrectAnswer: true,
            icon: 'eth',
        },
        wrongChoice: {
            name: 'ROLEX',
            price: 5000,
            reward: -5000,
            isCorrectAnswer: false,
            icon: 'rolex',
        },
    },
    {
        level: 3,
        rightChoice: {
            name: 'BITCOIN',
            price: 65000,
            reward: '1000000',
            isCorrectAnswer: true,
            icon: 'btc',
        },
        wrongChoice: {
            name: 'YACHT',
            price: 80000,
            reward: -80000,
            isCorrectAnswer: false,
            icon: 'yacht',
        },
    },
    {
        level: 4,
        rightChoice: {
            name: 'CRYPTO WALLET',
            price: 200000,
            reward: '2000000',
            isCorrectAnswer: true,
            icon: 'crypto_wallet',
        },
        wrongChoice: {
            name: 'MINING FARM',
            price: 500000,
            reward: '20000000',
            isCorrectAnswer: false,
            icon: 'mining_farm',
        },
    },
]);
