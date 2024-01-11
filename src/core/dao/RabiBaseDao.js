import IndexedDB
    from '@/core/IndexedDB'

class RabiBaseDao {
    openDatabase() {
        !IndexedDB.isOpen() && IndexedDB.open()
    }
}

export default RabiBaseDao