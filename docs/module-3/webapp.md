

## 1.  移动端开发发展历史和技术概括(89)

![](/images/module-3/移动端发展史.png)





## 2.  开发的移动端产品(90)

- PC端做好了，需要适配移动端（移动端只需要在浏览器中打开）

	+ PC端简单，PC端和移动端用一套，例如：猎豹移动、华为官网....

	+ PC端复杂，PC端单独一套（不需要做响应式），移动端单独一套（需要做响应式，但是只需要适配手机或者PAD），也可能PAD端单独做一套...

- 只做移动端（浏览器、微信、再或者嵌入到native-app中的）

-------------纯webApp，多说也就是Hybrid交互（移动端响应式布局开发）

- 小程序（uni-app、mpvue、taro、原生...）
- NativeAPP（uni-app、react-native、flutter...）

-------------按照框架现有的体系和移动端响应式布局技巧结合来做

### 2.1  PC和移动端公用一套的
> 解决方案：先做PC端（固定布局），然后基于 @media 做媒体适配
>
> 技巧：在指定的设备尺寸下，外层容器一般不固定宽度，让宽度自适应（流式布局）

- 不难，只需要多写一些样式而已（在不同的尺寸下微调整结构和样式）
- 外层的宽度一般不固定，自适应的（流式布局）

常用的设备尺寸：

​	苹果手机：320（<=iphone 5S）、375（iphone6/7/8/X）、414（plus）

​	ipad：768 X 1024 、1024 x 1366

​	安卓手机：320、360、420左右、540左右...

### 2.2  PC端单独一套，移动端单独一套
> 解决方案：rem 等比缩放布局为主

- flex 特殊场景的应用：排列对齐类的
- vh 和 vw 特殊场景应用：1vw 是1%的宽度  1vh 是1%的高度，按照百分比布局，经常用于一屏幕宽高的产品中 =>按照设计稿的宽高，计算出当前元素所占的比例，布局写样式的时候，都按照 vw/vh 百分比写样式

#### 2.2.1  特殊的东西
- viewport
> 把HTML页面放到手机端运行，HTML有默认的渲染宽度（一般都是980或者1024），也就是不管设备是多大的，HTML的宽度都是980  =>这样会导致一个问题：页面想要在手机设备上展示全，整体会缩小
>
> 响应式布局开发首先要保证，页面布局样式是不能缩放的，一般设备多宽，我们的HTML就按多宽渲染 ，此时需要 viewport
```html
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">

<--
viewport：布局视口，设置HTML布局的样式
	width=device-width  HTML的宽度和设备宽度一致
	user-scalable=no 禁止用户手动缩放
	initial-scale=1.0  初始不缩放
-->
```

- dpr适配
> 一般设计师给我们的手机端设计稿都是按照 iphone6 的尺寸给的：750 * 1334 ，
>
> 为啥设计稿都要比真实设备大一倍？:高清屏（2倍屏）：dpr 比例  2.0 （现在有3.0的）

![](/images/module-3/响应式布局开发.png)



## 3. 响应式布局开发(77.78.79)

1. 媒体适配 @media
2. 群魔乱舞时代
   + 固定布局：`<meat name="viewport" content="width=320px">`
   + 等比缩放布局：按照固定的样式写一版（例如：320），然后根据设备的宽度，让其除以320，计算出缩放的比例，最后让 HTML 基于 transform:scale（比例）进行缩放
   + rem 响应式布局开发(等比缩放)：

### 3.1 媒体适配  viewport 和 @media(77)

#### 3.1.1  响应式布局开发 媒体适配@media

媒体设备： all(所有设备)/print(打印设备)/screen(屏幕设备)

媒体条件：某个条件写对应的样式。

问题：写的样式要很多，比较麻烦

```html
<style>
  .example{
    display: block;
    margin: 0 auto;
    width: 400px;
  }
  @media screen and (max-width:500px){
    /* 如果当前页面宽度 <= 500 */
    .example{
      width: 200px;
    }
  }
</style>
<img src="images/example.png" class="example" />
```

#### 3.1.2  响应式布局开发的基础 viewport

> 把HTML页面放到手机端运行，HTML有默认的渲染宽度（一般都是980或者1024），也就是不管设备是多大的，HTML的宽度都是980  =>这样会导致一个问题：页面想要在手机设备上展示全，整体会缩小
>
> 响应式布局开发首先要保证，页面布局样式是不能缩放的，一般设备多宽，我们的HTML就按多宽渲染 ，此时需要 viewport

解决：viewport 视口（layout viewport 布局视口），设定页面渲染中的一些规则 

- width=device-width：让当前页面渲染的宽度和设备宽度保持一致
- initial-scale=1.0 初始缩放比例 1:1
- maximum-scale=1.0 最大缩放比例 1:1
- minimum-scale=1.0 最小缩放比例 1:1
- user-scalable=no 禁止用户手动缩放

```html
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">
```

### 3.2. rem 等比缩放布局(78)

**CSS 常用的单位：**

- px 像素（固定单位）
- em 相对单位，相对于父元素的字体大小设定的单位
- rem （root em）相对于当前页面根元素（HTML）的字体大小设定的
- %
- deg
- s / ms

**开发过程：**

- 拿到设计稿后（设计稿一般是750px），我们设定一个初识的 rem和 px 换算比例（一般设置为1rem=100px，为了后期方便换算）
- 测量出设计稿中元素的尺寸（PS测出来的是px单位），在编写样式的时候全部转换为rem的单位（除以100即可）=> 100% 还原设计稿
- 编写一段 JS，获取当前设备的宽度，让其除以设计稿的宽度750，在乘以初识的换算比例100，计算出当前设备下，1rem 应该等于多少像素（只要改变  HTML 的 font-size）：这样 HTML 字体大小一改，之前所有已 rem 为单位的元素都会跟着自动缩放。

现在真实项目中，主体响应式布局以 rem 为主，部分效果实现可以基于 Flex 来做，需要样式微调还是要基于 @media 来实现

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        html {
            /* 1rem = 20px */
            font-size: 20px;
        }

        .box {
            width: 100px;
            height: 100px;
            line-height: 100px;
            text-align: center;
            font-size: 20px;
            background: lightblue;
            margin: 20px;
        }

        .box:nth-child(2) {
            width: 150px;
            height: 150px;
            line-height: 150px;
        }

        .box:nth-child(3) {
            width: 200px;
            height: 200px;
            line-height: 200px;
        }

        @media screen and (width:375px) {
            .box:nth-child(1) {
                width: 117px;
                height: 117px;
                line-height: 117px;
            }

            .box:nth-child(2) {
                width: 176px;
                height: 176px;
                line-height: 176px;
            }
        }
    </style>
    <script>
        function computedREM() {
            let HTML = document.documentElement,
                winW = HTML.clientWidth;
            HTML.style.fontSize = winW / 320 * 20 + 'px';
        }
        computedREM()
        window.addEventListener('resize', computedREM)
    </script>
</head>

<body>
    <div class="box">1</div>
    <div class="box">2</div>
    <div class="box">3</div>
</body>

</html>
```

​	

### 3.3  DPI适配:屏幕像素密度比(79)

> 一般设计师给我们的手机端设计稿都是按照 iphone6 的尺寸给的：750 * 1334 ，
>
> 为啥设计稿都要比真实设备大一倍？:高清屏（2倍屏）：dpr 比例  2.0 （现在有3.0的）

![](/images/module-3/响应式布局开发.png)