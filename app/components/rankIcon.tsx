import { Constants } from '../utils/constants'

export interface Props {
  rank: number
}

const RankIcon = ({ rank }: Props) => {
  const rankName = Constants.convertRankEnumToName(rank)
  return (
    <div className='p-2' aria-label='rank'>
      <p className='text-lg capitalize'>{rankName}</p>
    </div>
  )
}

export default RankIcon
