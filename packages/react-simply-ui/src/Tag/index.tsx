import './index.less'; // 引入样式文件

interface TagProps {
  text: string;
  onClose?: () => void; // 可选的关闭事件
}

const Tag: React.FC<TagProps> = ({ text, onClose }) => {
  return (
    <div className="tag">
      {text}
      {onClose && (
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      )}
    </div>
  );
};

export default Tag;
