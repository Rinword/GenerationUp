module.exports = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: "babel-loader",
    options: {
      plugins: [
        'react-hot-loader/babel'
      ]
    }
  },
  {
    test: /\.css$/,
    use: [
      { loader: 'style-loader' },
      {
        loader: 'css-loader',
        options: {
          modules: true
        }
      }
    ]
  },
  {
    test: /\.scss$/,
    use: [{
      loader: "style-loader" // creates style nodes from JS strings
    }, {
      loader: "css-loader" // translates CSS into CommonJS
    }, {
      loader: "sass-loader" // compiles Sass to CSS
    }]
  },
  {
    test: /\.(html)$/,
    use: {
      loader: 'html-loader',
      options: {
        attrs: [':data-src']
      }
    }
  },
  {
    test: /\.(png|jpg|gif)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }
    ]
  },
  {
    test: /\.(png|gif|jpe?g|svg)$/,
    use: [
      {
        loader: 'file-loader',
        options: {}
      }
    ]
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: [
      {
        loader: 'file-loader',
        options: {}
      }
    ]
  }
]
