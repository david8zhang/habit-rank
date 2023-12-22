import { Progress } from '@nextui-org/react'

export interface Props {
  progress: number
  style?: any
}

const RankProgress = ({ progress, style }: Props) => {
  return (
    <div className='absolute w-1/2 bottom-6'>
      <Progress color='primary' radius='none' value={progress} />
      <div className='flex mt-2'>
        <p className='flex-1 text-left'>Rank Progress</p>
        <p className='flex-1 text-right'>{progress}/100</p>
      </div>
    </div>
  )
}

export default RankProgress
