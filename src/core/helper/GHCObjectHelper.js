/**
 * @created_at 2022/3/24
 * @app_version 1.4.3
 */
export default {
    equals(source, target) {
        if (!source || !target) {
            return false
        }

        if (!source.uid || !target.uid) {
            return false
        }

        return source.uid === target.uid
    },

    notEquals(source, target) {
        if (!source || !target) {
            return true
        }

        if (!source.uid || !target.uid) {
            return true
        }

        return source.uid !== target.uid
    },
}