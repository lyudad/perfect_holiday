interface ContainerProps {
    children: object
}

const Container = ({ children }: ContainerProps)=> {
    return (
        <div>{children}</div>
   )
}
export default Container;