/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./*.html",             // Scans homepage.html
        "./components/**/*.html", // Scans navbar.html
        // If you have other HTML/JS files that use Tailwind classes, add their paths here.
    ],
    theme: {
        extend: {
            colors: {
                primary: "#000000",  //black Bold
                secondary: "#FFFFFF",  //white
                customGray: "#000000",//gray
                bggray: '#F0F0F0',     // background gray
                mainbg: '#F2F0F1',//main background
            },
            fontFamily: {
                integral: ['integral', 'mono'],
                satoshi: ['satoshi', 'mono'],
                satoshibold: ['satoshiBold', 'mono'],
                satoshimedium: ['satoshimedium', 'mono'],
                satoshiregular: ['satoshiregular', 'mono'],



            },
            screens: {
                'vm': '375px',
                'xs': '475px',
                'sm': '640px',
                'md': '768px',
                "custombg": "900px",
                'lg': '1024px',
                'customlg': '1197px',
                'xl': '1280px',
                '2xl': '1440px',
                '3xl': '1536px',
            },

        },
    },
    plugins: [],
}
