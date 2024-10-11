import './index.less'; // 引入样式文件

interface ButtonProps {
  label: string;
  onClick?: () => void; // 可选的点击事件
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
