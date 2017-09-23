let gulp=require("gulp");
let connect=require("gulp-connect");
let sass=require("gulp-sass-china");
//测试
gulp.task("hello",()=>{
	//指令执行函数
	console.log("this is my first gulp");
})
//转存功能
gulp.task("play",()=>{
	return gulp.src("play.html").pipe(gulp.dest("dist")).pipe(connect.reload())
})
//转存多个文件
gulp.task("script",()=>{
	return gulp.src(["play.js",]).pipe(gulp.dest("dist/script"))
})
//自动检测
gulp.task("watch",()=>{
	//第一个参数代表监控的文件，第二个代表执行的指令 
	gulp.watch(["play.html","sass/*.scss"],["play"]);
    gulp.watch("sass/*.scss",["sass"]);
})
 //gulp-connect 配置
 gulp.task("server",()=>{
 	connect.server({
 		root:'dist',
 		port:8080,
 		livereload:true
 	});
 })
 gulp.task("sass",()=>{
	 return gulp.src('sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
})

//开启watch和server两个功能
//一定要先开启server
gulp.task("default",["server","watch"])
