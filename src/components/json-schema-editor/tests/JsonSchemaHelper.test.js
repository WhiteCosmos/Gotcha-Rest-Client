import JsonSchemaHelper
    from '@/components/json-schema-editor/JsonSchemaHelper'

let helper = new JsonSchemaHelper()
test('Parse Json', () => {
    let json = {
        "aa": "",
        "bb": 123,
        "cc": true,
        "dd": null,
        "ee": [
            1, 2, 3
        ],
        "ggg": {
            "aa": "",
            "bb": null,
            "cc": true,
            "dd": null,
            "ee": ""
        }
    }

    helper.parse(json)
})

test('Array not in same type', () => {
    let json = {
        "aa": "",
        "bb": 123,
        "cc": true,
        "ee": [
            "abb",
            "cc",
            "sa",
        ],
        "ggg": {
            "aa": "",
            "cc": true,
            "ee": ""
        }
    }

    helper.parse(json)
})