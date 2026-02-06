import blockComponents from './blocks'
export default function BlocksRenderer({ blocks = [], personalDetails = {} }) {
  return (
    <>
      {blocks.map((block, i) => {
        console.log(JSON.stringify(block?.blockType))
        const Component = blockComponents[block?.blockType]
        if (!Component) return null

        return <Component key={i} {...block} personalDetails={personalDetails} />
      })}
    </>
  )
}
