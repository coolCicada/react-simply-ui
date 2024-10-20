import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ children }) => {
  return (
    <SyntaxHighlighter language="javascript" style={solarizedlight}>
        {children}
    </SyntaxHighlighter>
  )
}

export default CodeBlock