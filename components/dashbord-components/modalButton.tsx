
const ModalButton = (props: any) => {
    const {title} = props
    return (
        <div>
            <button
              className="bg-blue-500  rounded rounded-lg shadow shadow-lg px-3 py-2 tex-white"
            >
              {title}
            </button>
        </div>
    )
}

export default ModalButton