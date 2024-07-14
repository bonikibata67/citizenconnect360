export interface PollOption {
    label: string;
    percentage: number;
    votes: number;
  }
  
export interface Poll {
    title: string;
    question: string;
    options: PollOption[];
    totalVotes: number;
  }
  
