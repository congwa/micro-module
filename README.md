# AutoDataReporting

数据报表自动化


## [版本日志](./version.md)

## 使用

### umd
```
<script src="https://img-10048861.file.myqcloud.com/autodatareporting/sdk/dist/sdk.umd.min.js"></script>
```



### cjs
```
// 远程路径：https://img-10048861.file.myqcloud.com/autodatareporting/sdk/dist/sdk.cjs.min.js
import sdk from '***/sdk.cjs.min.js';


```

[examples](./examples/index.html)

### document


1. 截图模块 Screenshot
    - screenshot(domId: String): Promise<HTMLCanvasElement | null> --- 截图
    - screenshotUpload(domId: String): Promise<HTMLCanvasElement | null>  截图并且上传 结果返回图片的url地址

2. 剪切板 Clipboard
    - screenshotToClipboard(domId: String): Promise<Boolean | Error> -- 截图复制到剪切板（要求安全域名，不支持火狐）
    - imgUrlToClipboard(url: RequestInfo):  Promise<Boolean | Error> -- 图片地址复制到剪切板 （要求安全域名，不支持火狐，chrome仅支持png）
    - textToClipboard(text: string):   Promise<Boolean | Error> -- 复制文字到剪切板 (safari可能会失败，如发生失败，待修复)
    - imageTextToClipboard(text: string, imgUrl: string):   Promise<Boolean | Error> -- 复制文字和图片链接到剪切板 （要求安全域名，不支持火狐，chrome仅支持png）
    - textScreenshotToClipboard(text: string,domId: String):   Promise<Boolean | Error> -- 复制截图和文字 （要求安全域名，不支持火狐，chrome仅支持png）
    - screenhotUploadToClipboard(text: string, domId: String):   Promise<Boolean | Error> -- 截图、上传、放到剪切板-markdown格式混排 (safari可能会失败，如发生失败，待修复)
    - screenhotUploadToClipboardAsync(text: string, domId: string, callBack: Function) -- 同步方式：截图、上传、放到剪切板-markdown格式混排
    - screenhotBase64ToClipboard(text: string, domId: String, callBack: Function | undefined): Promise<Boolean | Error> -- 图片链接-Base64方式，可callback可promise反馈
    - imgUrlToClipboardByMarkDwom imgUrlToClipboardByMarkDwom(text: string, url: string, callBack: Function): boolean| Error 复制url进入markdown
        
3. 订阅模块 Share
    - share(id:string | number, platform_type: string | number, willShareUrl?:string): Promise<boolean>-- 订阅    
        参数    

        ```
            id: BI userId
            platform_type: 平台id 默认1
            willShareUrl: 要订阅报表的url
        ```
    - getSubscribeStatusByUrl(shareUrl:string): Promise<Object> -- 查询分享的状态   

        如果查询多个报表，那么参数使用,分隔来拼接字符串
        ```
        sdk.Share.getSubscribeStatusByUrl('https://www.baidu.com,https://www.weibo.com')
        ```
        反馈结果
        ``` 
          {
            "report_data": "http://bi.im30.net/dist/\\\\#/overviewShare/86e155a80d8038a4b222228b767834ea/b0d5b4dcb69246882db58b4d3c09519e/card",
            "sub_count": 0, // 被订阅次数
            "sub_status": 0 // 订阅状态 0:未订阅 1:已经订阅
          },
          {
            "report_data": "ddddddddd\"",
            "sub_count": 0,
            "sub_status": 0
          }
        ```
    - async cancelSubscribeAllByUrl(shareUrl: string) : Promise<Boobean | Error> 全部取消订阅



- 使用screenhotUploadToClipboardAsync方式，但是在safari浏览器抽风，多点几次就有时候会好。
- **建议** 使用 例子 onClick9的方式。 在点击分享之前，先截图并且上传，(调用screenshotUpload接口）拿到url存下来。 之后调用imgUrlToClipboardByMarkDwom放入剪切板，兼容所有浏览器