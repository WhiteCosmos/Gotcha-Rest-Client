/**
 * @created_at 2022/9/3
 * @app_version 1.5.2
 */
import HighlightJSWorker
    from 'worker-loader!./highlightjs-worker'

export const highlightJSWorker = new HighlightJSWorker()