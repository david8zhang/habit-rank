export enum TodoDifficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

export enum Ranks {
  BRONZE_1,
  BRONZE_2,
  BRONZE_3,
  SILVER_1,
  SILVER_2,
  SILVER_3,
  GOLD_1,
  GOLD_2,
  GOLD_3,
  PLATINUM_1,
  PLATINUM_2,
  PLATINUM_3,
  DIAMOND_1,
  DIAMOND_2,
  DIAMOND_3,
  MASTER_1,
  MASTER_2,
  MASTER_3,
  GRANDMASTER_1,
  GRANDMASTER_2,
  GRANDMASTER_3,
}

export interface TodoData {
  id: string
  title: string
  difficulty: TodoDifficulty
}

export class Constants {
  public static SAMPLE_TODO_DATA: TodoData[] = [
    {
      id: '1234',
      title: 'Sample Todo',
      difficulty: TodoDifficulty.EASY,
    },
    {
      id: '2345',
      title: 'Sample Todo',
      difficulty: TodoDifficulty.EASY,
    },
    {
      id: '3456',
      title: 'Sample Todo',
      difficulty: TodoDifficulty.EASY,
    },
    {
      id: '4567',
      title: 'Sample Todo',
      difficulty: TodoDifficulty.EASY,
    },
    {
      id: '7890',
      title: 'Sample Todo',
      difficulty: TodoDifficulty.EASY,
    },
    {
      id: '8901',
      title: 'Sample Todo',
      difficulty: TodoDifficulty.EASY,
    },
  ]

  public static convertRankEnumToName(rank: Ranks) {
    const rankNames: string[] = []
    const baseRanks = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster']
    const subRanks = ['I', 'II', 'III']
    baseRanks.forEach((baseRank) => {
      subRanks.forEach((subRank) => {
        rankNames.push(`${baseRank} ${subRank}`)
      })
    })
    return rankNames[rank]
  }
}
