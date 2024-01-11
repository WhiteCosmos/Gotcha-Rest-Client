import Dexie
    from 'dexie'
import AppConfig
    from '@/AppConfig'

let IndexedDB

if (AppConfig.alpha()) {
    IndexedDB = new Dexie('Gotcha_HTTP_Client_ALPHA')
} else if (AppConfig.beta()) {
    IndexedDB = new Dexie('Gotcha_HTTP_Client_BETA')
} else {
    IndexedDB = new Dexie('RabiAPI_v1.4.0')
}

IndexedDB.version(1).stores({
    RabiProject: '++id, repositoryId, [name+type]',

    RabiVersion: '++id, projectId',

    RabiModule: '++id, versionId',

    RabiTreeViewGroup: '++id, moduleId',

    RabiHttpOperation: '++id, versionId, moduleId, operationId, [versionId+operationId]',

    RabiMockOperation: '++id, versionId, moduleId, operationId, [versionId+operationId]',

    JsonStructContent: '++id, moduleId',

    JsonMethodContent: '++id, moduleId',
})

IndexedDB.version(2).stores({
    RabiHttpOperationNode: '++id, projectId, versionId', // Deprecated
})

IndexedDB.version(3).stores({
    RabiCookieJar: '++id, projectId',
})

IndexedDB.version(4).stores({
    RabiProject: '++id, repositoryId, [name+type], [name+source]',
})

IndexedDB.version(5).stores({
    // ???
})

IndexedDB.version(6).stores({
    RabiHttpEnvironment: '++id, projectId',
})

IndexedDB.version(7).stores({
    GHCCookieJars: '++id, projectId'
})

IndexedDB.version(8).stores({
    GHCCachedRequestUrl: '++id, url'
})

IndexedDB.version(9).stores({
    GHCWebsocketOperation: '++id, projectId, versionId'
})

export default IndexedDB
