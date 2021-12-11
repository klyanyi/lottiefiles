module.exports = {
	content: ["./src/**/*.{html,js,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [require("postcss-import"), require("tailwindcss"), require("autoprefixer")],
};
