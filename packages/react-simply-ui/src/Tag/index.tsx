import './index.less'; // 引入样式文件
import { useState } from 'react';

interface TagProps {
  text: string;
  closeable?: boolean; // 可选的关闭事件
}

const Tag: React.FC<TagProps> = ({ text, closeable }) => {
  const [show, setShow] = useState(true);
  return (
    <>
      {show && <div className="tag">
        {text}
        {closeable && (
          <button className="close-btn" onClick={() => setShow(false)}>
            ×
          </button>
        )}
      </div>}
    </>
  );
};

export default Tag;
