const ComponentWrapper = ({ children }) => {
  return (
    <div className="p-8 border my-2">
      {children}
    </div>
  )
}

export default ComponentWrapper;