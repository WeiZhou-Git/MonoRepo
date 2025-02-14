const shell = require("shelljs");
const paths = require("../config/paths");

// Check Tizen
if (!shell.which("tizen")) {
  shell.echo("无法执行tizen命令。请确保tizen studio已经正确安装并且已设置环境变量PATH！");
  shell.exit(1);
}

// Change into build directory
shell.cd(paths.appBuild)

// Tizen build-web
shell.exec("tizen clean"); // Clean .buildResult before build
shell.exec("tizen build-web");

// Change into .buildResult
shell.cd(".buildResult");

// Tizen package
if (shell.exec("tizen package -t wgt").code === 0) {
  // Copy wgt file to build directory
  shell.cp('*.wgt', paths.appBuild);
  shell.echo("已完成Tizen打包。wgt文件已copy到build文件夹");
} else {
  shell.echo("打包出问题了，不好说啥原因，直接来问我吧~");
}