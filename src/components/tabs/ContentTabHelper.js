import GHCContentTab
    from '@/components/tabs/GHCContentTab'
import GHCContentTabType
    from '@/components/tabs/GHCContentTabType'

class ContentTabHelper {
    static checkIsContentTabExists(contentTabs, jsonMethod) {
        let existsContentTab = contentTabs.find(ct => {
            return ct.jsonMethod && ct.jsonMethod.id === jsonMethod.id
        })

        return existsContentTab !== undefined
    }

    static findContentTabByJsonMethod(contentTabs, jsonMethod) {
        return contentTabs.find(ct => {
            return ct.jsonMethod && ct.jsonMethod.id === jsonMethod.id
        })
    }

    static findContentTabByJsonStruct(contentTabs, jsonStruct) {
        return contentTabs.find(ct => {
            return ct.jsonStruct && ct.jsonStruct.id === jsonStruct.id
        })
    }

    static findContentTabByTreeNode(contentTabs, treeNode) {
        return contentTabs.find(ct => {
            return ct.treeNode && ct.treeNode.uid === treeNode.uid
        })
    }

    /**
     * @param {JsonMethod} jsonMethod
     */
    static buildTabViewByJsonMethod(jsonMethod) {
        let tabView = new GHCContentTab()

        if (jsonMethod.summary) {
            tabView.name = jsonMethod.summary
        } else {
            tabView.name = jsonMethod.methodName
        }

        tabView.type = GHCContentTabType.API_DEFINITION

        return tabView
    }

    /**
     * @param {JsonStruct} jsonStruct
     */
    static buildTabViewByJsonStruct(jsonStruct) {

    }
}

export default ContentTabHelper