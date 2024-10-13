import { createRoot } from 'react-dom/client';
import { Form } from './index';
const Item = Form.Item;

const App = () => {
    const form = Form.useForm({ one: 'init' });
    return (
        <div className='bg-slate-100'>
            <Form form={form}>
                <Item name="one">
                    <input placeholder='请输入'/>
                </Item>
                <Item name="two">
                    <input placeholder='请输入'/>
                </Item>
            </Form>
            <button onClick={() => {
                console.log('form:', form.getFieldsValue());
            }}>see</button>
        </div>
    )
}

// 获取 DOM 元素
const rootElement = document.getElementById('app')!;

// 使用 createRoot 创建根元素并渲染
const root = createRoot(rootElement);
root.render(<App />);