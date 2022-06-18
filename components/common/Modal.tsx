type ModalProps = {
  children?: React.ReactNode
}

const Modal = ({ children }: ModalProps) => {
  return (
    <div>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75"/>
      <div className="fixed inset-0 flex justify-center overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

export default Modal