## EvExportMixin

### 可以导出的类型

Java Interface

- Markdown
- AsciiDoc
- Image/PNG

Spring / Jax-RS

- Markdown
- AsciiDoc
- Image/PNG
- Postman v1/v2
- Swagger 2.x
- OpenAPI 3.x

Swagger 2.x 

- Markdown
- AsciiDoc
- Image/PNG
- Postman v1/v2
- Swagger 2.x
- OpenAPI 3.x 

OpenAPI 3.x 

- Markdown
- AsciiDoc
- Image/PNG
- Postman v1/v2
- Swagger 2.x
- OpenAPI 3.x


### 导出为 Markdown

基本格式

- 文档标题
- 文档副标题
- 文档类型
- 文档块

#### Java Interface

- 文档标题，Service Comment 或 Service Name
- 文档副标题，ServiceName + MethodName
- 文档标签，Java Interface
- 接口描述
- 请求参数块
- 返回响应块
- 异常信息块

#### Spring / Jax-RS

- title
- subtitle
- method description
- request method block
- request path block
- parameters block -> JsonType default value
- response block -> Json Type
- header block / default value
- cookie block / default value

### Swagger

- title 
- subtitle
- method description
- 多了 response code 
- 其它差不多

### 导出为 Swagger 2.x 文件

根据规范生成相应的JSON对象