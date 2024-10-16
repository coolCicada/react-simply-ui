import { createRoot } from 'react-dom/client';
import { Form } from './index';
import Menu, { MenuItem, SumMenu } from './Menu';
import './main.less';
const Item = Form.Item;

const App = () => {
    const form = Form.useForm({ one: 'init' });
    return (
        <div className='space-y-2 min-h-screen p-4'>
            <div className='border p-4'>
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
            <div className='p-4'>
                <Menu defaultSelectedId={["5"]}>
                    <SumMenu name="one" title="one">
                        <MenuItem name="1">1</MenuItem>
                    </SumMenu>
                    <SumMenu name="two" title="two">
                        <MenuItem name="2">2</MenuItem>
                        <MenuItem name="3">3</MenuItem>
                        <SumMenu name="three" title="three">
                            <MenuItem name="4">4</MenuItem>
                            <MenuItem name="5">5</MenuItem>
                        </SumMenu>
                    </SumMenu>
                </Menu>
            </div>
        </div>
    )
}

// 获取 DOM 元素
const rootElement = document.getElementById('app')!;

// 使用 createRoot 创建根元素并渲染
const root = createRoot(rootElement);
root.render(<App />);