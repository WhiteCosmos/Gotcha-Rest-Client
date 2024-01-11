const GHCHttpRequestPayloadType = {
    NONE: "none",

    TEXT: "text",

    SCHEMA: "schema",

    JSON: "json", // application/json

    FORM: "form", // application/x-www-url-encoded

    MULTIPART: "multipart", // multipart/form-data

    FILE: "file", // application/octet-stream

    GRAPHQL: "graphql"
}

export default GHCHttpRequestPayloadType