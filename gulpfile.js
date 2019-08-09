//引入gulp
const gulp = require('gulp');
/* 
拷贝.html
*/
gulp.task('copy-html',function() {
	return gulp.src(['html/*.html','*.html'])
	.pipe(gulp.dest('dist/'))
	.pipe(connect.reload());
})

gulp.task('scripts',function(){
	return gulp.src(['js/*.js','*.js','!gulpfile.js'])
	.pipe(gulp.dest('dist/js'))
	.pipe(connect.reload());
})

gulp.task('images',function(){
	return gulp.src([ 'images/*.{jpg,png,gif,ico}','*.{jpg,png,gif,ico}'])
	.pipe(gulp.dest('dist/images'))
	.pipe(connect.reload());
})

gulp.task('data',function(){
	return gulp.src(['data/*.json',"*.json","!package.json"])
	.pipe(gulp.dest('dist/data'))
	.pipe(connect.reload());
})

gulp.task('iconfont',function(){
	return gulp.src('iconfont/*.{css,html,eot,js,svg,ttf,woff,woff2}')
	.pipe(gulp.dest('dist/iconfont'))
	.pipe(connect.reload());
})

const scss = require('gulp-sass');
// const minifyCSS =require('gulp-minify-css');
// const rename = require('gulp-rename');

gulp.task('scss',function(){
	return gulp.src(['scss/*.scss','*.scss'])
	.pipe(scss())
	.pipe(gulp.dest('dist/css'))
	.pipe(connect.reload());
})

//我们监听代码之前，先将上述所有代码执行一遍

gulp.task('bulid',['copy-html','scripts','images','data','scss','iconfont'],function(){
	console.log("项目建立成功")
})

//编写监听

gulp.task("watch",function(){
	gulp.watch('html/*.html',['copy-html']);
	gulp.watch(['js/*.js','*.js','!gulpfile.js'],['scripts']);
	gulp.watch([ 'images/*.{jpg,png}','*.{jpg,png}'],['images']);
	gulp.watch(['data/*.json',"*.json","!package.json"],['data']);
	gulp.watch(['scss/*.scss','*.scss'],['scss'])
})

//启动服务
//需先引进connect
//
const connect = require('gulp-connect');

gulp.task("server",function(){
	connect.server({
		root:"dist", //服务器根目录（localhost加载根目录）
		port:8888,  //0~65535
		livereload:true //配置实时刷新功能
	})
})

//同时运行服务和监听功能  设置默认任务 ， 直接可以通过gulp运行
gulp.task("default",["watch","server"]);
