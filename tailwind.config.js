module.exports = {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            fontSize: {
                '3xl': '1.875rem', // 30px
            },
            colors: {
                'brand-light': '#E5F7FD',
                'brand-aqua':  '#00D9EA',
                'brand-sky':   '#0C90C7',
                'brand-deep':  '#223A76',
                'brand-sun1':  '#FFE265',
                'brand-sun2':  '#FFC500',
                'brand-alert': '#FF5A5F',
            }
        }
    },
    plugins: [
        //
    ],
}