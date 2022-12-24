import styled from '@emotion/styled'
import { Skeleton } from '@mui/material'
import Image from 'next/image'

interface ICircleImageProps {
  src?: string
  alt: string
  size?: string
  isLoading?: boolean
}

const CircleImage = ({
  src,
  alt,
  size = '2.5rem',
  isLoading = false,
}: ICircleImageProps) => {
  // TODO: blur
  return (
    <ImageWrapper size={size}>
      {isLoading || !src ? (
        <Skeleton width={size} height={size} variant="circular" />
      ) : (
        <Image src={src} alt={alt} layout="fill" />
      )}
    </ImageWrapper>
  )
}

const ImageWrapper = styled.div<{ size: string }>`
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f2f2f2;
`

export default CircleImage
