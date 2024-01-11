## java-viewer

用于展示参数和响应列表

以 32px 一行为单位，两行则为 64px

必填字段以星号展示，isRequired 实现根据具体框架处理

## 展示内容汇总

字段名称 fieldName

- java interface，展示原始字段名
- spring/jax-rs，未启用 swagger，annotation name > field name
- spring/jax-rs，启用 swagger, annotation name > swagger name > field name

字段默认值

【TBD】

字段是否必填 isRequired

- java interface，@NotNull / @NotEmpty 注解
- Path 路径参数，无论如何配置，都是必填
- spring/jax-rs，未启用 swagger，annotation required >  @NotNull / @NotEmpty
- spring/jax-rs，启用 swagger，annotation required >  @NotNull / @NotEmpty >  swagger required，注解本身优先级高于 swagger

字段类型 fieldTypeName

- Java Interface，真实类型 + JSON类型
- Spring/Jax-RS，真实类型 + JSON类型
- 启用Swagger，展示Swagger注解中填写的类型，例如 dataType

字段JSON类型

把字段类型映射到JSON类型

字段类型标签 fieldTypeTag

用于Spring/Jax-RS服务

字段描述 fieldCommentTitle

- Java Interface，javadoc的第一行
- Spring/Jax-RS，未启用 Swagger，javadoc的第一行
- Spring/Jax-RS，启用 Swagger，swagger中的注解 > javadoc

【TBD】字段详情 fieldCommentBody

- Java Interface，javadoc 的 body
- Spring/Jax-RS，javadoc 的 body
- Swagger，Swagger中的内容 > javadoc

枚举

- 无区别
