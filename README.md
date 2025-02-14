# Monorepo 结构



## 开发环境运行

```
npm run start
```

&nbsp;
 
# 工作空间命令
### 工作空间独立的就单独安装到工作区

> 添加到根

```
yarn add cross-env -D -W
```

> 删除根

```
yarn remove cross-env  -W
```

> 如果想单独添加或者移除某个子项目的依赖，可以使用如下命令：
```
yarn workspace <workspace_name > add <pkg_name> --dev
yarn workspace <workspace_name > remove <pkg_name>
```

&nbsp;

### 注意： workspace_name workspace_name 包名，package.json 中设置的 name，不是文件夹名

> 比如

```
yarn workspace @project/home add  swiper
yarn workspace @project/admin add  swiper
yarn workspace @project/home add react-custom-scrollbars
```
