import Immutable
    from 'immutable'

import ShellTokenizer
    from './ShellTokenizer'

export class CurlFileReference extends Immutable.Record({
    filepath: null,
    convert: null
}) {
}

export class CurlKeyValue extends Immutable.Record({
    key: null,
    value: null
}) {
}

export class CurlAuth extends Immutable.Record({
    username: null,
    password: null,
    type: 'basic'
}) {
}

export class CurlRequest extends Immutable.Record({
    url: null,
    method: null,
    headers: Immutable.OrderedMap(),
    bodyType: null,
    bodyString: null,
    body: null,
    auth: null,
    timeout: null
}) {
    setAuthParams(authParams) {
        let auth = this.get('auth')
        if (auth == null) {
            auth = new CurlAuth()
        }
        auth = auth.merge(authParams)
        return this.set('auth', auth)
    }
}

export default class CurlParser {
    constructor() {
        this.requests = Immutable.List()
        this.args = null
        this.idx = (-1)
    }

    _getArg() {
        if (this.idx < this.args.count()) {
            return this.args.get(this.idx)
        }
        return null
    }

    _getLastArg() {
        if ((this.idx - 1) < this.args.count()) {
            return this.args.get(this.idx - 1)
        }
        return null
    }

    _popArg() {
        if (this.idx < this.args.count()) {
            return this.args.get(this.idx++)
        }
        return null
    }

    _tokenize(string) {
        // shell tokenizer gives shell arguments as curl would receive them
        let args = new ShellTokenizer().tokenize(string)

        // clean arguments to make the curl processing easier:
        // * cleanup spaces before -x and --xxx options
        // * separate stuff like -XPOST in two tokens -X POST
        let cleanedArgs = []
        args.forEach(arg => {
            let m

            // cleanup spaces (if before an -x or --xxx option)
            // that is mostly to accept malformed inputs, with normal valid inputs
            // this "cleanup spaces" shouldn't be required
            m = arg.match(/^\s+(\-[\s\S]*)$/)
            if (m) {
                arg = m[1]
            }
            if (arg.match(/^\s*$/)) {
                return
            }

            // try to detect -XPOST style options
            m = arg.match(/^(\-\w)(.+)$/)
            if (m) {
                cleanedArgs.push(m[1])
                cleanedArgs.push(m[2])
            } else {
                cleanedArgs.push(arg)
            }
        })
        args = Immutable.List(cleanedArgs)

        return args
    }

    parse(string) {
        // tokenize
        this.args = this._tokenize(string)

        // parse
        this.idx = 0
        this._parseAll()

        return this.requests
    }

    _parseAll() {
        let arg
        while ((arg = this._popArg()) != null) {
            if (arg.toLowerCase() === 'curl') {
                // ::this._parseCurlCommand()
                // this._parseCurlCommand.call(this)

                this._parseCurlCommand()

                // if last argument was the -: --next option, continue parsing curl
                const lastArg = this._getLastArg()
                if (lastArg === '-:' || lastArg === '--next') {
                    // ::this._parseCurlCommand()
                    this._parseCurlCommand()
                    // this._parseCurlCommand.call(this)
                }
            }
        }
    }

    _parseCurlCommand() {
        let request = new CurlRequest()
        let urls = Immutable.List()
        let arg
        while ((arg = this._popArg()) != null) {
            if (arg.toLowerCase() === 'curl') {
                urls.forEach(url => {
                    const r = request.set('url', url)
                    this.requests = this.requests.push(r)
                })
                this.idx--
                return
            } else if (arg === '|' ||
                arg === ';' ||
                arg === '&' ||
                arg === '&&') {
                // shell command break tokens
                break
            } else if (arg === '>' ||
                arg === '1>' ||
                arg === '2>' ||
                arg === '&>') {
                // shell redirection tokens (arguments are consumed after)
                this._popArg()
            } else if (arg === '-:' || arg === '--next') {
                break
            } else if (arg === '-X' || arg === '--request') {
                request = this._parseMethod(request)
            } else if (arg === '-I' || arg === '--head') {
                request = request.set('method', 'HEAD')
            } else if (arg === '-H' || arg === '--header') {
                request = this._parseHeader(request)
            } else if (arg === '-F' || arg === '--form') {
                request = this._parseMultipartFormData(request)
            } else if (arg === '--form-string') {
                request = this._parseMultipartFormString(request)
            } else if (arg === '-d' || arg === '--data' || arg === '--data-ascii') {
                request = this._parseUrlEncodedData(request, '--data')
            } else if (arg === '--data-binary') {
                request = this._parseUrlEncodedData(request, arg)
            } else if (arg === '--data-raw') {
                request = this._parseUrlEncodedData(request, arg)
            } else if (arg === '--data-urlencode') {
                request = this._parseUrlEncodedData(request, arg)
            } else if (arg === '--compressed') {
                request = this._parseCompressed(request)
            } else if (arg === '-A' || arg === '--user-agent') {
                request = this._parseUserAgent(request)
            } else if (arg === '-b' || arg === '--cookie') {
                request = this._parseCookie(request)
            } else if (arg === '-e' || arg === '--referer') {
                // note: spelling "referer" is a typo in the HTTP spec
                // while correct English is "Referrer", header name if "Referer" (one R)
                request = this._parseReferer(request)
            } else if (arg === '-u' || arg === '--user') {
                request = this._parseUser(request)
            } else if (arg === '--basic' ||
                arg === '--digest' ||
                arg === '--ntlm' ||
                arg === '--negotiate') {
                request = this._parseAuth(request, arg)
            } else if (arg === '-m' || arg === '--max-time') {
                request = this._parseMaxTime(request)
            } else if (arg === '-c' || arg === '--cookie-jar' ||
                arg === '-C' || arg === '--continue-at' ||
                arg === '-D' || arg === '--dump-header' ||
                arg === '-E' || arg === '--cert' ||
                arg === '-K' || arg === '--config' ||
                arg === '-o' || arg === '--output' ||
                arg === '-r' || arg === '--range' ||
                arg === '-t' || arg === '--telnet-option' ||
                arg === '-T' || arg === '--upload-file' ||
                arg === '-U' || arg === '--proxy-user' ||
                arg === '-w' || arg === '--write-out' ||
                arg === '-x' || arg === '--proxy' ||
                arg === '-y' || arg === '--speed-time' ||
                arg === '-Y' || arg === '--speed-limit' ||
                arg === '-z' || arg === '--time-cond' ||
                arg === '--ciphers' ||
                arg === '--connect-timeout' ||
                arg === '--dns-interface' ||
                arg === '--dns-ipv4-addr' ||
                arg === '--dns-ipv6-addr' ||
                arg === '--dns-servers' ||
                arg === '--engine' ||
                arg === '--egd-file' ||
                arg === '--expect100-timeout' ||
                arg === '--cert-type' ||
                arg === '--cacert' ||
                arg === '--capath' ||
                arg === '--pinnedpubkey' ||
                arg === '--hostpubmd5' ||
                arg === '--interface' ||
                arg === '--keepalive-time' ||
                arg === '--key' ||
                arg === '--key-type' ||
                arg === '--libcurl' ||
                arg === '--limit-rate' ||
                arg === '--local-port' ||
                arg === '--login-options' ||
                arg === '--max-filesize' ||
                arg === '--max-redirs' ||
                arg === '--noproxy' ||
                arg === '--proxy-header' ||
                arg === '--pass' ||
                arg === '--proto' ||
                arg === '--proto-default' ||
                arg === '--proto-redir' ||
                arg === '--proxy-service-name' ||
                arg === '--proxy1.0' ||
                arg === '--pubkey' ||
                arg === '--random-file' ||
                arg === '--resolve' ||
                arg === '--retry' ||
                arg === '--retry-delay' ||
                arg === '--retry-max-time' ||
                arg === '--service-name' ||
                arg === '--socks4' ||
                arg === '--socks4a' ||
                arg === '--socks5-hostname' ||
                arg === '--socks5' ||
                arg === '--socks5-gssapi-service' ||
                arg === '--stderr' ||
                arg === '--tlsauthtype' ||
                arg === '--tlspassword' ||
                arg === '--tlsuser' ||
                arg === '--trace' ||
                arg === '--trace-ascii' ||
                arg === '--unix-socket') {
                // unknown options, but we consume one token
                this._popArg()
            } else if (arg.match(/^\-/)) {
                // ignore unknown arguments
                continue
            } else {
                request = this._parseUrl(request, arg)
                urls = urls.push(request.get('url'))
            }
        }
        if (request.get('method') === null) {
            request = request.set('method', 'GET')
        }
        urls.forEach(url => {
            const r = request.set('url', url)
            this.requests = this.requests.push(r)
        })
    }

    _parseUrl(request, url) {
        const m = url.match(/^(\w+\:\/\/)?(?:([^\:\/]+)(?:\:([^\@]+)?)?\@)?([\s\S]*)$/)
        if (m[2] && !request.getIn(['auth', 'password'])) {
            request = request.setAuthParams({
                username: m[2],
                password: (m[3] ? m[3] : null)
            })
        }
        request = request.set('url', (m[1] ? m[1] : 'http://') + m[4])
        return request
    }

    _normalizeHeader(string) {
        return string.replace(/[^\-]+/g, (m) => {
            return m[0].toUpperCase() + m.substr(1).toLowerCase()
        })
    }

    _resolveFileReference(string, convert = null, regex = /^\@([\s\S]*)$/) {
        const m = string.match(regex)
        if (m) {
            return new CurlFileReference({
                filepath: m[1],
                convert: convert
            })
        }
        return string
    }

    _parseHeader(request) {
        const arg = this._popArg()
        const m = arg.match(/^([^\:\s]+)\s*\:\s*([\s\S]*)$/)
        if (!m) {
            throw new Error('Invalid -H/--header value: ' + arg)
        }
        return request.setIn(['headers', this._normalizeHeader(m[1])], m[2])
    }

    _parseMethod(request) {
        return request.set('method', this._popArg())
    }

    _parseCompressed(request) {
        let acceptEncoding = request.getIn(['headers', 'Accept-Encoding'])
        if (!acceptEncoding) {
            acceptEncoding = ''
        }
        if (acceptEncoding.indexOf('gzip') < 0) {
            if (acceptEncoding.length > 0) {
                acceptEncoding += ';'
            }
            acceptEncoding += 'gzip'
            request = request.setIn(['headers', 'Accept-Encoding'], acceptEncoding)
        }
        return request
    }

    _parseUserAgent(request) {
        return request.setIn(['headers', 'User-Agent'], this._popArg())
    }

    _parseCookie(request) {
        return request.setIn(['headers', 'Cookie'], this._popArg())
    }

    _parseReferer(request) {
        // note: spelling "referer" is a typo in the HTTP spec
        // while correct English is "Referrer", header name if "Referer" (one R)
        return request.setIn(['headers', 'Referer'], this._popArg())
    }

    _parseUser(request) {
        const m = this._popArg().match(/([^\:]+)(?:\:([\s\S]*))?/)
        return request.setAuthParams({
            username: m[1],
            password: (m[2] ? m[2] : null)
        })
    }

    _parseAuth(request, arg) {
        const m = arg.match(/\-{2}(\w+)/)
        return request.setAuthParams({
            type: m[1]
        })
    }

    _parseMaxTime(request) {
        const maxTime = this._popArg()
        return request.set('timeout', parseFloat(maxTime))
    }

    _parseMultipartFormData(request) {
        // switch bodyType
        if (request.get('bodyType') !== 'formData') {
            if (request.get('bodyType') != null) {
                throw new Error('Different body types set in the same request')
            }
            request = request.merge({
                bodyType: 'formData',
                body: Immutable.OrderedMap()
            })
        }
        const arg = this._popArg()
        const m = arg.match(/^([^\=]+)\=([^\;]*)/)
        if (!m) {
            throw new Error('Invalid -F/--form value: ' + arg)
        }

        // set body param
        const value = m[2] !== undefined ? this._resolveFileReference(m[2], null, /^[\@\<]([\s\S]*)$/) : null
        request = request.setIn(['body', m[1]], value)

        // set method if not set
        if (request.get('method') === null) {
            request = request.set('method', 'POST')
        }

        return request
    }

    _parseMultipartFormString(request) {
        // switch bodyType
        if (request.get('bodyType') !== 'formData') {
            if (request.get('bodyType') != null) {
                throw new Error('Different body types set in the same request')
            }
            request = request.merge({
                bodyType: 'formData',
                body: Immutable.OrderedMap()
            })
        }
        const arg = this._popArg()
        const m = arg.match(/^([^\=]+)\=([\s\S]*)$/)
        if (!m) {
            throw new Error('Invalid --form-string value: ' + arg)
        }

        // set body param
        request = request.setIn(['body', m[1]], m[2])

        // set method if not set
        if (request.get('method') === null) {
            request = request.set('method', 'POST')
        }

        return request
    }

    _parseUrlEncodedData(request, option) {
        // switch bodyType
        if (request.get('bodyType') !== 'urlEncoded') {
            if (request.get('bodyType') != null) {
                throw new Error('Different body types set in the same request')
            }
            request = request.merge({
                bodyType: 'urlEncoded',
                body: Immutable.List(),
                bodyString: ''
            })
        }

        // get argument value, consider empty if missing
        let arg = this._popArg()
        if (!arg) {
            arg = ''
        }

        if (option === '--data' ||
            option === '--data-raw' ||
            option === '--data-binary') {
            let value = arg

            // resolve file reference @filename
            if (option === '--data' || option === '--data-binary') {
                const convert = (option == '--data-binary' ? null : 'stripNewlines')
                value = this._resolveFileReference(value, convert)
            }

            // if file reference
            if (value instanceof CurlFileReference) {
                request = request.set('body', request.get('body').push(new CurlKeyValue({
                    key: value
                })))
            }
            // otherwise, parse the parameters
            else {
                let components = value.split('&')
                for (let i = 0; i < components.length; i++) {
                    const component = components[i]
                    let m = component.match(/^([^\=]+)(?:\=([\s\S]*))?$/)
                    if (!m) {
                        continue
                    }
                    request = request.set('body', request.get('body').push(new CurlKeyValue({
                        key: decodeURIComponent(m[1]),
                        value: (m[2] !== undefined ? decodeURIComponent(m[2]) : null)
                    })))
                }

            }
        } else if (option === '--data-urlencode') {
            let m = arg.match(/^([^\=]+)?\=([\s\S]*)$/)
            // =content
            // name=content
            if (m) {
                request = request.set('body', request.get('body').push(new CurlKeyValue({
                    key: (m[1] !== undefined ? m[1] : m[2]),
                    value: (m[1] !== undefined ? m[2] : null)
                })))
            }
                // content
                // @filename
            // name@filename
            else {
                m = arg.match(/^([^\@]+)?([\s\S]+)?$/)
                let value = m[2] !== undefined ? this._resolveFileReference(m[2], 'urlEncode') : null
                request = request.set('body', request.get('body').push(new CurlKeyValue({
                    key: (m[1] !== undefined ? m[1] : value),
                    value: (m[1] !== undefined ? value : null)
                })))
            }
        } else {
            throw new Error('Invalid option ' + option)
        }

        // add body as string
        let bodyString = request.get('bodyString')
        if (bodyString.length > 0) {
            bodyString += '&'
        }
        bodyString += arg
        request = request.set('bodyString', bodyString)

        // set method if not set
        if (request.get('method') === null) {
            request = request.set('method', 'POST')
        }

        return request
    }
}