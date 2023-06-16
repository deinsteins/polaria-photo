import { useSpring, animated } from '@react-spring/web'
const Card = ({ image, title, imgWidth }) => {
    const [springs, api] = useSpring(() => ({
        from: { x: 0 },
      }))
    
      const handleHover = () => {
        api.start({
          from: {
            x: 0,
          },
          to: {
            x: 20,
          },
        })
      }

      const handleMouseLeave = () => {
        api.start({
          from: {
            x: 20,
          },
          to: {
            x: 0,
          },
        })
      }
    
    return (
        <animated.div
        onMouseOver={handleHover}
        onMouseLeave={handleMouseLeave}
        style={{
            ...springs,
        }}>
        <div className="flex flex-col cursor-pointer" style={{width: imgWidth}}>
            <img src={image} alt="" className="rounded"/>
            <span className="mx-auto mt-4 text-gray-700">{title}</span>
        </div>
        </animated.div>
    )
}

export default Card;