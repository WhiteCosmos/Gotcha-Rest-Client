const zh = {
    EvAppContentPlaceholder: {
        getStarted: "開始使用",

        newRequest: "創建請求",

        newGroup: "創建分組",

        importFromFile: "導入文件",

        tip_1: "雙擊接口或分組名稱進行修改",

        tip_2: "拖動接口或分組改變層級結構",

        help: "幫助與支持",

        userGuides: "使用文檔",

        reviewOnAppstore: "前往 App Store 評分",

        twitter: "關注 Twitter"
    },

    EvKeyValueEditor: {
        name: "參數名",

        indexAndName: "序號 & 參數名",

        isRequired: "必填",

        isParameter: "參數",

        type: "類型",

        value: "參數值",

        description: "描述"
    },

    EvContextMenu: {
        cut: "剪切",

        copy: "複製",

        duplicate: "複製",

        remove: "刪除",

        rename: "重命名",

        paste: "粘貼",

        expandAll: "展開全部",

        collapseAll: "收起全部",
    },

    EvContentTabContextMenu: {
        closeTab: "關閉標籤頁",

        closeOtherTabs: "關閉其他標籤頁",

        closeTabsToTheLeft: "關閉所有左側標籤頁",

        closeTabsToTheRight: "關閉所有右側標籤頁",

        closeAllTabs: "關閉所有標籤頁"
    },

    EvApiTreeViewContextMenu: {
        newRequest: "創建請求",

        newGroup: "創建分組",

        expandAll: "展開全部",

        collapseAll: "收起全部",

        importFromFile: "導入文件"
    },

    EvHttpClientEnvironmentSelector: {
        noEnvironment: "未配置環境",

        empty: "空",

        globalVariables: "全局變量",

        environments: "全部環境",

        manage: "管理"
    },

    EvHttpClientCookieJarSelector: {
        default: "默認 Cookie 罐"
    },

    EvHttpClientRequestMenu: {
        docs: "接口文檔",

        headers: "請求標頭",

        urlParams: "URL 參數",

        body: "請求資料",

        auth: "接口驗證",

        tests: "回應斷言"
    },

    EvHttpClientRequestDocs: {
        description: "接口描述",

        descriptionPlaceholder: "在這裡填寫接口描述...",

        request: "接口請求",

        headers: "請求標頭",

        paths: "請求路徑",

        queryParameters: "查詢參數",

        payload: "請求資料",

        payloadPlaceholder: "沒有資料，請點擊「請求資料」頁面添加資料",

        response: "返回回應",

        responsePlaceholder_1: "點擊回應頁面中的",

        responsePlaceholder_2: "圖示並選擇「另存為回應範例」"
    },

    EvHttpClientRequestUrlParameters: {
        url: "URL 配置",

        protocol: "協議",

        host: "域名",

        port: "端口",

        basePath: "根路徑",

        paths: "請求路徑",

        queryParameters: "查詢參數",

        arrayFormat: "陣列格式"
    },

    EvHttpClientRequestSettings: {},

    EvHttpClientResponse: {
        summary: "請求訊息",

        headers: "回應標頭",

        body: "返回資料",

        tests: "斷言結果"
    },

    EvHttpClientResponseSummary: {
        request: "請求狀態",

        requestUrl: "請求 URL",

        date: "請求日期",

        ipAddress: "IP 地址",

        proxy: "代理地址",

        redirects: "重新導向",

        rawRequest: "原始請求",

        response: "回應狀態",

        responseStatus: "回應狀態碼",

        responseEncoding: "回應編碼",

        responseCharset: "回應字符集",

        responseType: "回應類型",

        responseSize: "回應體積",

        // Timeline

        timeline: "時間軸",

        connectionStart: "建立請求",

        dnsLookup: "域名查詢",

        tlsHandshake: "TLS 握手",

        requestSent: "傳送請求",

        waiting: "等待回應(TTFB)",

        contentDownload: "獲取回應內容",

        total: "總耗時",
    },

    appTitle: "开箱即用的Java接口文档生成工具",

    localRepositoryName: "本地项目仓库",

    sourceRepositoryName: "源码包仓库",

    project: "项目列表",

    branch: "分支列表",

    services: "Java 服务",

    structs: "Java 实体",

    restfulApis: "HTTP 服务",

    restfulModels: "HTTP 实体",

    search: "搜索",

    upgrade: "升级到专业版",

    freeMode: "免费模式",

    subscribed: "SUBSCRIBED 🎉",

    exportService: "导出文档",

    button: {
        close: "关闭"
    },

    backToTop: "回到顶部",

    repository: {
        addRemoteRepository: "添加远程仓库"
    },

    projectSelector: {
        notGitProject: "非 Git 项目",
    },

    documentTree: {
        noSearchResults: "没有搜索结果"
    },

    welcome: {
        addProject: {
            title: "添加新项目",

            subtitle_1: "点击上方项目选择栏中的",

            subtitle_2: "按钮，然后选择Java项目文件夹。",

            ps: "现已支持 Spring Boot，JAX-RS，Swagger 2.0，OpenAPI 3.0 框架注解。"
        },

        addBranch: {
            title: "添加新分支",

            subtitle: "点击上方分支选择栏中的本地分支进行接入，尚未接入的分支会显示为『灰色』。",

            ps: "添加或更新分支前需要手动执行 git pull 命令，请确保操作之前提交了所有更改"
        },

        supportedFrameworks: {
            title: "导出接口文档",

            subtitle: "点击文档右上角的导出按钮，即可复制文档到剪切板；点击服务列表旁边的菜单，即可导出服务中的所有接口。",

            ps: "支持导出为 markdown / asciidoc / png 格式"
        },

        info: {
            userGuideA: "需要帮助 ？请查看 ",

            userGuideB: "使用指南",

            reportBugA: "遇到问题了 ? 你可以 ",

            reportBugB: "反馈BUG",

            contactA: "有关产品的其它问题请加入QQ支持群或联系 superwhitecosmos@gmail.com",

            contactB: "rabiapisupp0rt@gmail.com",
        }
    },

    EvBranchMenu: {
        branchLabel: "分支列表",

        versionLabel: "版本列表"
    },

    EvApiDefinition: {
        showJson: "查看 JSON",

        description: "接口描述",

        headers: "请求头参数",

        cookies: "Cookie 参数",

        requestMethod: "请求方法",

        requestPath: "请求路径",

        parameters: "请求参数",

        noParameters: "没有请求参数",

        response: "返回响应",

        noResponse: "没有返回响应",

        throws: "抛出异常",

        responseCodes: "返回响应 · 状态码",
    },

    apiDefinition: {
        showJson: "查看 JSON",

        description: "接口描述",

        headers: "请求头参数",

        cookies: "Cookie 参数",

        requestMethod: "请求方法",

        requestPath: "请求路径",

        parameters: "请求参数",

        noParameters: "没有请求参数",

        response: "返回响应",

        noResponse: "没有返回响应",

        throws: "抛出异常",

        responseCodes: "返回响应 · 状态码",
    },

    content: {
        overloads: "重载列表",

        parameters: "请求参数",

        response: "返回响应",

        showJson: "查看JSON",

        fieldName: "字段名",

        fieldType: "类型",

        fieldComment: "描述",

        noParameters: "没有请求参数",

        noResponse: "没有返回响应",
    },

    createModal: {
        reading: "正在读取",

        addBranchProcessing: "正在添加分支",

        addBranchComplete: "分支添加完成",

        addBranchFailed: "分支添加失败",

        refreshBranchProcessing: "正在刷新分支",

        refreshBranchComplete: "分支刷新完成",

        refreshBranchFailed: "分支刷新失败",

        addProjectFailed: "添加项目失败",

        addProjectProcessing: "正在添加项目",

        addProjectComplete: "项目添加完成",

        directoryNotFound: "文件夹不存在",

        notJavaProject: "非Java项目",

        operationProcessing: "处理中...",

        operationWaiting: "请稍候",

        failedModal: {
            whatHappened: "错误原因",

            errorMessage: "详细信息",

            solution: "解决方法",

            stackTrace: "异常堆栈"
        }
    },

    addProject: {
        projectInfo: {
            title: "项目信息",

            projectName: "项目名称：",

            projectPath: "项目路径：",

            branchName: "所在分支：",

            repositoryName: "仓库名称：",

            status: "状态："
        },

        moduleInfo: {
            title: "模块列表"
        },

        exceptionInfo: {
            title: "异常信息"
        }
    },

    createProjectError: {
        whatHappened: "错误原因",

        errorMessage: "错误信息",

        solution: "解决方法",
    },

    subscription: {
        title: "请选择你需要的版本 😄",

        freeSubscription: "免费使用",

        freeFeatures: {
            first: "最多同时使用 3 个项目",
            second: "免费使用所有功能",
            third: "",
        },

        subscriptionFeatures: {
            first: "解锁项目数量限制",
            second: "免费试用 14 天",
            third: "随时取消",
        },

        monthlySubscription: "按月订阅",

        perMonth: "每月",

        yearlySubscription: "按年订阅",

        perYear: "每年",

        alreadyPurchased: "已经购买 ？",

        restorePurchase: "恢复购买",

        termsOfService: "服务条款",

        privacyPolicy: "隐私政策"
    },

    parameterConstraintsBlock: {
        title: "请求参数 · 约束条件",

        reference: "注: 仅显示存在约束条件的字段",

        fieldNameColumn: "字段名",

        fieldConstraintColumn: "约束条件",

        noMessage: "未填写该注解的 message 字段"
    },

    markdown: {
        footer: "> 该文档由 RabiAPI 生成，[了解更多](https://github.com/RabiAPI/RabiAPI-Support)"
    },

    exportProjectModal: {
        chooseExportType: "请选择导出文档的类型"
    },

    EvAppNavigation: {
        exportButton: "导出文档",

        authorizeGitDirectory: "授权访问 .gitconfig 目录"
    },

    EvExportProjectModal: {
        title: "请选择需要导出的内容",

        httpOnly: "仅支持 HTTP 接口",

        exportType: "导出类型",

        projectName: "项目名称",

        branchName: "分支名称",

        moduleList: "模块列表",

        serviceList: "服务列表",

        methodList: "方法列表",

        httpService: "HTTP 服务",

        JavaService: "JAVA 服务",

        next: "下一步",

        startExport: "开始导出"
    },

    EvTabSelector: {
        restfulApis: "HTTP 服务",

        restfulModels: "HTTP 实体",

        javaServices: "Java 服务",

        javaModels: "Java 实体",
    },

    MarkdownBuilder: {
        requestMethod: "请求方式",

        requestPath: "请求路径",

        consumes: "请求 Content-Type",

        produces: "响应 Content-Type",

        requestHeaders: "请求头参数",

        requestCookies: "Cookie参数",

        parameters: "请求参数",

        parameterConstraints: "请求参数 / 约束条件",

        noParameter: "没有请求参数",

        response: "返回响应",

        noResponse: "没有返回响应",

        responseHeaders: "响应请求头",

        exceptions: "抛出异常"
    },

    EvContentSwitchButton: {
        apiDefinition: "接口定义",

        apiHttpClient: "接口测试"
    },

    EvNoSearchResults: {
        title: "没有搜索结果",

        subtitle: "没有找到关于『{keyword}』的搜索结果。",
    },

    EvJsonTreeEmptyView: {
        title: "没有内容",

        subtitle: "请选择其他列表。"
    },

    EvModelListEmptyView: {
        title: "没有内容",

        subtitle: "请选择其他列表。"
    },

    EvContentTabMenu: {
        closeTab: "关闭标签页",

        closeOtherTabs: "关闭其他标签页",

        closeAllTabs: "关闭所有标签页"
    },

    ApiParameterExampleBlock: {
        title: "请求参数模板"
    },

    ApiResponseExampleBlock: {
        title: "返回响应模板"
    },

    JavaColumnConstraintBlock: {
        minimum: "最小值",

        exclusiveMinimum: "包含最小值",

        maximum: "最大值",

        exclusiveMaximum: "包含最大值",

        minLength: "最小长度",

        maxLength: "最大长度",

        pattern: "正则表达式",

        minItems: "最小个数",

        maxItems: "最大个数",

        required: "必填",

        uniqueItems: "内容不重复",

        minProperties: "最少个数",

        maxProperties: "最多个数",

        allowEmptyValue: "允许空值",

        // number

        positive: "值为正数",

        positiveOrZero: "值大于或等于0",

        negative: "值为负数",

        negativeOrZero: "值小于或等于0",

        // date-time

        past: "日期小于当天",

        pastOrPresent: "日期小于或等于当天",

        future: "日期大于当天",

        futureOrPresent: "日期大于或等于当天",
    },

    // HTTP

    EvHttpRequestHeaders: {
        label: "请求头部"
    },

    EvHttpRequestUrlParams: {
        label: "URL 参数"
    },

    EvHttpRequestPayloads: {
        label: "请求携带数据"
    },

    EvHttpRequestPayloadExamples: {
        label: "请求携带数据示例"
    },

    EvHttpResponseHeaders: {
        label: "响应头部"
    },

    EvHttpResponsePayloads: {
        label: "响应携带数据"
    },

    EvHttpResponsePayloadExamples: {
        label: "响应携带数据示例"
    },

    EvHttpRequestBlock: {
        label: "请求参数",

        noParameters: "没有请求参数",
    },

    EvHttpResponseBlock: {
        label: "返回响应",
    },

    EvApiDescriptionBlock: {
        title: "接口描述"
    },

    // RPC

    EvRpcRequestBlock: {
        label: "请求参数"
    },

    EvRpcResponseBlock: {
        label: "返回响应"
    },

    EvRpcExceptionBlock: {
        label: "抛出异常"
    },

    // API Viewer

    JavaColumnDescription: {
        constraint: "约束条件",

        exampleValue: "示例值",

        defaultValue: "默认值"
    },

    EvProjectTypeSelector: {
        importSwaggerFile: "导入 Swagger 文件",

        importJavaProject: "导入 Java 项目"
    },

    EvProjectOptions: {
        location: "位置",

        createdAt: "创建时间",

        updatedAt: "更新时间",

        refreshProject: "刷新项目",

        removeProject: "删除项目",
    },

    EvNotificationMixin: {},

    EvRemoveProjectModal: {
        message: "确认删除项目 {name} 及所有数据，被删除的数据将无法恢复。",

        confirm: "确认删除",

        cancel: "取消"
    },

    EvRemoveVersionModal: {
        message: "确认删除版本 {name} 及所有数据，被删除的数据将无法恢复。",

        confirm: "确认删除",

        cancel: "取消"
    },

    EvStructFieldsBlock: {
        label: "数据模型"
    },

    GHCHttpClientRequestDocsExporter: {
        request: "接口请求",

        requestDescription: "接口描述",

        requestMethod: "请求方法",

        requestPath: "请求路径",

        headers: "请求头部",

        paths: "路径参数",

        querys: "查询参数",

        payload: "请求数据",

        response: "返回响应",

        statusCode: "状态码",

        // Table

        name: "参数名",

        required: "必填",

        description: "描述",
    }
}

export default zh