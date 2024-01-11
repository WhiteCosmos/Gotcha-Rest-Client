<script>
    export default {
        name: "DvFakerJsMixin",

        data() {
            return {
                groups: [
                    {
                        name: "address",
                        cname: "地理位置",
                        emoji: "💌",
                        description: "Module to generate addresses and locations.",
                        cDescription: "地理位置",
                        items: [
                            {
                                name: "buildingNumber",
                                description: "Generates a random building number.",
                                cDescription: ""
                            },
                            {
                                name: "cardinalDirection",
                                description: "Returns a random cardinal direction (north, east, south, west).",
                                cDescription: "",
                                parameters: [
                                    {
                                        name: "useAbbr",
                                        type: "boolean",
                                        description: "If true this will return abbreviated directions (N, E, etc). Otherwise this will return the long name."
                                    }
                                ]
                            },
                            {
                                name: "city",
                                description: "Generates a random localized city name.",
                                cDescription: "",
                                parameters: [
                                    {
                                        name: "format",
                                        type: "string", // number | string
                                        description: "The index of the format to use. Deprecated do not use."
                                    }
                                ]
                            },
                            {
                                name: "cityName",
                                description: "Returns a random localized and existing city name.",
                                cDescription: ""
                            },
                            {
                                name: "country",
                                description: "Returns a random country name.",
                                cDescription: ""
                            },
                            {
                                name: "countryCode",
                                description: "Returns a random country code.",
                                cDescription: "",
                                parameters: [
                                    {
                                        name: "alphaCode",
                                        type: "string",
                                        description: "The code to return. Can be either 'alpha-2' (2 letter code) or 'alpha-3' (three letter code)."
                                    }
                                ]
                            },
                            {
                                name: "county",
                                description: "Returns a random country name.",
                                cDescription: ""
                            },
                            {
                                name: "direction",
                                description: "Returns a random direction (cardinal and ordinal; northwest, east, etc).",
                                cDescription: "",
                                parameters: [
                                    {
                                        name: "useAbbr",
                                        type: "boolean",
                                        description: "If true this will return abbreviated directions (NW, E, etc). Otherwise this will return the long name."
                                    }
                                ]
                            },
                            {
                                name: "latitude",
                                description: "Generates a random latitude.",
                                cDescription: "",
                                parameters: [
                                    {
                                        name: "max",
                                        type: "number",
                                        description: "The upper bound for the latitude to generate.",
                                    },
                                    {
                                        name: "min",
                                        type: "number",
                                        description: "The lower bound for the latitude to generate.",
                                    },
                                    {
                                        name: "precision",
                                        type: "number",
                                        description: "The number of decimal points of precision for the latitude.",
                                    }
                                ]
                            },
                            {
                                name: "longitude",
                                description: "Generates a random longitude.",
                                cDescription: "",
                                parameters: [
                                    {
                                        name: "max",
                                        type: "number",
                                        description: "The upper bound for the longitude to generate.",
                                    },
                                    {
                                        name: "min",
                                        type: "number",
                                        description: "The lower bound for the longitude to generate.",
                                    },
                                    {
                                        name: "precision",
                                        type: "number",
                                        description: "The number of decimal points of precision for the longitude.",
                                    }
                                ]
                            },
                            {
                                name: "nearbyGPSCoordinate",
                                description: "Generates a random GPS coordinate within the specified radius from the given coordinate.",
                                cDescription: "",
                                parameters: [
                                    {
                                        name: "coordinate",
                                        type: "array",
                                        description: "The original coordinate to get a new coordinate close to. If no coordinate is given, a random one will be chosen.",
                                    },
                                    {
                                        name: "radius",
                                        type: "number",
                                        description: "The maximum distance from the given coordinate to the new coordinate.",
                                    },
                                    {
                                        name: "isMetric",
                                        type: "boolean",
                                        description: "If true assume the radius to be in kilometers. If false for miles.",
                                    }
                                ]
                            },
                            {
                                name: "ordinalDirection",
                                description: "Returns a random ordinal direction (northwest, southeast, etc).",
                                cDescription: "",
                                parameters: [
                                    {
                                        name: "useAbbr",
                                        type: "boolean",
                                        description: "If true this will return abbreviated directions (NW, SE, etc). Otherwise this will return the long name."
                                    }
                                ]

                            },
                            {
                                name: "secondaryAddress",
                                description: "Generates a random localized secondary address. This refers to a specific location at a given address such as an apartment or room number.",
                                cDescription: ""
                            },
                            {
                                name: "state",
                                description: "Returns a random localized state from this country.",
                                cDescription: ""
                            },
                            {
                                name: "stateAbbr",
                                description: "Returns a random localized state's abbreviated name from this country.",
                                cDescription: ""
                            },
                            {
                                name: "street",
                                description: "Generates a random localized street name.",
                                cDescription: ""
                            },
                            {
                                name: "streetAddress",
                                description: "Generates a random localized street address.",
                                cDescription: "",
                                parameters: [
                                    {
                                        name: "useFullAddress",
                                        type: "boolean",
                                        description: "When true this will generate a full address. Otherwise it will just generate a street address."
                                    }
                                ]
                            },
                            {
                                name: "streetName",
                                description: "Returns a random localized street name.",
                                cDescription: ""
                            },
                            {
                                name: "timeZone",
                                description: "Returns a random time zone.",
                                cDescription: ""
                            },
                            {
                                name: "zipCode",
                                description: "Generates random zip code from specified format. If format is not specified, the locale's zip format is used.",
                                cDescription: "",
                                parameters: [{
                                    name: "format",
                                    type: "string",
                                    description: "The optional format used to generate the the zip code. By default, a random format is used from the locale zip formats.",
                                }]
                            },
                            {
                                name: "zipCodeByState",
                                description: "Generates random zip code from state abbreviation. If state abbreviation is not specified, a random zip code is generated according to the locale's zip format. Only works for locales with postcode_by_state definition. If a locale does not have a postcode_by_state definition, a random zip code is generated according to the locale's zip format.",
                                cDescription: "",
                                parameters: [{
                                    name: "state",
                                    type: "string",
                                    description: "The abbreviation of the state to generate the zip code for.",
                                }]
                            }]
                    },
                    {
                        name: "animal",
                        cname: "动物",
                        emoji: "🐵",
                        description: "Module to generate animal related entries.",
                        items: [
                            {
                                name: "bear",
                                description: "Returns a random bear species.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "bird",
                                description: "Returns a random bird species.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "cat",
                                description: "Returns a random cat species.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "cetacean",
                                description: "Returns a random cetacean species.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "cow",
                                description: "Returns a random cow species.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "crocodilia",
                                description: "Returns a random crocodilia species.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "dog",
                                description: "Returns a random dog species.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "horse",
                                description: "Returns a random horse species.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "insect",
                                description: "Returns a random insect species.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "lion",
                                description: "Returns a random lion species.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "rabbit",
                                description: "Returns a random rabbit species.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "rodent",
                                description: "Returns a random rodent species.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "snake",
                                description: "Returns a random snake species.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "type",
                                description: "Returns a random animal type.",
                                cDescription: "",
                                parameters: [],
                            },
                        ]
                    },
                    {
                        name: "color",
                        cname: "颜色",
                        emoji: "🌈",
                        items: [
                            {
                                name: "cmyk",
                                description: "Returns a CMYK color.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "colorByCSSColorSpace",
                                description: "Returns a random color based on CSS color space specified.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "cssSupportedFunction",
                                description: "Returns a random css supported color function name.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "cssSupportedSpace",
                                description: "Returns a random css supported color space name.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "hsl",
                                description: "Returns an HSL color.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "human",
                                description: "Returns a random human readable color name.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "hwb",
                                description: "Returns an HWB color.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "lab",
                                description: "Returns a LAB (CIELAB) color.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "lch",
                                description: "Returns an LCH color. Even though upper bound of chroma in LCH color space is theoretically unbounded, it is bounded to 230 as anything above will not make a noticeable difference in the browser.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "rgb",
                                description: "Returns an RGB color.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "space",
                                description: "Returns a random color space name from the worldwide accepted color spaces.",
                                cDescription: "",
                                parameters: [],
                            },
                        ]
                    },
                    {
                        name: "commerce",
                        cname: "商业",
                        emoji: "👠",
                        items: [
                            {
                                name: "department",
                                description: "Returns a department inside a shop.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "price",
                                description: "Generates a price between min and max (inclusive).",
                                cDescription: "",
                                parameters: [
                                    {
                                        name: "min",
                                        type: "number",
                                        default: 1,
                                        description: "The minimum price."
                                    },
                                    {
                                        name: "max",
                                        type: "number",
                                        default: 1000,
                                        description: "The maximum price."
                                    },
                                    {
                                        name: "dec",
                                        type: "number",
                                        default: 2,
                                        description: "The number of decimal places."
                                    },
                                    {
                                        name: "symbol",
                                        type: "string",
                                        default: "",
                                        description: "The currency value to use."
                                    },
                                ],
                            },
                            {
                                name: "product",
                                description: "Returns a short product name.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "productAdjective",
                                description: "Returns an adjective describing a product.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "productDescription",
                                description: "Returns a product description.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "productMaterial",
                                description: "Returns a material of a product.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "productName",
                                description: "Generates a random descriptive product name.",
                                cDescription: "",
                                parameters: [],
                            },
                        ]
                    },
                    {
                        name: "company",
                        cname: "企业",
                        emoji: "📈️",
                        description: "Module to generate company related entries.",
                        cDescription: "",
                        items: [
                            {
                                name: "bs",
                                description: "Generates a random company bs phrase.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "bsAdjective",
                                description: "Generates a random descriptive product name.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "bsBuzz",
                                description: "Returns a random company bs buzz word.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "bsNoun",
                                description: "Returns a random company bs noun.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "catchPhrase",
                                description: "Generates a random business catch phrase.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "catchPhraseAdjective",
                                description: "Returns a random catch phrase adjective.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "catchPhraseDescriptor",
                                description: "Returns a random catch phrase descriptor.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "catchPhraseNoun",
                                description: "Returns a random catch phrase noun.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "companySuffix",
                                description: "Returns a random company suffix.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "name",
                                description: "Generates a random company name.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "suffixes",
                                description: "Returns an array with possible company name suffixes.",
                                cDescription: "",
                                parameters: [],
                            },
                        ]
                    },
                    {
                        name: "database",
                        cname: "数据库",
                        emoji: "💾",
                        items: [
                            {
                                name: "collation",
                                description: "Returns a random database collation.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "column",
                                description: "Returns a random database column name.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "engine",
                                description: "Returns a random database engine.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "mongodbObjectId",
                                description: "Returns a MongoDB ObjectId string.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "type",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                        ]
                    },
                    {
                        name: "datatype",
                        cname: "数据结构",
                        emoji: "📦",
                        items: [
                            {
                                name: "array",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "bigInt",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "boolean",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "datetime",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "float",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "hexadecimal",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "json",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "number",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "string",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "uuid",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                        ]
                    },
                    {
                        name: "date",
                        cname: "日期时间",
                        emoji: "⏰",
                        description: "",
                        cDescription: "",
                        items: [
                            {
                                name: "between",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "betweens",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "birthdate",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "future",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "month",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "past",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "recent",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "soon",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "weekday",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                        ]
                    },
                    {
                        name: "finance",
                        cname: "金融",
                        emoji: "💸",
                        items: [
                            {
                                name: "account",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "accountName",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "amount",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "bic",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "bitcoinAddress",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "creditCardCVV",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "creditCardIssuer",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "creditCardNumber",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "currencyCode",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "currencyName",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "currencySymbol",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "ethereumAddress",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "iban",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "litecoinAddress",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "mask",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "pin",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "routingNumber",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "transactionDescription",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "transactionType",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                        ]
                    },
                    {
                        name: "git",
                        cname: "吉特",
                        emoji: "🐙",
                        items: [
                            {
                                name: "branch",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "commitEntry",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "commitMessage",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "commitSha",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "shortSha",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                        ]
                    },
                    {
                        name: "hacker",
                        cname: "",
                        emoji: "👾",
                        items: [
                            {
                                name: "abbreviation",
                                description: "Returns a random hacker/IT abbreviation.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "adjective",
                                description: "Returns a random hacker/IT adjective.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "ingverb",
                                description: "Returns a random hacker/IT verb for continuous actions (en: ing suffix; e.g. hacking).",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "noun",
                                description: "Returns a random hacker/IT noun.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "phrase",
                                description: "Generates a random hacker/IT phrase.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "verb",
                                description: "Returns a random hacker/IT verb.",
                                cDescription: "",
                                parameters: [],
                            },
                        ]
                    },
                    {
                        name: "image",
                        cname: "图片",
                        emoji: "🖼️",
                        parameters: [
                            {
                                name: "width",
                                type: "number",
                                default: 640,
                                description: "The width of the image."
                            },
                            {
                                name: "width",
                                type: "number",
                                default: 480,
                                description: "The width of the image."
                            },
                            {
                                name: "randomize",
                                type: "boolean",
                                default: false,
                                description: "Whether to randomize the image or not."
                            },
                        ],
                        items: [
                            {
                                name: "abstract",
                                description: "Generates a random abstract image url.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "animals",
                                description: "Generates a random animal image url.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "avatar",
                                description: "Generates a random avatar image url.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "business",
                                description: "Generates a random business image url.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "cats",
                                description: "Generates a random cat image url.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "city",
                                description: "Generates a random city image url.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "dataUri",
                                description: "Generates a random data uri containing an svg image.",
                                cDescription: "",
                                parameters: [
                                    {
                                        name: "width",
                                        type: "number",
                                        default: 640,
                                        description: "The width of the image."
                                    },
                                    {
                                        name: "width",
                                        type: "number",
                                        default: 480,
                                        description: "The width of the image."
                                    },
                                    {
                                        name: "color",
                                        type: "string",
                                        default: 'grey',
                                        description: "The color to use."
                                    },
                                ],
                            },
                            {
                                name: "fashion",
                                description: "Generates a random fashion image url.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "food",
                                description: "Generates a random food image url.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "image",
                                description: "Generates a random image url from one of the supported categories.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "imageUrl",
                                description: "Generates a random image url.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "nature",
                                description: "Generates a random nature image url.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "nightlife",
                                description: "Generates a random nightlife image url.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "people",
                                description: "Generates a random people image url.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "sports",
                                description: "Generates a random sports image url.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "technics",
                                description: "Generates a random technics image url.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "transport",
                                description: "Generates a random transport image url.",
                                cDescription: "",
                                parameters: [],
                            },
                        ]
                    },
                    {
                        name: "internet",
                        cname: "互联网",
                        emoji: "🌐",
                        items: [
                            {
                                name: "avatar",
                                description: "Returns a random avatar url.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "color",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "domainName",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "domainSuffix",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "domainWord",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "email",
                                description: "Generates an email address using the given person's name as base.",
                                cDescription: "",
                                parameters: [
                                    {
                                        name: "firstName",
                                        type: "string",
                                        default: '',
                                        description: ""
                                    },
                                    {
                                        name: "lastName",
                                        type: "string",
                                        default: '',
                                        description: ""
                                    },
                                    {
                                        name: "provider",
                                        type: "string",
                                        default: '',
                                        description: ""
                                    },
                                ],
                            },
                            {
                                name: "emoji",
                                description: "Generates a random emoji.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "httpMethod",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "httpStatusCode",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [
                                    {
                                        name: "options",
                                        type: "object",
                                        default: '',
                                        description: "",
                                        children: [
                                            {
                                                name: "types",
                                                type: "array",
                                                default: '',
                                                description: "A list of the HTTP status code types that should be used.",
                                            }
                                        ]
                                    },
                                ],
                            },
                            {
                                name: "ip",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "ipv4",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "ipv6",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "mac",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "password",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [
                                    {
                                        name: "len",
                                        type: "number",
                                        default: 15,
                                        description: ""
                                    },
                                    {
                                        name: "memorable",
                                        type: "boolean",
                                        default: false,
                                        description: ""
                                    },
                                    {
                                        name: "pattern",
                                        type: "string",
                                        default: '',
                                        description: ""
                                    },
                                    {
                                        name: "prefix",
                                        type: "string",
                                        default: '',
                                        description: ""
                                    },
                                ],
                            },
                            {
                                name: "port",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "protocol",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "url",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "userAgent",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "userName",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                        ]
                    },
                    {
                        name: "lorem",
                        cname: "文本",
                        emoji: "📜",
                        items: [
                            {
                                name: "lines",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "paragraph",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "paragraphs",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "sentence",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "sentences",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "slug",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "text",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "word",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                            {
                                name: "words",
                                description: "Returns a random database column type.",
                                cDescription: "",
                                parameters: [],
                            },
                        ]
                    },
                    {
                        name: "music",
                        cname: "音乐",
                        emoji: "🎹",
                        items: [
                            {
                                name: "genre",
                                description: "Returns a random music genre.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "songName",
                                description: "Returns a random song name.",
                                cDescription: "",
                                parameters: []
                            },
                        ]
                    },
                    {
                        name: "name",
                        cname: "姓名性别",
                        emoji: "👨‍🦳",
                        description: "Module to generate people's names and titles.",
                        cDescription: "",
                        items: [
                            {
                                name: "firstName",
                                description: "Generates IMEI number.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "fullName",
                                description: "Generates IMEI number.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "gender",
                                description: "Generates IMEI number.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "jobArea",
                                description: "Generates IMEI number.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "jobDescriptor",
                                description: "Generates IMEI number.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "jobType",
                                description: "Generates IMEI number.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "lastName",
                                description: "Generates IMEI number.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "middleName",
                                description: "Generates IMEI number.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "prefix",
                                description: "Generates IMEI number.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "sex",
                                description: "Generates IMEI number.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "sexType",
                                description: "Generates IMEI number.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "suffix",
                                description: "Generates IMEI number.",
                                cDescription: "",
                                parameters: []
                            },
                        ]
                    },
                    {
                        name: "phone",
                        cname: "电话号码",
                        emoji: "☎️",
                        items: [
                            {
                                name: "imei",
                                description: "Generates IMEI number.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "number",
                                description: "Generates a random phone number.",
                                cDescription: "",
                                parameters: [
                                    {
                                        name: "format",
                                        type: "string"
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        name: "random",
                        cname: "随机数据",
                        emoji: "🎲",
                        items: [
                            {
                                name: "alpha",
                                description: "Generating a string consisting of letters in the English alphabet.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "alphaNumeric",
                                description: "Generating a string consisting of alpha characters and digits.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "locale",
                                description: "Returns a random locale, that is available in this faker instance. You can use the returned locale with faker.setLocale(result).",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "numeric",
                                description: "Generating a string consisting of letters in the English alphabet.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "word",
                                description: "Generating a string consisting of letters in the English alphabet.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "words",
                                description: "Generating a string consisting of letters in the English alphabet.",
                                cDescription: "",
                                parameters: []
                            },
                        ]
                    },
                    {
                        name: "science",
                        cname: "科学研究",
                        emoji: "🔬",
                        items: [
                            {
                                name: "chemicalElement",
                                description: "Returns an adjective of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "unit",
                                description: "Returns an adjective of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                        ]
                    },
                    {
                        name: "system",
                        cname: "操作系统",
                        emoji: "🖥️",
                        items: [
                            {
                                name: "commonFileExt",
                                description: "Returns an adjective of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "commonFileName",
                                description: "Returns an adjective of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "commonFileType",
                                description: "Returns an adjective of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "cron",
                                description: "Returns an adjective of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "directoryPath",
                                description: "Returns an adjective of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "fileExt",
                                description: "Returns an adjective of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "fileName",
                                description: "Returns an adjective of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "filePath",
                                description: "Returns an adjective of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "fileType",
                                description: "Returns an adjective of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "mimeType",
                                description: "Returns an adjective of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "networkInterface",
                                description: "Returns an adjective of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "semver",
                                description: "Returns an adjective of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                        ]
                    },
                    {
                        name: "vehicle",
                        cname: "交通工具",
                        emoji: "🚌",
                        items: [
                            {
                                name: "bicycle",
                                description: "Returns an adjective of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "color",
                                description: "Returns an adjective of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "fuel",
                                description: "Returns an adjective of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "manufacturer",
                                description: "Returns an adjective of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "model",
                                description: "Returns an adjective of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "type",
                                description: "Returns an adjective of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "vehicle",
                                description: "Returns an adjective of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "vin",
                                description: "Returns an adjective of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "vrm",
                                description: "Returns an adjective of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                        ]
                    },
                    {
                        name: "word",
                        cname: "单词",
                        emoji: "🈁",
                        description: "Module to return various types of words.",
                        cDescription: "",
                        items: [
                            {
                                name: "adjective",
                                description: "Returns an adjective of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "adverb",
                                description: "Returns an adverb of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "conjunction",
                                description: "Returns a conjunction of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "interjection",
                                description: "Returns an interjection of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "noun",
                                description: "Returns a noun of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "preposition",
                                description: "Returns a preposition of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                            {
                                name: "verb",
                                description: "Returns a verb of random or optionally specified length.",
                                cDescription: "",
                                parameters: []
                            },
                        ]
                    },
                ]
            }
        },
    }
</script>

