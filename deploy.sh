###
 # @Description:  
 # @Author: LuckRain7
 # @Date: 2020-04-18 18:15:15
 ###

#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist


git init
git add -A
git commit -m 'deploy'


# Gitee
git push -f git@gitee.com:LuckRain/Web-FEDSE.git master


cd -