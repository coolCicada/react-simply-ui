import { createRoot } from 'react-dom/client';
import DOC from './docs-project/example';
import './main.less';

const App = () => {
    return (
        <>
            <DOC />
        </>
    )
}

// 获取 DOM 元素
const rootElement = document.getElementById('app')!;

// 使用 createRoot 创建根元素并渲染
const root = createRoot(rootElement);
root.render(<App />);
