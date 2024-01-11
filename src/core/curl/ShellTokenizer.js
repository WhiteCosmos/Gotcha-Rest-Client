import Immutable
    from 'immutable'

export default class ShellTokenizer {
    constructor() {
        this.tokenParsers = Immutable.List()
    }

    _cleanPlainString(string) {
        return string.replace(/\\\n/gm, '').replace(/\\(.)/gm, '$1')
    }

    _cleanDoubleQuotedString(string) {
        return string.replace(/\\\n/gm, '').replace(/\\([\"\$])/gm, '$1')
    }

    _cleanDollarQuotedString(string) {
        return string.replace(/\\([abeEfnrtv\\\'\"]|[0-7]{1,3}|x[0-9a-fA-F]{1,2}|c[a-zA-Z\[\\\]\^_])/gm, (match, p1) => {
            if (p1 == 'n') {
                return "\n"
            } else if (p1 == 'r') {
                return "\r"
            } else if (p1 == 't') {
                return "\t"
            } else if (p1 == 'a') {
                return String.fromCharCode(7)
            } else if (p1 == 'b') {
                return String.fromCharCode(8)
            } else if (p1 == 'f') {
                return String.fromCharCode(12)
            } else if (p1 == 'v') {
                return String.fromCharCode(11)
            } else if (p1 == 'e' || p1 == 'E') {
                return String.fromCharCode(27)
            } else if (p1 == '\\' || p1 == "'" || p1 == '"') {
                return p1
            }
            // octal char
            else if (/^[0-7]{1,3}$/.test(p1)) {
                return String.fromCharCode(parseInt(p1, 8))
            }
            // hex char
            else if (p1[0] == 'x') {
                return String.fromCharCode(parseInt(p1.substr(1), 16))
            }
            // control char
            else if (p1[0] == 'c') {
                if (/^[a-z]$/i.test(p1[1])) {
                    return String.fromCharCode(p1[1].toUpperCase().charCodeAt(0) - 64)
                } else if (p1[1] == '[') {
                    return String.fromCharCode(27)
                } else if (p1[1] == '\\') {
                    return String.fromCharCode(28)
                } else if (p1[1] == ']') {
                    return String.fromCharCode(29)
                } else if (p1[1] == '^') {
                    return String.fromCharCode(30)
                } else if (p1[1] == '_') {
                    return String.fromCharCode(31)
                }
            }
            return p1
        })
    }

    _cleanToken(token) {
        const re = /(?:[\"“”](?:\\\"|[^\"])*?[\"“”])|(?:[\'‘’][^\']*?[\'‘’])|(?:\$[\'‘’](?:\\\'|[^\'])*?[\'‘’])|(?:\\\s|[^'"“”‘’\$])+|\$/gm
        let output = ''
        let m
        while ((m = re.exec(token)) !== null) {
            let string = m[0]
            if (string[0] == "'" || string[0] == "‘" || string[0] == "’") {
                string = string.substr(1, string.length - 2)
            } else if (string[0] == '"' || string[0] == '“' || string[0] == '”') {
                string = this._cleanDoubleQuotedString(string.substr(1, string.length - 2))
            } else if (string.substr(0, 2) == "$'") {
                string = this._cleanDollarQuotedString(string.substr(2, string.length - 3))
            } else {
                string = this._cleanPlainString(string)
            }
            output += string
        }
        return output
    }

    tokenize(string) {
        const re = /(?:\||\;|\&{1,2}|[12\&]?\>{1,2}|0?\<)|(?:(?:[\"“”](?:\\\"|[^\"])*?[\"“”])|(?:[\'‘’][^\']*?[\'‘’])|(?:\$[\'‘’](?:\\\'|[^\'])*?[\'‘’])|(?:\\\s|[^\s\|\>\<\&\;]))+/gm
        let tokens = Immutable.List()
        let m
        while ((m = re.exec(string)) !== null) {
            tokens = tokens.push(this._cleanToken(m[0]))
        }
        return tokens
    }
}