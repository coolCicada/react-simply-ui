import { createRoot } from 'react-dom/client';
import { Button, Form } from './index';
import Menu, { MenuItem, SumMenu } from './Menu';
import './main.less';
const Item = Form.Item;

const App = () => {
    const form = Form.useForm({ one: 'init' });
    return (
        <div className='space-y-2 min-h-screen p-4'>
            <div className='border p-4'>
                <Form form={form}>
                    <Item name="one" label="Item1" rules={[
                        {
                            required: true,
                            message: 'one 必填'
                        }
                    ]}>
                        <input placeholder='请输入' />
                    </Item>
                    <Item name="two" label="Item2" rules={[
                        {
                            required: true,
                            message: 'two 必填'
                        }
                    ]}>
                        <input placeholder='请输入' />
                    </Item>
                </Form>
                <Button label='打印表单' onClick={() => {
                    console.log('form:', form.getFieldsValue());
                }} />
                <br />
                <Button label='校验错误' onClick={async () => {
                    const res = await form.validate();
                    console.log('errors:', res);
                }} />
            </div>
            <div className='p-4'>
                <Menu defaultSelectedId={["5", "1"]}>
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