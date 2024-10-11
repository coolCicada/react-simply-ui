import { createRoot } from 'react-dom/client';
import { Button, Modal } from './src/index';
import React from 'react';
import { useState } from 'react';

const App = () => {
    const [show, setShow] = useState(false);
    return (
        <>
            <Button onClick={() => setShow(true)} label='测试' />
            <Modal isOpen={show} onClose={() => setShow(false)}>Modal</Modal>
        </>
    )
}

// 获取 DOM 元素
const rootElement = document.getElementById('app')!;

// 使用 createRoot 创建根元素并渲染
const root = createRoot(rootElement);
root.render(<App />);
