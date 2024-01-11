import {v4} from 'uuid'

/**
 * Supply an uid for every view component
 */
class GHCComponent {
    constructor() {
        this.uid = v4()
    }
}

export default GHCComponent