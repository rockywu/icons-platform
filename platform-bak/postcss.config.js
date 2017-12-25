module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: ['Android >= 2.3',
                'iOS >= 7',
                'last 5 Safari versions']
        })

    ]
}