export enum TodoDifficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

export enum Ranks {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
  DIAMOND = 'DIAMOND',
  MASTER = 'MASTER',
  GRANDMASTER = 'GRANDMASTER',
  GOD = 'GOD',
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
}
