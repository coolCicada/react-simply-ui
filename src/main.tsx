import { createRoot } from 'react-dom/client';
import DOC from 'simply-ui-docs';
import 'simply-ui-docs/dist/style.css';
import './main.less';

const App = () => {
    return (
        <div className='bg-slate-100'>
            <DOC />
        </div>
    )
}

// 获取 DOM 元素
const rootElement = document.getElementById('app')!;

// 使用 createRoot 创建根元素并渲染
const root = createRoot(rootElement);
root.render(<App />);
