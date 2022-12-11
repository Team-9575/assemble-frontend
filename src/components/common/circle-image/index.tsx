import styled from '@emotion/styled'
import Image from 'next/image'

interface ICircleImageProps {
  src: string
  alt: string
  size?: string
}

const CircleImage = ({ src, alt, size = '2.5rem' }: ICircleImageProps) => {
  // TODO: blur
  return (
    <ImageWrapper size={size}>
      <Image src={src} alt={alt} layout="fill" />
    </ImageWrapper>
  )
}

const ImageWrapper = styled.div<{ size: string }>`
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  position: relative;
  border-radius: 50%;
  overflow: hidden;
`

export default CircleImage
