const path = require('path'); //для того чтобы превратить отнсительный путь в абсолютный мы будем использовать пакет path
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'eval-source-map',
	devServer: {
		historyApiFallback: true,
		static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
		// compress: true, // это ускорит загрузку в режиме разработки
		open: true, // сайт будет открываться сам при запуске npm run dev
		hot: true,
		allowedHosts: 'all',
		client: {
			overlay: true,
		},
		// Автоматически находит доступный порт, если порт 3000 занят
		port: 'auto',
	},
	plugins: [new ReactRefreshWebpackPlugin()],
};
