## definition-block

### V1.1.1

把API定义里的各个部分以『块』模型划分

### Block 汇总

接口描述

- Java Interface，方法 Javadoc Body
- Spring/Jax-RS，同上
- Swagger，@Api注解中的notes

请求头部 Header

- Java Interface，无
- Spring，@RequestHeader 标注的字段
- Jax-RS，@HeaderParam 标注的字段
- Swagger 2.x @Api...Param paramType 为 header 的字段，目前 @ApiParam 中无法指定类型

请求 Cookie Cookie 

- Java Interface，无
- Spring，@RequestHeader 标注的字段
- Jax-RS，@HeaderParam 标注的字段
- Swagger 2.x @Api...Param paramType 为 header 的字段，目前 @ApiParam 中无法指定类型

请求参数

- Java Interface
- Spring/Jax-RS，除了header和cookie以外的所有东西
- Swagger @ApiImplicitParam @ApiParam

请求响应

- Java Interface return type
- Spring/Jax-RS return type 
- Swagger @ApiResponse

异常类型

- Java Interface

响应状态码

- Swagger

#### 对于 Java Interface

- 接口描述，javadoc里的body部分
- 接口参数
- 接口响应
- 接口抛出的异常，如果抛出的是异常父类，展示时支持展示子类【TBD】

#### 对于 Spring Restful Controller

- 接口描述，javadoc里的body部分
- 接口请求头和Cookie参数 【TBD】
- 接口参数，没有被参数注解标注的参数，不解析，不展示，例如 HttpServletRequest
- 接口响应


#### 对于 Jax-RS Service

同 Spring

#### 对于 Swagger V2 注解

优先级问题

Framework > Swagger > Javadoc

Swagger和Javadoc互斥，使用Swagger后，所有Javadoc都被忽略

Spring & Jax-RS 本身注解的优先级高于 Swagger，例如 @PathVariable 中的配置优先级高于 Swagger 的 @ApiParam

#### Swagger 相对于原生 Spring / Jax-RS 在展示上的区别

其它具有类似功能的注解会替换原来Javadoc的注释部分，例如字段描述会使用 @ApiParam 中的 value，方法描述会使用 @ApiOperation 中的 value。

- Swagger 多了 @ApiResponses 这个展示块，以列表形式展示响应码和对应的描述
- 方法描述中增加了 Tags 列表，
- 如果没有直接使用参数注解（例如，@PathVariable），会使用 @ApiImplicitParams 注解（如果有），否则作没有参数处理

其它注解在该版本中不作展示。


 