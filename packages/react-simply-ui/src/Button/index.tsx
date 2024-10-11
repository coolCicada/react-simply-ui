import './index.less'; // 引入样式文件

interface ButtonProps {
  label: string;
  onClick?: () => void; // 可选的点击事件
  size?: 'normal' | 'small' | 'big'
}

const Button: React.FC<ButtonProps> = ({ label, onClick, size = 'normal' }) => {
  return (
    <button className={`button ${size}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
